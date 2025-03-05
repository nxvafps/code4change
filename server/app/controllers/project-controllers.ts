import { Request, Response, RequestHandler } from "express";
import * as ProjectModel from "../models/project-models";

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
  if (
    !name ||
    !description ||
    !github_repo_url ||
    !project_image_url ||
    !owner_id ||
    !status
  ) {
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
    res.status(201).json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
