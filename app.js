// app.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API! 🚀");
});

// Error handler
app.use(errorHandler);

module.exports = app;
