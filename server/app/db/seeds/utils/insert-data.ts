//insert functons for adding data in the seed function here
import pool from "../../index";
import users from "../../data/test-data/users";
import {
  User,
  Skill,
  Category,
  Level,
  ProjectRelation,
} from "../../../types/table-data-types";
import skills from "../../data/test-data/skills";
import categories from "../../data/test-data/categories";
import levels from "../../data/test-data/levels";
import projectsRelations from "../../data/test-data/projects";

export const insertUsers = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      users.map(async (user: User) => {
        const usersTable = await client.query(
          `INSERT INTO users (github_id, github_username, email, password_hash, role, xp, profile_picture, access_token, refresh_token)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (github_id) DO NOTHING
           RETURNING id`,
          [
            user.github_id,
            user.github_username,
            user.email,
            user.password_hash,
            user.role,
            user.xp,
            user.profile_picture,
            user.access_token,
            user.refresh_token,
          ]
        );

        const user_id = usersTable.rows[0]?.id;
        await Promise.all(
          user.categories.map((category) =>
            client.query(
              `INSERT INTO user_categories (user_id, category_id)
                 SELECT $1, id FROM categories WHERE category_name = $2
                 ON CONFLICT DO NOTHING`,
              [user_id, category]
            )
          )
        );
        await Promise.all(
          user.skills.map((skill) =>
            client.query(
              `INSERT INTO user_skills (user_id, skill_id)
                 SELECT $1, id FROM skills WHERE name = $2
                 ON CONFLICT DO NOTHING`,
              [user_id, skill]
            )
          )
        );
        const levelingsystem = levels
          .sort((a, b) => b.xp_required - a.xp_required)
          .find((level) => user.xp >= level.xp_required);
        if (levelingsystem) {
          await client.query(
            `INSERT INTO user_levels (user_id, level_id)
               VALUES ($1, $2)
               ON CONFLICT (user_id) DO NOTHING`,
            [user_id, levelingsystem.id]
          );
        }
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting user", err);
    throw err;
  } finally {
    client.release();
  }
};
export const inserSkills = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      skills.map(async (skill: Skill) => {
        await client.query(
          "INSERT INTO skills (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
          [skill.name]
        );
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting Skills", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertCategories = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.all(
      categories.map(async (category: Category) => {
        await client.query(
          "INSERT INTO categories (category_name) VALUES ($1) ON CONFLICT (category_name) DO NOTHING",
          [category.category_name]
        );
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting categories", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertLevels = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.all(
      levels.map(async (level: Level) => {
        await client.query(
          `INSERT INTO levels (level, name, xp_required) 
          VALUES ($1, $2, $3)`,
          [level.level, level.name, level.xp_required]
        );
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting categories", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertProject = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      projectsRelations.map(async (projectRelation: ProjectRelation) => {
        const userResult = await client.query(
          `SELECT id FROM users WHERE github_username = $1`,
          [projectRelation.owner_username]
        );
        if (userResult.rows.length === 0) {
          console.warn(`User ${projectRelation.owner_username} not found`);
          return;
        }
        const owner_id = userResult.rows[0].id;
        const projectResult = await client.query(
          `INSERT INTO projects (name, description, github_repo_url, project_image_url, 
          status, owner_id) 
           VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (github_repo_url) DO NOTHING RETURNING id`,
          [
            projectRelation.project.name,
            projectRelation.project.description,
            projectRelation.project.github_repo_url,
            projectRelation.project.project_image_url,
            projectRelation.project.status,
            owner_id,
          ]
        );
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting projects", err);
    throw err;
  } finally {
    client.release();
  }
};
