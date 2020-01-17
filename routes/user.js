const express = require('express');
const router = express.Router();

const { userValidator, checkResults } = require('../modules/validation.js');
const userController = require('../controllers/user.js');

router.post('/', userValidator.create, checkResults, userController.create);
router.get('/', userController.read);
router.put('/', userValidator.update, checkResults, userController.update);
router.delete('/', userValidator.checkToken, checkResults, userController.delete);

module.exports = router;
