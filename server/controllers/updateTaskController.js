import taskModel from "../models/taskModel.js";
import activityModel from "../models/activityModel.js";

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newData = req.body;

    if (!taskId) res.status(404).json({ message: "Task not found" });

    const updatedTask = await taskModel.findByIdAndUpdate(taskId, newData, {
      new: true,
    });

    await activityModel.create({
      user: updatedTask.createdBy,
      action: "update",
      projectType: "task",
      projectId: updatedTask.projectId,
      description: `updated task: ${updatedTask.title}`,
    });

    res.status(200).json({
      message: "Task Updated",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateTask;
