import projectModel from "../models/projectModel.js";
import activityModel from "../models/activityModel.js";
import notificationModel from "../models/notificationModel.js";

const createProject = async (req, res) => {
  try {
    const project = req.body;
    const newProject = new projectModel(project);

    await activityModel.create({
      user: newProject.createdBy,
      action: "created",
      projectType: "project",
      projectId: newProject._id,
      description: `created project: ${newProject.title}`,
    });

    await notificationModel.create({
      user: newProject.team,
      action: "updated",
      entityType: "project",
      projectId: newProject._id,
      message: `added team members in project "${newProject.title}" `,
    });

    await newProject.save();

    res.status(200).json({
      message: "Project created successfully",
      newProject,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createProject;
