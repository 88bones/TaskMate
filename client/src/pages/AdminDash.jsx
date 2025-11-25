import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDash = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      {role === "admin" && (
        <div className="flex ">
          <SideBar />
          <div className="w-screen flex justify-center">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDash;
