import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAssignedTask } from "../services/getTask";

const AssignedTask = () => {
  const { _id: userId, selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAssignedTask({ userId, projectId })
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setTasks([]);
        } else {
          setTasks(res);
          setError("");
        }
      })
      .catch((err) => console.log(err));
  }, [userId, projectId]);

  const priorityColor = {
    low: "bg-yellow-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
  };

  const statusColor = {
    todo: "bg-gray-700",
    "in-progress": "bg-blue-500",
    done: "bg-green-500",
  };

  return (
    <div className="bg-white max-sm:p-3 p-5 rounded-xl shadow-lg col-span-2 max-sm:w-full overflow-y-auto">
      <header className="mb-4">
        <h1 className="font-extrabold text-2xl text-gray-800">
          Assigned Tasks
        </h1>
        <p className="text-gray-500 text-sm">
          Here are the tasks assigned to you.
        </p>
      </header>

      {error && (
        <p className="text-red-500 font-semibold bg-red-100 p-2 rounded mb-3">
          {error}
        </p>
      )}

      {Array.isArray(tasks) && tasks.length > 0 ? (
        <>
          {/* Mobile View (Card UI) */}
          <div className="sm:hidden space-y-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Project: {task.projectId?.title}
                </p>

                <div className="flex gap-2 my-2">
                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${
                      priorityColor[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${
                      statusColor[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : "No due date"}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <table className="hidden sm:table w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 text-lg">
                <th className="py-3">Task</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium">{item.title}</td>
                  <td>{item.projectId?.title}</td>

                  <td>
                    <span
                      className={`text-white px-2 py-1 rounded text-sm ${
                        priorityColor[item.priority]
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`text-white px-2 py-1 rounded text-sm ${
                        statusColor[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.dueDate
                      ? new Date(item.dueDate).toISOString().split("T")[0]
                      : "No due date"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-gray-500 text-center py-4">No tasks available.</p>
      )}
    </div>
  );
};

export default AssignedTask;
