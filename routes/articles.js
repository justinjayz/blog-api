const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Public routes
router.get("/", articleController.getPublishedArticles); // GET /api/articles
router.get("/:id", articleController.getSingleArticle); // GET /api/articles/:id

// Test route (create article)
router.post("/", articleController.createArticle); // POST /api/articles

module.exports = router;
