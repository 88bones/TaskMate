import express from "express";
import createProject from "../controllers/postProjectController.js";
import getProject from "../controllers/getProjectController.js";
import deleteProject from "../controllers/deleteProjectController.js";

const router = express.Router();

router.post("/create-project", createProject);
router.get("/created-projects/:id", getProject);
router.delete("/delete-project/:projectId", deleteProject);

export default router;
