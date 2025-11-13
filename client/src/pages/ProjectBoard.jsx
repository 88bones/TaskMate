import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneProject } from "../services/getProject";
import { setSelectedProject } from "../redux/slice";
import SideBar from "../components/SideBar";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  useEffect(() => {
    getOneProject(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          dispatch(setSelectedProject(null));
        } else {
          dispatch(setSelectedProject(res)); 
          setError("");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch project");
      });
  }, [projectId, dispatch]);

  return (
    <div className="flex">
      <SideBar projectId={projectId} />
      <div className="flex-1">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default ProjectBoard;
