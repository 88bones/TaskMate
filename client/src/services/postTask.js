import axios from "axios";

export const postTask = async (userId, projectId, data) => {
  try {
    const status = data.status;
    const res = await axios.post(
      `http://localhost:3001/api/task/create-task/${userId}/${projectId}?status=${status}`,
      data
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/api/task/update-status/${taskId}`,
      { status }
    );
    return res.data.task;
  } catch (err) {
    throw err;
  }
};
