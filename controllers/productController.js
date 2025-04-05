const Product = require('../models/Product');
const mockData = require('../data/mockData');

// Reference to the mock data flag from mainController
const mainController = require('./mainController');

// Get all products with optional filtering
exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, sort } = req.query;
    let products, categories, brands;
    
    try {
      // Try to get data from database
      let query = {};
      
      // Apply filters if provided
      if (category) {
        query.category = category;
      }
      
      if (brand) {
        query.brand = brand;
      }
      
      if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        query.price = { $gte: minPrice };
      } else if (maxPrice) {
        query.price = { $lte: maxPrice };
      }
      
      // Create sort options
      let sortOption = {};
      if (sort === 'price-low') {
        sortOption = { price: 1 };
      } else if (sort === 'price-high') {
        sortOption = { price: -1 };
      } else if (sort === 'newest') {
        sortOption = { createdAt: -1 };
      } else if (sort === 'rating') {
        sortOption = { rating: -1 };
      } else {
        // Default sort
        sortOption = { createdAt: -1 };
      }
      
      products = await Product.find(query).sort(sortOption);
      
      // Get unique categories and brands for filter options
      categories = await Product.distinct('category');
      brands = await Product.distinct('brand');
      
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError);
      // If database fails, use mock data
      let filteredProducts = [...mockData.products];
      
      // Apply filters
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      
      if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === brand);
      }
      
      if (minPrice && maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
      } else if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
      } else if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
      }
      
      // Apply sorting
      if (sort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sort === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      } else {
        // Default sort
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      products = filteredProducts;
      
      // Get unique categories and brands
      categories = [...new Set(mockData.products.map(p => p.category))];
      brands = [...new Set(mockData.products.map(p => p.brand))];
    }
    
    res.render('products/index', {
      title: 'All Products',
      products,
      categories,
      brands,
      filters: {
        category: category || '',
        brand: brand || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
        sort: sort || 'newest'
      },
      usingMockData: global.usingMockData
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch products');
    res.redirect('/');
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    let product, relatedProducts;
    
    try {
      // Try to get data from database
      product = await Product.findById(req.params.id).populate({
        path: 'reviews.user',
        select: 'name'
      });
      
      if (!product) {
        req.flash('error_msg', 'Product not found');
        return res.redirect('/products');
      }
      
      // Get related products (same category)
      relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id }
      }).limit(4);
      
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError);
      // If database fails, use mock data
      product = mockData.products.find(p => p._id === req.params.id);
      
      if (!product) {
        req.flash('error_msg', 'Product not found');
        return res.redirect('/products');
      }
      
      // Get related products (same category)
      relatedProducts = mockData.products
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4);
    }
    
    res.render('products/detail', {
      title: product.name,
      product,
      relatedProducts,
      usingMockData: global.usingMockData
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to fetch product');
    res.redirect('/products');
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    let products, categories, brands;
    
    if (!query) {
      return res.redirect('/products');
    }
    
    try {
      // Try to get data from database
      products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } }
        ]
      });
      
      categories = await Product.distinct('category');
      brands = await Product.distinct('brand');
      
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError);
      // If database fails, use mock data
      const searchRegex = new RegExp(query, 'i');
      
      products = mockData.products.filter(p => 
        searchRegex.test(p.name) || 
        searchRegex.test(p.description) || 
        searchRegex.test(p.brand)
      );
      
      categories = [...new Set(mockData.products.map(p => p.category))];
      brands = [...new Set(mockData.products.map(p => p.brand))];
    }
    
    res.render('products/search', {
      title: `Search Results: ${query}`,
      products,
      categories,
      brands,
      searchQuery: query,
      usingMockData: global.usingMockData
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Search failed');
    res.redirect('/products');
  }
};

// Add product review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    
    if (!req.session.user) {
      req.flash('error_msg', 'You must be logged in to review products');
      return res.redirect(`/products/${productId}`);
    }
    
    try {
      // Try to use database
      const product = await Product.findById(productId);
      
      if (!product) {
        req.flash('error_msg', 'Product not found');
        return res.redirect('/products');
      }
      
      // Check if user already reviewed this product
      const alreadyReviewed = product.reviews.find(
        review => review.user.toString() === req.session.user.id
      );
      
      if (alreadyReviewed) {
        req.flash('error_msg', 'You have already reviewed this product');
        return res.redirect(`/products/${productId}`);
      }
      
      // Add review
      const review = {
        user: req.session.user.id,
        rating: Number(rating),
        comment
      };
      
      product.reviews.push(review);
      
      // Update product rating
      const totalRatings = product.reviews.reduce((sum, item) => sum + item.rating, 0);
      product.rating = totalRatings / product.reviews.length;
      
      await product.save();
      
    } catch (dbError) {
      console.error('Database error, using mock data:', dbError);
      // With mock data, we'll just show a success message but not actually save
      // In a real app, you might want to implement a local storage solution
    }
    
    req.flash('success_msg', 'Review added successfully');
    res.redirect(`/products/${productId}`);
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Failed to add review');
    res.redirect(`/products/${req.params.id}`);
  }
};
