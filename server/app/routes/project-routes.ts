import express from "express";
import * as ProjectController from "../controllers/project-controllers";

const router = express.Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:project_id", ProjectController.getProjectById);
router.get("/:project_id/issues", ProjectController.getProjectIssues);
router.get("/:project_id/skills", ProjectController.getProjectSkills);
router.post("/", ProjectController.postProject);
router.delete("/:project_id", ProjectController.deleteProjectAndIssuesByID);

export default router;
