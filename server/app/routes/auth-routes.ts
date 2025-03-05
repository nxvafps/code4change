import express from "express";
import passport from "../config/passport";

const router = express.Router();

// Auth routes
router.get("/github", (req, res, next) => {
  passport.authenticate("github", undefined)(req, res, next);
});

router.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", {
      failureRedirect: "http://localhost:3000/login",
    })(req, res, next);
  },
  (req, res) => {
    // Successful authentication
    res.redirect("http://localhost:3000/home");
  }
);

// Get current user
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send({ user: req.user });
  } else {
    res.status(401).send({ message: "Not authenticated" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ message: "Error during logout" });
    }
    res.status(200).send({ message: "Logged out successfully" });
  });
});

export default router;
