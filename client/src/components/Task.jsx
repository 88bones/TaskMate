import React from "react";
import CreatedTasks from "./CreatedTasks";
import { Outlet } from "react-router-dom";

const Task = () => {
  return (
    <div className="bg-gray-200 min-h-screen w-screen overflow-x-hidden p-6 grid grid-cols-4 gap-2 max-sm:flex flex-col">
      {/* <CreateTask /> */}
      <Outlet />
      <CreatedTasks />
    </div>
  );
};

export default Task;
