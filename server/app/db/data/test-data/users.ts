import bcrypt from "bcrypt";
import { User } from "../../seeds/utils/table-management";

const saltRounds = 10;
const hashPassword = (password: string) =>
  bcrypt.hashSync(password, saltRounds);

const users: User[] = [
  {
    github_username: "nxvafps",
    email: "oliverquirk11@gmail.com",
    password_hash: hashPassword("password123"),
    role: "maintainer",
    profile_picture: "https://imgur.com/a/QS8CY9X",
    xp: 27,
  },
  {
    github_username: "genericuser1",
    email: "genericuser1@gmail.com",
    password_hash: hashPassword("anotherPassword123"),
    role: "developer",
    profile_picture:
      "https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg",
    xp: 52,
  },
  {
    github_username: "devcontributor",
    email: "devcontributor@example.com",
    password_hash: hashPassword("securePass456"),
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/42.jpg",
    xp: 135,
  },
  {
    github_username: "projectowner",
    email: "projectowner@example.org",
    password_hash: hashPassword("ownerPass789"),
    role: "maintainer",
    profile_picture: "https://randomuser.me/api/portraits/men/29.jpg",
    xp: 348,
  },
  {
    github_username: "newbie_coder",
    email: "newbie@codingworld.net",
    password_hash: hashPassword("firstProject123"),
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/15.jpg",
    xp: 5,
  },
];

export default users;
