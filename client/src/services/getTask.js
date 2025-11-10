import axios from "axios";

export const getTask = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/created-task/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAssignedTask = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/task/assigned-task/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
