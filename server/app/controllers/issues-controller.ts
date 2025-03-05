import { Request, Response } from "express";
import * as IssueModel from "../models/issues-models";
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const issues = await IssueModel.getAllIssues();
    res.status(200).json({ issues });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  const { issue_id } = req.params;
  if (isNaN(Number(issue_id))) {
    res.status(400).json({ message: "Invalid issue ID" });
    return;
  }
  try {
    const issue = await IssueModel.getIssueById(parseInt(issue_id));

    if (!issue) {
      res.status(404).json({ message: "Issue not found" });
      return;
    }
    res.status(200).json({ issue });
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
