import axios from "axios";

export const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/users/user");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneUser = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/users/profile/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
