import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/passport";
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";

import projectRouter from "./routes/project-routes";
import categoriesRoutes from "./routes/categories-routes";
import skillsRoutes from "./routes/skills-routes";


const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/health", (req, res) => {
  res.status(200).send({ status: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/projects", projectRouter);
app.use("/api/categories", categoriesRoutes);
app.use("/api/skills", skillsRoutes);

// 404 route
app.all("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

export default app;
