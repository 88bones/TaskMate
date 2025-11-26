import projectModel from "../models/projectModel.js";
import activityModel from "../models/activityModel.js";
import notificationModel from "../models/notificationModel.js";

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const newData = req.body;

    if (!projectId) {
      res.status(404).json({ message: "Project Not found" });
    }

    const result = await projectModel.findByIdAndUpdate(projectId, newData, {
      new: true,
    });

    await activityModel.create({
      user: newData.createdBy,
      action: "updated",
      projectType: "project",
      projectId: projectId,
      description: `updated project: ${newData.title}`,
    });

    res.status(200).json({
      message: "Project Updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateProject;
