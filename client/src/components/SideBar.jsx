import React, { useState } from "react";
import { Home, ListChecks, Users, Settings, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const navigate = useNavigate();

  const SideItems = [
    { name: "Home", path: "/dashboard/", element: <Home /> },
    { name: "Tasks", path: "/dashboard/tasks", element: <ListChecks /> },
    { name: "Team", path: "/dashboard/team", element: <Users /> },
  ];

  return (
    <div className="flex h-screen ">
      <div
        className={`${
          sideBarOpen ? "w-64" : "w-20"
        } flex flex-col shadow-md transition-all duration-300 `}
      >
        <button className="p-8" onClick={() => setSideBarOpen(!sideBarOpen)}>
          <Menu />
        </button>

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
              {sideBarOpen && <span>{items.name}</span>}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
