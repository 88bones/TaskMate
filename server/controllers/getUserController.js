import userModel from "../models/userModel.js";

const getUser = async (req, res) => {
  try {
    const result = await userModel.find({});

    if (result.length === 0) {
      return res.status(200).json({ message: "No user found." });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getUser;
