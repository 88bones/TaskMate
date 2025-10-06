import axios from "axios";

export const postTask = async (userId, projectId, data) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/api/task/create-task/${userId}/${projectId}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
