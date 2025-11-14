import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { getProjectActivity } from "../services/getActivity";

const TimeLine = () => {
  const ActionItems = [
    {
      name: "Add Task",
      path: ``,
      element: <Plus />,
    },
    {
      name: "Edit",
      path: ``,
      element: <Pencil />,
    },
    { name: "Delete", element: <Trash /> },
  ];

  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  const selectedProject = useSelector((state) => state.user.selectedProject);
  const projectId = selectedProject?._id;

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
    <div className="w-full">
      <div className="flex justify-around py-2 flex-col">
        <div className="flex justify-between w-2/3 py-2 border-b">
          <header>
            <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
            <h2 className="text-gray-500 w-64 line-clamp-3 hover:line-clamp-none cursor-default">
              {selectedProject.description}
            </h2>
          </header>
          <div className="flex gap-4">
            {ActionItems.map((item, index) => (
              <div key={index} size={24} className="hover:cursor-pointer">
                {item.element}
              </div>
            ))}
          </div>
        </div>
        <div>
          {Array.isArray(activity) && activity.length > 0 ? (
            <div>
              {activity.map((act) => (
                <div key={act._id}>
                  <p>
                    {act.user.firstname} {act.user.lastname} {act.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">{error || "No projects found."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
