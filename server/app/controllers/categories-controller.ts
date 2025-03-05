import { Request, Response } from "express";
import { selectCategories } from "../models/categories-models";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await selectCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error in getCategories controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
