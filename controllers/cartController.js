const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error_msg', 'Please login to view your cart');
      return res.redirect('/auth/login');
    }

    const cart = await Cart.findOne({ user: req.session.user.id }).populate('items.product');
    
    if (!cart) {
      return res.render('cart/index', {
        title: 'Shopping Cart',
        cart: { items: [], totalAmount: 0 }
      });
    }

    res.render('cart/index', {
      title: 'Shopping Cart',
      cart
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch cart');
    res.redirect('/');
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error_msg', 'Please login to add items to cart');
      return res.redirect('/auth/login');
    }

    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/products');
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      req.flash('error_msg', 'Not enough stock available');
      return res.redirect(`/products/${productId}`);
    }

    // Find user's cart or create a new one
    let cart = await Cart.findOne({ user: req.session.user.id });
    
    if (!cart) {
      cart = new Cart({
        user: req.session.user.id,
        items: [],
        totalAmount: 0
      });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
        price: product.price
      });
    }

    // Calculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    cart.updatedAt = Date.now();
    await cart.save();

    req.flash('success_msg', 'Item added to cart');
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to add item to cart');
    res.redirect('/products');
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error_msg', 'Please login to update your cart');
      return res.redirect('/auth/login');
    }

    const { productId, quantity } = req.body;
    
    if (quantity <= 0) {
      return res.redirect(`/cart/remove/${productId}`);
    }

    const product = await Product.findById(productId);
    
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/cart');
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      req.flash('error_msg', 'Not enough stock available');
      return res.redirect('/cart');
    }

    const cart = await Cart.findOne({ user: req.session.user.id });
    
    if (!cart) {
      req.flash('error_msg', 'Cart not found');
      return res.redirect('/cart');
    }

    // Find item index
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex === -1) {
      req.flash('error_msg', 'Item not found in cart');
      return res.redirect('/cart');
    }

    // Update quantity
    cart.items[itemIndex].quantity = Number(quantity);

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    cart.updatedAt = Date.now();
    await cart.save();

    req.flash('success_msg', 'Cart updated');
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to update cart');
    res.redirect('/cart');
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error_msg', 'Please login to remove items from cart');
      return res.redirect('/auth/login');
    }

    const productId = req.params.id;
    const cart = await Cart.findOne({ user: req.session.user.id });
    
    if (!cart) {
      req.flash('error_msg', 'Cart not found');
      return res.redirect('/cart');
    }

    // Remove item from cart
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    cart.updatedAt = Date.now();
    await cart.save();

    req.flash('success_msg', 'Item removed from cart');
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to remove item from cart');
    res.redirect('/cart');
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error_msg', 'Please login to clear your cart');
      return res.redirect('/auth/login');
    }

    const cart = await Cart.findOne({ user: req.session.user.id });
    
    if (!cart) {
      req.flash('error_msg', 'Cart not found');
      return res.redirect('/cart');
    }

    cart.items = [];
    cart.totalAmount = 0;
    cart.updatedAt = Date.now();
    await cart.save();

    req.flash('success_msg', 'Cart cleared');
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to clear cart');
    res.redirect('/cart');
  }
};
