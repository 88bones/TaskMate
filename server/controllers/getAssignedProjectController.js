import projectModel from "../models/projectModel.js";

const getAssignedProject = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await projectModel
      .find({ team: userId })
      .populate({ path: "team", select: "firstname lastname email" });

    if (result.length === 0) {
      res.status(200).json({ message: "No projects assigned" });
    }

    return res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getAssignedProject;
