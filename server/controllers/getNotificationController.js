import notificationModel from "../models/notificationModel.js";

const getProjectNotification = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notification = await notificationModel.find({ user: userId });

    if (!notification || notification.length === 0)
      res.status(404).json({ message: "No new notifications." });

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getProjectNotification };
