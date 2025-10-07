import taskModel from "../models/taskModel.js";
// import projectModel from "../models/projectModel.js";
// import userModel from "../models/userModel.js";

const getTask = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      res.status(500).json({ message: "UserId required." });
    }

    const result = await taskModel
      .find({ createdBy: userId })
      .populate({ path: "projectId", select: "title" });

    if (result.length === 0) {
      res.status(200).json({ message: "No tasks found." });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getTask;
