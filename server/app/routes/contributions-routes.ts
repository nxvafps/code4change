import express from "express";
import { getContributions } from "../controllers/contributions-controller";

const router = express.Router();

router.get("/", getContributions);

export default router;
