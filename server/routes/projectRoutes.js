import express from "express";
import createProject from "../controllers/postProjectController.js";
import getProject from "../controllers/getProjectController.js";
import getTeam from "../controllers/getTeamController.js";

const router = express.Router();

router.post("/create-project", createProject);
router.get("/created-projects/:id", getProject);
router.get("/teams", getTeam);

export default router;
