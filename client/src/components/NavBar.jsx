import React from "react";

const NavBar = () => {
  const buttonStyle =
    "px-6 py-2 font-semibold rounded hover:bg-black hover:text-white transition-colors cursor-pointer";

  return (
    <>
      <nav className=" flex justify-center py-2">
        <div className="flex justify-between w-full max-w-5xl mx-auto">
          <header className="font-extrabold text-3xl">TaskMate</header>
          <div className="hidden md:flex justify-around w-64">
            <button className={buttonStyle}>Sign In</button>
            <button className={buttonStyle}>Sign Up</button>
          </div>

          <div className="md:hidden">
            <button className="text-2xl p-8">&#9776;</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
