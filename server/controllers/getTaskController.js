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
      .populate({
        path: "projectId",
        select: "title",
      })
      .populate({ path: "assignedTo", select: "firstname lastname email" });

    if (result.length === 0) {
      res.status(200).json({ message: "No tasks found." });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});

    if (tasks.length === 0) res.status(200).json({ message: "No tasks found" });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getTask, getTasks };
