import express from "express";
import createProject from "../controllers/postProjectController.js";
import getProject from "../controllers/getProjectController.js";

const router = express.Router();

router.post("/create-project", createProject);
router.get("/created-projects/:id", getProject);

export default router;
