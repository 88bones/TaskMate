import axios from "axios";

export const getTask = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/created-task/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAssignedTask = async ({ userId, projectId }) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/assigned-task/${userId}/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTasks = async (projectId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/get-tasks/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneTask = async (taskId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/get-task/${taskId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllTasks = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/task/get-all-tasks`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
