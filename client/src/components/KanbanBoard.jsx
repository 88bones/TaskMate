import React, { useState, useEffect } from "react";
import { Plus, X, EllipsisVertical, Trash, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { getTasks } from "../services/getTask";
import { updateTaskStatus } from "../services/postTask";

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
  const [openTaskOptions, setOpenTaskOptions] = useState(null); // track which task options are open

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

  // GET TASKS
  useEffect(() => {
    if (!projectId) return;

    getTasks(projectId)
      .then((tasks) => {
        if (!Array.isArray(tasks)) return;
        const updated = columns.map((col) => ({ ...col, tasks: [] }));

        tasks.forEach((task) => {
          const col = updated.find((c) => c.status === task.status);
          if (col) col.tasks.push({ id: task._id, text: task.title, ...task });
        });

        setColumns(updated);
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  const addNewTask = (task) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.status === task.status) {
          return {
            ...col,
            tasks: [...col.tasks, { id: task._id, text: task.title, ...task }],
          };
        }
        return col;
      })
    );
  };

  return (
    <div className="relative">
      <header className="p-4 font-bold text-xl">
        {selectedProject?.title}
      </header>
      <div className="grid grid-cols-5 gap-2 p-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="p-4 bg-gray-100 rounded shadow"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            {/* Column Header */}
            <div className="flex items-center mb-3">
              <span className={`h-4 w-2 rounded mr-2 ${col.color}`}></span>
              <h2 className="text-xl font-semibold flex-1">{col.title}</h2>
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => {
                  navigate(`create-task/${projectId}?status=${col.status}`);
                  setVisible(true);
                }}
              >
                <Plus className="hover:cursor-pointer w-5 h-5" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {col.tasks.map((task) => {
                const ActionItems = [
                  {
                    name: "Delete Task",
                    path: "",
                    element: <Trash />,
                  },
                  {
                    name: "Edit Task",
                    path: `update-task/${task._id}`,
                    element: <Pencil />,
                  },
                ];

                return (
                  <div
                    key={task.id}
                    className="bg-white py-4 px-2 rounded-md shadow border cursor-move relative"
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
                          className="hover:cursor-pointer hover:text-blue-500 font-light text-sm"
                        >
                          {task.text}
                        </p>
                        <p className="text-xs mt-1">
                          {task.priority === "medium" ? (
                            <span className="bg-purple-500 text-white px-2 rounded">
                              {task.priority.toUpperCase()}
                            </span>
                          ) : task.priority === "high" ? (
                            <span className="bg-red-500 text-white px-2 rounded">
                              {task.priority.toUpperCase()}
                            </span>
                          ) : (
                            <span className="bg-blue-500 text-white px-2 rounded">
                              {task.priority.toUpperCase()}
                            </span>
                          )}
                        </p>
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
                          <div className="absolute right-0 top-5 bg-white shadow-lg rounded w-36 p-2 z-10 space-y-1">
                            {ActionItems.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => {
                                  if (item.path) {
                                    navigate(item.path);
                                    setVisible(true);
                                  } else console.log(item.name); // placeholder for Delete
                                  setOpenTaskOptions(null);
                                }}
                              >
                                {item.element}
                                <span className="text-sm">
                                  {index}
                                  {item.name}
                                </span>
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
