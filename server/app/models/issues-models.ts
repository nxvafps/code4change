import pool from "../db";
import { Issue } from "../types/table-data-types";
export const getAllIssues = async (): Promise<Issue[]> => {
  const result = await pool.query(
    "SELECT * FROM issues ORDER BY created_at DESC"
  );
  return result.rows;
};

export const getIssueById = async (issueId: number): Promise<Issue[]> => {
  const result = await pool.query(
    `
      SELECT 
        i.id, 
        i.project_id, 
        i.title, 
        i.description, 
        i.status, 
        u1.github_username AS created_by_name, 
        u2.github_username AS assigned_to_name, 
        i.created_at, 
        i.updated_at
      FROM issues i
      LEFT JOIN users u1 ON i.created_by = u1.id
      LEFT JOIN users u2 ON i.assigned_to = u2.id
      WHERE i.id = $1
      `,
    [issueId]
  );

  return result.rows[0] || null;
};

export const postIssue = async (
  project_id: number,
  title: string,
  description: string,
  status: string,
  created_by: number,
  assigned_to?: number | null
) => {
  const result = await pool.query(
    `INSERT INTO issues (project_id, title, description, status, created_by, assigned_to)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [project_id, title, description, status, created_by, assigned_to || null]
  );
  return result.rows[0];
};
