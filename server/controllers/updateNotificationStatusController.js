import notificationModel from "../models/notificationModel.js";

export const updateNotificationStatus = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await notificationModel.updateMany(
      {
        user: userId,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateNotificationStatus;
