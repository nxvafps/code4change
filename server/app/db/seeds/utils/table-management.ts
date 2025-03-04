//insert functons for dropping and creating tables in the seed function here
import pool from "../../index";
export const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        github_id VARCHAR(255) UNIQUE,
        github_username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        profile_picture VARCHAR(255),
        role VARCHAR(50) NOT NULL,
        xp INTEGER DEFAULT 0,
        access_token VARCHAR(255),
        refresh_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          category_name VARCHAR(200) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS skills (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS levels (
          id SERIAL PRIMARY KEY,
          level INT UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          xp_required INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          github_repo_url VARCHAR(255) NOT NULL UNIQUE,
          project_image_url VARCHAR(255),
          owner_id INT NOT NULL,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
    await client.query(`CREATE TABLE IF NOT EXISTS user_levels (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    level_id INT NOT NULL,
    achieved_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
);
`);
    await client.query(`CREATE TABLE IF NOT EXISTS project_skills (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    skill_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(project_id, skill_id)
);
`);
    await client.query(`
        CREATE TABLE IF NOT EXISTS user_categories (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          category_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
          UNIQUE(user_id, category_id)
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS user_skills (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          skill_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
          UNIQUE(user_id, skill_id)
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS issues (
          id SERIAL PRIMARY KEY,
          project_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) NOT NULL,
          created_by INT NOT NULL,
          assigned_to INT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
          FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS contributions (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          project_id INT NOT NULL,
          pull_request_url VARCHAR(255) NOT NULL UNIQUE,
          additions INT DEFAULT 0,
          deletions INT DEFAULT 0,
          total_changes INT DEFAULT 0,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
      `);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Tables creation failed", err);
    throw err;
  } finally {
    client.release();
  }
};

export const dropTables = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Drop tables in reverse order of dependencies to avoid foreign key conflicts
    await client.query("DROP TABLE IF EXISTS contributions CASCADE");
    await client.query("DROP TABLE IF EXISTS issues CASCADE");
    await client.query("DROP TABLE IF EXISTS user_skills CASCADE");
    await client.query("DROP TABLE IF EXISTS user_categories CASCADE");
    await client.query("DROP TABLE IF EXISTS project_skills CASCADE");
    await client.query("DROP TABLE IF EXISTS user_levels CASCADE");
    await client.query("DROP TABLE IF EXISTS projects CASCADE");
    await client.query("DROP TABLE IF EXISTS levels CASCADE");
    await client.query("DROP TABLE IF EXISTS skills CASCADE");
    await client.query("DROP TABLE IF EXISTS categories CASCADE");
    await client.query("DROP TABLE IF EXISTS users CASCADE");

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error dropping tables", err);
    throw err;
  } finally {
    client.release();
  }
};
