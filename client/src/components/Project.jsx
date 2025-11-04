import React from "react";
import CreateProject from "./CreateProject";
import CreatedProjects from "./CreatedProjects";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Project = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      <div className="bg-gray-200  max-sm:p-2  min-h-screen w-screen overflow-x-hidden p-6 grid grid-cols-4 gap-2 max-sm:flex flex-col">
        {role === "admin" ? (
          <>
            <CreateProject />
            <CreatedProjects />
          </>
        ) : (
          "user"
        )}
        <Outlet />
      </div>
    </>
  );
};

export default Project;
