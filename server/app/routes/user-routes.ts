import express from "express";
import * as UserController from "../controllers/user-controllers";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:username/profile", UserController.getUserProfile);
router.get("/:username/projects", UserController.getUserProjects);
router.get(
  "/:username/projects/:project_id",
  UserController.getUserProjectById
);
router.get(
  "/:username/projects/:project_id/contributions",
  UserController.getUserProjectContributions
);
router.get("/:username/contributions", UserController.getUserContributions);
router.get("/:username", UserController.getUserByUsername);

export default router;
