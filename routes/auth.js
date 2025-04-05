const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET login page
router.get('/login', authController.getLoginPage);

// GET register page
router.get('/register', authController.getRegisterPage);

// POST register user
router.post('/register', authController.register);

// POST login user
router.post('/login', authController.login);

// GET logout user
router.get('/logout', authController.logout);

module.exports = router;
