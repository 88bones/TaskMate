import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/task/delete-task/${taskId}`
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
