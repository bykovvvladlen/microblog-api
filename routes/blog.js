const express = require('express');
const router = express.Router();
const { blogValidator, checkResults } = require('../modules/validation.js');
const blogController = require('../controllers/blog.js');

router.post('/', blogValidator.create, checkResults, blogController.create);
router.get('/', blogController.read);
router.put('/', blogValidator.update, checkResults, blogController.update);
router.delete('/', blogValidator.checkID, checkResults, blogController.delete);

module.exports = router;
