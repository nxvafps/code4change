import { Request, Response, NextFunction } from "express";
import { selectSkills } from "../models/skills-model";

export const getSkills = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return selectSkills()
    .then((skills) => {
      res.status(200).send({ skills });
    })
    .catch(next);
};
