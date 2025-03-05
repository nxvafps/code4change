import pool from "../db";
import { Issue } from "../types/table-data-types";
export const getAllIssues = async (): Promise<Issue[]> => {
  const result = await pool.query(
    "SELECT * FROM issues ORDER BY created_at DESC"
  );
  return result.rows;
};

export const getIssueById = async (issueId: number): Promise<Issue[]> => {
  const result = await pool.query("SELECT * FROM issues WHERE id = $1", [
    issueId,
  ]);
  return result.rows[0] || null;
};
