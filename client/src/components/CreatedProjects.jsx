import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../services/getProject";
import { useNavigate } from "react-router-dom";
// import { deleteProject } from "../services/deleteProject";
import { setSelectedProject } from "../redux/slice";

const CreatedProjects = () => {
  const { _id, selectedProject } = useSelector((state) => state.user);
  const userId = _id;
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getProject(userId)
      .then((res) => {
        if (res.message) {
          setProjects([]);
          setError(res.message);
        } else {
          setProjects(res);
          console.log(res);
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch projects.");
      });
  }, [userId]);

  // const handleDelete = async (projectId) => {
  //   const result = await deleteProject(projectId);
  //   setProjects((prev) => prev.filter((p) => p._id !== projectId));
  // };

  return (
    <div className="p-4 rounded h-fit w-full bg-white shadow-md col-span-2 max-sm:w-full overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Projects</p>
      </header>

      <div className="w-sm">
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(projects) && projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                onClick={() => {
                  dispatch(setSelectedProject(project));
                  console.log(project);
                  navigate(`/project-board/${project._id}`);
                }}
                key={project._id}
                className="font-medium hover:cursor-pointer border rounded px-2 border-gray-400"
              >
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <p className="font-bold text-lg">{project.title}</p>
                    <p className="line-clamp-3 text-gray-400">
                      {project.description}
                    </p>
                    <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                  </span>
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
