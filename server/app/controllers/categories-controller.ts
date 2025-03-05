import { Request, Response } from "express";
import { selectCategories } from "../models/categories-models";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await selectCategories();
    res.status(200).json({ categories });
  } catch (error) {}
};
