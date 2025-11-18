import express from "express";
import createTask from "../controllers/postTaskController.js";
import taskController from "../controllers/getTaskController.js";

import getAssignedTask from "../controllers/getAssignedTaskController.js";
import updateTaskStatus from "../controllers/updateTaskStatusController.js";

const router = express.Router();

//admin
router.post("/create-task/:userId/:projectId", createTask);
router.get("/created-task/:userId", taskController.getTask);

//user
router.get("/assigned-task/:userId", getAssignedTask);

router.get("/get-tasks/:projectId", taskController.getTasks);
router.patch("/update-status/:taskId", updateTaskStatus);

export default router;
