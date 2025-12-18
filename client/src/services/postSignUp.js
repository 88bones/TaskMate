import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const postSignUp = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/users/signup`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
