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
  UserCategoriesRelation,
  UserSkillsRelation,
  ContributionRelation,
  IssueRelation,
  UserLevelRelation,
} from "../../../types/table-data-types";

export const insertUsers = async (users: User[]) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      users.map(async (user: User) => {
        const usersTable = await client.query(
          `INSERT INTO users (github_id, github_username, email, password_hash, role, xp, profile_picture, access_token, refresh_token)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (github_id) DO NOTHING`,
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
export const insertUserSkills = async (userSkills: UserSkillsRelation[]) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      userSkills.map(
        async ({ user_github_username, skill_names }: UserSkillsRelation) => {
          const userNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [user_github_username]
          );

          const user_id = userNameQuery.rows[0]?.id;

          if (!user_id) {
            console.warn(
              `User "${user_github_username}" not found, skipping skill relations`
            );
            return;
          }
          await Promise.all(
            skill_names.map(async (skill_name) => {
              const skillCheck = await client.query(
                `SELECT id FROM skills WHERE name = $1`,
                [skill_name]
              );

              if (!skillCheck.rows.length) {
                console.warn(
                  `Skill "${skill_name}" not found, skipping relation for user "${user_github_username}"`
                );
                return;
              }

              await client.query(
                `INSERT INTO user_skills (user_id, skill_id)
                 SELECT $1, id FROM skills WHERE name = $2
                 ON CONFLICT (user_id, skill_id) DO NOTHING`,
                [user_id, skill_name]
              );
            })
          );
        }
      )
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting user skills", err);
    throw err;
  } finally {
    client.release();
  }
};
export const insertUserLevels = async (userLevel: UserLevelRelation[]) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      userLevel.map(async ({ user_github_username }: UserLevelRelation) => {
        const userNameQuery = await client.query(
          `SELECT id, xp FROM users WHERE github_username = $1`,
          [user_github_username]
        );
        const user_id = userNameQuery.rows[0]?.id;
        const user_xp = userNameQuery.rows[0]?.xp;

        if (!user_id || user_xp === undefined) return;
        const allLevelsQuery = await client.query(
          `SELECT id, level, xp_required FROM levels ORDER BY xp_required DESC`
        );
        const levels = allLevelsQuery.rows;
        const highestLevelSystem = levels.find(
          (level) => user_xp >= level.xp_required
        );
        if (!highestLevelSystem) {
          console.warn(
            `No suitable level found for user ${user_github_username} with XP ${user_xp}`
          );
          return;
        }

        const existingLevelQuery = await client.query(
          `SELECT id FROM user_levels WHERE user_id = $1`,
          [user_id]
        );

        if (existingLevelQuery.rows.length > 0) {
          await client.query(
            `UPDATE user_levels SET level_id = $1 WHERE user_id = $2`,
            [highestLevelSystem.id, user_id]
          );
        } else {
          await client.query(
            `INSERT INTO user_levels (user_id, level_id) VALUES ($1, $2)`,
            [user_id, highestLevelSystem.id]
          );
        }
      })
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting user levels", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertUserCategories = async (
  userCategories: UserCategoriesRelation[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      userCategories.map(
        async ({
          user_github_username,
          category_names,
        }: UserCategoriesRelation) => {
          const userNameQuery = await client.query(
            `SELECT id FROM users WHERE github_username = $1`,
            [user_github_username]
          );
          const user_id = userNameQuery.rows[0]?.id;

          if (!user_id) {
            console.warn(
              `User "${user_github_username}" not found, skipping category relations`
            );
            return;
          }

          await Promise.all(
            category_names.map(async (category_name) => {
              const categoryCheck = await client.query(
                `SELECT id FROM categories WHERE category_name = $1`,
                [category_name]
              );

              if (!categoryCheck.rows.length) {
                console.warn(
                  `Category "${category_name}" not found, skipping relation for user "${user_github_username}"`
                );
                return;
              }

              await client.query(
                `INSERT INTO user_categories (user_id, category_id)
                 SELECT $1, id FROM categories WHERE category_name = $2
                 ON CONFLICT (user_id, category_id) DO NOTHING`,
                [user_id, category_name]
              );
            })
          );
        }
      )
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting user categories", err);
    throw err;
  } finally {
    client.release();
  }
};

export const insertSkills = async (skills: Skill[]) => {
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

export const insertCategories = async (categories: Category[]) => {
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

export const insertLevels = async (levels: Level[]) => {
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

export const insertContribution = async (
  contributionRelations: ContributionRelation[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await Promise.all(
      contributionRelations.map(
        async ({
          user_github_username,
          project_name,
          contribution,
        }: ContributionRelation) => {
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

export const insertIssues = async (issueRelations: IssueRelation[]) => {
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
        }: IssueRelation) => {
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

export const insertProjectSkills = async (
  projectSkills: ProjectSkillRelation[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await Promise.all(
      projectSkills.map(
        async ({ project_name, skill_names }: ProjectSkillRelation) => {
          const projectNameQuery = await client.query(
            `SELECT id FROM projects WHERE name = $1`,
            [project_name]
          );
          const project_id = projectNameQuery.rows[0]?.id;
          if (!project_id) {
            console.warn(
              `Project named "${project_name}" not found, skipping relation`
            );
            return;
          }
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

export const insertProject = async (projectRelations: ProjectRelation[]) => {
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
    console.error("Error inserting projects", err);
    throw err;
  } finally {
    client.release();
  }
};
