import pool from "../";
import { createTables } from "./utils/table-management";
//create a drop tables func in the above file and import it in, so we can drop the tables first
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
    // await dropTables();

    await createTables();

    //these functions should ideally take a parameter, as the data we want to seed is chosen in run-seed.ts
    // await inserSkills(skills);
    // await insertCategories(categories);
    // await insertLevels(levels);
    // await insertUsers(users);
    // await insertProject(projectRelations);

    // additional data insertion functions here

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default seed;
