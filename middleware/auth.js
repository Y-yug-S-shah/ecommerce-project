/**
 * Authentication middleware functions
 */

// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  
  req.flash('error_msg', 'Please log in to access this page');
  res.redirect('/auth/login');
};

// Check if user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  
  req.flash('error_msg', 'Access denied. Admin privileges required');
  res.redirect('/');
};

// Check if user is authenticated or continue as guest
exports.isAuthenticatedOrGuest = (req, res, next) => {
  // Always continue, but the routes can check req.session.user
  // to determine if the user is logged in
  next();
};
