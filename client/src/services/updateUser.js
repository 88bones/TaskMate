import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const updateUser = async (userId, payload) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/users/edit-user/${userId}`,
      payload
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
