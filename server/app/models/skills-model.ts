import pool from "../db";
import { Skill } from "../types/table-data-types";

export const selectSkills = (): Promise<Skill[]> => {
  return pool.query("SELECT * FROM skills").then(({ rows }) => {
    return rows;
  });
};
