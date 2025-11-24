import taskModel from "../models/taskModel.js";
import activityModel from "../models/activityModel.js";

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newData = req.body;

    if (!taskId) return res.status(404).json({ message: "Task not found" });

    // multiple file uploads
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map(
        (file) => `/uploads/tasks/${file.filename}`
      );

      // If attachments already exist, append new files
      newData.attachments = newData.attachments
        ? [...newData.attachments, ...filePaths]
        : filePaths;
    }

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
