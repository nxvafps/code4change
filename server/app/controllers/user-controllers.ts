import { Request, Response } from "express";
import * as UserModel from "../models/user-models";

export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.params.username;
    const user = await UserModel.getUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserByUsername controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getAllUsers controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.params.username;
    const userProfile = await UserModel.getUserWithSkillsAndCategories(
      username
    );
    if (!userProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error("Error in getUserProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.params.username;
    const projects = await UserModel.getUserProjects(username);

    if (projects === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error in getUserProjects controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, project_id } = req.params;

    if (isNaN(parseInt(project_id))) {
      res.status(400).json({ message: "Invalid project ID format" });
      return;
    }

    const project = await UserModel.getUserProjectById(
      username,
      parseInt(project_id)
    );

    if (project === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!project) {
      res.status(404).json({ message: "Project not found for this user" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error in getUserProjectById controller:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getUserProjectContributions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, project_id } = req.params;

    if (isNaN(parseInt(project_id))) {
      res.status(400).json({ message: "Invalid project ID format" });
      return;
    }

    const projectContributions = await UserModel.getUserProjectContributions(
      username,
      parseInt(project_id)
    );

    if (projectContributions === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (projectContributions === false) {
      res.status(404).json({ message: "Project not found for this user" });
      return;
    }

    res.status(200).json({ contributions: projectContributions });
  } catch (error) {
    console.error("Error in getUserProjectContributions controller:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getUserContributions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const userContributions = await UserModel.getUserContributions(username);

    if (userContributions === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ contributions: userContributions });
  } catch (error) {
    console.error("Error in getUserContributions controller:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
