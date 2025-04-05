const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET cart page
router.get('/', cartController.getCart);

// POST add item to cart
router.post('/add', cartController.addToCart);

// POST update cart item quantity
router.post('/update', cartController.updateCartItem);

// GET remove item from cart
router.get('/remove/:id', cartController.removeCartItem);

// GET clear cart
router.get('/clear', cartController.clearCart);

module.exports = router;
