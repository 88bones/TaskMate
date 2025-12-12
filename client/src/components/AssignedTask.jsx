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
          console.log(res);
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
    new: "bg-gray-300",
    todo: "bg-red-500",
    "in-progress": "bg-orange-500",
    review: "bg-yellow-500",
    done: "bg-green-500",
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: "New",
      todo: "To Do",
      "in-progress": "In Progress",
      review: "Review",
      done: "Done",
    };
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-linear-to-br h-full from-white to-gray-50 max-sm:p-4 p-6 rounded-2xl shadow-xl col-span-2 max-sm:w-full overflow-y-auto">
      <header className="mb-6">
        <h1 className="font-bold text-3xl text-gray-900 tracking-tight">
          Assigned Tasks
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track all tasks assigned to you
        </p>
      </header>

      {error && (
        <div className="text-red-700 font-medium bg-red-50 border border-red-200 p-3 rounded-lg mb-4 flex items-start gap-2">
          <span className="text-red-500 text-lg">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {Array.isArray(tasks) && tasks.length > 0 ? (
        <>
          {/* Mobile View (Card UI) */}
          <div className="sm:hidden space-y-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="font-bold text-lg text-gray-900">
                    {task.title}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  📁 {task.projectId?.title || "No project"}
                </p>

                <div className="flex gap-2 mb-3 flex-wrap">
                  <span
                    className={`text-white text-xs px-3 py-1.5 rounded-full font-medium ${
                      priorityColor[task.priority]
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>

                  <span
                    className={`text-white text-xs px-3 py-1.5 rounded-full font-medium ${
                      statusColor[task.status]
                    }`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  📅{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : "No due date"}
                </p>

                {task.attachments && task.attachments.length > 0 && (
                  <button
                    onClick={() => setSelectedAttachments(task)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 active:scale-95 transition-all w-full font-medium"
                  >
                    📎 View Attachments ({task.attachments.length})
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-gray-700 text-sm font-semibold uppercase tracking-wide">
                  <th className="py-4 px-5">Task</th>
                  <th className="py-4 px-5">Project</th>
                  <th className="py-4 px-5">Priority</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Attachments</th>
                  <th className="py-4 px-5">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-5 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="py-4 px-5 text-gray-700">
                      {item.projectId?.title || "—"}
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`text-white px-3 py-1.5 rounded-full text-xs font-medium ${
                          priorityColor[item.priority]
                        }`}
                      >
                        {item.priority.charAt(0).toUpperCase() +
                          item.priority.slice(1)}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`text-white px-3 py-1.5 rounded-full text-xs font-medium ${
                          statusColor[item.status]
                        }`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      {item.attachments && item.attachments.length > 0 ? (
                        <button
                          onClick={() => setSelectedAttachments(item)}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-700 active:scale-95 transition-all font-medium"
                        >
                          📎 View ({item.attachments.length})
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-gray-700">
                      {item.dueDate
                        ? new Date(item.dueDate).toISOString().split("T")[0]
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">📋 No tasks available</p>
          <p className="text-gray-500 text-sm mt-1">
            Tasks assigned to you will appear here
          </p>
        </div>
      )}

      {/* Attachments Modal */}
      {selectedAttachments && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  📎 Attachments
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  "{selectedAttachments.title}"
                </p>
              </div>
              <button
                onClick={() => setSelectedAttachments(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {selectedAttachments.attachments &&
            selectedAttachments.attachments.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
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
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-150 group"
                  >
                    <span className="text-xl">📄</span>
                    <div className="flex-1">
                      <p className="text-blue-600 group-hover:text-blue-700 hover:underline font-medium break-all text-sm">
                        {attachment.split("/").pop() || "Attachment"}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-600">
                      →
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No attachments available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedTask;
