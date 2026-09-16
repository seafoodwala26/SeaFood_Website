const User = require('../modules/user.model');
const { signToken } = require('../utils/token');
const { loginSchema } = require('../validations/auth.validation');

async function login(req, res) {
  const { email, password } = req.body;

  const isEnvAdmin =
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD &&
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;

  let user = await User.findOne({ email }).select('+password');

  if (isEnvAdmin) {
    if (!user) {
      user = await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
    } else if (!(await user.comparePassword(password)) || user.role !== 'admin') {
      user.name = process.env.ADMIN_NAME || 'Admin';
      user.password = process.env.ADMIN_PASSWORD;
      user.role = 'admin';
      await user.save();
    }
  }

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
  }

  const token = signToken({ id: user._id, role: user.role, email: user.email });

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 12 * 60 * 60 * 1000,
    path: '/',
  });

  res.json({ status: 'success', data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
}

function logout(req, res) {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  res.status(204).send();
}

function me(req, res) {
  res.json({ status: 'success', data: { user: req.user } });
}

async function seedAdmin(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ status: 'fail', message: 'Route not found' });
  }

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    return res.status(200).json({ status: 'success', message: 'Admin already exists' });
  }

  const admin = await User.create({
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  });

  res.status(201).json({ status: 'success', data: { id: admin._id, email: admin.email, role: admin.role } });
}

module.exports = { login, logout, me, seedAdmin, loginSchema };
