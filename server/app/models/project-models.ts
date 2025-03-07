import pool from "../db";
import { Project } from "../types/table-data-types";

export const getProjectById = async (
  projectId: string
): Promise<Project | null> => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.description, p.github_repo_url, p.project_image_url, 
              u.github_username AS owner_name, p.status, p.created_at, p.updated_at
       FROM projects p
       LEFT JOIN users u ON p.owner_id = u.id
       WHERE p.id = $1`,
      [projectId]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching project by id:", error);
    throw error;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.description,
        p.github_repo_url,
        p.project_image_url,
        p.owner_id,
        p.status,
        p.created_at,
        p.updated_at,
        u.github_username AS owner_name
      FROM
        projects p
      JOIN
        users u ON p.owner_id = u.id
    `);

    return result.rows;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};
export const getIssuesByProjectId = async (projectId: number) => {
  try {
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
      [projectId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching issues by project id", error);
    throw error;
  }
};

export const getProjectSkills = async (project_id: number) => {
  try {
    const result = await pool.query(
      `SELECT skills.id, skills.name 
         FROM project_skills
         JOIN skills ON project_skills.skill_id = skills.id
         WHERE project_skills.project_id = $1`,
      [project_id]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching project skills:", error);
    throw error;
  }
};
export const postProject = async (
  name: string,
  description: string,
  github_repo_url: string,
  project_image_url: string | null,
  owner_id: number,
  status: string
): Promise<Project | null> => {
  try {
    const result = await pool.query(
      `INSERT INTO projects (name, description, github_repo_url, project_image_url, owner_id, status)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *;`,
      [name, description, github_repo_url, project_image_url, owner_id, status]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
