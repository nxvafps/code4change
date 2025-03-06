import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";

const code4changeApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchUsers = () => {
  return code4changeApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getProjectById = async (project_id: ParamValue) => {
  try {
    const response = await code4changeApi.get(
      `http://localhost:3001/api/projects/${project_id}`
    );

    return response.data.project;
  } catch (error) {
    console.error("Error fetching", error);
    throw new Error("Failed to get project");
  }
};
export const getAllProjects = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/projects");
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects", error);
    throw new Error("Failed to fetch projects");
  }
};
