//insert functons for adding data in the seed function here
import pool from "../../index";
import users from "../../data/test-data/users";
import { User } from "../../../types/table-data-types";
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
      })
    );
    await client.query("COMMIT");
    console.log("Users have been inserted");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting user", err);
    throw err;
  } finally {
    client.release();
  }
};
