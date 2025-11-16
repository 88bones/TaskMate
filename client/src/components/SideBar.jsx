import React, { useState } from "react";
import {
  Home,
  ListChecks,
  Users,
  Settings,
  ListCollapse,
  FolderKanban,
  Kanban,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({ projectId }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const navigate = useNavigate();

  const SideItems = [
    {
      name: "Timeline",
      path: `/project-board/${projectId}/timeline`,
      element: <Activity />,
    },
    {
      name: "Kanban",
      path: `/project-board/${projectId}/kanban`,
      element: <Kanban />,
    },
    { name: "Projects", path: "/dashboard/project", element: <FolderKanban /> },
    { name: "Tasks", path: "/dashboard/tasks", element: <ListChecks /> },
    { name: "Team", path: "/dashboard/team", element: <Users /> },
    { name: "Settings", path: "", element: <Settings /> },
  ];

  return (
    <div className="hidden md:flex h-screen max-sm:absolute">
      <div
        className={`${
          sideBarOpen ? "w-20" : "w-46"
        } flex flex-col shadow-md transition-all duration-300 `}
      >
        <nav className="p-8">
          {SideItems.map((items, index) => (
            <div
              className="py-4 cursor-pointer flex space-x-4 font-bold"
              key={index}
              open={sideBarOpen}
              onClick={() => {
                navigate(items.path);
              }}
            >
              <span className="w-6 h-6">{items.element}</span>
              {!sideBarOpen && (
                <span className="transition-all duration-300">
                  {items.name}
                </span>
              )}
            </div>
          ))}
        </nav>
        <button
          className="p-8 hover:cursor-pointer"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          <ListCollapse />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
