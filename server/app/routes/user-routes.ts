import express from "express";
import * as UserController from "../controllers/user-controllers";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:username/profile", UserController.getUserProfile);
router.get("/:username", UserController.getUserByUsername);

export default router;
