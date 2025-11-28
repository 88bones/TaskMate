import axios from "axios";

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3001/api/task/delete-task/${taskId}`
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
