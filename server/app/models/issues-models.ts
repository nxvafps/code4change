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

export const postIssue = async (
  project_id: number,
  title: string,
  description: string,
  status: string,
  created_by: number,
  assigned_to?: number
) => {
  const result = await pool.query(
    `INSERT INTO issues (project_id, title, description, status, created_by, assigned_to)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [project_id, title, description, status, created_by, assigned_to || null]
  );
  return result.rows[0];
};
