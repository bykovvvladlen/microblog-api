const express = require('express');
const router = express.Router();
const { postValidator, checkResults } = require('../modules/validation.js');
const postController = require('../controllers/post.js');

router.post('/', postValidator.create, checkResults, postController.create);
router.get('/', postController.read);
router.put('/', postValidator.update, checkResults, postController.update);
router.delete('/', postValidator.checkID, checkResults, postController.delete);

module.exports = router;
