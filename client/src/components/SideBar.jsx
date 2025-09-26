import React, { useState } from "react";
import {
  Home,
  ListChecks,
  Users,
  Settings,
  Menu,
  FolderKanban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/slice";
import { LogOut } from "lucide-react";

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { firstname, lastname, email } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SideItems = [
    { name: "Home", path: "/dashboard/", element: <Home /> },
    { name: "Projects", path: "/dashboard/project", element: <FolderKanban /> },
    { name: "Tasks", path: "/dashboard/tasks", element: <ListChecks /> },
    { name: "Team", path: "/dashboard/team", element: <Users /> },
  ];

  return (
    <div className="hidden md:flex h-screen max-sm:absolute">
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
              {sideBarOpen && (
                <span className="transition-all duration-300">
                  {items.name}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-10 flex flex-col p-8">
          {sideBarOpen ? (
            <span>
              {" "}
              <div>
                {firstname} {lastname}
              </div>
              {email}
            </span>
          ) : (
            <span>{firstname}</span>
          )}
          <span onClick={() => dispatch(signout())} className="cursor-pointer">
            <LogOut />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
