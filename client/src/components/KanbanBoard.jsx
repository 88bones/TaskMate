import React, { useState } from "react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../services/getTask";

function KanbanBoard() {
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

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

  const handleDragStart = (e, colId, taskId) => {
    e.dataTransfer.setData("colId", colId);
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e, dropColId) => {
    const colId = parseInt(e.dataTransfer.getData("colId"));
    const taskId = parseInt(e.dataTransfer.getData("taskId"));

    if (!colId || !taskId) return;

    const newColumns = [...columns];
    const fromCol = newColumns.find((c) => c.id === colId);
    const toCol = newColumns.find((c) => c.id === dropColId);

    const task = fromCol.tasks.find((t) => t.id === taskId);

    task.status = toCol.status;

    fromCol.tasks = fromCol.tasks.filter((t) => t.id !== taskId);
    toCol.tasks.push(task);

    setColumns(newColumns);
  };

  const allowDrop = (e) => e.preventDefault();

  // GET TASKS
  useEffect(() => {
    if (!projectId) return;

    getTasks(projectId)
      .then((tasks) => {
        if (!Array.isArray(tasks)) return;

        // Copy columns so we don't mutate state
        const updated = columns.map((col) => ({ ...col, tasks: [] }));

        // distribute tasks
        tasks.forEach((task) => {
          const col = updated.find((c) => c.status === task.status);
          if (col) {
            col.tasks.push({
              id: task._id,
              text: task.title,
              ...task,
            });
          }
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
      <header className="p-4 font-bold text-xl">{selectedProject.title}</header>
      <div className="grid grid-cols-5 gap-2 p-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="p-4 bg-gray-100 rounded shadow"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="flex items-center mb-3">
              <span className={`h-4 w-4 rounded-full mr-2 ${col.color}`}></span>
              <h2 className="text-xl font-semibold flex-1">{col.title}</h2>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <Plus
                  onClick={() => {
                    navigate(`create-task/${projectId}?status=${col.status}`);
                    setVisible(true);
                  }}
                />
              </button>
            </div>

            <div className="space-y-3">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-md shadow-md border cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, col.id, task.id)}
                >
                  <div className="flex justify-between">
                    {task.text}
                    <EllipsisVertical size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {visible && (
        <div className="absolute top-0 min-w-full flex justify-center backdrop-blur-2xl gap-10 py-10">
          <Outlet context={{ addNewTask }} />
          <X onClick={() => setVisible(!visible)}></X>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
