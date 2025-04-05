const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin authentication middleware
router.use(adminController.isAdmin);

// GET admin dashboard
router.get('/dashboard', adminController.getDashboard);

// GET all products for admin
router.get('/products', adminController.getProducts);

// GET add product form
router.get('/products/add', adminController.getAddProductForm);

// POST add new product
router.post('/products/add', adminController.upload.single('image'), adminController.addProduct);

// GET edit product form
router.get('/products/edit/:id', adminController.getEditProductForm);

// POST update product
router.post('/products/edit/:id', adminController.upload.single('image'), adminController.updateProduct);

// POST delete product
router.post('/products/delete/:id', adminController.deleteProduct);

// GET all orders for admin
router.get('/orders', adminController.getOrders);

// POST update order status
router.post('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;
