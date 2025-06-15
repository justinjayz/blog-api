// tests/articles.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Article = require("../models/Article");
require("dotenv").config();

let token;

beforeAll(async () => {
  const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
  await mongoose.connect(uri);

  // Create a test user and get token
  const user = await User.create({
    first_name: "Article",
    last_name: "Tester",
    email: "articletest@example.com",
    password: "testpass123",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "articletest@example.com",
    password: "testpass123",
  });

  token = loginRes.body.token;
}, 20000);

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Article Routes", () => {
  test("should create a new article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Article",
        description: "A brief test article",
        body: "This is the full content of the test article.",
        tags: ["test", "article"],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("article");
    expect(res.body.article).toHaveProperty("title", "Test Article");
  });
});
