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
router.post("/:username/categories", UserController.postUserCategories);
router.post("/:username/skills", UserController.postUserSkills);
router.delete("/:username", UserController.removeUserByUsername);

router.patch("/:username/categories", UserController.patchUserCategories);
export default router;
