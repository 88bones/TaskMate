import express from "express";
import createProject from "../controllers/postProjectController.js";

const router = express.Router();

router.post("/create-project", createProject);

export default router;
