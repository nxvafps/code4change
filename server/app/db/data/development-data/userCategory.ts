import { UserCategory } from "../../../types/table-data-types";

const userCategoriesRelations = [
  {
    user_github_username: "user1",
    category_names: ["climateChange", "education", "lgbtqia"],
  },
  {
    user_github_username: "genericuser1",
    category_names: ["healthcare", "worldConflict", "disasterRelief"],
  },
  {
    user_github_username: "devcontributor",
    category_names: ["education", "accessibility"],
  },
  {
    user_github_username: "projectowner",
    category_names: ["climateChange", "animalWelfare"],
  },
  { user_github_username: "newbie_coder", category_names: ["education"] },
  {
    user_github_username: "refactor-ninja",
    category_names: ["climateChange", "education", "lgbtqia"],
  },
];

export default userCategoriesRelations;
