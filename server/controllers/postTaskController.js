import taskModel from "../models/taskModel.js";
import projectModel from "../models/projectModel.js";
import activityModel from "../models/activityModel.js";

export const createTask = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const { status } = req.query;

    const task = req.body;

    if (!userId || !projectId) {
      return res
        .status(500)
        .json({ message: "User and project ID not found." });
    }

    const newTask = new taskModel({ ...task, createdBy: userId, status });
    await newTask.save();

    await activityModel.create({
      user: newTask.createdBy,
      action: "created",
      projectType: "task",
      projectId: newTask.projectId,
      description: `created a task: ${newTask.title}`,
    });

    //push task into project
    const project = await projectModel.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found." });
    }

    project.tasks.push(newTask._id);
    await project.save();
    res
      .status(201)
      .json({ message: "Task Created successfully.", task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createTask;
