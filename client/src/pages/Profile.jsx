import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Profile;
