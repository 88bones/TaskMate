import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneTask } from "../services/getTask";
import { getTeam } from "../services/getTeam";
import { updateTask } from "../services/postTask";
import Select from "react-select";

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
            assignedTo: res.assignedTo,
            projectId: res.projectId,
            createdBy: userId,
          });
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

  /** Convert team to dropdown options */
  const userOptions = team.map((member) => ({
    value: member._id,
    label: `${member.firstname} ${member.lastname}`,
  }));

  /** When dropdown changes */
  const handelAssignChange = (option) => {
    setData((prev) => ({
      ...prev,
      assignedTo: option ? option.value : "",
    }));
  };

  /** Handle text inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Submit form */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...data,
      dueDate: data.dueDate,
      createdBy: userId,
    };

    updateTask(taskId, payload)
      .then(() => {
        setSuccess("Task Updated");
        setError("");
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => setError("Failed to update task"));
  };

  /** Find selected user option */
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
          className="border rounded px-2 py-1 w-full"
          value={data.dueDate}
          onChange={handleChange}
          required
        />

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
