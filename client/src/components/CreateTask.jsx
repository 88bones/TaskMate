import React from "react";
import { useSelector } from "react-redux";

const CreateTask = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const { _id } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Create Task</h1>
    </div>
  );
};

export default CreateTask;
