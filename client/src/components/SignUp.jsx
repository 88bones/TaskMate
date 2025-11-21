import React, { useState } from "react";
import { postSignUp } from "../services/postSignUp";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/slice";
import UserDisplay from "./UserDisplay";

const SignUp = () => {
  const validationSchema = yup.object().shape({
    firstname: yup.string().max(20),
    lastname: yup.string(),
    email: yup.string().email("Invalid email format"),
    password: yup
      .string()
      .min(6, "Passwords must be atleast 6 characters or long."),
  });

  const inputStyle =
    "w-full border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
    department: "",
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

    try {
      await validationSchema.validate(data, { abortEarly: false });

      if (data.password !== data.repassword) {
        setError("Passwords do not match");
        return;
      }

      const res = await postSignUp(data);
      const { token } = res;

      dispatch(setUsers(res));

      localStorage.setItem("token", token);
      setSuccess("Signed Up");
      setError("");
      setData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: "",
        department: "",
      });
    } catch (validationErr) {
      if (validationErr.inner) {
        // collect multiple errors
        const errors = {};
        validationErr.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setFormError(errors);
      } else {
        setFormError(validationErr.message);
      }
    }
  };

  return (
    <>
      <div className="col-span-1 h-fit w-96 p-4">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded shadow p-4">
            <header>
              <p className="text-2xl md:text-3xl font-bold mb-6">Create User</p>
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
              <select
                name="department"
                value={data.department}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select Department</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="qa">QA</option>
                <option value="ui/ux">UI/UX</option>
                <option value="design">Design</option>
                <option value="owner">Owner</option>
              </select>

              <button
                className="bg-black hover:bg-blue-600 w-full text-white font-bold text-lg md:text-xl py-2 rounded-xl cursor-pointer"
                type="submit"
              >
                Create
              </button>
              {formError && (
                <span className="text-red-600 text-sm">{formError}</span>
              )}
            </form>
          </div>
        </div>
      </div>
      <UserDisplay />
    </>
  );
};

export default SignUp;
