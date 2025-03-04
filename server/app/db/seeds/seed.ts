import pool from "../";
import { createTables, dropTables } from "./utils/table-management";
import { insertUsers, insertSkills, insertLevels } from "./utils/insert-data";

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

  try {
    await dropTables();

    await createTables();

    //these functions should ideally take a parameter, as the data we want to seed is chosen in run-seed.ts
    // await inserSkills(skills);
    // await insertCategories(categories);
    // await insertLevels(levels);
    // await insertUsers(users);
    // insertUserSkills(userSkillsRelations);
    // insertUserCategories(userCategoriesRelations);
    // insertUserLevels(userLevelRelations)
    // await insertProject(projectRelations);
    // insertProjectSkills(projectSkillRelations)
    // insertIssues(issueRelations)
    // insertContributions(contributionRelations)

    // additional data insertion functions here

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default seed;
