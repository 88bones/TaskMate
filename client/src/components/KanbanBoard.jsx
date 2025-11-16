import React from "react";
import { useSelector } from "react-redux";
import { Kanban } from "react-kanban-kit";

const KanbanBoard = () => {
  const selectedProject = useSelector((state) => state.user.selectedProject);
  const projectId = selectedProject?._id;

  const dataSource = {};

  const configMap = {};

  return (
    <div>
      <h1>{projectId}</h1>
      <Kanban />
    </div>
  );
};

export default KanbanBoard;
