import projectModel from "../models/projectModel.js";

const getProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await projectModel.find({ createdBy: userId });

    if (result.length === 0) {
      return res.status(200).json({ message: "No projects found." });
    }

    return res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getProject;
