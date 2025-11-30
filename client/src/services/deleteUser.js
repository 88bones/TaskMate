import axios from "axios";

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3001/api/users/delete-user/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
