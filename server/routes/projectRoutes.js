import express from "express";
import createProject from "../controllers/postProjectController.js";
import getProject from "../controllers/getProjectController.js";
import deleteProject from "../controllers/deleteProjectController.js";
import updateProject from "../controllers/updateProjectController.js";
import getOneProject from "../controllers/getOneProjectController.js";
import getAssignedProject from "../controllers/getAssignedProjectController.js";

const router = express.Router();

//admin routes
router.post("/create-project", createProject);
router.get("/created-projects/:id", getProject);
router.get("/get-project/:projectId", getOneProject);
router.delete("/delete-project/:projectId", deleteProject);
router.put("/update-project/:projectId", updateProject);

//user routes
router.get("/assigned-project/:userId", getAssignedProject);

export default router;
