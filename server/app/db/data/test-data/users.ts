import bcrypt from "bcrypt";
import { User } from "../../../types/table-data-types";

const saltRounds = 10;
const hashPassword = (password: string) =>
  bcrypt.hashSync(password, saltRounds);

const users = [
  {
    github_id: "12345678",
    github_username: "nxvafps",
    email: "oliverquirk11@gmail.com",
    xp: 27,
    password_hash: hashPassword("password123"),
    role: "maintainer",
    profile_picture: "https://imgur.com/a/QS8CY9X",
    access_token: "gho_exampleaccesstoken123456789",
    refresh_token: "ghr_examplerefreshtoken123456789",
    skills: ["javascript", "dart", "typescript", "python", "c++", "postgresql"],
    categories: ["climateChange", "education", "lgbtqia"],
  },
  {
    github_id: "23456789",
    github_username: "devcontributor",
    email: "devcontributor@example.com",
    xp: 135,
    password_hash: hashPassword("securePass456"),
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/42.jpg",
    access_token: "gho_devcontributor_token123456789",
    refresh_token: "ghr_devcontributor_refresh123456789",
    skills: ["javascript", "react", "node", "express"],
    categories: ["education", "accessibility", "healthcare"],
  },
  {
    github_id: "34567890",
    github_username: "projectowner",
    email: "projectowner@example.org",
    xp: 348,
    password_hash: hashPassword("ownerPass789"),
    role: "maintainer",
    profile_picture: "https://randomuser.me/api/portraits/men/29.jpg",
    access_token: "gho_projectowner_token123456789",
    refresh_token: "ghr_projectowner_refresh123456789",
    skills: ["typescript", "java", "spring", "docker", "kubernetes"],
    categories: ["climateChange", "sustainableDevelopment", "poverty"],
  },
  {
    github_id: "45678901",
    github_username: "newbie_coder",
    email: "newbie@codingworld.net",
    xp: 5,
    password_hash: hashPassword("firstProject123"),
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/15.jpg",
    access_token: "gho_newbie_token123456789",
    refresh_token: "ghr_newbie_refresh123456789",
    skills: ["html", "css", "javascript"],
    categories: ["education", "mentalHealth"],
  },
];

export default users;
