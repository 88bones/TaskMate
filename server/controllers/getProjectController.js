import projectModel from "../models/projectModel.js";

const getProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await projectModel
      .find({ createdBy: userId })
      .populate({ path: "tasks", select: "title" });

    if (result.length === 0) {
      return res.status(200).json({ message: "No projects found." });
    }

    return res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find({})
      .populate({ path: "createdBy", select: "firstname lastname" });

    if (projects.length === 0)
      res.status(404).json({ message: "No projects found." });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getProject, getProjects };
