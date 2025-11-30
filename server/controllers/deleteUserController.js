import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";
import taskModel from "../models/taskModel.js";
import activityModel from "../models/activityModel.js";
import notificationModel from "../models/notificationModel.js";

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const result = await userModel.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    await projectModel.deleteMany({ createdBy: userId });

    await taskModel.updateMany(
      { assignedTo: userId },
      { $unset: { assignedTo: 1 } }
    );

    await activityModel.deleteMany({ user: userId });

    await notificationModel.deleteMany({
      $or: [{ user: userId }, { actor: userId }],
    });

    await projectModel.updateMany(
      { team: userId },
      { $pull: { team: userId } }
    );

    res.status(200).json({
      message: "User and all related data deleted successfully",
      deletedUser: result._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default deleteUser;
