import React, { useState } from "react";
import { postSignUp } from "../services/postSignUp";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const inputStyle = "w-md border-1 border-gray-500 rounded px-2 py-2";

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
    }
    try {
      const res = await postSignUp(data);
      const { token, user } = res;

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
    <div className="flex justify-center text-center h-screen bg-black">
      <div className="flex flex-col justify-center items-center w-screen max-w-5xl">
        <div className="bg-white w-1/2 rounded-2xl">
          <header>
            <p className="text-3xl font-extrabold m-4">Sign Up</p>
          </header>
          <div className="w-full flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-centerabsolute gap-y-6 mb-4"
            >
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

              <button
                className="bg-black hover:bg-blue-600 w-md text-white font-bold text-xl p-2 rounded-xl cursor-pointer"
                type="submit"
              >
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
