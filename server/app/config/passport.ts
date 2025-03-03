import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { VerifyCallback } from "passport-oauth2";
import pool from "../db";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0] || false);
  } catch (err) {
    done(err, false);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string | undefined,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        // Check if user already exists
        const existingUserResult = await pool.query(
          "SELECT * FROM users WHERE github_id = $1",
          [profile.id]
        );

        if (existingUserResult.rows.length > 0) {
          // Update access token for existing user
          const user = existingUserResult.rows[0];
          await pool.query(
            "UPDATE users SET access_token = $1, refresh_token = $2 WHERE id = $3 RETURNING *",
            [accessToken, refreshToken || null, user.id]
          );
          return done(null, user);
        }

        // Create new user
        const email = profile.emails && profile.emails[0].value;
        if (!email) {
          return done(new Error("Unable to get email from GitHub"), false);
        }

        const newUser = await pool.query(
          `INSERT INTO users 
           (github_id, github_username, email, profile_picture, role, xp, access_token, refresh_token) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
           RETURNING *`,
          [
            profile.id,
            profile.username,
            email,
            profile.photos?.[0]?.value || null,
            "developer", // Default role
            0, // Starting XP
            accessToken,
            refreshToken || null,
          ]
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
