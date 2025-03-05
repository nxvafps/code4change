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
