import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const getProject = async (userId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/project/created-projects/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOneProject = async (projectId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/project/get-project/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAssignedProject = async (userId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/project/assigned-project/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getProjects = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/project/get-projects/`);

    return res.data;
  } catch (err) {
    throw err;
  }
};
