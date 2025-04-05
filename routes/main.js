const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// GET home page
router.get('/', mainController.getHomePage);

// GET about page
router.get('/about', mainController.getAboutPage);

// GET contact page
router.get('/contact', mainController.getContactPage);

// POST contact form
router.post('/contact', mainController.submitContactForm);

// 404 page is handled in app.js

module.exports = router;
