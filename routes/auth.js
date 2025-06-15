const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// POST /auth/signup - Register a new user
router.post("/signup", signup);

// POST /auth/login - Login an existing user
router.post("/login", login);

module.exports = router;
