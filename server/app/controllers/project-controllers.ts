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
export const getProjectIssues = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { project_id } = req.params;

  try {
    const issues = await ProjectModel.getIssuesByProjectId(
      parseInt(project_id)
    );

    if (issues.length === 0) {
      res.status(404).json({ message: "No issues found for this project." });
      return;
    }

    res.status(200).json({ issues });
  } catch (error) {
    console.error("Error sending issues:", error);
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
