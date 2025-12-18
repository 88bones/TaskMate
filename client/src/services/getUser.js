import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/users/user`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneUser = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/users/profile/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
