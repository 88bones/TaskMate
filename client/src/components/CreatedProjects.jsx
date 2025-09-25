import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProject } from "../services/getProject";

const CreatedProjects = () => {
  const { _id } = useSelector((state) => state.user);
  const userId = _id;
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

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
    <div className="p-4 rounded h-fit w-full bg-white shadow-md col-span-3 max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Projects</p>
      </header>

      <div>
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(projects) && projects.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {projects.map((project) => (
              <li key={project._id} className="font-medium">
                {project.title}{" "}
                <span className="text-gray-500">
                  ({project.startDate?.slice(0, 10)})
                </span>
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
