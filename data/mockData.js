// Mock data for when MongoDB is not available

// Mock products
exports.products = [
  {
    _id: '1',
    name: 'iPhone 13 Pro',
    description: 'Apple iPhone 13 Pro with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion.',
    price: 119900,
    category: 'Smartphones',
    brand: 'Apple',
    stock: 15,
    imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+13+Pro',
    features: ['A15 Bionic chip', 'Pro camera system', '120Hz ProMotion display', 'Ceramic Shield'],
    specifications: new Map([
      ['Display', '6.1-inch Super Retina XDR'],
      ['Processor', 'A15 Bionic'],
      ['Storage', '128GB'],
      ['Camera', '12MP Triple camera'],
      ['Battery', '3095 mAh']
    ]),
    rating: 4.8,
    reviews: [
      {
        user: { _id: '1', name: 'John Doe' },
        rating: 5,
        comment: 'Best iPhone ever! The camera is amazing.',
        date: new Date('2023-01-15')
      },
      {
        user: { _id: '2', name: 'Jane Smith' },
        rating: 4,
        comment: 'Great phone but a bit expensive.',
        date: new Date('2023-02-20')
      }
    ],
    createdAt: new Date('2022-12-01')
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S22 Ultra',
    description: 'Samsung Galaxy S22 Ultra with Snapdragon 8 Gen 1, 108MP camera, and Dynamic AMOLED 2X display.',
    price: 109999,
    category: 'Smartphones',
    brand: 'Samsung',
    stock: 10,
    imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+S22+Ultra',
    features: ['Snapdragon 8 Gen 1', '108MP camera', 'S Pen included', '5000 mAh battery'],
    specifications: new Map([
      ['Display', '6.8-inch Dynamic AMOLED 2X'],
      ['Processor', 'Snapdragon 8 Gen 1'],
      ['Storage', '256GB'],
      ['Camera', '108MP Quad camera'],
      ['Battery', '5000 mAh']
    ]),
    rating: 4.7,
    reviews: [
      {
        user: { _id: '3', name: 'Robert Johnson' },
        rating: 5,
        comment: 'The S Pen is a game changer!',
        date: new Date('2023-03-10')
      }
    ],
    createdAt: new Date('2023-01-15')
  },
  {
    _id: '3',
    name: 'MacBook Pro 14"',
    description: 'Apple MacBook Pro 14" with M2 Pro chip, Liquid Retina XDR display, and up to 18 hours of battery life.',
    price: 199900,
    category: 'Laptops',
    brand: 'Apple',
    stock: 8,
    imageUrl: 'https://via.placeholder.com/300x300?text=MacBook+Pro+14',
    features: ['M2 Pro chip', 'Liquid Retina XDR display', '18 hours battery life', 'MagSafe charging'],
    specifications: new Map([
      ['Display', '14.2-inch Liquid Retina XDR'],
      ['Processor', 'M2 Pro'],
      ['Storage', '512GB SSD'],
      ['RAM', '16GB unified memory'],
      ['Battery', 'Up to 18 hours']
    ]),
    rating: 4.9,
    reviews: [],
    createdAt: new Date('2023-02-01')
  },
  {
    _id: '4',
    name: 'Dell XPS 15',
    description: 'Dell XPS 15 with 12th Gen Intel Core processors, NVIDIA GeForce RTX graphics, and InfinityEdge display.',
    price: 149990,
    category: 'Laptops',
    brand: 'Dell',
    stock: 5,
    imageUrl: 'https://via.placeholder.com/300x300?text=Dell+XPS+15',
    features: ['12th Gen Intel Core i7', 'NVIDIA GeForce RTX 3050 Ti', 'InfinityEdge display', 'CNC aluminum chassis'],
    specifications: new Map([
      ['Display', '15.6-inch 4K OLED'],
      ['Processor', 'Intel Core i7-12700H'],
      ['Storage', '1TB SSD'],
      ['RAM', '16GB DDR5'],
      ['Battery', 'Up to 12 hours']
    ]),
    rating: 4.6,
    reviews: [],
    createdAt: new Date('2023-01-20')
  },
  {
    _id: '5',
    name: 'iPad Air',
    description: 'Apple iPad Air with M1 chip, 10.9-inch Liquid Retina display, and all-day battery life.',
    price: 59900,
    category: 'Tablets',
    brand: 'Apple',
    stock: 12,
    imageUrl: 'https://via.placeholder.com/300x300?text=iPad+Air',
    features: ['M1 chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
    specifications: new Map([
      ['Display', '10.9-inch Liquid Retina'],
      ['Processor', 'Apple M1'],
      ['Storage', '64GB'],
      ['Battery', 'Up to 10 hours'],
      ['Camera', '12MP Wide camera']
    ]),
    rating: 4.7,
    reviews: [],
    createdAt: new Date('2023-03-01')
  },
  {
    _id: '6',
    name: 'Sony WH-1000XM5',
    description: 'Sony WH-1000XM5 wireless noise-cancelling headphones with industry-leading noise cancellation.',
    price: 34990,
    category: 'Audio',
    brand: 'Sony',
    stock: 20,
    imageUrl: 'https://via.placeholder.com/300x300?text=Sony+WH-1000XM5',
    features: ['Industry-leading noise cancellation', '30-hour battery life', 'Precise Voice Pickup technology', 'Multipoint connection'],
    specifications: new Map([
      ['Type', 'Over-ear'],
      ['Battery Life', 'Up to 30 hours'],
      ['Noise Cancellation', 'Yes'],
      ['Connectivity', 'Bluetooth 5.2'],
      ['Weight', '250g']
    ]),
    rating: 4.8,
    reviews: [],
    createdAt: new Date('2023-02-15')
  },
  {
    _id: '7',
    name: 'Canon EOS R6',
    description: 'Canon EOS R6 full-frame mirrorless camera with 4K video recording and in-body image stabilization.',
    price: 215990,
    category: 'Cameras',
    brand: 'Canon',
    stock: 7,
    imageUrl: 'https://via.placeholder.com/300x300?text=Canon+EOS+R6',
    features: ['20.1MP full-frame CMOS sensor', '4K 60p video recording', 'In-body image stabilization', 'Dual Pixel CMOS AF II'],
    specifications: new Map([
      ['Sensor', '20.1MP full-frame CMOS'],
      ['Processor', 'DIGIC X'],
      ['ISO Range', '100-102400 (expandable to 204800)'],
      ['Autofocus', 'Dual Pixel CMOS AF II'],
      ['Video', '4K 60p, Full HD 120p']
    ]),
    rating: 4.9,
    reviews: [],
    createdAt: new Date('2023-01-10')
  },
  {
    _id: '8',
    name: 'Samsung 55" QLED 4K Smart TV',
    description: 'Samsung 55" QLED 4K Smart TV with Quantum Processor 4K and Quantum HDR.',
    price: 79990,
    category: 'TVs',
    brand: 'Samsung',
    stock: 9,
    imageUrl: 'https://via.placeholder.com/300x300?text=Samsung+QLED+TV',
    features: ['Quantum Processor 4K', 'Quantum HDR', 'Motion Xcelerator', 'Object Tracking Sound'],
    specifications: new Map([
      ['Display', '55-inch QLED 4K'],
      ['Resolution', '3840 x 2160'],
      ['HDR', 'Quantum HDR'],
      ['Smart TV', 'Tizen OS'],
      ['Connectivity', 'Wi-Fi, Bluetooth, HDMI, USB']
    ]),
    rating: 4.6,
    reviews: [],
    createdAt: new Date('2023-03-05')
  }
];

// Mock users
exports.users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$XJrS7mN.1/udBr4RI5l/3OmkMT5dUQQNFqSQy5Jw.qdLLLNQYsTZK', // password: password123
    isAdmin: false,
    createdAt: new Date('2023-01-01')
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$XJrS7mN.1/udBr4RI5l/3OmkMT5dUQQNFqSQy5Jw.qdLLLNQYsTZK', // password: password123
    isAdmin: false,
    createdAt: new Date('2023-01-05')
  },
  {
    _id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$XJrS7mN.1/udBr4RI5l/3OmkMT5dUQQNFqSQy5Jw.qdLLLNQYsTZK', // password: password123
    isAdmin: true,
    createdAt: new Date('2022-12-01')
  }
];

// Mock carts
exports.carts = [
  {
    _id: '1',
    user: '1',
    items: [
      {
        product: '1',
        quantity: 1,
        price: 119900
      }
    ],
    totalAmount: 119900,
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15')
  }
];

// Mock orders
exports.orders = [
  {
    _id: '1',
    user: '1',
    items: [
      {
        product: '1',
        name: 'iPhone 13 Pro',
        quantity: 1,
        price: 119900,
        imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+13+Pro'
      }
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    paymentResult: {
      id: 'pi_1234567890',
      status: 'COMPLETED',
      updateTime: '2023-03-16T10:00:00Z',
      email: 'john@example.com'
    },
    totalPrice: 119900,
    isPaid: true,
    paidAt: new Date('2023-03-16'),
    isDelivered: false,
    status: 'Processing',
    createdAt: new Date('2023-03-16')
  }
];
