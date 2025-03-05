import request from "supertest";
import app from "../app/app";
import pool from "../app/db";
import runSeed from "../app/db/seeds/run-seed";

describe("User Routes - End to End Tests", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests should only run in test environment");
    }

    await runSeed();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveProperty("users");
      expect(Array.isArray(response.body.users)).toBe(true);

      expect(response.body.users.length).toBeGreaterThan(0);

      const user = response.body.users[0];
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("github_username");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("profile_picture");
      expect(user).toHaveProperty("role");
      expect(user).toHaveProperty("xp");
    });
  });

  describe("GET /api/users/:username", () => {
    it("should return a user when valid username is provided", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const response = await request(app)
        .get(`/api/users/${testUser}`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user.github_username).toBe(testUser);
      expect(response.body.user).toHaveProperty("email");
      expect(response.body.user).toHaveProperty("profile_picture");
      expect(response.body.user).toHaveProperty("role");
      expect(response.body.user).toHaveProperty("xp");
    });

    it("should return 404 when username is not found", async () => {
      const nonExistentUser = "this_user_definitely_doesnt_exist_" + Date.now();

      const response = await request(app)
        .get(`/api/users/${nonExistentUser}`)
        .expect(404);

      expect(response.body).toHaveProperty("message", "User not found");
    });
  });

  describe("GET /api/users/:username/profile", () => {
    it("should return user profile with skills and categories", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const response = await request(app)
        .get(`/api/users/${testUser}/profile`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user.github_username).toBe(testUser);

      expect(response.body.user).toHaveProperty("skills");
      expect(Array.isArray(response.body.user.skills)).toBe(true);

      expect(response.body.user).toHaveProperty("categories");
      expect(Array.isArray(response.body.user.categories)).toBe(true);

      expect(response.body.user).toHaveProperty("level");
      expect(response.body.user).toHaveProperty("contributions");
      expect(Array.isArray(response.body.user.contributions)).toBe(true);
    });

    it("should return 404 when profile is not found", async () => {
      const nonExistentUser = "this_user_definitely_doesnt_exist_" + Date.now();

      const response = await request(app)
        .get(`/api/users/${nonExistentUser}/profile`)
        .expect(404);

      expect(response.body).toHaveProperty("message", "User not found");
    });
  });
});
describe("Project Routes - End to End Tests", () => {});
describe("Issues Routes - End to End Tests", () => {});
describe("Contributions Routes - End to End Tests", () => {});
describe("Skills Routes - End to End Tests", () => {});

describe.only("Categories Routes - End to End Tests", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests should only run in test environment");
    }

    await runSeed();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("GET /api/categories", () => {
    it("should return an array of all category objects", async () => {
      const response = await request(app).get("/api/categories").expect(200);
      expect(response.body).toHaveProperty("categories");
      expect(Array.isArray(response.body.categories)).toBe(true);
      expect(response.body.categories.length).toBe(8);
    });
    it("should return an error if a non-exsistent path is requested", async () => {
      const response = await request(app).get("/api/categoriez").expect(404);
      expect(response.body.message).toBe("Route not found");
    });
  });
});

describe("Leaderboard Routes - End to End Tests", () => {});
