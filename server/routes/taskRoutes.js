import express from "express";
import { createTask } from "../controllers/postTaskController.js";

const router = express.Router();

router.post("/create-task/:userId/:projectId", createTask);

export default router;
