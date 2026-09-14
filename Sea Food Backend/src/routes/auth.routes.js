const express = require('express');
const { login, logout, me, seedAdmin } = require('../controllers/auth.controller');
const { validateBody } = require('../middlewares/validationMiddleware');
const { loginSchema } = require('../validations/auth.validation');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', protect, me);
router.post('/seed-admin', seedAdmin);

module.exports = router;
