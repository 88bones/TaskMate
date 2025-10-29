import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";

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

    res.status(200).json({
      message: "Project Updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateProject;
