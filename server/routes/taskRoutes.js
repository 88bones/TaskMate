import express from "express";
import createTask from "../controllers/postTaskController.js";
import getTask from "../controllers/getTaskController.js";

const router = express.Router();

router.post("/create-task/:userId/:projectId", createTask);
router.get("/created-task/:userId", getTask);

export default router;
