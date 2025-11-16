import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOneUser } from "../services/getUser";
import { useState } from "react";

const UpdateUser = () => {
  const { _id: userId } = useSelector((state) => state.user);
  const [error, setError] = useState("");

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
    <div>
      <header>
        <p>Edit Profile</p>
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
      </form>
    </div>
  );
};

export default UpdateUser;
