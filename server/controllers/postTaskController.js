import taskModel from "../models/taskModel.js";
import projectModel from "../models/projectModel.js";

export const createTask = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const task = req.body;

    if (!userId || !projectId) {
      return res
        .status(500)
        .json({ message: "User and project ID not found." });
    }

    const newTask = new taskModel({ ...task, createdBy: userId });
    await newTask.save();

    //push task into project
    const project = await projectModel.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    }

    project.tasks.push(newTask._id);
    await project.save();
    res.status(201).json({ message: "Task Created successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createTask;
