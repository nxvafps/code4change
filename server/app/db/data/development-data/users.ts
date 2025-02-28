import bcrypt from "bcrypt";

const saltRounds = 10;
const hashPassword = (password: string) =>
  bcrypt.hashSync(password, saltRounds);

const userData = [
  {
    github_username: "nxvafps",
    email: "oliverquirk11@gmail.com",
    xp: 27,
    password_hash: hashPassword("password123"),
    role: "maintainer",
    avatar_url: "https://imgur.com/a/QS8CY9X",
    skills: ["javascript", "dart", "typescript", "python", "c++", "postgresql"],
    categories: ["climateChange", "education", "lgbtqia"],
  },
  {
    github_username: "genericuser1",
    email: "genericuser1@gmail.com",
    xp: 52,
    password_hash: hashPassword("anotherPassword123"),
    role: "developer",
    avatar_url:
      "https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E=",
    skills: ["javascript", "typescript", "postgresql", "reactjs", "nextjs"],
    categories: ["healthcare", "worldConflict", "disasterRelief"],
  },
];

export default userData;
