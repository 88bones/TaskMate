import axios from "axios";

export const markAllRead = async (userId) => {
  try {
    const result = await axios.put(
      `http://localhost:3001/api/notification/mark-all-read/${userId}`
    );
    return result.data;
  } catch (err) {
    throw err;
  }
};
