import axios from "axios";

export const addTeamMember = async (projectId, userId) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/api/team/add-member/${projectId}`,
      { userId }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
