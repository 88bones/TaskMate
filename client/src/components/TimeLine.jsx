import React from "react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";

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

  const selectedProject = useSelector((state) => state.user.selectedProject);

  return (
    <div className="w-full">
      <div className="flex justify-center py-2 ">
        <div className="flex justify-between w-2/3 py-2 border-b-1">
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
      </div>
    </div>
  );
};

export default TimeLine;
