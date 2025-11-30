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
      .populate({
        path: "assignedTo",
        select: "firstname lastname email photo",
      });

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
    const projectId = req.params.projectId;

    const tasks = await taskModel.find({ projectId: projectId });

    if (tasks.length === 0) res.status(200).json({ message: "No tasks found" });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await taskModel
      .findById({ _id: taskId })
      .populate({ path: "assignedTo", select: "firstname lastname email" })
      .populate({ path: "projectId", select: "title" });

    if (!task) res.status(404).json({ message: "No task found." });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskModel
      .find({})
      .populate({
        path: "projectId",
        select: "title description createdBy startDate endDate",
      })
      .populate({
        path: "assignedTo",
        select: "firstname lastname email photo",
      });

    if (allTasks.length === 0)
      res.status(404).json({ message: "No tasks found" });

    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getTask, getTasks, getOneTask, getAllTasks };
