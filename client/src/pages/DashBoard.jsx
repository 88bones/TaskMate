import React from "react";
import SideBar from "../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { signedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {signedIn ? (
        <div className="flex">
          <SideBar />
          <Outlet />
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
