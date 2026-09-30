const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
  }],
  shippingAddress: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
