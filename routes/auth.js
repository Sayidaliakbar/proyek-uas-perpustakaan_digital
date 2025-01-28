const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// POST /auth/login - Login pengguna
router.post('/login', login);

module.exports = router;
