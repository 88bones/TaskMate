import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProject } from "../services/getProject";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatedProjects = () => {
  const { _id } = useSelector((state) => state.user);
  const userId = _id;
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const ActionItems = [
    {
      name: "Add Task",
      path: `/dashboard/tasks/create-task/`,
      element: <Plus />,
    },
    { name: "Delete Project", path: ``, element: <Trash /> },
  ];

  useEffect(() => {
    getProject(userId)
      .then((res) => {
        if (res.message) {
          setProjects([]);
          setError(res.message);
        } else {
          setProjects(res);
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch projects.");
      });
  }, [userId]);

  return (
    <div className="p-4 rounded h-95 w-full bg-white shadow-md col-span-2 max-sm:w-full overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Projects</p>
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
                  <div className="inline-flex items-center w-28 justify-evenly pr-2">
                    {ActionItems.map((items, index) => (
                      <button
                        className="relative flex group items-center cursor-pointer"
                        key={index}
                        onClick={() => navigate(`${items.path}${project._id}`)}
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
                  </div>
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

export default CreatedProjects;
