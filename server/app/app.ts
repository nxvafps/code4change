import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/passport";
import cors from "cors";
import authRoutes from "./routes/auth-routes";

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

// health check route
app.get("/api/health", (req, res) => {
  res.status(200).send({ status: "Server is running" });
});

// auth routes
app.use("/api/auth", authRoutes);

// API routes will go here

// 404 route
app.all("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

export default app;
