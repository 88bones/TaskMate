import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    //hash pw
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "Signed Up",
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        password: newUser.password,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default signUp;
