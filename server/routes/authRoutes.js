const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Declaring which API will be called for logging in or registering
router.post('/register', register);
router.post('/login', login);

module.exports = router;