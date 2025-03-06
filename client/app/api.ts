import { strict } from "assert";
import axios from "axios";

const code4changeApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchUsers = () => {
  return code4changeApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const fetchUserByUsername = (userName: string) => {
  return code4changeApi.get(`/users/${userName}/profile`).then((res) => {
    return res.data.user;
  });
};
