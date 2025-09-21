import React, { useState } from "react";
import { postSignUp } from "../services/postSignUp";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [success, setSuccess] = useState();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await postSignUp(data);
      const { token } = res;

      localStorage.setItem("token", token);
      setSuccess("Signed Up");
      setError("");
      navigate("/signin");
      setData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: "",
      });
    } catch (err) {
      if (err.response) {
        setFormError(err.response.data.message);
      } else {
        setFormError(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <header>
          <p className="text-2xl md:text-3xl font-extrabold text-center mb-6">
            Sign Up
          </p>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <input
            className={inputStyle}
            type="text"
            name="firstname"
            placeholder="First name"
            value={data.firstname}
            onChange={handleChange}
            required
          />
          <input
            className={inputStyle}
            type="text"
            name="lastname"
            placeholder="Last name"
            value={data.lastname}
            onChange={handleChange}
            required
          />
          <input
            className={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          {error && <span className="text-red-600 text-sm">{error}</span>}

          <input
            className={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <input
            className={inputStyle}
            type="password"
            name="repassword"
            placeholder="Confirm Password"
            value={data.repassword}
            onChange={handleChange}
            required
          />
          {error && <span className="text-red-600 text-sm">{error}</span>}

          <button
            className="bg-black hover:bg-blue-600 w-full text-white font-bold text-lg md:text-xl py-2 rounded-xl cursor-pointer"
            type="submit"
          >
            Sign Up
          </button>
          {formError && (
            <span className="text-red-600 text-sm">{formError}</span>
          )}

          <p className="text-center text-sm md:text-base">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="underline cursor-pointer hover:text-blue-600"
            >
              Login here!
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
