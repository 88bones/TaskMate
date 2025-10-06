import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProject } from "../services/getProject";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatedProjects = () => {
  const { _id } = useSelector((state) => state.user);
  const userId = _id;
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
  }, []);

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
                  <div className="mr-2 group relative inline-flex items-center">
                    <button className="flex items-center gap-1">
                      <Plus
                        size={16}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/tasks/create-task/${project._id}`
                          )
                        }
                      />
                      <span className="hidden group-hover:block w-20 text-black absolute right-4 top-1/2 -translate-y-1/2 z-10">
                        Add Task
                      </span>
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-500 rounded h-4">
                  <div className="bg-black h-4 rounded w-2/5"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{error || "No projects found."}</p>
        )}
      </div>
    </div>
  );
};

export default CreatedProjects;
