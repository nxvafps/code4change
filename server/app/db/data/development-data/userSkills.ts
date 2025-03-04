import { UserSkill } from "../../../types/table-data-types";

const userSkillsRelations = [
  {
    user_github_username: "user1",
    skill_names: [
      "javascript",
      "dart",
      "typescript",
      "python",
      "c++",
      "postgresql",
    ],
  },
  {
    user_github_username: "genericuser1",
    skill_names: [
      "javascript",
      "typescript",
      "postgresql",
      "reactjs",
      "nextjs",
    ],
  },
  {
    user_github_username: "devcontributor",
    skill_names: ["javascript", "python", "reactjs", "flutter"],
  },
  {
    user_github_username: "projectowner",
    skill_names: ["typescript", "nodejs", "express", "postgresql"],
  },
  {
    user_github_username: "newbie_coder",
    skill_names: ["javascript", "html", "css"],
  },
];

export default userSkillsRelations;
