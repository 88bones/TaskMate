import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProject from "../components/CreateProject";
import CreatedProject from "../components/CreatedProjects";
import AssignedProject from "../components/AssignedProject";
import AllProjects from "../components/AllProjects";
import AssignedTask from "../components/AssignedTask";

const DashBoard = () => {
  const { signedIn, role } = useSelector((state) => state.user);

  console.log(role);
  const navigate = useNavigate();

  const [isCreate, setIsCreate] = useState(false);

  const buttonStyle =
    "px-6 py-2 font-semibold rounded bg-black hover:shadow-lg text-white transition-colors cursor-pointer hover:bg-blue-500 ";

  return (
    <>
      {signedIn ? (
        <div className="flex">
          <div className="flex flex-row w-screen justify-around py-6 max-w-full">
            <header>
              <h1 className="text-2xl font-bold max-sm:px-4">
                Project Dashboard
              </h1>
              <div className="relative">
                <AllProjects />
              </div>
            </header>

            <div className="">
              <button
                className={buttonStyle}
                onClick={() => setIsCreate(!isCreate)}
              >
                Create Project
              </button>

              {isCreate && (
                <div className="absolute top-auto left-3/5 mt-2 z-10">
                  <CreateProject />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <span className="h-screen w-screen flex justify-center items-center">
          <button
            className="text-xl underline text-blue-700 cursor-pointer font-bold"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </span>
      )}
    </>
  );
};

export default DashBoard;
