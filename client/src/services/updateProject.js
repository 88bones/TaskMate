import axios from "axios";

export const updateProject = async (projectId, data) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/api/project/update-project/${projectId}`,
      { data }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
