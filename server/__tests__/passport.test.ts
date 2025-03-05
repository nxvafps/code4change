import passport from "../app/config/passport";
import { Profile } from "passport-github2";
import pool from "../app/db";

process.env.GITHUB_CLIENT_ID = "mock-client-id";
process.env.GITHUB_CLIENT_SECRET = "mock-client-secret";
process.env.GITHUB_CALLBACK_URL =
  "http://localhost:3001/api/auth/github/callback";

jest.mock("../app/db", () => ({
  query: jest.fn().mockResolvedValue({ rows: [] }),
}));

jest.mock("passport-github2", () => {
  class MockGitHubStrategy {
    name = "github";
    _verify: any;

    constructor(options: any, verify: any) {
      this._verify = verify;
    }
  }
  return { Strategy: MockGitHubStrategy };
});

describe("Passport Configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("serializeUser", () => {
    it("should serialize user to just the ID", () => {
      const user = { id: 123, github_username: "testuser" };
      const done = jest.fn();

      // @ts-ignore
      passport._serializers[0](user, done);

      expect(done).toHaveBeenCalledWith(null, 123);
    });
  });

  describe("deserializeUser", () => {
    it("should fetch user from database by ID", async () => {
      const mockUser = { id: 123, github_username: "testuser" };
      const done = jest.fn();

      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [mockUser],
      });

      // @ts-ignore
      await passport._deserializers[0](123, done);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        [123]
      );
      expect(done).toHaveBeenCalledWith(null, mockUser);
    });

    it("should return false if user not found", async () => {
      const done = jest.fn();

      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [],
      });

      // @ts-ignore
      await passport._deserializers[0](123, done);

      expect(done).toHaveBeenCalledWith(null, false);
    });

    it("should handle database errors", async () => {
      const done = jest.fn();
      const error = new Error("Database error");

      (pool.query as jest.Mock).mockRejectedValueOnce(error);

      // @ts-ignore
      await passport._deserializers[0](123, done);

      expect(done).toHaveBeenCalledWith(error, false);
    });
  });

  describe("GitHub Strategy", () => {
    const mockProfile: Partial<Profile> = {
      id: "12345",
      username: "testuser",
      emails: [{ value: "test@example.com" }],
      photos: [{ value: "https://example.com/photo.jpg" }],
    };

    it("should create new user if one does not exist", async () => {
      const done = jest.fn();
      const accessToken = "mock-access-token";
      const refreshToken = "mock-refresh-token";

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              github_id: mockProfile.id,
              github_username: mockProfile.username,
            },
          ],
        });

      // @ts-ignore
      const verifyFn = passport._strategies.github._verify;
      await verifyFn(accessToken, refreshToken, mockProfile, done);

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query).toHaveBeenNthCalledWith(
        1,
        "SELECT * FROM users WHERE github_id = $1",
        [mockProfile.id]
      );
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/INSERT INTO users/),
        expect.arrayContaining([
          mockProfile.id,
          mockProfile.username,
          mockProfile.emails?.[0].value,
          mockProfile.photos?.[0].value,
          "developer",
          0,
          accessToken,
          refreshToken,
        ])
      );

      expect(done).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          id: 1,
          github_id: mockProfile.id,
          github_username: mockProfile.username,
        })
      );
    });

    it("should update existing user access token", async () => {
      const done = jest.fn();
      const accessToken = "new-access-token";
      const refreshToken = "new-refresh-token";
      const existingUser = {
        id: 1,
        github_id: mockProfile.id,
        github_username: mockProfile.username,
      };

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [existingUser] })
        .mockResolvedValueOnce({ rows: [existingUser] });

      // @ts-ignore
      const verifyFn = passport._strategies.github._verify;
      await verifyFn(accessToken, refreshToken, mockProfile, done);

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/UPDATE users SET access_token/),
        expect.arrayContaining([accessToken, refreshToken, existingUser.id])
      );
      expect(done).toHaveBeenCalledWith(null, existingUser);
    });

    it("should handle missing email from GitHub", async () => {
      const done = jest.fn();
      const profileWithoutEmail: Partial<Profile> = {
        id: "12345",
        username: "testuser",
        emails: undefined,
      };

      // @ts-ignore
      const verifyFn = passport._strategies.github._verify;
      await verifyFn("token", "refresh", profileWithoutEmail, done);

      expect(done).toHaveBeenCalledWith(expect.any(Error), false);
      expect(done.mock.calls[0][0].message).toBe(
        "Unable to get email from GitHub"
      );
    });

    it("should handle database errors when creating new user", async () => {
      const done = jest.fn();
      const error = new Error("Database error");

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] })
        .mockRejectedValueOnce(error);

      // @ts-ignore
      const verifyFn = passport._strategies.github._verify;
      await verifyFn("token", "refresh", mockProfile, done);

      expect(done).toHaveBeenCalledWith(error, false);
    });

    it("should handle database errors when updating tokens", async () => {
      const done = jest.fn();
      const error = new Error("Database error");
      const existingUser = {
        id: 1,
        github_id: mockProfile.id,
        github_username: mockProfile.username,
      };

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [existingUser] })
        .mockRejectedValueOnce(error);

      // @ts-ignore
      const verifyFn = passport._strategies.github._verify;
      await verifyFn("token", "refresh", mockProfile, done);

      expect(done).toHaveBeenCalledWith(error, false);
    });
  });
});
