import seed from "./seed";
import { devData } from "../data/development-data";
import { testData } from "../data/test-data";
import pool from "../";
import { SeedData } from "../../types/table-data-types";

const data: SeedData =
  process.env.NODE_ENV === "development" ? devData : testData;

const runSeed = async () => {
  try {
    await seed(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default runSeed;

if (require.main === module) {
  runSeed()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      pool.end();
      process.exit(1);
    });
}
