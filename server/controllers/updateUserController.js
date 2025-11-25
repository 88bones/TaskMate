import userModel from "../models/userModel.js";
import activityModel from "../models/activityModel.js";
import path from "path";

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = { ...req.body };

    // If a file was uploaded via multer, attach its public path
    if (req.file && req.file.filename) {
      // determine whether file was saved in users or tasks folder
      const dest = req.file.destination || "";
      const isUsers =
        dest.includes(`${path.sep}uploads${path.sep}users`) ||
        dest.endsWith("uploads/users");
      const publicPath = isUsers
        ? `/uploads/users/${req.file.filename}`
        : `/uploads/tasks/${req.file.filename}`;

      newData.photo = publicPath;
    }

    if (!userId) res.status(404).json({ message: "No user found" });

    const result = await userModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    res.status(200).json({ message: "User Updated", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateUser;
