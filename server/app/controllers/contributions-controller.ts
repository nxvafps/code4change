import { Request, Response } from "express";
import { selectContribution } from "../models/contribution-model";

export const getContributions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contributions = await selectContribution();
    res.status(200).json({ contributions });
  } catch (error) {
    console.error("Error in getContributions controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
