const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {

  const authHeader =
    req.headers.authorization

  const token =
    authHeader &&
    authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. Login required.'
    })
  }

  try {

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = user

    next()

  } catch (error) {

    return res.status(403).json({
      message: 'Invalid or expired token.'
    })

  }

}

const requireAdmin = (req, res, next) => {

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Admin access required.'
    })
  }

  next()

}

module.exports = {
  authenticateToken,
  requireAdmin
}