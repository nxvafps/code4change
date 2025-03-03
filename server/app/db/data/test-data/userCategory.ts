import { UserCategory } from "../../seeds/utils/table-management";

const userCategoriesRelations = [
  {
    user_github_username: "nxvafps",
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
];

export default userCategoriesRelations;
