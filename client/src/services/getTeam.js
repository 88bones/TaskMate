import axios from "axios";

export const getTeam = async (projectId) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/team/${projectId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
