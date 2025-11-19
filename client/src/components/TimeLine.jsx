import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { getProjectActivity } from "../services/getActivity";
import { Outlet, useNavigate } from "react-router-dom";
import CreatedTeam from "./CreatedTeam";

const TimeLine = () => {
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const selectedProject = useSelector((state) => state.user.selectedProject);
  const projectId = selectedProject?._id;

  const ActionItems = [
    {
      name: "Add Task",
      path: ``,
      element: <Plus />,
    },
    {
      name: "Edit",
      path: `/project-board/${projectId}/timeline/update-project`,
      element: <Pencil />,
    },
    { name: "Delete", element: <Trash /> },
  ];

  useEffect(() => {
    if (!projectId) return;

    getProjectActivity(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setActivity([]);
        } else {
          setActivity(res);

          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  return (
    <>
      <div className="flex justify-center py-4 relative px-50 max-sm:px-0">
        <div className="w-full flex flex-col">
          <div className="w-full px-4 flex justify-between border-b py-6">
            <header>
              <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
              <h2 className="text-gray-500 w-64 line-clamp-3 hover:line-clamp-none cursor-default">
                {selectedProject.description}
              </h2>
            </header>
            <div className="flex gap-4">
              {ActionItems.map((item, index) => (
                <div
                  key={index}
                  size={24}
                  onClick={() => {
                    navigate(item.path);
                    if (item.name === "Edit") setVisible(true);
                  }}
                  className="hover:cursor-pointer"
                >
                  {item.element}
                </div>
              ))}
            </div>
          </div>
          <div className="py-4 flex justify-between gap-5  ">
            {Array.isArray(activity) && activity.length > 0 ? (
              <div className="w-2/2 ">
                {activity.map((act) => (
                  <div
                    className="mb-2 p-4 border-b border-gray-200 "
                    key={act._id}
                  >
                    <div className="flex gap-2">
                      •{" "}
                      <p className="font-bold">
                        {act.user.firstname} {act.user.lastname}{" "}
                      </p>
                      {act.description}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 px-2 ">
                        {new Date(act.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500">{error || "No projects found."}</p>
            )}
            <div className="text-center w-1/4">
              <header className="bg-black rounded py-2 text-white">Team</header>
              <div>
                <CreatedTeam />
              </div>
            </div>
          </div>
        </div>
        {visible && (
          <div className="absolute min-w-full flex justify-center backdrop-blur-2xl gap-10 py-10">
            <Outlet />
            <X onClick={() => setVisible(!visible)}></X>
          </div>
        )}
      </div>
    </>
  );
};

export default TimeLine;
