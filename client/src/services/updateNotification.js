import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const markAllRead = async (userId) => {
  try {
    const result = await axios.put(
      `${API_BASE_URL}/api/notification/mark-all-read/${userId}`
    );
    return result.data;
  } catch (err) {
    throw err;
  }
};
