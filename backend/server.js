const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Product = require('./models/Product')
const seedProducts = require('./data/seedProducts')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Something went wrong. Please try again.' })
})

const port = process.env.PORT || 5000

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studio-store')
  if (await Product.countDocuments() === 0) {
    await Product.insertMany(seedProducts)
  }
  app.listen(port, () => console.log('Store API running on port ' + port))
}

startServer().catch(error => {
  console.error('Could not start the API:', error.message)
  process.exit(1)
})
