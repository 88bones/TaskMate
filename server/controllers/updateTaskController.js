import taskModel from "../models/taskModel.js";
import activityModel from "../models/activityModel.js";

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newData = req.body;

    if (!taskId) res.status(404).json({ message: "Task not found" });

    const result = await taskModel.findByIdAndUpdate(taskId, newData, {
      new: true,
    });

    res.status(200).json({
      message: "Task Updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateTask;
