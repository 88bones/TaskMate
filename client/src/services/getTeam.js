import axios from "axios";

export const getTeam = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/team");
    return res.data;
  } catch (err) {
    throw err;
  }
};
