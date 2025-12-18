import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const updateProject = async (projectId, payload) => {
  const res = await axios.put(
    `${API_BASE_URL}/api/project/update-project/${projectId}`,
    payload
  );
  return res.data;
};
