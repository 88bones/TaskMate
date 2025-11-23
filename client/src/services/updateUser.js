import axios from "axios";

export const updateUser = async (userId, payload) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/api/users/edit-user/${userId}`,
      payload
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
