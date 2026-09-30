const express = require('express')
const Order = require('../models/Order')
const Product = require('../models/Product')
const { auth, adminOnly } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')

const router = express.Router()

router.post('/', auth, asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body
  if (!Array.isArray(items) || !items.length || !shippingAddress) {
    return res.status(400).json({ message: 'Add items and a shipping address.' })
  }

  const orderItems = []
  let total = 0
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return res.status(400).json({ message: 'Item quantity must be at least one.' })
    }
    const product = await Product.findById(item.product)
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: (product?.name || 'A product') + ' is out of stock.' })
    }
    orderItems.push({ product, quantity: item.quantity })
    total += product.price * item.quantity
  }

  for (const item of orderItems) {
    item.product.stock -= item.quantity
    await item.product.save()
  }

  const order = await Order.create({
    user: req.user.id,
    items: orderItems.map(({ product, quantity }) => ({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    })),
    shippingAddress,
    total,
  })
  res.status(201).json(order)
}))

router.get('/mine', auth, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(orders)
}))

router.get('/', auth, adminOnly, asyncHandler(async (_req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
  res.json(orders)
}))

router.patch('/:id/status', auth, adminOnly, asyncHandler(async (req, res) => {
  const allowed = ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: 'Invalid order status.' })
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!order) return res.status(404).json({ message: 'Order not found.' })
  res.json(order)
}))

module.exports = router
