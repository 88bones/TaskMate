import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const deleteProject = async (projectId) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/project/delete-project/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
