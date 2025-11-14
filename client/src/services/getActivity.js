import axios from "axios";

export const getProjectActivity = async (projectId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/activity/get-activity/${projectId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
