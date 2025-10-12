import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProject } from "../services/postProject";
import { getUser } from "../services/getUser";
import { setUsers } from "../redux/slice";
import Select from "react-select";

const CreateProject = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users || []);

  const [data, setData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [],
    createdBy: _id,
  });

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.message) {
          dispatch(setUsers([]));
          setError(res.message);
        } else {
          dispatch(setUsers(res));
          setError("");
        }
      })
      .catch(() => setError("Failed to fetch users."));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (start > end) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    try {
      const payload = {
        ...data,
        team: selectedUsers,
      };

      await postProject(payload);
      setSuccess("Project Created Successfully");
      setData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        team: [],
        createdBy: _id,
      });
      setSelectedUsers([]);
      setError("");

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setFormError("Project not submitted");
      console.error(err);
    }
  };

  return (
    <div className="p-4 rounded h-fit w-fit bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Create Project</p>
      </header>

      <form onSubmit={handleSubmit}>
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
          className={inputStyle}
          name="description"
          placeholder="Description"
          rows={5}
          value={data.description}
          onChange={handleChange}
        />

        {Array.isArray(users) && users.length > 0 ? (
          <Select
            isMulti
            options={users.map((user) => ({
              value: user._id,
              label: `${user.firstname} ${user.lastname}`,
            }))}
            value={users
              .filter((u) => selectedUsers.includes(u._id))
              .map((u) => ({
                value: u._id,
                label: `${u.firstname} ${u.lastname}`,
              }))}
            onChange={(selected) =>
              setSelectedUsers(selected ? selected.map((s) => s.value) : [])
            }
            className="mb-3"
            placeholder="Select team members..."
          />
        ) : (
          <span className="text-red-500">{error || "No users found."}</span>
        )}

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
          Create Project
        </button>

        {error && <p className="text-red-500 font-bold mt-1">{error}</p>}
        {success && <p className="text-green-500 font-bold mt-1">{success}</p>}
        {formError && (
          <p className="text-red-500 font-bold mt-1">{formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreateProject;
