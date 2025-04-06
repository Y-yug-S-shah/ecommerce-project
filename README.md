# ElectroShop - Electronics E-commerce Website

ElectroShop is a full-featured e-commerce platform for electronics products built with Node.js, Express, MongoDB, and EJS templating.

## Features

- **User Authentication**: Register, login, and user profile management
- **Product Management**: Browse, search, filter, and sort products
- **Shopping Cart**: Add, update, remove items, and checkout
- **Order Management**: Place orders and track order history
- **Payment Processing**: Secure payments via Stripe integration
- **Stock Management**: Automatic stock reduction after successful purchases
- **Responsive Design**: Mobile-friendly interface
- **Long-term Sessions**: User sessions persist for 30 days

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templates, CSS, JavaScript
- **Authentication**: bcryptjs, express-session with MongoDB store
- **Payment**: Stripe API for secure payment processing
- **File Upload**: Multer

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ecommm
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/electronics-ecommerce
   SESSION_SECRET=your_session_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the application:
   ```
   npm start
   ```

5. For development with auto-restart:
   ```
   npm run dev
   ```

6. Seed the database with sample products (optional):
   ```
   npm run seed
   ```

## Project Structure

```
ecommm/
├── controllers/       # Route controllers
├── models/           # Database models
├── public/           # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── uploads/      # Product images
├── routes/           # Express routes
├── services/         # Service modules (payment, etc.)
├── views/            # EJS templates
│   ├── admin/        # Admin pages
│   ├── auth/         # Authentication pages
│   ├── cart/         # Cart pages
│   ├── orders/       # Order pages
│   ├── products/     # Product pages
│   └── partials/     # Reusable template parts
├── app.js            # Main application file
├── package.json
└── README.md
```

## Usage

### Customer Features

- **Browse Products**: View all products or filter by category, brand, price
- **Search**: Search for products by name, description, or brand
- **Product Details**: View detailed information, specifications, and reviews
- **Shopping Cart**: Add products to cart, update quantities, remove items
- **Checkout**: Enter shipping details and complete payment via Stripe
- **Order History**: View past orders and their status
- **Persistent Sessions**: Stay logged in for 30 days

### Admin Features

- **Dashboard**: Overview of products, orders, and users
- **Product Management**: Add, edit, and delete products
- **Order Management**: View all orders and update their status
- **Low Stock Alerts**: See products with low inventory

## Payment Integration

ElectroShop uses Stripe for secure payment processing:

1. **Test Mode**: The integration is set up in test mode by default
2. **Credit Card Processing**: Securely process credit card payments
3. **Payment Verification**: Verify payment status before order confirmation
4. **Stock Management**: Automatically reduce stock levels after successful payment

To test payments, use Stripe's test card numbers:
- Card number: 4242 4242 4242 4242
- Expiration date: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## Admin Access

To access the admin panel, you need an admin account. By default, you can create a regular user account and then manually update the `isAdmin` field to `true` in the MongoDB database.

Admin panel is accessible at: `/admin/dashboard`

## Database Setup

The application uses MongoDB as its database. You can use a local MongoDB instance or a cloud-based solution like MongoDB Atlas.

For local development:
1. Install MongoDB on your machine
2. Start the MongoDB service
3. The application will automatically create the required collections

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Stripe](https://stripe.com/)
