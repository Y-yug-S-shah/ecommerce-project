const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect('/auth/register');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/auth/register');
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Server error');
    res.redirect('/auth/register');
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Set user session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    };

    // Redirect based on user role
    if (user.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Server error');
    res.redirect('/auth/login');
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/auth/login');
  });
};

// Render login page
exports.getLoginPage = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    user: req.session.user
  });
};

// Render register page
exports.getRegisterPage = (req, res) => {
  res.render('auth/register', {
    title: 'Register',
    user: req.session.user
  });
};
