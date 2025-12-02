import taskModel from "../models/taskModel.js";

const getAssignedTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    const result = await taskModel
      .find({ assignedTo: userId, projectId })
      .populate({ path: "projectId", select: "title" });

    if (result.length === 0) {
      res.status(200).json({ message: "No tasks found" });
    }
    return res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAssignedTask;
