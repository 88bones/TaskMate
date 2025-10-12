import React from "react";
import CreatedTeam from "./CreatedTeam";
const Team = () => {
  return (
    <div className="bg-gray-200 max-sm:p-2 min-h-screen w-screen overflow-x-hidden p-6 grid grid-cols-4 gap-4 max-sm:flex flex-col">
      <CreatedTeam />
    </div>
  );
};

export default Team;
