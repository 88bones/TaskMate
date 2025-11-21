import React from "react";
import { useEffect } from "react";
import { getOneUser } from "../services/getUser";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [error, setError] = useState("");

  const { userId } = useParams();

  console.log(userId);

  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    getOneUser(userId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setData({
            firstname: "",
            lastname: "",
            email: "",
            department: "",
          });
        } else {
          setData({
            firstname: res.firstname,
            lastname: res.lastname,
            email: res.email,
            department: res.department,
          });
          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleChange = () => {};

  return (
    <div className="w-full backdrop-blur-xl flex items-center justify-center flex-col">
      <header>
        <p className="font-bold text-xl">Edit Profile</p>
      </header>

      <form action="">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={data.firstname}
          onChange={handleChange}
          className={inputStyle}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={data.lastname}
          onChange={handleChange}
          className={inputStyle}
        />

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
          type="submit"
          className="w-full bg-black rounded p-2 text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
