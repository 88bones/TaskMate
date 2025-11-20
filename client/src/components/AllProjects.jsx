import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedProject, getProject } from "../services/getProject";
import { useNavigate } from "react-router-dom";
import { setSelectedProject } from "../redux/slice";
import { UserRound } from "lucide-react";

const AllProjects = () => {
  const { _id: userId } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const created = await getProject(userId); // projects you created
        const assigned = await getAssignedProject(userId); // projects assigned to you

        const createdList = created.message ? [] : created;
        const assignedList = assigned.message ? [] : assigned;

        const merged = [...createdList, ...assignedList];

        // remove duplicates by _id
        const unique = merged.filter(
          (p, index, self) => index === self.findIndex((x) => x._id === p._id)
        );

        setProjects(unique);
        setError(unique.length === 0 ? "No projects found." : "");
      } catch (err) {
        console.log(err);
        setError("Failed to load projects.");
      }
    }

    fetchProjects();
  }, [userId]);

  return (
    <div className="py-4 rounded bg-white w-full">
      <div className="w-sm">
        {error && <p className="text-red-500">{error}</p>}

        {projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project._id}
                onClick={() => {
                  dispatch(setSelectedProject(project));
                  navigate(`/project-board/${project._id}/timeline`);
                }}
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
                    {Array.isArray(project.team) ? project.team.length : 0}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
