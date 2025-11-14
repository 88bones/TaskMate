import express from "express";
import getProjectActivity from "../controllers/getProjectActivityController.js";

const router = express.Router();

router.get("/get-activity/:projectId", getProjectActivity);

export default router;
