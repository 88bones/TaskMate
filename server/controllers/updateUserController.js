import userModel from "../models/userModel.js";
import activityModel from "../models/activityModel.js";

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;

    if (!userId) res.status(404).json({ message: "No user found" });

    const result = await userModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    await activityModel.create({
      user: newData.createdBy,
      action: "updated",
      projectType: "user",
      projectId: userId,
      description: `updated user:${newData.firstname}`,
    });

    res.status(200).json({ message: "User Updated", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateUser;
