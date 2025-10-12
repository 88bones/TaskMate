import express from "express";
import getTeam from "../controllers/getTeamController.js";

const router = express.Router();

router.get("/", getTeam);

export default router;
