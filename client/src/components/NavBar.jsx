import React from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const buttonStyle =
    "px-6 py-2 font-semibold rounded hover:bg-black hover:text-white transition-colors cursor-pointer";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstname, lastname, signedIn } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signout());
  };

  return (
    <>
      <nav className=" flex shadow-lg">
        <div className="flex justify-between w-full max-w-full mx-auto">
          <header className="px-4 font-extrabold text-3xl flex justify-between max-sm:w-dvw ">
            TaskMate{" "}
          </header>

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
            <div className="flex justify-around items-center w-64">
              <span
                className="cursor-pointer hover:text-shadow-lg"
                onClick={() => navigate("/profile")}
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
