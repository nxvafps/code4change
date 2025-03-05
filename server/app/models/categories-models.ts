import pool from "../db";
import { Category } from "../types/table-data-types";

export const selectCategories = async (): Promise<Category[]> => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return result.rows;
  } catch (error) {
    console.log("Error fetching all categories", error);
    throw error;
  }
};
