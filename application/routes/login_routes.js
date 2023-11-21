const express = require('express');
const userController = require('../controllers/login_controller.js');
const router = express.Router();

router.post('/login', userController.post);

module.exports = router;
