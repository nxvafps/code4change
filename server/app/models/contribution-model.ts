import pool from "../db";
import { Contribution } from "../types/table-data-types";

export const selectContribution = async (): Promise<Contribution[]> => {
  try {
    const result = await pool.query("SELECT * FROM contributions");
    return result.rows;
  } catch (error) {
    console.log("Error fetching all skills", error);
    throw error;
  }
};
