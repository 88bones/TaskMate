import React, { useState } from "react";
import {
  Settings,
  ListCollapse,
  Bell,
  Kanban,
  Activity,
  User,
  FolderKanban,
  House,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRoundCog } from "lucide-react";

const SideBar = ({ projectId }) => {
  const { role, signedIn } = useSelector((state) => state.user);

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const navigate = useNavigate();

  const SideItems = [];

  if (signedIn && role === "user") {
    SideItems.push(
      {
        name: "Timeline",
        path: `timeline`,
        element: <ClipboardCheck />,
      },
      {
        name: "Kanban",
        path: `kanban`,
        element: <Kanban />,
      },
      { name: "Team", path: "team", element: <User /> },
      { name: "Task", path: "task", element: <ClipboardCheck /> }
    );
  }
  if (role === "admin")
    SideItems.push(
      { name: "Dashboard", path: "admin-dash", element: <House /> },
      {
        name: "Users",
        path: "signup",
        element: <UserRoundCog />,
      },
      { name: "Projects", path: "admin-projects", element: <FolderKanban /> },
      { name: "Tasks", path: "admin-tasks", element: <Activity /> }
    );

  return (
    <div className=" hidden md:flex h-dvh max-sm:absolute bg-gray-700 text-white shadow-lg sticky top-0">
      <div
        className={`${
          sideBarOpen ? "w-20" : "w-46"
        } flex flex-col shadow-md transition-all duration-300 justify-between`}
      >
        <nav className="p-8">
          {SideItems.map((items, index) => (
            <div
              className="py-4 cursor-pointer flex space-x-4 font-bold hover:text-blue-400 "
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
