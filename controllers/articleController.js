const Article = require("../models/Article");

// @desc    Create a new article
exports.createArticle = async (req, res, next) => {
  try {
    const { title, description, body, tags } = req.body;

    if (!title || !description || !body) {
      return res
        .status(400)
        .json({ message: "Title, description, and body are required" });
    }

    const article = await Article.create({
      title,
      description,
      body,
      tags,
      author: req.user?._id || "000000000000000000000000", // valid dummy ObjectId
    });

    res.status(201).json({ article });
  } catch (err) {
    next(err);
  }
};

// ✅ Add these two handlers for the GET routes

// @desc    Get all published articles (paginated)
exports.getPublishedArticles = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [articles, totalArticles] = await Promise.all([
      Article.find({ state: "published" })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }), // optional: newest first

      Article.countDocuments({ state: "published" }),
    ]);

    const totalPages = Math.ceil(totalArticles / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalArticles,
      articles,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single article by ID
exports.getSingleArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
};
