const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a payment intent with Stripe
 * @param {Number} amount - Amount in cents
 * @param {String} currency - Currency code (default: 'inr')
 * @param {Object} metadata - Additional metadata for the payment
 * @returns {Promise} - Stripe payment intent object
 */
exports.createPaymentIntent = async (amount, currency = 'inr', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      payment_method_types: ['card'],
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Payment processing failed');
  }
};

/**
 * Retrieve a payment intent by ID
 * @param {String} paymentIntentId - Stripe payment intent ID
 * @returns {Promise} - Stripe payment intent object
 */
exports.retrievePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw new Error('Failed to retrieve payment information');
  }
};

/**
 * Confirm a payment intent
 * @param {String} paymentIntentId - Stripe payment intent ID
 * @param {String} paymentMethodId - Stripe payment method ID
 * @returns {Promise} - Stripe payment intent object
 */
exports.confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    throw new Error('Payment confirmation failed');
  }
};

/**
 * Create a refund for a payment intent
 * @param {String} paymentIntentId - Stripe payment intent ID
 * @param {Number} amount - Amount to refund in cents (optional)
 * @returns {Promise} - Stripe refund object
 */
exports.createRefund = async (paymentIntentId, amount = null) => {
  try {
    const refundParams = {
      payment_intent: paymentIntentId,
    };
    
    if (amount) {
      refundParams.amount = amount;
    }
    
    const refund = await stripe.refunds.create(refundParams);
    return refund;
  } catch (error) {
    console.error('Error creating refund:', error);
    throw new Error('Refund processing failed');
  }
};

/**
 * Format amount for Stripe (convert to cents)
 * @param {Number} amount - Amount in whole currency units
 * @returns {Number} - Amount in cents
 */
exports.formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

/**
 * Format amount from Stripe (convert from cents to whole currency units)
 * @param {Number} amount - Amount in cents
 * @returns {Number} - Amount in whole currency units
 */
exports.formatAmountFromStripe = (amount) => {
  return amount / 100;
};
