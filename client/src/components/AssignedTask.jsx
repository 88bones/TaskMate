import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAssignedTask } from "../services/getTask";
import { X } from "lucide-react";

const AssignedTask = () => {
  const { _id: userId, selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [selectedAttachments, setSelectedAttachments] = useState(null);

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
    inprogress: "bg-blue-500",
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

                <p className="text-sm text-gray-600 mb-2">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : "No due date"}
                </p>

                {task.attachments && task.attachments.length > 0 && (
                  <button
                    onClick={() => setSelectedAttachments(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full"
                  >
                    View Attachments ({task.attachments.length})
                  </button>
                )}
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
                <th>Attachments</th>
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
                    {item.attachments && item.attachments.length > 0 ? (
                      <button
                        onClick={() => setSelectedAttachments(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        View ({item.attachments.length})
                      </button>
                    ) : (
                      <span className="text-gray-400">No attachments</span>
                    )}
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

      {/* Attachments Modal */}
      {selectedAttachments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Attachments for "{selectedAttachments.title}"
              </h2>
              <button
                onClick={() => setSelectedAttachments(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {selectedAttachments.attachments &&
            selectedAttachments.attachments.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedAttachments.attachments.map((attachment, idx) => (
                  <a
                    key={idx}
                    href={
                      attachment.startsWith("http")
                        ? attachment
                        : `http://localhost:3001${attachment}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <p className="text-blue-600 hover:underline font-medium break-all">
                        {attachment.split("/").pop() || "Attachment"}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No attachments available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedTask;
