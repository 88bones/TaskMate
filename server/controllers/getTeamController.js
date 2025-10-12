import projectModel from "../models/projectModel.js";

const getTeam = async (req, res) => {
  try {
    const result = await projectModel
      .find({}, { _id: 1, title: 1, team: 1 })
      .populate({ path: "team", select: "firstname lastname email" });

    if (result.length === 0) {
      res.status(200).json({ message: "No Teams found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getTeam;
