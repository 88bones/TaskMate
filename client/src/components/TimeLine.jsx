import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { getProjectActivity } from "../services/getActivity";
import { Outlet, useNavigate } from "react-router-dom";

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
          console.log(res);
          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  return (
    <>
      <div className="flex justify-center py-4 relative">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-around border-b border-gray-400">
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
          <div className="py-4 px-4">
            {Array.isArray(activity) && activity.length > 0 ? (
              <div>
                {activity.map((act) => (
                  <div key={act._id}>
                    <p>
                      •{act.user.firstname} {act.user.lastname}{" "}
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500">{error || "No projects found."}</p>
            )}
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
