import taskModel from "../models/taskModel.js";
import actiVityModel from "../models/activityModel.js";

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await actiVityModel.create({
      user: updatedTask.createdBy,
      action: "status-update",
      projectType: "status",
      projectId: updatedTask.projectId,
      description: `updated "status" of task: ${updatedTask.title}`,
    });

    res.status(200).json({ message: "Status updated", task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default updateTaskStatus;
