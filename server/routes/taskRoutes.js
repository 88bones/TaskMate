import express from "express";
import createTask from "../controllers/postTaskController.js";
import getTask from "../controllers/getTaskController.js";
import getAssignedTask from "../controllers/getAssignedTaskController.js";

const router = express.Router();

//admin
router.post("/create-task/:userId/:projectId", createTask);
router.get("/created-task/:userId", getTask);

//user
router.get("/assigned-task/:userId", getAssignedTask);

export default router;
