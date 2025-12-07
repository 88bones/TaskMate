import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "../services/getTask";
import { setTasks } from "../redux/slice";
import SmallScreenTask from "./SmallScreenTask";
import { X } from "lucide-react";

const CreatedTasks = () => {
  const dispatch = useDispatch();
  const { _id: userId, tasks } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [selectedAttachments, setSelectedAttachments] = useState(null);

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
              <tr className="text-lg max-sm:text-sm border-b border-gray-200">
                <th className="py-2">Task</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Attachments</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item, index) => (
                <tr key={index} className="text-left border-b border-gray-200">
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
                      : "No dueDate"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>

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
                    <span className="text-sm text-gray-500">↓</span>
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

export default CreatedTasks;
