import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getProject } from "../services/getProject";

const UpdateProject = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { projectId } = useParams();
  const { _id } = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users || []);
  // console.log(users);

  const [data, setData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [],
    createdBy: _id,
  });

  useEffect(() => {
    getProject(projectId);
  }, []);

  return (
    <div className="p-4 rounded h-fit w-full bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Update Project</p>
      </header>

      <form className="flex flex-col">
        <input
          className={inputStyle}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          className={inputStyle}
        />

        <Select
          className="mb-3 border rounded border-black"
          placeholder="Select team members..."
        />

        <div className="flex gap-10">
          <div className="flex flex-col">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="border rounded px-2 py-1 w-40"
              // value={data.startDate}
              // onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              className="border rounded px-2 py-1 w-40"
              // value={data.endDate}
              // onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="mt-3 bg-black w-full text-white font-bold py-2 rounded-xl cursor-pointer"
          type="submit"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
