import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneTask } from "../services/getTask";
import { getTeam } from "../services/getTeam";
import Select from "react-select";

const UpdateTask = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { taskId } = useParams();
  const { _id: userId } = useSelector((state) => state.user);
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    createdBy: userId,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // get Task
  useEffect(() => {
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
            dueDate: res.dueDate.split("T")[0],
            assignedTo: res.assignedTo,
            projectId: res.projectId,
            createdBy: userId,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [taskId]);

  //get team
  useEffect(() => {
    getTeam(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setError("");
          setTeam(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  const userOptions = team.team?.map((member) => ({
    value: member._id,
    label: `${member.firstname} ${member.lastname}`,
  }));

  const handelAssignChange = (option) => {
    setSelectedTeam(option);

    setData((prev) => ({
      ...prev,
      assignedTo: option?.value || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate.split("T")[0],
      assignedTo: data.assignedTo,
      projectId: data.projectId,
      createdBy: userId,
    };
  };

  return (
    <div className="p-4 rounded h-fit w-fit bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Update Task.</p>
      </header>
      {/* {userId},{projectId} */}
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
        <label className="mr-2">Priority:</label>
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

        <label className="mr-2">Assign to:</label>

        <Select
          className="mb-3 border rounded border-black"
          placeholder="Select team members..."
          options={userOptions}
          value={data.assignedTo}
          onChange={handelAssignChange}
        />

        <div className="flex flex-col">
          <label className="mr-2">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className="border rounded px-2 py-1 w-full"
            value={data.dueDate}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-2 bg-black w-full text-white font-bold text-md md:text-xl py-2 rounded-xl cursor-pointer"
          type="submit"
        >
          Update Task
        </button>

        {error && <span className="text-red-500 font-bold">{error}</span>}
        {success && <span className="text-green-500 font-bold">{success}</span>}
      </form>
    </div>
  );
};

export default UpdateTask;
