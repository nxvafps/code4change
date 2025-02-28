import pool from "../";
//import functions from insert-data.ts and table-management.ts

const seed = async ({}) => {
  console.log(`Seeding on ${process.env.PGDATABASE}`);
  //seeding logic goes here (ie functions from insert-data.ts and table-management.ts)
};

export default seed;
