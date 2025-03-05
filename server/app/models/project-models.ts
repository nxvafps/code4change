import pool from "../db";
import { Project } from "../types/table-data-types";

export const getProjectById = async (
  projectId: string
): Promise<Project | null> => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [
      projectId,
    ]);

    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching project by id:", error);
    throw error;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const result = await pool.query("SELECT * FROM projects");

    return result.rows;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

export const postProject = async (
  name: string,
  description: string,
  github_repo_url: string,
  project_image_url: string,
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
    console.log(owner_id);

    return result.rows[0];
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
