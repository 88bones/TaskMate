import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const postTask = async (userId, projectId, data) => {
  try {
    const status = data.status;
    const res = await axios.post(
      `${API_BASE_URL}/api/task/create-task/${userId}/${projectId}?status=${status}`,
      data
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const res = await axios.patch(
      `${API_BASE_URL}/api/task/update-status/${taskId}`,
      { status }
    );
    return res.data.task;
  } catch (err) {
    throw err;
  }
};

export const updateTask = async (taskId, payload, files = null) => {
  try {
    let res;

    // If files are provided, use FormData
    if (files && files.length > 0) {
      const formData = new FormData();

      // Append all form fields
      Object.keys(payload).forEach((key) => {
        if (payload[key] !== null && payload[key] !== undefined) {
          formData.append(key, payload[key]);
        }
      });

      // Append files
      Array.from(files).forEach((file) => {
        formData.append("attachments", file);
      });

      res = await axios.put(
        `${API_BASE_URL}/api/task/update-task/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      // Regular JSON request if no files
      res = await axios.put(
        `${API_BASE_URL}/api/task/update-task/${taskId}`,
        payload
      );
    }

    return res.data;
  } catch (err) {
    throw err;
  }
};
