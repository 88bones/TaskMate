import React, { useEffect, useState } from "react";
import { getProjects } from "../services/getProject";
import { getTasks } from "../services/getTask";
import { getUser } from "../services/getUser";
import { Activity } from "lucide-react";

const AdminTask = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const projectsRes = await getProjects();
        const projectsData = Array.isArray(projectsRes) ? projectsRes : [];
        setProjects(projectsData);

        const usersRes = await getUser();
        const usersData = Array.isArray(usersRes) ? usersRes : [];
        setUsers(usersData);

        // fetch tasks for each project
        const tasksPromises = projectsData.map((p) =>
          p._id ? getTasks(p._id).catch(() => []) : Promise.resolve([])
        );
        const tasksResults = await Promise.all(tasksPromises);
        const flattened = tasksResults.flat().filter((t) => t && !t.message);
        setAllTasks(flattened);

        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load projects/tasks/users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const findAssignedUser = (task) => {
    if (!users || users.length === 0) return null;

    const candidates = [
      task.assignedTo,
      task.assignee,
      task.userId,
      task.assigned,
      task.user,
    ];

    for (const cand of candidates) {
      if (!cand) continue;

      // if candidate is object with _id or id
      if (typeof cand === "object") {
        const id = cand._id || cand.id;
        if (id) {
          const found = users.find(
            (u) => u._id === id || u.id === id || u._id === cand._id
          );
          if (found) return found;
        }

        // candidate might already include name/email fields
        if (cand.name || cand.email) {
          return { ...cand };
        }
      }

      // if candidate is string id
      if (typeof cand === "string") {
        const found = users.find((u) => u._id === cand || u.id === cand);
        if (found) return found;
      }
    }

    return null;
  };

  // group tasks by project id
  const tasksByProject = projects.map((project) => {
    const tasks = allTasks.filter(
      (task) =>
        task.projectId === project._id || task.projectId?._id === project._id
    );
    return { project, tasks };
  });

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading projects and tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Projects & Tasks</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {tasksByProject.length === 0 ? (
          <p className="text-gray-600">No projects found.</p>
        ) : (
          <div className="space-y-6">
            {tasksByProject.map(({ project, tasks }) => (
              <div
                key={project._id || project.id || project.title}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {project.title || "Untitled Project"}
                    </h2>
                    {project.description && (
                      <p className="text-sm text-gray-500">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
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

                <div className="mt-2">
                  {tasks.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No tasks for this project.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {tasks.map((task) => {
                        const assigned = findAssignedUser(task);
                        return (
                          <li
                            key={task._id || task.id || task.title}
                            className="border border-gray-100 rounded p-3 flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium text-gray-800">
                                {task.title || task.name || "Untitled Task"}
                              </div>
                              {task.description && (
                                <div className="text-sm text-gray-500">
                                  {task.description}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-1 flex gap-3">
                                <span>Status: {task.status || "unknown"}</span>
                                <span>Priority: {task.priority || "n/a"}</span>
                                {task.dueDate && (
                                  <span>
                                    Due:{" "}
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              {assigned ? (
                                <>
                                  <div className="text-sm font-medium text-gray-800">
                                    {assigned.name ||
                                      assigned.fullName ||
                                      assigned.username ||
                                      assigned.email}
                                  </div>
                                  {assigned.email && (
                                    <div className="text-xs text-gray-500">
                                      {assigned.email}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  Unassigned
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
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
