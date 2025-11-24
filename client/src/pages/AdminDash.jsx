import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AdminDash = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="w-screen flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDash;
