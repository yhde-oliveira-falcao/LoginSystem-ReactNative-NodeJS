require('dotenv').config()
const express = require('express');
const controllers = require('../controllers/auth.controller.js');
const app = express();
const router = express.Router();

app.use(express.json());

// endpoint for login method
router.post('/login', controllers.login);

// Endpoint for register new account
router.post('/register', controllers.register);

// Endpoint for verifying when user enters any private screen
router.get('/private', controllers.private);

module.exports = router;