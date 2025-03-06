import axios from "axios";

const code4changeApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchUsers = () => {
  return code4changeApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getProjectById = async (project_id: string) => {
  try {
    const response = await axios.get(`/api/project/${project_id}`);
    return response.data.project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project details");
  }
};
