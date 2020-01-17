const { check, validationResult } = require('express-validator');

const user = require('../models/user.js');
const blog = require('../models/blog.js');
const post = require('../models/post.js');
const comment = require('../models/comment.js');

const searchInTable = function(value) {
  return this.find({ _id: value }).then(items => {
    if (items.length == 0) {
      return Promise.reject("Указанный _id не существует.");
    }
  });
};

const idExists = table => searchInTable.bind(table);

const checkToken = function(value, { req }) {
  return user.find({ token: value }).then(items => {
    if (items.length == 0) {
      return Promise.reject("Неверный токен.");
    }
  })
}

const checkOwnerToken = async function(value, { req }) {
  const results = await user.find({ token: value });
  if (results.length == 0) return Promise.reject("Неверный токен.");
  else {
    const owner = results[0]._id;
    return this.find({ _id: req.body._id, owner_id: owner }).then(items => {
      if (items.length == 0) {
        return Promise.reject("Неверный токен.");
      }
    });
  }
}

const ownerToken = table => checkOwnerToken.bind(table);

const userValidator = {
  create: [
    check('username').not().isEmpty(),
    check('password').not().isEmpty().isLength({ min: 6 }),
    check('email').not().isEmpty()
  ],
  update: [
    check('token').custom(ownerToken(blog)),
    check('username').optional().not().isEmpty(),
    check('password').optional().not().isEmpty().isLength({ min: 6 }),
    check('email').optional().not().isEmpty()
  ],
  checkToken: [
    check('token').not().isEmpty().custom(checkToken)
  ]
};

const blogValidator = {
  create: [
    check('token').not().isEmpty().custom(checkToken),
    check('title').not().isEmpty(),
    check('description').optional().not().isEmpty(),
    check('image').optional().not().isEmpty()
  ],
  update: [
    check('token').not().isEmpty().custom(checkToken),
    check('_id').not().isEmpty().custom(idExists(blog)),
    check('title').optional().not().isEmpty(),
    check('description').optional().not().isEmpty(),
    check('image').optional().not().isEmpty()
  ],
  checkID: [
    check('token').not().isEmpty().custom(checkToken),
    check('_id').not().isEmpty().custom(idExists(blog))
  ]
};

const postValidator = {
  create: [
    check('blog_id').not().isEmpty().custom(idExists(blog)),
    check('title').not().isEmpty(),
    check('body').not().isEmpty()
  ],
  update: [
    check('_id').not().isEmpty().custom(idExists(post)),
    check('title').optional().not().isEmpty(),
    check('body').optional().not().isEmpty()
  ],
  checkID: [
    check('_id').not().isEmpty().custom(idExists(post))
  ]
};

const commentValidator = {
  create: [
    check('user_id').not().isEmpty(),
    check('post_id').not().isEmpty().custom(idExists(post)),
    check('body').not().isEmpty()
  ],
  update: [
    check('_id').not().isEmpty().custom(idExists(comment)),
    check('body').not().isEmpty()
  ],
  checkID: [
    check('_id').not().isEmpty().custom(idExists(comment))
  ]
};

const checkResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).send({errors: errors.array()});
  next();
}

module.exports = {
  userValidator,
  blogValidator,
  postValidator,
  commentValidator,
  checkResults
};
