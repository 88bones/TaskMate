import React, { useEffect, useState } from "react";
import { getOneUser } from "../services/getUser";
import { updateUser } from "../services/updateUser";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });

  // Fetch one user
  useEffect(() => {
    getOneUser(userId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
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
        setError("Failed to load user data");
      });
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Get current user ID from localStorage or context
      const currentUserId = localStorage.getItem("userId"); // Adjust based on your auth setup

      const payload = {
        ...data,
        createdBy: currentUserId, // Backend expects this field
      };

      const res = await updateUser(userId, payload);
      setSuccess(res.message || "User updated successfully");

      // Navigate back or reload after a delay
      setTimeout(() => {
        navigate("/admin/signup");
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full backdrop-blur-xl flex items-center justify-center flex-col p-4">
      <header>
        <p className="font-bold text-xl mb-4">Edit User</p>
      </header>

      <form onSubmit={handleSubmit} className="w-96">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={data.firstname}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={data.lastname}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className={inputStyle}
          required
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
          <option value="owner">Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black rounded p-2 text-white mt-2 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default UpdateUser;
