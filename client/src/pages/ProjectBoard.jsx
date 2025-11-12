import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getOneProject } from "../services/getProject";
import SideBar from "../components/SideBar";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOneProject(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setProject([]);
        } else {
          setProject(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectId]);

  return (
    <div className="flex">
      <SideBar projectId={projectId} />
      <Outlet />
    </div>
  );
};

export default ProjectBoard;
