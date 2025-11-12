import React from "react";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";

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

  return (
    <div className="w-full">
      <div className="flex justify-around py-4">
        <header>
          <h1 className="text-2xl font-bold">Project Name</h1>
          <h2 className="text-gray-500">Description</h2>
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
  );
};

export default TimeLine;
