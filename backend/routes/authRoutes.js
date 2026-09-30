const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('../middleware/asyncHandler')

const router = express.Router()

function makeToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'change-this-secret',
    { expiresIn: '7d' }
  )
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role }
}

router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' })
  }
  if (await User.findOne({ email })) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) })
  res.status(201).json({ token: makeToken(user), user: publicUser(user) })
}))

router.post('/login', asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const passwordMatches = user && await bcrypt.compare(req.body.password || '', user.password)
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Email or password is incorrect.' })
  }
  res.json({ token: makeToken(user), user: publicUser(user) })
}))

module.exports = router
