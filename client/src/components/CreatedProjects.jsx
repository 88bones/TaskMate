import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../services/getProject";
import { useNavigate } from "react-router-dom";
// import { deleteProject } from "../services/deleteProject";
import { setSelectedProject } from "../redux/slice";
import { ClipboardCheck, UserRound } from "lucide-react";

const CreatedProjects = () => {
  const { _id, selectedProject } = useSelector((state) => state.user);
  const userId = _id;
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

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
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  // const handleDelete = async (projectId) => {
  //   const result = await deleteProject(projectId);
  //   setProjects((prev) => prev.filter((p) => p._id !== projectId));
  // };

  return (
    <div className="py-4 rounded h-fit w-full bg-white col-span-2 max-sm:w-full ">
      <div className="w-sm">
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(projects) && projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                onClick={() => {
                  dispatch(setSelectedProject(project));
                  // console.log(project);
                  navigate(`/project-board/${project._id}/timeline`);
                }}
                key={project._id}
                className="font-medium hover:cursor-pointer border rounded px-2 border-gray-200 hover:shadow shadow-blue-200"
              >
                <div className="flex flex-col p-4 gap-6">
                  <div className="flex justify-between">
                    <span className="flex flex-col">
                      <p className="font-bold text-lg">{project.title}</p>
                      <p className="line-clamp-3 text-gray-400">
                        {project.description}
                      </p>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserRound size={14} />
                    {project.team.length}
                    <ClipboardCheck />
                    {project.tasks.length}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreatedProjects;
