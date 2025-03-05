import express from "express";
import * as IssueController from "../controllers/issues-controller";

const router = express.Router();
router.get("/", IssueController.getAllIssues);
router.get("/:issue_id", IssueController.getIssueById);
router.post("/", IssueController.postIssue);
export default router;
