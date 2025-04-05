const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products with optional filtering
router.get('/', productController.getAllProducts);

// GET search products
router.get('/search', productController.searchProducts);

// GET product by ID
router.get('/:id', productController.getProductById);

// POST add product review
router.post('/:id/reviews', productController.addReview);

module.exports = router;
