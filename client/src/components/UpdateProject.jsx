import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getOneProject } from "../services/getProject";
import { updateProject } from "../services/updateProject";

const UpdateProject = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { projectId } = useParams();
  const { _id } = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users || []);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [data, setData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [],
    createdBy: _id,
  });

  // Convert all users into select options
  const userOptions = users.map((u) => ({
    value: u._id,
    label: `${u.firstname} ${u.lastname}`,
  }));

  const selectedTeam = data.team
    .map((id) => {
      const user = users.find((u) => u._id === id);
      return user
        ? { value: user._id, label: `${user.firstname} ${user.lastname}` }
        : null;
    })
    .filter(Boolean);

  console.log(selectedTeam);

  // fetch project
  useEffect(() => {
    getOneProject(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setData({
            title: res.title,
            description: res.description,
            startDate: res.startDate.split("T")[0], // convert to yyyy-mm-dd
            endDate: res.endDate.split("T")[0],
            team: Array.isArray(res.team) ? res.team : [],
            createdBy: _id,
          });
          setError("");
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [projectId, _id]);

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Team select handler
  const handleTeamChange = (selected) => {
    setData((prev) => ({
      ...prev,
      team: selected ? selected.map((s) => s.value) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      team: data.team,
    };

    updateProject(projectId, payload)
      .then((res) => {
        setSuccess("Project Updated");
        setError("");
        const timeout = setTimeout(() => {
          setSuccess("");
          setError("");
        }, 2000);
        return () => clearTimeout(timeout);
      })
      .catch(() => {
        setSuccess("");
        setError("Failed");
      });
  };

  return (
    <div className="p-4 rounded h-fit w-full bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Update Project</p>
      </header>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          className={inputStyle}
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          className={inputStyle}
        />

        <Select
          className="mb-3 border rounded border-black"
          placeholder="Select team members..."
          options={userOptions}
          value={selectedTeam}
          onChange={handleTeamChange}
          isMulti
        />

        <div className="flex gap-10">
          <div className="flex flex-col">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="border rounded px-2 py-1 w-40"
              value={data.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              className="border rounded px-2 py-1 w-40"
              value={data.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="mt-3 bg-black w-full text-white font-bold py-2 rounded-xl cursor-pointer"
          type="submit"
        >
          Update Project
        </button>
        {error && <p className="text-red-500 font-bold mt-1">{error}</p>}
        {success && <p className="text-green-500 font-bold mt-1">{success}</p>}
      </form>
    </div>
  );
};

export default UpdateProject;
