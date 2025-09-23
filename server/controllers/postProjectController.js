import projectModel from "../models/projectModel.js";

const createProject = async (req, res) => {
  try {
    const project = req.body;
    const newPorject = new projectModel(project);
    await newPorject.save();
    res.status(200).json({
      message: "success",
      newPorject,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createProject;
