import axios from "axios";

export const postProject = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/project/create-project",
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
