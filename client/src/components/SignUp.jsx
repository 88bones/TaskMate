import React, { useState } from "react";
import { postSignUp } from "../services/postSignUp";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/slice";
import UserDisplay from "./UserDisplay";
import { useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const validationSchema = yup.object().shape({
    firstname: yup.string().max(20),
    lastname: yup.string(),
    username: yup.string(),
    email: yup.string().email("Invalid email format"),
    password: yup
      .string()
      .min(6, "Passwords must be atleast 6 characters or long."),
  });

  const inputStyle =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    department: "",
  });

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [formError, setFormError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data.firstname && data.lastname) {
      const username =
        data.firstname.charAt(0).toLowerCase() +
        data.lastname.toLowerCase().replace(/\s+/g, "") +
        Math.floor(Math.random() * 1000);

      setData((prev) => ({
        ...prev,
        username,
      }));
    }
  }, [data.firstname, data.lastname]);

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
        username: "",
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
      <div className="col-span-1 h-fit w-full max-w-md p-4">
        <div className="flex justify-center items-center">
          <div className="w-full rounded-2xl border border-gray-100 shadow-xl bg-white p-6 sm:p-8 transition hover:shadow-2xl">
            <header className="mb-6">
              <p className="text-sm font-semibold uppercase text-blue-600 tracking-wide">
                Admin panel
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                Create User
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
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                readOnly
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

              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                  className="w-full text-sm bg-gray-50 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                  className="w-full text-sm bg-gray-50 focus:outline-none"
                  type={showRePassword ? "text" : "password"}
                  name="repassword"
                  placeholder="Confirm Password"
                  value={data.repassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
                className="w-full text-white font-semibold text-base md:text-lg py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-200"
                type="submit"
              >
                Create user
              </button>
              {success && (
                <span className="text-green-600 text-sm">{success}</span>
              )}
              {formError && (
                <span className="text-red-600 text-sm">{formError}</span>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <UserDisplay />
      </div>
    </>
  );
};

export default SignUp;
