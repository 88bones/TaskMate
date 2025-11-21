import React from "react";
import SideBar from "../components/SideBar";
import { Outdent } from "lucide-react";
import { Outlet } from "react-router-dom";
import UserDisplay from "../components/UserDisplay";

const AdminDash = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="grid grid-cols-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDash;
