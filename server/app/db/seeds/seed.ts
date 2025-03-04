import pool from "../";
import { createTables, dropTables } from "./utils/table-management";
import {
  insertUsers,
  insertSkills,
  insertLevels,
  insertCategories,
  insertUserSkills,
  insertUserCategories,
  insertUserLevels,
  insertProject,
  insertProjectSkills,
  insertIssues,
  insertContribution,
} from "./utils/insert-data";

import { SeedData } from "../../types/table-data-types";

const seed = async ({
  users,
  skills,
  categories,
  userSkillsRelations,
  userCategoriesRelations,
  userLevelRelations,
  levels,
  projectRelations,
  projectSkillRelations,
  issueRelations,
  contributionRelations,
}: SeedData) => {
  console.log(`Seeding on ${process.env.PGDATABASE}`);
  const client = await pool.connect();
  try {
    client.query("BEGIN");
    await dropTables();

    await createTables();

    //these functions should ideally take a parameter, as the data we want to seed is chosen in run-seed.ts
    await insertSkills(skills);
    await insertCategories(categories);
    await insertLevels(levels);
    await insertUsers(users);

    await insertUserSkills(userSkillsRelations);
    await insertUserCategories(userCategoriesRelations);
    await insertUserLevels(userLevelRelations);
    await insertProject(projectRelations);
    await insertProjectSkills(projectSkillRelations);
    await insertIssues(issueRelations);
    await insertContribution(contributionRelations);

    console.log("Database seeded successfully");
    await client.query("COMMIT");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    client.release();
  }
};

export default seed;
