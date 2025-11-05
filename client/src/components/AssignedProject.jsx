import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAssignedProject } from "../services/getProject";
import { useNavigate } from "react-router-dom";

const AssignedProject = () => {
  const { _id: userId } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAssignedProject(userId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setProjects([]);
        } else {
          setProjects(res);
          setError("");
        }
      })
      .catch((err) => {
        setError("Failed to fetch projects.");
      });
  }, [userId]);

  return (
    <div className="p-4 rounded h-108 w-full bg-white shadow-md col-span-2 max-sm:w-full overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Assigned Projects</p>
      </header>

      <div>
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(projects) && projects.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {projects.map((project) => (
              <li key={project._id} className="font-medium">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <p className="font-bold text-lg">{project.title}</p>
                    <span>
                      <span className="text-gray-500">
                        Start Date: {project.startDate?.slice(0, 10)}
                        {"  "}
                      </span>
                      <span className="text-gray-500">
                        End Date: {project.startDate?.slice(0, 10)}
                      </span>
                    </span>
                  </span>
                  {/* <div className="inline-flex items-center w-28 justify-evenly pr-2">
                    {ActionItems.map((items, index) => (
                      <button
                        className="relative flex group items-center cursor-pointer"
                        key={index}
                        onClick={() =>
                          items.path
                            ? navigate(`${items.path}${project._id}`)
                            : items.onClick(project._id)
                        }
                      >
                        {items.element}
                        <span
                          className="absolute left-1/2 -translate-x-1/2 -top-8
                                   hidden group-hover:block
                                     bg-black text-white text-xs rounded-md
                                        px-2 py-1 whitespace-nowrap shadow-md
                                          transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                        >
                          {items.name}
                        </span>
                      </button>
                    ))}
                  </div> */}
                </div>
                <div className="w-full bg-gray-500 rounded h-3">
                  <div className="bg-black h-full rounded w-2/5"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">{error || "No projects found."}</p>
        )}
      </div>
    </div>
  );
};

export default AssignedProject;
