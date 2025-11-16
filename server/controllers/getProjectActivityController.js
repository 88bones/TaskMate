import activityModel from "../models/activityModel.js";

const getProjectActivity = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const result = await activityModel
      .find({ projectId: projectId })
      .populate({ path: "user", selec: "firstname lastname" })
      .populate({ path: "projectId", select: "title description" })
      .sort({ createdAt: -1 });

    if (result.length === 0) {
      return res.status(200).json({ message: "No activity found." });
    }

    return res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getProjectActivity;
