import express from "express";
import * as IssueController from "../controllers/issues-controller";

const router = express.Router();
router.get("/", IssueController.getAllIssues);
export default router;
