import React from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import { Bell } from "lucide-react";

const NavBar = () => {
  const buttonStyle =
    "px-2 font-semibold rounded hover:bg-black hover:text-white transition-colors cursor-pointer";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    _id: userId,
    firstname,
    lastname,
    role,
    signedIn,
  } = useSelector((state) => state.user);

  console.log(role);

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <>
      <nav className=" flex shadow">
        <div className="flex justify-between w-full max-w-full mx-auto">
          <header className="px-4 font-extrabold text-3xl flex justify-between max-sm:w-dvw ">
            TaskMate{" "}
          </header>
          {role === "admin" && (
            <span
              className="items-center flex hover:cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              Admin
            </span>
          )}
          {!signedIn ? (
            <div className="hidden md:flex justify-around w-64">
              <button
                className={buttonStyle}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <button
                className={buttonStyle}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex justify-around items-center w-96">
              <div>
                <Bell
                  size={18}
                  className="hover:cursor-pointer hover:text-blue-500"
                />
              </div>
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
