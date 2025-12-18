import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/users/delete-user/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
