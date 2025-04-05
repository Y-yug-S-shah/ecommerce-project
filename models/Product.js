const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Smartphones', 'Laptops', 'Tablets', 'Cameras', 'Accessories', 'Audio', 'TVs', 'Wearables', 'Other']
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  features: [String],
  specifications: {
    type: Map,
    of: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
