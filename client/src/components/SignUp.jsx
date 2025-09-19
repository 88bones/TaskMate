import React from "react";

const SignUp = () => {
  const inputStyle = "w-md border-1 border-gray-500 rounded px-2 py-2";
  return (
    <div className="flex justify-center text-center h-screen bg-black">
      <div className="flex flex-col justify-center items-center w-screen max-w-5xl">
        <div className="bg-white w-1/2 rounded-2xl">
          <header>
            <p className="text-3xl font-extrabold m-4">Sign Up</p>
          </header>
          <div className="w-full flex justify-center">
            <form
              action=""
              className="flex flex-col justify-centerabsolute gap-y-6 mb-4"
            >
              <input
                className={inputStyle}
                type="text"
                placeholder="First name"
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Last name"
              />
              <input className={inputStyle} type="text" placeholder="Email" />
              <input
                className={inputStyle}
                type="text"
                placeholder="Password"
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Confirm Password"
              />
              <button className="bg-black hover:bg-blue-600 w-md text-white font-bold text-xl p-2 rounded-xl cursor-pointer">
                Sign Up
              </button>
              <p>
                Already have an account?{" "}
                <span className="underline cursor-pointer hover:text-blue-600">
                  Login here!
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
