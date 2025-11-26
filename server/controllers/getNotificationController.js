import notificationModel from "../models/notificationModel.js";

const getProjectNotification = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notification = await notificationModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (!notification || notification.length === 0)
      return res
        .status(200)
        .json({ message: "No new notifications.", data: [] });

    res.status(200).json({ data: notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getProjectNotification };
