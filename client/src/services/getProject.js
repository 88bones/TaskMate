import axios from "axios";

export const getProject = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/project/created-projects/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
