const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  stock: { type: Number, default: 10, min: 0 },
  tag: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
