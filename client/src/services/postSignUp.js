import axios from "axios";

export const postSignUp = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/users/signup",
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
