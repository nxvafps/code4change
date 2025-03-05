const mockMiddleware = jest
  .fn()
  .mockImplementation((req: any, res: any, next: any) => {
    if (req.query.error) {
      return res.redirect("http://localhost:3000/login");
    }
    return res.redirect("http://localhost:3000/home");
  });

const mockAuthenticateImpl = jest.fn().mockReturnValue(mockMiddleware);

jest.mock("../app/config/passport", () => ({
  __esModule: true,
  default: {
    authenticate: mockAuthenticateImpl,
    initialize: jest.fn(() => (req: any, res: any, next: any) => next()),
    session: jest.fn(() => (req: any, res: any, next: any) => next()),
  },
}));

jest.mock("../app/db", () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "../app/config/passport";
import authRoutes from "../app/routes/auth-routes";

describe("Auth Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthenticateImpl.mockClear();

    app = express();
    app.use(express.json());

    app.use(
      session({
        secret: "test-secret",
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api/auth", authRoutes);
  });

  describe("GET /api/auth/github", () => {
    it("should call passport.authenticate with github strategy", async () => {
      await request(app).get("/api/auth/github").expect(302); // Expect a redirect response

      expect(mockAuthenticateImpl).toHaveBeenCalledWith("github", undefined);
    });
  });

  describe("GET /api/auth/github/callback", () => {
    it("should call passport.authenticate with github strategy and options", async () => {
      await request(app)
        .get("/api/auth/github/callback")
        .expect(302)
        .expect("Location", "http://localhost:3000/home");

      expect(mockAuthenticateImpl).toHaveBeenCalledWith("github", {
        failureRedirect: "http://localhost:3000/login",
      });
    });

    it("should redirect to login page on authentication failure", async () => {
      const response = await request(app)
        .get("/api/auth/github/callback")
        .query({ error: "access_denied" })
        .expect(302);

      expect(response.headers.location).toBe("http://localhost:3000/login");
    });
  });

  describe("GET /api/auth/user", () => {
    it("should return user data when authenticated", async () => {
      const mockUser = {
        id: 1,
        github_username: "testuser",
        email: "test@example.com",
        role: "developer",
      };

      const mockApp = express();
      mockApp.use(express.json());
      mockApp.use((req: any, res: Response, next: NextFunction) => {
        req.isAuthenticated = () => true;
        req.user = mockUser;
        next();
      });

      mockApp.use("/api/auth", authRoutes);

      const response = await request(mockApp)
        .get("/api/auth/user")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual({ user: mockUser });
    });

    it("should return 401 when not authenticated", async () => {
      const mockApp = express();
      mockApp.use(express.json());
      mockApp.use((req: any, res: Response, next: NextFunction) => {
        req.isAuthenticated = () => false;
        next();
      });

      mockApp.use("/api/auth", authRoutes);

      const response = await request(mockApp)
        .get("/api/auth/user")
        .expect("Content-Type", /json/)
        .expect(401);

      expect(response.body).toEqual({ message: "Not authenticated" });
    });
  });

  describe("GET /api/auth/logout", () => {
    it("should successfully logout user", async () => {
      const mockApp = express();
      mockApp.use(express.json());
      mockApp.use((req: any, res: Response, next: NextFunction) => {
        req.logout = (callback: (err?: Error) => void) => callback();
        next();
      });

      mockApp.use("/api/auth", authRoutes);

      const response = await request(mockApp)
        .get("/api/auth/logout")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual({ message: "Logged out successfully" });
    });

    it("should handle logout errors", async () => {
      const mockApp = express();
      mockApp.use(express.json());
      mockApp.use((req: any, res: Response, next: NextFunction) => {
        req.logout = (callback: (err?: Error) => void) =>
          callback(new Error("Logout error"));
        next();
      });

      mockApp.use("/api/auth", authRoutes);

      const response = await request(mockApp)
        .get("/api/auth/logout")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toEqual({ message: "Error during logout" });
    });
  });
});
