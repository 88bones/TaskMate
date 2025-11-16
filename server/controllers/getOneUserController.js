import userModel from "../models/userModel.js";

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await userModel.findOne({ _id: userId });

    if (!result) res.status(400).json({ message: "No user found!" });

    res.json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export default getOneUser;
