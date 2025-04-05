const Product = require('../models/Product');
const mockData = require('../data/mockData');

// Variable to track if we're using mock data
let usingMockData = false;

// Get home page
exports.getHomePage = async (req, res) => {
  try {
    let featuredProducts, topRatedProducts, productsByCategory;
    
    try {
      // Try to get data from database
      // Get featured products (newest products)
      featuredProducts = await Product.find()
        .sort({ createdAt: -1 })
        .limit(8);
      
      // Get top rated products
      topRatedProducts = await Product.find()
        .sort({ rating: -1 })
        .limit(4);
      
      // Get products by category
      const categories = ['Smartphones', 'Laptops', 'Tablets', 'Cameras'];
      productsByCategory = {};
      
      for (const category of categories) {
        const products = await Product.find({ category })
          .limit(4);
        
        productsByCategory[category] = products;
      }
      
      usingMockData = false;
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError);
      // If database fails, use mock data
      usingMockData = true;
      
      // Get featured products (newest products)
      featuredProducts = mockData.products
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
      
      // Get top rated products
      topRatedProducts = [...mockData.products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      
      // Get products by category
      const categories = ['Smartphones', 'Laptops', 'Tablets', 'Cameras'];
      productsByCategory = {};
      
      for (const category of categories) {
        const products = mockData.products
          .filter(p => p.category === category)
          .slice(0, 4);
        
        productsByCategory[category] = products;
      }
    }
    
    res.render('index', {
      title: 'Electronics Shop - Home',
      featuredProducts,
      topRatedProducts,
      productsByCategory,
      usingMockData
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Server error',
      error: {}
    });
  }
};

// Get about page
exports.getAboutPage = (req, res) => {
  res.render('about', {
    title: 'About Us',
    usingMockData
  });
};

// Get contact page
exports.getContactPage = (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    usingMockData
  });
};

// Handle contact form submission
exports.submitContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Here you would typically send an email or save to database
  // For now, we'll just redirect with a success message
  
  req.flash('success_msg', 'Your message has been sent. We will get back to you soon!');
  res.redirect('/contact');
};

// Get 404 page
exports.get404Page = (req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    usingMockData
  });
};
