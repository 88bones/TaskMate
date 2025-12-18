import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const getProjectNotification = async (userId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/notification/get-project-notification/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
