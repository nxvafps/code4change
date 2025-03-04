//insert functons for adding data in the seed function here
import pool from "../../index";
import users from "../../data/test-data/users";
import {
  User,
  Skill,
  Category,
  Level,
  Contribution,
  Issue,
  ProjectSkillRelation,
  ProjectRelation,
} from "../../../types/table-data-types";
import skills from "../../data/test-data/skills";
import categories from "../../data/test-data/categories";
import levels from "../../data/test-data/levels";
import contributionRelations from "../../data/test-data/contributions";

import issueRelations from "../../data/test-data/issues";
import projectSkillRelations from "../../data/test-data/projectSkills";
import projectRelations from "../../data/test-data/projects";

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
export const insertSkills = async () => {
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
    console.error("Error inserting levels", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertContirbution = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      contributionRelations.map(
        async ({
          user_github_username,
          project_name,
          contribution,
        }: {
          user_github_username: String;
          project_name: String;
          contribution: Contribution;
        }) => {
          const projectNameQuery = await client.query(
            `SELECT id FROM projects WHERE name = $1`,
            [project_name]
          );
          const project_id = projectNameQuery.rows[0]?.id;
          const userNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [user_github_username]
          );
          const user_id = userNameQuery.rows[0]?.id;
          await client.query(
            `INSERT INTO contributions (user_id, project_id, pull_request_url, additions, deletions, total_changes, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 ON CONFLICT (pull_request_url) DO NOTHING`,
            [
              user_id,
              project_id,
              contribution.pull_request_url,
              contribution.additions,
              contribution.deletions,
              contribution.total_changes,
              contribution.status,
            ]
          );
        }
      )
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting contirbution", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertIssues = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      issueRelations.map(
        async ({
          project_name,
          created_by_username,
          assigned_to_username,
          issue,
        }: {
          project_name: String;
          created_by_username: String;
          assigned_to_username: String | null;
          issue: Issue;
        }) => {
          const projectNameQuery = await client.query(
            `SELECT id FROM projects WHERE name = $1`,
            [project_name]
          );
          const project_id = projectNameQuery.rows[0]?.id;

          const userNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [created_by_username]
          );
          const created_by = userNameQuery.rows[0]?.id;

          const assignedNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [assigned_to_username]
          );
          const assigned_to = assignedNameQuery.rows[0]?.id || null;

          await client.query(
            `INSERT INTO issues (project_id, title, description, status, created_by, assigned_to) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 RETURNING id`,
            [
              project_id,
              issue.title,
              issue.description,
              issue.status,
              created_by,
              assigned_to,
            ]
          );
        }
      )
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting issues", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertProjectSkills = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      projectSkillRelations.map(
        async ({ project_name, skill_names }: ProjectSkillRelation) => {
          const projectNameQuery = await client.query(
            `SELECT id FROM projects WHERE name = $1`,
            [project_name]
          );
          const project_id = projectNameQuery.rows[0]?.id;

          await Promise.all(
            skill_names.map(async (skill_name) => {
              const skillNameQuery = await client.query(
                `SELECT id FROM skills WHERE name = $1`,
                [skill_name]
              );
              const skill_id = skillNameQuery.rows[0]?.id;

              await client.query(
                `INSERT INTO project_skills (project_id, skill_id)
               VALUES ($1, $2)
               ON CONFLICT (project_id, skill_id) DO NOTHING`,
                [project_id, skill_id]
              );
            })
          );
        }
      )
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting issues", err);
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
      projectRelations.map(
        async ({ owner_username, project }: ProjectRelation) => {
          const userNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [owner_username]
          );
          const owner_id = userNameQuery.rows[0]?.id;

          await client.query(
            `INSERT INTO projects (name, description, github_repo_url, project_image_url, 
  status, owner_id) 
   VALUES ($1, $2, $3, $4, $5, $6) 
   ON CONFLICT (github_repo_url) DO NOTHING 
   RETURNING id`,
            [
              project.name,
              project.description,
              project.github_repo_url,
              project.project_image_url,
              project.status,
              owner_id,
            ]
          );
        }
      )
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting issues", err);
    throw err;
  } finally {
    client.release();
  }
};
