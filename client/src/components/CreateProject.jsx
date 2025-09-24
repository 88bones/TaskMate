import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postProject } from "../services/postProject";

const CreateProject = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { _id } = useSelector((state) => state.user);
  var userId = _id;

  const [data, setData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    tasks: [],
    createdBy: userId,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProject(data);
    } catch (err) {}
  };

  return (
    <div className="bg-gray-200 min-h-screen w-screen p-6">
      <div className="w-1/4 p-4 rounded bg-white shadow-md max-sm:w-full">
        <header className="mb-2 font-extrabold text-xl">
          <p>Create Project.</p>
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
            type="text"
            name="description"
            placeholder="Description"
            rows={5}
            value={data.description}
            onChange={handleChange}
          />
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label className="mr-2" htmlFor="">
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="border rounded px-2 py-1 w-40"
                value={data.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-2" htmlFor="">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="border rounded px-2 py-1 w-40"
                value={data.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="mt-2 bg-black w-full text-white font-bold text-md md:text-xl py-2 rounded-xl cursor-pointer"
            type="submit"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
