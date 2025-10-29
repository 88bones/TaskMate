import axios from "axios";

export const deleteProject = async (projectId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3001/api/project/delete-project/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
