import React from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import { Bell, BellDot } from "lucide-react";
import { useState } from "react";
import Notification from "./Notification";

const NavBar = () => {
  const buttonStyle =
    "px-4 h-fit rounded hover:bg-black hover:text-white transition-colors cursor-pointer";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    _id: userId,
    firstname,
    lastname,
    role,
    signedIn,
  } = useSelector((state) => state.user);

  const [isNotification, setIsNotification] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <>
      <nav className=" flex shadow bg-blue-50">
        <div className="flex justify-between w-full max-w-full mx-auto">
          <header className="px-4 font-extrabold text-3xl flex justify-between max-sm:w-dvw ">
            TaskMate{" "}
          </header>

          {!signedIn ? (
            <div className="hidden md:flex justify-around items-center w-64">
              <button
                className={buttonStyle}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="flex justify-around items-center w-96">
              {role === "admin" && (
                <span
                  className="items-center flex  hover:cursor-pointer text-red-500"
                  onClick={() => navigate("/admin/admin-dash")}
                >
                  Admin
                </span>
              )}
              {notifCount > 0 ? (
                <BellDot
                  size={18}
                  className="hover:cursor-pointer"
                  onClick={() => setIsNotification(!isNotification)}
                />
              ) : (
                <Bell
                  size={18}
                  className="hover:cursor-pointer hover:text-blue-500"
                  onClick={() => setIsNotification(!isNotification)}
                />
              )}

              {isNotification && (
                <div className="absolute top-10 right-60 z-50">
                  <Notification onCount={setNotifCount} />
                </div>
              )}

              <div className="flex items-center gap-2">
                <span
                  className="cursor-pointer hover:text-shadow-lg"
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  {firstname} {lastname}
                </span>
                <button
                  className={`hidden md:block ${buttonStyle}`}
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          <div className="md:hidden flex right-0">
            <button className="text-2xl">&#9776;</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
