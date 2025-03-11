import { Request, Response, RequestHandler } from "express";
import * as ProjectModel from "../models/project-models";
import * as UserModel from "../models/user-models";
import {
  insertProjectCategories,
  insertProjectSkills,
} from "../db/seeds/utils/insert-data";
export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.project_id;

    const project = await ProjectModel.getProjectById(id);

    if (!project) {
      res.status(404).json({ message: "project not found" });
      return;
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error in getprojectByid controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllProjects = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await ProjectModel.getAllProjects();
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error in getAllUsers controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProjectIssues = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { project_id } = req.params;

  try {
    const issues = await ProjectModel.getIssuesByProjectId(
      parseInt(project_id)
    );

    res.status(200).json({ issues });
  } catch (error) {
    console.error("Error sending issues:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectContributions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { project_id } = req.params;
  try {
    const contributions = await ProjectModel.getContributionsByProjectId(
      parseInt(project_id)
    );

    res.status(200).json({ contributions });
  } catch (error) {
    console.error("Error sending contributions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectSkills = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;

    if (isNaN(Number(project_id))) {
      res.status(400).json({ message: "Bad request" });
      return;
    }

    const skills = await ProjectModel.getProjectSkills(Number(project_id));

    if (!skills.length) {
      res.status(404).json({ message: "No skills found for this project" });
      return;
    }

    res.status(200).json({ skills });
  } catch (error) {
    console.error("Error in getProjectSkills controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const postProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    description,
    github_repo_url,
    project_image_url,
    owner_id,
    status,
  } = req.body;
  if (!name || !description || !github_repo_url || !owner_id || !status) {
    res.status(400).json({ message: "Bad request: missing fields" });
    return;
  }
  try {
    const project = await ProjectModel.postProject(
      name,
      description,
      github_repo_url,
      project_image_url,
      owner_id,
      status
    );

    await UserModel.updateUserRoleBasedOnProjects(owner_id);
    res.status(201).json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProjectAndIssuesByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project_id = parseInt(req.params.project_id, 10);

    if (isNaN(project_id)) {
      throw new Error("Bad request");
    }

    const project = await ProjectModel.getProjectById(project_id.toString());
    if (!project) {
      throw new Error("Project not found");
    }

    await ProjectModel.removeArticleAndIssuesByID(project_id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Project not found") {
        res.status(404).json({ error: { message: error.message } });
      } else if (error.message === "Bad request") {
        res.status(400).json({ error: { message: error.message } });
      } else {
        console.error("Error in deleteProjectAndIssues controller", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
};
export const addProjectCategories = async (req: Request, res: Response) => {
  try {
    const projectRelations = req.body;
    await insertProjectCategories(projectRelations);
    res.status(201).json({ message: "Project categories added successfully" });
  } catch (error) {
    console.error("Error adding project categories", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProjectSkills = async (req: Request, res: Response) => {
  try {
    const projectSkills = req.body;
    await insertProjectSkills(projectSkills);
    res.status(201).json({ message: "Project skills added successfully" });
  } catch (error) {
    console.error("Error adding project skills", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
