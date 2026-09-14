const jwt = require('jsonwebtoken');

function signToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '12h',
  });
}

module.exports = { signToken };
