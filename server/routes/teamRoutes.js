import express from "express";
import getTeam from "../controllers/getTeamController.js";
import addTeamMember from "../controllers/addTeamMemberController.js";

const router = express.Router();

router.get("/:projectId", getTeam);
router.post("/add-member/:projectId", addTeamMember);

export default router;
