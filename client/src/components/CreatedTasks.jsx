import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "../services/getTask";
import { setTasks } from "../redux/slice";
import SmallScreenTask from "./SmallScreenTask";

const CreatedTasks = () => {
  const dispatch = useDispatch();
  const { _id: userId, tasks } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  useEffect(() => {
    getTask(userId)
      .then((res) => {
        if (res.message) {
          dispatch(setTasks([]));
          setError(res.message);
        } else {
          dispatch(setTasks(res));
          setError("");
        }
      })
      .catch(() => {
        setError("Failed to fetch tasks");
      });
  }, [userId, dispatch]);

  return (
    <div className="bg-white max-sm:p-2 p-4 rounded h-fit shadow-md col-span-3 max-sm:w-full overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Tasks.</p>
      </header>

      <div>
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(tasks) && tasks.length > 0 ? (
          <table className="max-sm:hidden w-full max-sm:text-sm text-left">
            <thead>
              <tr className="text-lg max-sm:text-sm border-b-1 border-gray-200">
                <th className="py-2">Task</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item, index) => (
                <tr
                  key={index}
                  className="text-left border-b-1 border-gray-200"
                >
                  <td className="py-2">{item.title}</td>
                  <td>{item.projectId?.title}</td>
                  <td className="flex flex-col">
                    {item.assignedTo?.firstname} {item.assignedTo?.lastname}
                    <span className="text-sm text-gray-500">
                      {item.assignedTo?.email}
                    </span>
                  </td>
                  <td>
                    {item.priority === "medium" ? (
                      <span className="bg-orange-500 text-white px-2  rounded">
                        {item.priority}
                      </span>
                    ) : item.priority === "high" ? (
                      <span className="bg-red-500 text-white px-2 rounded">
                        {item.priority}
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white px-2 rounded">
                        {item.priority}
                      </span>
                    )}
                  </td>
                  <td>
                    {item.status === "done" ? (
                      <span className="bg-green-500 text-white px-2  rounded">
                        {item.status}
                      </span>
                    ) : item.status === "in-progress" ? (
                      <span className="bg-blue-500 text-white px-2 rounded">
                        {item.status}
                      </span>
                    ) : (
                      <span className="bg-black text-white px-2 rounded">
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {item.dueDate
                      ? new Date(item.dueDate).toISOString().split("T")[0]
                      : "No dueDate"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}

        {/* ✅ Mobile View */}
        <span className="md:hidden">
          <SmallScreenTask tasks={tasks} />
        </span>
      </div>
    </div>
  );
};

export default CreatedTasks;
