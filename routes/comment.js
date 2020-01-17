const express = require('express');
const router = express.Router();
const { commentValidator, checkResults } = require('../modules/validation.js');
const commentController = require('../controllers/comment.js');

router.post('/', commentValidator.create, checkResults, commentController.create);
router.get('/', commentController.read);
router.put('/', commentValidator.update, checkResults, commentController.update);
router.delete('/', commentValidator.checkID, checkResults, commentController.delete);

module.exports = router;
