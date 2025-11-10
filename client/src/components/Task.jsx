import React from "react";
import CreatedTasks from "./CreatedTasks";
import { Outlet } from "react-router-dom";
import AssignedTask from "./AssignedTask";
import { useSelector } from "react-redux";

const Task = () => {
  const { role } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-200 max-sm:p-2 min-h-screen w-screen overflow-x-hidden p-6 grid grid-cols-4 gap-4 max-sm:flex flex-col">
      {/* <CreateTask /> */}
      <Outlet />
      {role === "admin" ? (
        <CreatedTasks />
      ) : (
        <>
          <AssignedTask />
        </>
      )}
    </div>
  );
};

export default Task;
