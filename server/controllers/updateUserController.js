import userModel from "../models/userModel.js";
import activityModel from "../models/activityModel.js";
import path from "path";

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = { ...req.body };

    // Handle photo upload
    if (req.file && req.file.filename) {
      if (req.file.fieldname === "photo") {
        newData.photo = `/uploads/users/${req.file.filename}`;
      }
    }

    if (!userId) return res.status(404).json({ message: "No user found" });

    const result = await userModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    res.status(200).json({ message: "User Updated", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateUser;
