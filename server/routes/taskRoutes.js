import express from "express";
import createTask from "../controllers/postTaskController.js";
import taskController from "../controllers/getTaskController.js";

import getAssignedTask from "../controllers/getAssignedTaskController.js";
import updateTaskStatus from "../controllers/updateTaskStatusController.js";
import updateTask from "../controllers/updateTaskController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//admin
router.post("/create-task/:userId/:projectId", createTask);
router.get("/created-task/:userId", taskController.getTask);

//user
router.get("/assigned-task/:userId", getAssignedTask);

router.get("/get-tasks/:projectId", taskController.getTasks);
router.get("/get-task/:taskId", taskController.getOneTask);
router.patch("/update-status/:taskId", updateTaskStatus);
router.put("/update-task/:taskId", upload.array("attachments", 10), updateTask);

export default router;
