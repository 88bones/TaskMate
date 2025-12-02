import express from "express";
import getNotificationController from "../controllers/getNotificationController.js";
import updateNotificationStatus from "../controllers/updateNotificationStatusController.js";

const router = express.Router();

router.get(
  "/get-project-notification/:userId",
  getNotificationController.getProjectNotification
);
router.put("/mark-all-read/:userId", updateNotificationStatus);

export default router;
