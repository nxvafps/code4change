import pool from "../db";
import { Project } from "../types/table-data-types";

export const getProjectById = async (
  projectId: string
): Promise<Project | null> => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.description, p.github_repo_url, p.project_image_url, 
              u.github_username AS owner_name, p.status, p.created_at, p.updated_at,
              (
                SELECT COALESCE(
                  array_agg(s.name),
                  ARRAY[]::text[]
                )
                  FROM skills s
                  JOIN project_skills ps ON s.id = ps.skill_id
                  WHERE ps.project_id = p.id
              ) as skills,
               (
                SELECT COALESCE(
                  array_agg(c.category_name),
                  ARRAY[]::text[]
                )
                  FROM categories c
                  JOIN project_categories pc ON c.id = pc.category_id
                  WHERE pc.project_id = p.id
              ) as categories
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
        u.github_username AS owner_name,
              (
                SELECT COALESCE(
                  array_agg(s.name),
                  ARRAY[]::text[]
                )
                  FROM skills s
                  JOIN project_skills ps ON s.id = ps.skill_id
                  WHERE ps.project_id = p.id
              ) as skills,
               (
                SELECT COALESCE(
                  array_agg(c.category_name),
                  ARRAY[]::text[]
                )
                  FROM categories c
                  JOIN project_categories pc ON c.id = pc.category_id
                  WHERE pc.project_id = p.id
              ) as categories
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
        WHERE i.project_id = $1
        `,
      [projectId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching issues by project id", error);
    throw error;
  }
};

export const getContributionsByProjectId = async (projectId: number) => {
  try {
    const result = await pool.query(
      `
          SELECT 
          c.id, 
          c.user_id, 
          c.project_id, 
          c.pull_request_url, 
          c.additions, 
          c.deletions, 
          c.total_changes, 
          c.status, 
          c.created_at,
          u.github_username
        FROM contributions c
        JOIN users u ON c.user_id = u.id
        WHERE c.project_id = $1
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
export const getProjectCategories = async (project_id: number) => {
  try {
    const result = await pool.query(
      `SELECT categories.id, categories.category_name 
         FROM project_categories
         JOIN categories ON project_categories.category_id = categories.id
         WHERE project_categories.project_id = $1`,
      [project_id]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching project categories:", error);
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

export const removeArticleAndIssuesByID = async (project_id: number) => {
  const client = await pool.connect();
  try {
    const ownerResult = await client.query(
      `SELECT owner_id FROM projects WHERE id = $1`,
      [project_id]
    );

    if (ownerResult.rowCount === 0) {
      throw new Error("Project not found");
    }

    const owner_id = ownerResult.rows[0].owner_id;

    await client.query("BEGIN");

    await client.query(`DELETE FROM issues WHERE project_id = $1`, [
      project_id,
    ]);
    await client.query(`DELETE FROM projects WHERE id = $1`, [project_id]);

    const projectCountResult = await client.query(
      `SELECT COUNT(*) FROM projects WHERE owner_id = $1`,
      [owner_id]
    );

    const projectCount = parseInt(projectCountResult.rows[0].count);
    const role = projectCount > 0 ? "maintainer" : "developer";

    await client.query(`UPDATE users SET role = $1 WHERE id = $2`, [
      role,
      owner_id,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const addProjectSkills = async (
  project_id: number,
  skill_ids: number[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO project_skills (project_id, skill_id)
      VALUES ($1, $2)
      ON CONFLICT (project_id, skill_id) DO NOTHING
    `;

    for (const skill_id of skill_ids) {
      await client.query(insertQuery, [project_id, skill_id]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting project skills:", error);
    throw error;
  } finally {
    client.release();
  }
};
export const addProjectCategories = async (
  project_id: number,
  category_ids: number[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO project_categories (project_id, category_id)
      VALUES ($1, $2)
      ON CONFLICT (project_id, category_id) DO NOTHING
    `;

    for (const category_id of category_ids) {
      await client.query(insertQuery, [project_id, category_id]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting project categories:", error);
    throw error;
  } finally {
    client.release();
  }
};
