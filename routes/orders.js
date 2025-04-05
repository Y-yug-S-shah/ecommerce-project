const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/auth');

// Get checkout page
router.get('/checkout', isAuthenticated, orderController.getCheckout);

// Create payment intent
router.post('/create-payment-intent', isAuthenticated, orderController.createPaymentIntent);

// Process order after successful payment
router.post('/process', isAuthenticated, orderController.processOrder);

// Get order history
router.get('/history', isAuthenticated, orderController.getOrderHistory);

// Get order details - this must be after the /history route to avoid conflict
router.get('/:id', isAuthenticated, orderController.getOrderDetails);

module.exports = router;
