import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const getTask = async (userId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/task/created-task/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAssignedTask = async ({ userId, projectId }) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/task/assigned-task/${userId}/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTasks = async (projectId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/task/get-tasks/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneTask = async (taskId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/task/get-task/${taskId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllTasks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/task/get-all-tasks`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
