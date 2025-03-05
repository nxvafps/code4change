import express from "express";
import { getSkills } from "../controllers/skills-controller";

const router = express.Router();

router.get("/", getSkills);

export default router;
