const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Please sign in to continue.' })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'change-this-secret')
    next()
  } catch {
    res.status(401).json({ message: 'Your session has expired.' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' })
  next()
}

module.exports = { auth, adminOnly }
