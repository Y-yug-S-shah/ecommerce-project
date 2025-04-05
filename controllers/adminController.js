const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

// Admin authentication middleware
exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  req.flash('error_msg', 'Not authorized. Admin access required.');
  res.redirect('/auth/login');
};

// Get admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    // Get counts for dashboard
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      productCount,
      orderCount,
      userCount,
      recentOrders,
      lowStockProducts
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to load dashboard');
    res.redirect('/');
  }
};

// Get all products for admin
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.render('admin/products', {
      title: 'Manage Products',
      products
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch products');
    res.redirect('/admin/dashboard');
  }
};

// Get add product form
exports.getAddProductForm = (req, res) => {
  res.render('admin/add-product', {
    title: 'Add New Product'
  });
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      features
    } = req.body;
    
    // Handle specifications (convert form data to Map)
    const specifications = {};
    for (const key in req.body) {
      if (key.startsWith('spec_key_') && req.body[key]) {
        const index = key.replace('spec_key_', '');
        const valueKey = `spec_value_${index}`;
        
        if (req.body[valueKey]) {
          specifications[req.body[key]] = req.body[valueKey];
        }
      }
    }
    
    // Create new product
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      features: features ? features.split(',').map(f => f.trim()) : [],
      specifications,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '/uploads/default-product.jpg'
    });
    
    await product.save();
    
    req.flash('success_msg', 'Product added successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to add product');
    res.redirect('/admin/products/add');
  }
};

// Get edit product form
exports.getEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/admin/products');
    }
    
    res.render('admin/edit-product', {
      title: 'Edit Product',
      product
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch product');
    res.redirect('/admin/products');
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      features
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/admin/products');
    }
    
    // Handle specifications (convert form data to Map)
    const specifications = {};
    for (const key in req.body) {
      if (key.startsWith('spec_key_') && req.body[key]) {
        const index = key.replace('spec_key_', '');
        const valueKey = `spec_value_${index}`;
        
        if (req.body[valueKey]) {
          specifications[req.body[key]] = req.body[valueKey];
        }
      }
    }
    
    // Update product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.stock = stock;
    product.features = features ? features.split(',').map(f => f.trim()) : [];
    product.specifications = specifications;
    
    // Update image if new one is uploaded
    if (req.file) {
      // Delete old image if it exists and is not the default
      if (product.imageUrl && !product.imageUrl.includes('default-product.jpg')) {
        const oldImagePath = path.join(__dirname, '../public', product.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      product.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    await product.save();
    
    req.flash('success_msg', 'Product updated successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to update product');
    res.redirect(`/admin/products/edit/${req.params.id}`);
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/admin/products');
    }
    
    // Delete product image if it's not the default
    if (product.imageUrl && !product.imageUrl.includes('default-product.jpg')) {
      const imagePath = path.join(__dirname, '../public', product.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await product.remove();
    
    req.flash('success_msg', 'Product deleted successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to delete product');
    res.redirect('/admin/products');
  }
};

// Get all orders for admin
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    res.render('admin/orders', {
      title: 'Manage Orders',
      orders
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch orders');
    res.redirect('/admin/dashboard');
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      req.flash('error_msg', 'Order not found');
      return res.redirect('/admin/orders');
    }
    
    order.status = status;
    
    // Update delivery status if status is 'Delivered'
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    
    await order.save();
    
    req.flash('success_msg', 'Order status updated successfully');
    res.redirect('/admin/orders');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to update order status');
    res.redirect('/admin/orders');
  }
};
