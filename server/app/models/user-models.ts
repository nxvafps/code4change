import pool from "../db";
import { User, Project, Contribution } from "../types/table-data-types";

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const result = await pool.query(
      `SELECT id, github_id, github_username, email, profile_picture, 
              role, xp, created_at, updated_at 
       FROM users 
       WHERE github_username = $1`,
      [username]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await pool.query(`
      SELECT id, github_id, github_username, email, profile_picture, 
             role, xp, created_at, updated_at
      FROM users
    `);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserWithSkillsAndCategories = async (
  username: string
): Promise<User | null> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await client.query(
        "SELECT * FROM users WHERE github_username = $1",
        [username]
      );

      if (userResult.rows.length === 0) return null;
      const user = userResult.rows[0];

      const skillsResult = await client.query(
        `
        SELECT s.name
        FROM skills s
        JOIN user_skills us ON s.id = us.skill_id
        WHERE us.user_id = $1
      `,
        [user.id]
      );

      const categoriesResult = await client.query(
        `
        SELECT c.category_name
        FROM categories c
        JOIN user_categories uc ON c.id = uc.category_id
        WHERE uc.user_id = $1
      `,
        [user.id]
      );

      const levelResult = await client.query(
        `
        SELECT l.*
        FROM levels l
        JOIN user_levels ul ON l.id = ul.level_id
        WHERE ul.user_id = $1
      `,
        [user.id]
      );

      const contributionsResult = await client.query(
        `
        SELECT c.*, p.name as project_name
        FROM contributions c
        JOIN projects p ON c.project_id = p.id
        WHERE c.user_id = $1
      `,
        [user.id]
      );

      return {
        ...user,
        skills: skillsResult.rows.map((row) => row.name),
        categories: categoriesResult.rows.map((row) => row.category_name),
        level: levelResult.rows[0] || null,
        contributions: contributionsResult.rows || [],
      };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching user with related data:", error);
    throw error;
  }
};

export const getUserProjects = async (
  username: string
): Promise<Project[] | null> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await client.query(
        "SELECT id FROM users WHERE github_username = $1",
        [username]
      );

      if (userResult.rows.length === 0) return null;
      const user_id = userResult.rows[0].id;

      const projectsResult = await client.query(
        `SELECT p.*, u.github_username as owner_username,
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
        JOIN users u ON p.owner_id = u.id
        WHERE p.owner_id = $1`,
        [user_id]
      );
      return projectsResult.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

export const getUserProjectById = async (
  username: string,
  project_id: number
): Promise<Project | null | false> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await client.query(
        "SELECT id FROM users WHERE github_username = $1",
        [username]
      );

      if (userResult.rows.length === 0) return null;
      const user_id = userResult.rows[0].id;

      const projectResult = await client.query(
        `SELECT p.*, u.github_username as owner_username,
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
        JOIN users u ON p.owner_id = u.id
        WHERE p.owner_id = $1 AND p.id = $2`,
        [user_id, project_id]
      );

      if (projectResult.rows.length === 0) return false;

      return projectResult.rows[0];
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching user project by ID:", error);
    throw error;
  }
};

export const getUserProjectContributions = async (
  username: string,
  project_id: number
): Promise<Contribution[] | null | false> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await client.query(
        "SELECT id FROM users WHERE github_username = $1",
        [username]
      );

      if (userResult.rows.length === 0) return null;
      const user_id = userResult.rows[0].id;

      const projectResult = await client.query(
        "SELECT id FROM projects WHERE id = $1 AND owner_id = $2",
        [project_id, user_id]
      );

      if (projectResult.rows.length === 0) return false;

      const contributionsResult = await client.query(
        `SELECT c.*, u.github_username as user_github_username
         FROM contributions c
         JOIN users u ON c.user_id = u.id
         WHERE c.project_id = $1
         ORDER BY c.created_at DESC`,
        [project_id]
      );

      return contributionsResult.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching project contributions:", error);
    throw error;
  }
};

export const getUserContributions = async (
  username: string
): Promise<Contribution[] | null> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await pool.query(
        "SELECT id FROM users WHERE github_username = $1",
        [username]
      );

      if (userResult.rows.length === 0) return null;
      const user_id = userResult.rows[0].id;

      const contributionResult = await client.query(
        `SELECT c.*, p.name as project_name, u.github_username as user_github_username
        FROM contributions c
        JOIN projects p ON c.project_id = p.id
        JOIN users u ON c.user_id = u.id
        WHERE c.user_id = $1
        ORDER BY c.created_at DESC`,
        [user_id]
      );
      return contributionResult.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching user contributions", error);
    throw error;
  }
};

export const addUserCategories = async (
  username: string,
  categoryNames: string[]
): Promise<string[] | null | false> => {
  try {
    const client = await pool.connect();
    try {
      const userResult = await client.query(
        `SELECT id FROM users WHERE github_username = $1`,
        [username]
      );
      if (userResult.rows.length === 0) return null;
      const user_id = userResult.rows[0].id;

      const validCategories = await Promise.all(
        categoryNames.map(async (categoryName) => {
          const categoryCheck = await client.query(
            `SELECT id FROM categories WHERE  category_name = $1`,
            [categoryName]
          );
          return categoryCheck.rows.length > 0;
        })
      );

      if (validCategories.some((valid) => !valid)) {
        return false;
      }
      await Promise.all(
        categoryNames.map(async (categoryName) => {
          await client.query(
            `INSERT INTO user_categories (user_id, category_id) 
  SELECT $1, id FROM categories WHERE category_name = $2
  ON CONFLICT (user_id, category_id) DO NOTHING`,
            [user_id, categoryName]
          );
        })
      );
      const categoryResults = await client.query(
        `SELECT c.category_name
FROM categories c
JOIN user_categories uc ON c.id = uc.category_id
WHERE uc.user_id=$1`,
        [user_id]
      );
      return categoryResults.rows.map((row) => row.category_name);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("err adding user categories", err);
    throw err;
  }
};
