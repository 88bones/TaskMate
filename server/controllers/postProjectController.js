import projectModel from "../models/projectModel.js";
import activityModel from "../models/activityModel.js";

const createProject = async (req, res) => {
  try {
    const project = req.body;
    const newPorject = new projectModel(project);
    await newPorject.save();

    const activity= new activityModel({
      
    })

    res.status(200).json({
      message: "success",
      newPorject,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createProject;
