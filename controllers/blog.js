const blog = require('../models/blog');
const user = require('../models/user');

async function create(req, res) {
  const results = await user.find({ token: req.body.token });
  if (results.length == 0) return res.json({ errors: ["Неверный токен."] });
  else req.body.owner_id = results[0]._id;

  blog.create(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Блог создан." });
  });
}

function update(req, res) {
  blog.updateOne({ _id: req.body._id }, { $set: req.body }, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Данные блога обновлены." });
  });
}

function deleteOne(req, res) {
  blog.deleteOne({ _id: req.body._id }, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Блог удален." });
  });
}

function read(req, res) {
  blog.find(req.query, (errors, data) => {
    if (errors) res.json({ errors });
    else res.json(data);
  });
}

module.exports = {
  create,
  update,
  delete: deleteOne,
  read
};
