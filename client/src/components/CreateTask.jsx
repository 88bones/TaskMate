import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/getUser";
import { useParams } from "react-router-dom";
import { postTask } from "../services/postTask";
import { setTasks, setUsers } from "../redux/slice";

const CreateTask = () => {
  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const dispatch = useDispatch();

  const { _id: userId } = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.user.tasks || []);
  const users = useSelector((state) => state.user.users || []);

  const { projectId } = useParams();
  if (!projectId) {
    return setError("Project not found!");
  }

  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignedTo: "",
    projectId: projectId,
    createdBy: userId,
  });

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.message) {
          dispatch(setUsers([]));
          setError(res.message);
        } else {
          dispatch(setUsers(res));
          setError("");
        }
      })
      .catch(() => {
        setError("Failed to fetch users.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = await postTask(userId, projectId, data);

      dispatch(setTasks([...tasks, newTask]));

      setSuccess("Task Added");
      setData({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        assignedTo: "",
        projectId: projectId,
        createdBy: userId,
      });
      setError("");

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setFormError("Not Submitted");
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4 rounded h-fit w-fit bg-white shadow-md max-sm:w-full">
      <header className="mb-2 font-extrabold text-xl">
        <p>Create Task.</p>
      </header>
      {/* {userId},{projectId} */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={data.title}
          className={inputStyle}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          value={data.description}
          className={inputStyle}
          onChange={handleChange}
          required
        />
        <label className="mr-2">Priority:</label>
        <select
          name="priority"
          className={inputStyle}
          value={data.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label className="mr-2">Assign to:</label>
        {Array.isArray(users) && users.length > 0 ? (
          <select
            className={inputStyle}
            name="assignedTo"
            value={data.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option value={user._id} key={user._id}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-500">No users available.</p>
        )}

        <div className="flex flex-col">
          <label className="mr-2">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className="border rounded px-2 py-1 w-full"
            value={data.dueDate}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-2 bg-black w-full text-white font-bold text-md md:text-xl py-2 rounded-xl cursor-pointer"
          type="submit"
        >
          Add Task
        </button>

        {error && <span className="text-red-500 font-bold">{error}</span>}
        {success && <span className="text-green-500 font-bold">{success}</span>}
        {formError && (
          <span className="text-red-500 font-bold">{formError}</span>
        )}
      </form>
    </div>
  );
};

export default CreateTask;
