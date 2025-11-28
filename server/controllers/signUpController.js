import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, department, role } =
      req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const existingUserName = await userModel.findOne({ username });
    if (existingUserName)
      return res.status(400).json({ message: "Username already in use." });

    //hash pw
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstname,
      lastname,
      username,
      email,
      password: hashPassword,
      department,
      role,
    });

    await newUser.save();

    const token = jwtGenerator(newUser._id);

    res.status(200).json({
      message: "Signed Up",
      token,
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        department: newUser.department,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default signUp;
