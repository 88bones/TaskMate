import axios from "axios";

export const getProjectNotification = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/notification/get-project-notification/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};


