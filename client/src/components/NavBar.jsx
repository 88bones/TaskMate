import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Bell } from "lucide-react";
import { signout } from "../redux/slice";
import Notification from "./Notification";
import { getProjectNotification } from "../services/getNotification";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    _id: userId,
    firstname,
    lastname,
    role,
    signedIn,
  } = useSelector((state) => state.user);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  // Fetch notifications on component mount
  useEffect(() => {
    if (userId) {
      refreshNotificationCount();
    }
  }, [userId]);

  // Refresh notification count when dropdown is opened
  useEffect(() => {
    if (isNotificationOpen && userId) {
      refreshNotificationCount();
    }
  }, [isNotificationOpen]);

  const refreshNotificationCount = () => {
    getProjectNotification(userId)
      .then((res) => {
        const notifications = Array.isArray(res.data) ? res.data : [];
        const unreadCount = notifications.filter((n) => !n.isRead).length;
        setNotifCount(unreadCount);
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <nav className="flex shadow bg-blue-50 relative">
      <div className="flex justify-between w-full max-w-full mx-auto px-4">
        <header className="font-extrabold text-3xl flex items-center max-sm:w-dvw">
          TaskMate
        </header>

        {!signedIn ? (
          <div className="hidden md:flex justify-around items-center w-64">
            <button
              className="px-4 h-fit rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="flex justify-around items-center w-96 relative">
            {role === "admin" && (
              <span
                className="items-center flex hover:cursor-pointer text-red-500"
                onClick={() => navigate("/admin/admin-dash")}
              >
                Admin
              </span>
            )}

            {/* Notification Bell */}
            <span
              className="relative cursor-pointer"
              onClick={() => setIsNotificationOpen((prev) => !prev)}
            >
              <Bell size={20} className="hover:text-blue-500" />
              {notifCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifCount}
                </span>
              )}
            </span>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute top-10 w-full right-0 z-50">
                <Notification
                  onCount={setNotifCount} // updates BellDot
                />
              </div>
            )}

            <div className="flex items-center gap-2 ml-4">
              <span
                className="cursor-pointer hover:text-shadow-lg"
                onClick={() => navigate(`/update-profile/${userId}`)}
              >
                {firstname} {lastname}
              </span>
              <button
                className="hidden md:block px-4 h-fit rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
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
  );
};

export default NavBar;
