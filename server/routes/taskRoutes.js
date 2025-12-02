import express, { Router } from "express";
import createTask from "../controllers/postTaskController.js";
import taskController from "../controllers/getTaskController.js";

import getAssignedTask from "../controllers/getAssignedTaskController.js";
import updateTaskStatus from "../controllers/updateTaskStatusController.js";
import updateTask from "../controllers/updateTaskController.js";
import upload from "../middleware/upload.js";
import deleteTask from "../controllers/deleteTaskController.js";

const router = express.Router();

//admin
router.post("/create-task/:userId/:projectId", createTask);
router.get("/created-task/:userId", taskController.getTask);

//user
router.get("/assigned-task/:userId/:projectId", getAssignedTask);

router.get("/get-tasks/:projectId", taskController.getTasks);
router.get("/get-task/:taskId", taskController.getOneTask);
router.patch("/update-status/:taskId", updateTaskStatus);
router.put("/update-task/:taskId", upload.array("attachments", 10), updateTask);
router.get("/get-all-tasks/", taskController.getAllTasks);

router.delete("/delete-task/:taskId", deleteTask);

export default router;
