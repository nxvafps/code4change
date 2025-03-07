import { strict } from "assert";
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

export const getIssuesByProjectId = async (project_Id: ParamValue) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/projects/${project_Id}/issues`
    );
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
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

export const fetchUserByUsername = (userName: string) => {
  return code4changeApi.get(`/users/${userName}/profile`).then((res) => {
    return res.data.user;
  });
};
export const postProject = async (projectData: {
  name: string;
  description: string;
  github_repo_url: string;
  project_image_url?: string | null;
  owner_id: number;
  status: string;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/projects`,
      projectData
    );

    return response.data.project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
