import projectModel from "../models/projectModel.js";
import taskModel from "../models/taskModel.js";

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const result = await taskModel.findByIdAndDelete(taskId);

    if (!result) return res.status(404).json({ message: "Task not found" });

    await projectModel.updateMany(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteTask;
