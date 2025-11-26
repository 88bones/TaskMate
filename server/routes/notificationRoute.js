import express from "express";
import getNotificationController from "../controllers/getNotificationController.js";

const router = express.Router();

router.get(
  "/get-project-notification/:userId",
  getNotificationController.getProjectNotification
);

export default router;
