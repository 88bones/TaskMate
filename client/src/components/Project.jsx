import React from "react";
import CreateProject from "./CreateProject";
import CreatedProjects from "./CreatedProjects";

const Project = () => {
  return (
    <>
      <div className="bg-gray-200 min-h-screen w-screen overflow-x-hidden p-6 grid grid-cols-4 gap-2 max-sm:flex flex-col">
        <CreateProject />
        <CreatedProjects />
      </div>
    </>
  );
};

export default Project;
