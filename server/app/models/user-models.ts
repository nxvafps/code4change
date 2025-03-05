import pool from "../db";
import { User } from "../types/table-data-types";

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE github_username = $1",
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
    const result = await pool.query("SELECT * FROM users");
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
