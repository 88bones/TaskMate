import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const postProject = async (data) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/project/create-project`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
