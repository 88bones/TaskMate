import projectModel from "../models/projectModel.js";

const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const result = await projectModel
      .findOne({ _id: projectId })
      .populate({
        path: "tasks",
        select: "title",
      })
      .populate({ path: "team", select: "firstname lastname" });

    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getOneProject;
