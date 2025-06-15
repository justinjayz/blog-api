const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

beforeAll(async () => {
  const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error("❌ DB connection failed in test:", err.message);
  }
}, 30000); // 30-second timeout just in case

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase(); // optional clean up
  }
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "testpass123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "testuser@example.com");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "testpass123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("Login successful");
  });
});
