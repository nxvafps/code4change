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
          github_repo_url VARCHAR(255) NOT NULL,
          project_image_url VARCHAR(255),
          owner_id INT NOT NULL,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
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
          pull_request_url VARCHAR(255) NOT NULL,
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
    console.log("Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Tables creation failed", err);
    throw err;
  } finally {
    client.release();
  }
};
export interface User {
  id?: number;
  github_id?: string;
  github_username: string;
  email: string;
  password_hash?: string;
  profile_picture?: string;
  role: string;
  xp: number;
  access_token?: string;
  refresh_token?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id?: number;
  category_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Skill {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Level {
  id?: number;
  level: number;
  name: string;
  xp_required: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Project {
  id?: number;
  name: string;
  description?: string;
  github_repo_url: string;
  project_image_url?: string;
  owner_id: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCategory {
  id?: number;
  user_id: number;
  category_id: number;
  created_at?: Date;
}

export interface UserSkill {
  id?: number;
  user_id: number;
  skill_id: number;
  created_at?: Date;
}

export interface Issue {
  id?: number;
  project_id: number;
  title: string;
  description?: string;
  status: string;
  created_by: number;
  assigned_to?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Contribution {
  id?: number;
  user_id: number;
  project_id: number;
  pull_request_url: string;
  additions: number;
  deletions: number;
  total_changes: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
