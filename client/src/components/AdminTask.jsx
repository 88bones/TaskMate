import React, { useEffect, useMemo, useState } from "react";
import { getAllTasks } from "../services/getTask";
import { Activity, Search } from "lucide-react";

const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const statusColor = {
    new: "bg-gray-300",
    todo: "bg-red-500",
    "in-progress": "bg-orange-500",
    review: "bg-yellow-500",
    done: "bg-green-500",
  };

  const priorityColor = {
    low: "bg-yellow-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
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

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setTasks(Array.isArray(res) ? res : []);
        console.log(res);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tasks.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter tasks by search term
  const filteredTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.assignedTo?.firstname?.toLowerCase().includes(term) ||
        task.assignedTo?.lastname?.toLowerCase().includes(term)
    );
  }, [tasks, searchTerm]);

  // Group tasks by project
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const projectId = task.projectId?._id || task.projectId || "No Project";
    const projectName = task.projectId?.title || "Untitled Project";
    const projectDesc = task.projectId?.description;
    const projectStart = task.projectId?.startDate;
    const projectEnd = task.projectId?.endDate;

    if (!acc[projectId]) {
      acc[projectId] = {
        project: {
          _id: projectId,
          title: projectName,
          description: projectDesc,
          startDate: projectStart,
          endDate: projectEnd,
        },
        tasks: [],
      };
    }
    acc[projectId].tasks.push(task);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-start  justify-between flex-col ">
          <h1 className="text-2xl font-bold pb-4">All Tasks by Project</h1>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {Object.keys(groupedTasks).length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          <div className="space-y-6">
            {Object.values(groupedTasks).map(({ project, tasks }) => (
              <div key={project._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h2>
                    {project.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    {project.startDate && (
                      <div>
                        Start:{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                    )}
                    {project.endDate && (
                      <div>
                        End: {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {tasks.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No tasks for this project.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {tasks.map((task) => (
                        <li
                          key={task._id}
                          className="border border-gray-100 rounded p-3 flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {task.title}
                            </div>
                            {task.description && (
                              <div className="text-sm text-gray-500 mt-1">
                                {task.description}
                              </div>
                            )}
                            <div className="text-xs mt-2 flex gap-3 items-center flex-wrap">
                              {/* Status badge */}
                              <span
                                className={`inline-block text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold text-white ${
                                  statusColor[task.status] || "bg-gray-400"
                                }`}
                              >
                                {getStatusLabel(task.status)}
                              </span>

                              {/* Priority badge */}
                              <span
                                className={`inline-block text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold text-white ${
                                  priorityColor[task.priority] || "bg-gray-400"
                                }`}
                              >
                                {task.priority
                                  ? task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)
                                  : "N/A"}
                              </span>

                              {task.dueDate && (
                                <span className="text-gray-500 text-xs">
                                  📅{" "}
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Assigned To */}
                          <div className="text-right ml-4 min-w-[140px]">
                            {task.assignedTo ? (
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-800">
                                  {typeof task.assignedTo === "object"
                                    ? `${task.assignedTo.firstname || ""} ${
                                        task.assignedTo.lastname || ""
                                      }`.trim()
                                    : "Assigned"}
                                </div>
                                {typeof task.assignedTo === "object" &&
                                  task.assignedTo.email && (
                                    <div className="text-xs text-gray-500 truncate">
                                      {task.assignedTo.email}
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-400 italic">
                                Unassigned
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTask;
