const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
  }
}

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'fail', message: 'Access denied' });
    }

    next();
  };
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ status: 'fail', message: 'Admin access only' });
  }

  next();
}

module.exports = { protect, restrictTo, adminOnly };
