const express = require('express')
const Product = require('../models/Product')
const { auth, adminOnly } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const filter = {}
  if (req.query.category && req.query.category !== 'All') filter.category = req.query.category
  if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' }

  const sort = req.query.sort === 'price-low'
    ? { price: 1 }
    : req.query.sort === 'price-high' ? { price: -1 } : { createdAt: -1 }

  res.json(await Product.find(filter).sort(sort))
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json(product)
}))

router.post('/', auth, adminOnly, asyncHandler(async (req, res) => {
  res.status(201).json(await Product.create(req.body))
}))

router.put('/:id', auth, adminOnly, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json(product)
}))

router.delete('/:id', auth, adminOnly, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json({ message: 'Product removed.' })
}))

module.exports = router
