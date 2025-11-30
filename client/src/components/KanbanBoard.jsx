import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  EllipsisVertical,
  Trash,
  Pencil,
  Filter,
  XCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { getTasks } from "../services/getTask";
import { updateTaskStatus } from "../services/postTask";
import { deleteTask } from "../services/deleteTask";
import { getTeam } from "../services/getTeam";
import { getUser } from "../services/getUser";
import Select from "react-select";

function KanbanBoard() {
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject?._id;

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState([
    { id: 1, title: "New", status: "new", color: "bg-white", tasks: [] },
    { id: 2, title: "To Do", status: "todo", color: "bg-red-500", tasks: [] },
    {
      id: 3,
      title: "In Progress",
      status: "in-progress",
      color: "bg-orange-500",
      tasks: [],
    },
    {
      id: 4,
      title: "Review",
      status: "review",
      color: "bg-yellow-500",
      tasks: [],
    },
    { id: 5, title: "Done", status: "done", color: "bg-green-500", tasks: [] },
  ]);
  const [openTaskOptions, setOpenTaskOptions] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterCreatedBy, setFilterCreatedBy] = useState(null);
  const [filterAssignedTo, setFilterAssignedTo] = useState(null);

  // Small Avatar helper for showing user photo or initials
  const Avatar = ({ user, sizeClass = "w-6 h-6" }) => {
    if (!user) return null;
    const [imgError, setImgError] = useState(false);
    const initials = `${user.firstname?.[0] || ""}${
      user.lastname?.[0] || ""
    }`.toUpperCase();

    const src = user.photo
      ? user.photo.startsWith("http")
        ? user.photo
        : `http://localhost:3001${user.photo}`
      : null;

    return (
      <div
        className={`${sizeClass} rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center border`}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={`${user.firstname} ${user.lastname}`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-semibold text-gray-700">
            {initials || "U"}
          </div>
        )}
      </div>
    );
  };

  // Resolve assignee object from task.assignedTo (can be id or populated object)
  const getAssignee = (task) => {
    if (!task || !task.assignedTo) return null;
    // If already populated with user fields
    if (typeof task.assignedTo === "object") {
      if (task.assignedTo.firstname) return task.assignedTo;
      const id = task.assignedTo._id || task.assignedTo;
      return (
        teamMembers.find((m) => String(m._id) === String(id)) ||
        allUsers.find((u) => String(u._id) === String(id)) ||
        null
      );
    }

    // assignedTo is likely an id string
    const id = String(task.assignedTo);
    return (
      teamMembers.find((m) => String(m._id) === id) ||
      allUsers.find((u) => String(u._id) === id) ||
      null
    );
  };

  // Function to apply filters and update columns
  const applyFilters = React.useCallback(
    (tasks) => {
      let filteredTasks = [...tasks];

      // Filter by creator
      if (filterCreatedBy) {
        filteredTasks = filteredTasks.filter((task) => {
          const createdById =
            typeof task.createdBy === "object"
              ? task.createdBy._id || task.createdBy
              : task.createdBy;
          return String(createdById) === String(filterCreatedBy.value);
        });
      }

      // Filter by assignee
      if (filterAssignedTo) {
        filteredTasks = filteredTasks.filter((task) => {
          if (!task.assignedTo) return false; // Exclude tasks with no assignee
          const assignedToId =
            typeof task.assignedTo === "object"
              ? task.assignedTo._id || task.assignedTo
              : task.assignedTo;
          return String(assignedToId) === String(filterAssignedTo.value);
        });
      }

      // Update columns with filtered tasks
      const columnStructure = [
        { id: 1, title: "New", status: "new", color: "bg-white", tasks: [] },
        {
          id: 2,
          title: "To Do",
          status: "todo",
          color: "bg-red-500",
          tasks: [],
        },
        {
          id: 3,
          title: "In Progress",
          status: "in-progress",
          color: "bg-orange-500",
          tasks: [],
        },
        {
          id: 4,
          title: "Review",
          status: "review",
          color: "bg-yellow-500",
          tasks: [],
        },
        {
          id: 5,
          title: "Done",
          status: "done",
          color: "bg-green-500",
          tasks: [],
        },
      ];

      filteredTasks.forEach((task) => {
        const col = columnStructure.find((c) => c.status === task.status);
        if (col) col.tasks.push({ id: task._id, text: task.title, ...task });
      });

      setColumns(columnStructure);
    },
    [filterCreatedBy, filterAssignedTo]
  );

  // DRAG & DROP HANDLERS
  const handleDragStart = (e, colId, taskId) => {
    e.dataTransfer.setData("colId", colId);
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = async (e, dropColId) => {
    const colId = e.dataTransfer.getData("colId");
    const taskId = e.dataTransfer.getData("taskId");
    if (!colId || !taskId) return;

    const newColumns = [...columns];
    const fromCol = newColumns.find((c) => c.id == colId);
    const toCol = newColumns.find((c) => c.id == dropColId);
    const task = fromCol.tasks.find((t) => t.id === taskId);

    task.status = toCol.status;
    fromCol.tasks = fromCol.tasks.filter((t) => t.id !== taskId);
    toCol.tasks.push(task);

    setColumns(newColumns);

    try {
      await updateTaskStatus(taskId, toCol.status);
    } catch (err) {
      console.log("Failed to update backend", err);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  // GET TEAM MEMBERS AND USERS
  useEffect(() => {
    if (!projectId) return;

    // Fetch team members
    getTeam(projectId)
      .then((res) => {
        if (res.team && Array.isArray(res.team)) {
          setTeamMembers(res.team);
        }
      })
      .catch((err) => console.log("Failed to fetch team:", err));

    // Fetch all users
    getUser()
      .then((users) => {
        if (Array.isArray(users)) {
          setAllUsers(users);
        }
      })
      .catch((err) => console.log("Failed to fetch users:", err));
  }, [projectId]);

  // GET TASKS
  useEffect(() => {
    if (!projectId) return;

    getTasks(projectId)
      .then((tasks) => {
        if (!Array.isArray(tasks)) return;
        setAllTasks(tasks);
        applyFilters(tasks);
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  // Apply filters when filter values change or allTasks updates
  useEffect(() => {
    if (allTasks.length > 0) {
      applyFilters(allTasks);
    }
  }, [filterCreatedBy, filterAssignedTo, allTasks.length, applyFilters]);

  // Clear all filters
  const clearFilters = () => {
    setFilterCreatedBy(null);
    setFilterAssignedTo(null);
  };

  const addNewTask = React.useCallback((task) => {
    const formattedTask = {
      id: task._id,
      text: task.title,
      ...task,
    };

    setAllTasks((prev) => [...prev, formattedTask]);
  }, []);

  // Delete task handler
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setAllTasks((prev) => prev.filter((task) => task._id !== taskId));
      setOpenTaskOptions(null);
    } catch (err) {
      console.log("Failed to delete task:", err);
      alert("Failed to delete task");
    }
  };

  const creatorOptions = allUsers.map((user) => ({
    value: user._id,
    label: `${user.firstname} ${user.lastname}`,
  }));

  const assigneeOptions = teamMembers.map((member) => ({
    value: member._id,
    label: `${member.firstname} ${member.lastname}`,
  }));

  // Check if any filters are active
  const hasActiveFilters = filterCreatedBy || filterAssignedTo;

  return (
    <div className="relative">
      <header className="p-4 font-bold text-xl text-center sm:text-left">
        {selectedProject?.title}
      </header>

      {/* Filter Section */}
      <div className="px-4 pb-2 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Filters:</span>
        </div>

        {/* Filter by Creator */}
        <div className="min-w-[180px]">
          {/* <label className="text-xs text-gray-600 mb-1 block">Created By</label> */}
          <Select
            value={filterCreatedBy}
            onChange={setFilterCreatedBy}
            options={creatorOptions}
            placeholder="All creators"
            isClearable
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "36px",
                height: "36px",
              }),
            }}
          />
        </div>

        {/* Filter by Assignee */}
        <div className="min-w-[180px]">
          {/* <label className="text-xs text-gray-600 mb-1 block">
            Assigned To
          </label> */}
          <Select
            value={filterAssignedTo}
            onChange={setFilterAssignedTo}
            options={assigneeOptions}
            placeholder="All assignees"
            isClearable
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "36px",
                height: "36px",
              }),
            }}
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 transition-colors"
          >
            <XCircle size={14} />
            Clear Filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4 min-w-[600px]">
          {columns.map((col) => (
            <div
              key={col.id}
              className="p-3 bg-gray-100 rounded shadow min-w-[200px]"
              onDragOver={allowDrop}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              {/* Column Header */}
              <div className="flex items-center mb-3">
                <span className={`h-4 w-2 rounded mr-2 ${col.color}`}></span>
                <h2 className="text-lg sm:text-xl font-semibold flex-1">
                  {col.title}
                </h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => {
                    navigate(`create-task/${projectId}?status=${col.status}`);
                    setVisible(true);
                  }}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {col.tasks.map((task) => {
                  const assignee = getAssignee(task);
                  return (
                    <div
                      key={task.id}
                      className="bg-white py-3 px-2 rounded-md shadow border cursor-move relative"
                      draggable
                      onDragStart={(e) => handleDragStart(e, col.id, task.id)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p
                            onClick={() => {
                              navigate(`update-task/${task._id}`);
                              setVisible(true);
                            }}
                            className="hover:cursor-pointer hover:text-blue-500 font-light text-sm sm:text-base"
                          >
                            {task.text}
                          </p>
                          <p className="text-xs mt-1">
                            {task.priority === "medium" ? (
                              <span className="bg-purple-500 text-white px-2 rounded text-[10px] sm:text-xs">
                                {task.priority.toUpperCase()}
                              </span>
                            ) : task.priority === "high" ? (
                              <span className="bg-red-500 text-white px-2 rounded text-[10px] sm:text-xs">
                                {task.priority.toUpperCase()}
                              </span>
                            ) : (
                              <span className="bg-blue-500 text-white px-2 rounded text-[10px] sm:text-xs">
                                {task.priority.toUpperCase()}
                              </span>
                            )}
                          </p>

                          {/* Assignee photo below title */}
                          {assignee && (
                            <div className="mt-2 flex items-center gap-2">
                              <Avatar user={assignee} sizeClass="w-7 h-7" />
                            </div>
                          )}
                        </div>

                        {/* Options */}
                        <div className="relative">
                          <EllipsisVertical
                            className="hover:cursor-pointer"
                            size={16}
                            onClick={() =>
                              setOpenTaskOptions((prev) =>
                                prev === task.id ? null : task.id
                              )
                            }
                          />
                          {openTaskOptions === task.id && (
                            <div className="absolute right-0 top-5 bg-white shadow-lg rounded w-32 sm:w-36 p-2 z-10 space-y-1">
                              {[
                                {
                                  name: "Delete Task",
                                  onClick: () => handleDeleteTask(task._id),
                                  element: <Trash />,
                                },
                                {
                                  name: "Edit Task",
                                  path: `update-task/${task._id}`,
                                  element: <Pencil />,
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded cursor-pointer text-sm"
                                  onClick={() => {
                                    if (item.onClick) {
                                      item.onClick();
                                    } else if (item.path) {
                                      navigate(item.path);
                                      setVisible(true);
                                    }
                                    setOpenTaskOptions(null);
                                  }}
                                >
                                  {item.element}
                                  <span>{item.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {visible && (
        <div className="absolute top-0 left-0 w-full flex justify-center backdrop-blur-2xl gap-10 py-10 z-20">
          <Outlet context={{ addNewTask }} />
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={() => setVisible(false)}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
