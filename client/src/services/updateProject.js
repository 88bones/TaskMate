import axios from "axios";

export const updateProject = async (projectId, payload) => {
  const res = await axios.put(
    `http://localhost:3001/api/project/update-project/${projectId}`,
    payload
  );
  return res.data;
};
