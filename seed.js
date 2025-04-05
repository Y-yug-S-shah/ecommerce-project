const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample users data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true
  }
];

// Sample products data with real images
const products = [
  {
    name: 'iPhone 13 Pro',
    description: 'Apple iPhone 13 Pro with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion.',
    price: 119900,
    category: 'Smartphones',
    brand: 'Apple',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['A15 Bionic chip', 'Pro camera system', '120Hz ProMotion display', 'Ceramic Shield'],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A15 Bionic',
      'Storage': '128GB',
      'Camera': '12MP Triple camera',
      'Battery': '3095 mAh'
    },
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Samsung Galaxy S22 Ultra',
    description: 'Samsung Galaxy S22 Ultra with Snapdragon 8 Gen 1, 108MP camera, and Dynamic AMOLED 2X display.',
    price: 109999,
    category: 'Smartphones',
    brand: 'Samsung',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1644501635454-a6be27e1ddd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Snapdragon 8 Gen 1', '108MP camera', 'S Pen included', '5000 mAh battery'],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 1',
      'Storage': '256GB',
      'Camera': '108MP Quad camera',
      'Battery': '5000 mAh'
    },
    rating: 4.7,
    reviews: []
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Apple MacBook Pro 14" with M2 Pro chip, Liquid Retina XDR display, and up to 18 hours of battery life.',
    price: 199900,
    category: 'Laptops',
    brand: 'Apple',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['M2 Pro chip', 'Liquid Retina XDR display', '18 hours battery life', 'MagSafe charging'],
    specifications: {
      'Display': '14.2-inch Liquid Retina XDR',
      'Processor': 'M2 Pro',
      'Storage': '512GB SSD',
      'RAM': '16GB unified memory',
      'Battery': 'Up to 18 hours'
    },
    rating: 4.9,
    reviews: []
  },
  {
    name: 'Dell XPS 15',
    description: 'Dell XPS 15 with 12th Gen Intel Core processors, NVIDIA GeForce RTX graphics, and InfinityEdge display.',
    price: 149990,
    category: 'Laptops',
    brand: 'Dell',
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['12th Gen Intel Core i7', 'NVIDIA GeForce RTX 3050 Ti', 'InfinityEdge display', 'CNC aluminum chassis'],
    specifications: {
      'Display': '15.6-inch 4K OLED',
      'Processor': 'Intel Core i7-12700H',
      'Storage': '1TB SSD',
      'RAM': '16GB DDR5',
      'Battery': 'Up to 12 hours'
    },
    rating: 4.6,
    reviews: []
  },
  {
    name: 'iPad Air',
    description: 'Apple iPad Air with M1 chip, 10.9-inch Liquid Retina display, and all-day battery life.',
    price: 59900,
    category: 'Tablets',
    brand: 'Apple',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['M1 chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
    specifications: {
      'Display': '10.9-inch Liquid Retina',
      'Processor': 'Apple M1',
      'Storage': '64GB',
      'Battery': 'Up to 10 hours',
      'Camera': '12MP Wide camera'
    },
    rating: 4.7,
    reviews: []
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Sony WH-1000XM5 wireless noise-cancelling headphones with industry-leading noise cancellation.',
    price: 34990,
    category: 'Audio',
    brand: 'Sony',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Industry-leading noise cancellation', '30-hour battery life', 'Precise Voice Pickup technology', 'Multipoint connection'],
    specifications: {
      'Type': 'Over-ear',
      'Battery Life': 'Up to 30 hours',
      'Noise Cancellation': 'Yes',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g'
    },
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Canon EOS R6',
    description: 'Canon EOS R6 full-frame mirrorless camera with 4K video recording and in-body image stabilization.',
    price: 215990,
    category: 'Cameras',
    brand: 'Canon',
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['20.1MP full-frame CMOS sensor', '4K 60p video recording', 'In-body image stabilization', 'Dual Pixel CMOS AF II'],
    specifications: {
      'Sensor': '20.1MP full-frame CMOS',
      'Processor': 'DIGIC X',
      'ISO Range': '100-102400 (expandable to 204800)',
      'Autofocus': 'Dual Pixel CMOS AF II',
      'Video': '4K 60p, Full HD 120p'
    },
    rating: 4.9,
    reviews: []
  },
  {
    name: 'Samsung 55" QLED 4K Smart TV',
    description: 'Samsung 55" QLED 4K Smart TV with Quantum Processor 4K and Quantum HDR.',
    price: 79990,
    category: 'TVs',
    brand: 'Samsung',
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Quantum Processor 4K', 'Quantum HDR', 'Motion Xcelerator', 'Object Tracking Sound'],
    specifications: {
      'Display': '55-inch QLED 4K',
      'Resolution': '3840 x 2160',
      'HDR': 'Quantum HDR',
      'Smart TV': 'Tizen OS',
      'Connectivity': 'Wi-Fi, Bluetooth, HDMI, USB'
    },
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Nintendo Switch OLED Model with enhanced audio and 7-inch OLED screen.',
    price: 34999,
    category: 'Other',
    brand: 'Nintendo',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['7-inch OLED screen', 'Enhanced audio', 'Wired LAN port', '64GB internal storage'],
    specifications: {
      'Display': '7-inch OLED',
      'Storage': '64GB',
      'Battery Life': '4.5-9 hours',
      'Connectivity': 'Wi-Fi, Bluetooth, Wired LAN',
      'Weight': '420g (with Joy-Con)'
    },
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'Bose QuietComfort Earbuds II with personalized noise cancellation and high-fidelity audio.',
    price: 29900,
    category: 'Audio',
    brand: 'Bose',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['CustomTune sound calibration', 'Aware Mode with ActiveSense', 'Up to 6 hours battery life', 'Touch controls'],
    specifications: {
      'Type': 'True Wireless Earbuds',
      'Battery Life': 'Up to 6 hours (24 hours with case)',
      'Noise Cancellation': 'Yes, personalized',
      'Connectivity': 'Bluetooth 5.3',
      'Water Resistance': 'IPX4'
    },
    rating: 4.7,
    reviews: []
  }
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Create users
    const createdUsers = [];
    for (const user of users) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isAdmin: user.isAdmin
      });
      
      createdUsers.push(newUser);
      console.log(`Created user: ${user.name}`);
    }
    
    // Create products
    for (const product of products) {
      const newProduct = await Product.create(product);
      console.log(`Created product: ${product.name}`);
    }
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
