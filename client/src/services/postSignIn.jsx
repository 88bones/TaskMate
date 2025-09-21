import axios from "axios";

export const postSignIn = async (data) => {
  try {
    const res = await axios.post("http://localhost:3001/api/signin/", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
