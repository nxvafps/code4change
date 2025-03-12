import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const code4changeApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchUsers = async () => {
  try {
    const response = await code4changeApi.get("/users");
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getProjectById = async (project_id: ParamValue) => {
  try {
    const response = await code4changeApi.get(`/projects/${project_id}`);
    return response.data.project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const getIssuesByProjectId = async (project_Id: ParamValue) => {
  try {
    const response = await code4changeApi.get(`/projects/${project_Id}/issues`);
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export const getContributionsByProjectId = async (project_Id: ParamValue) => {
  try {
    const response = await code4changeApi.get(
      `/projects/${project_Id}/contributions`
    );
    return response.data.contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await code4changeApi.get("/projects");
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchUserByUsername = async (userName: string) => {
  try {
    const response = await code4changeApi.get(`/users/${userName}/profile`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
export const getProjectSkills = async (projectId: ParamValue) => {
  try {
    const response = await code4changeApi.get(`/projects/${projectId}/skills`);
    return response.data.skills;
  } catch (error) {
    console.error("Error fetching project skills", error);
    throw error;
  }
};
export const getProjectCategories = async (projectId: ParamValue) => {
  try {
    const response = await code4changeApi.get(
      `/projects/${projectId}/categories`
    );
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching project categories", error);
    throw error;
  }
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
    const response = await code4changeApi.post("/projects", projectData);
    return response.data.project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const postissuebyproject = async (projectIssues: {
  project_id: number;
  title: string;
  description: string;
  status: string;
  created_by: number;
  assigned_to: number | null;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/issues`,
      projectIssues
    );

    return response.data.issue;
  } catch (error) {
    console.error("Error posting issues", error);
    throw error;
  }
};
export const getIssesByProject = async (githubUrl: string) => {
  try {
    const urlParts = githubUrl.split("/");
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1].replace(".git", "");

    const responseIssues = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    );

    console.log(
      `Successfully fetched ${responseIssues.data.length} issues from GitHub API`
    );
    return responseIssues.data;
  } catch (error) {
    console.error("Error fetching GitHub issues:", error);
    return [];
  }
};

export const fetchContributionsByUsername = async (userName: string) => {
  try {
    const response = await code4changeApi.get(
      `/users/${userName}/contributions`
    );
    return response.data.contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await code4changeApi.get("/categories");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await code4changeApi.get("/skills");
    return response.data.skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

export const updateUserSkills = async (username: string, skills: string[]) => {
  try {
    const response = await code4changeApi.post(`/users/${username}/skills`, {
      skills: skills,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user skills:", error);
    throw error;
  }
};

export const updateUserCategories = async (
  username: string,
  categories: string[]
) => {
  try {
    const response = await code4changeApi.post(
      `/users/${username}/categories`,
      {
        categories: categories,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user categories:", error);
    throw error;
  }
};
export const addSkillsToProject = async (
  projectName: string,
  skillNames: string[]
) => {
  try {
    const response = await code4changeApi.post(
      `/projects/${projectName}/skills`,
      {
        skill_names: skillNames,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding skills to project:", error);
    throw error;
  }
};
export const addCategoriesToProject = async (
  projectName: string,
  categoryNames: string[]
) => {
  try {
    const response = await code4changeApi.post(
      `/projects/${projectName}/categories`,
      {
        category_names: categoryNames,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding categories to project:", error);
    throw error;
  }
};
export const fetchProjectsByUsername = async (userName: string) => {
  try {
    const response = await code4changeApi(`/users/${userName}/projects`);
    return response.data.projects;
  } catch (error) {
    console.log("Error fetching projects", error);
    throw error;
  }
};
