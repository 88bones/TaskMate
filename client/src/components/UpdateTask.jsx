import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneTask } from "../services/getTask";
import { getTeam } from "../services/getTeam";
import { updateTask } from "../services/postTask";
import Select from "react-select";
import { Paperclip, X, File } from "lucide-react";

const UpdateTask = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { taskId } = useParams();
  const { _id: userId, selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject?._id;

  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignedTo: "",
    projectId: "",
    createdBy: userId,
  });

  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingAttachments, setExistingAttachments] = useState([]);

  /** Fetch task data */
  useEffect(() => {
    if (!taskId) return;

    getOneTask(taskId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setError("");
          setData({
            title: res.title,
            description: res.description,
            priority: res.priority,
            dueDate: res.dueDate?.split("T")[0],
            assignedTo: res.assignedTo?._id ? String(res.assignedTo._id) : "",
            projectId: res.projectId ? String(res.projectId) : "",
            createdBy: userId,
          });

          if (res.attachments && Array.isArray(res.attachments)) {
            setExistingAttachments(res.attachments);
          }
        }
      })
      .catch((err) => console.error(err));
  }, [taskId]);

  /** Fetch project team */
  useEffect(() => {
    if (!projectId) return;

    getTeam(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setError("");
          setTeam(res.team || []);
        }
      })
      .catch((err) => console.error(err));
  }, [projectId]);

  const userOptions = team.map((member) => ({
    value: member._id,
    label: `${member.firstname} ${member.lastname}`,
  }));

  const handelAssignChange = (option) => {
    setData((prev) => ({
      ...prev,
      assignedTo: option ? option.value : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileName = (filePath) => {
    if (typeof filePath === "string") {
      return filePath.split("/").pop();
    }
    return filePath?.name || "Unknown file";
  };

  /** Submit form */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to send files
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("priority", data.priority);
      formData.append("assignedTo", data.assignedTo);
      formData.append("dueDate", data.dueDate);
      formData.append("createdBy", userId);

      // Append selected files
      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      const res = await updateTask(taskId, formData);
      setSuccess("Task Updated");
      setError("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Update existing attachments
      if (res.data?.attachments) {
        setExistingAttachments(res.data.attachments);
      }

      // Clear selected files
      setSelectedFiles([]);
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update task");
    }
  };

  const selectedUserOption =
    userOptions.find((option) => option.value === data.assignedTo) || null;

  return (
    <div className="p-4 rounded h-fit w-fit bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Update Task</p>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={data.title}
          className={inputStyle}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          value={data.description}
          className={inputStyle}
          onChange={handleChange}
          required
        />

        <label className="mr-2 font-semibold">Priority:</label>
        <select
          name="priority"
          className={inputStyle}
          value={data.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label className="mr-2 font-semibold">Assign to:</label>
        <Select
          className="mb-3 border rounded border-black"
          placeholder="Select team member..."
          options={userOptions}
          value={selectedUserOption}
          onChange={handelAssignChange}
        />

        <label className="mr-2 font-semibold">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          className="border rounded px-2 py-1 w-full mb-2"
          value={data.dueDate}
          onChange={handleChange}
          required
        />

        {/* Existing Attachments */}
        {existingAttachments.length > 0 && (
          <div className="mb-3">
            <label className="mr-2 font-semibold block mb-2">
              Existing Attachments:
            </label>
            <div className="space-y-2">
              {existingAttachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded border"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <File size={16} className="text-gray-600" />
                    <a
                      href={`http://localhost:3001${attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      {getFileName(attachment)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="mb-3">
          <label className="mr-2 font-semibold block mb-2">
            Add Attachments:
          </label>
          <div className="border border-gray-500 rounded p-2">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 10 files, 10MB each. Allowed: images, documents, archives
            </p>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="mt-2 space-y-1">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Paperclip size={14} className="text-blue-600" />
                    <span className="text-sm text-gray-700 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    className="ml-2 p-1 hover:bg-red-100 rounded"
                  >
                    <X size={14} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="mt-3 bg-black w-full text-white font-bold text-md md:text-xl py-2 rounded-xl cursor-pointer"
          type="submit"
        >
          Update Task
        </button>

        {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
        {success && <p className="text-green-500 font-bold mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default UpdateTask;
