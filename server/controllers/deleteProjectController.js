import projectModel from "../models/projectModel.js";
import taskModel from "../models/taskModel.js";

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await projectModel.findByIdAndDelete(projectId);

    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }

    const taskResult = await taskModel.deleteMany({ projectId });

    res.status(200).json({
      message: "Project Deleted!",
      deletedTasks: taskResult.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default deleteProject;
