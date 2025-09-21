import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const [formError, setFormError] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center h-screen bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <header>
          <p className="text-2xl md:text-3xl font-extrabold text-center mb-6">
            Sign In
          </p>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <input
            className={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            className={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button
            className="bg-black hover:bg-blue-600 w-full text-white font-bold text-lg md:text-xl py-2 rounded-xl cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
          {formError && (
            <span className="text-red-600 text-sm">{formError}</span>
          )}

          <p className="text-center text-sm md:text-base">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer hover:text-blue-600"
            >
              SignUp here!
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
