import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProject } from "../services/getProject";
import { setSelectedProject } from "../redux/slice";
import SideBar from "../components/SideBar";
import { Home } from "lucide-react";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const { signedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    <>
      {signedIn ? (
        <div className="flex relative">
          <SideBar projectId={projectId} />
          <div className="fixed group bottom-5 right-5 z-20 rounded-full p-2 shadow hover:shadow-lg hover:bg-blue-500 hover:scale-120 cursor-pointer bg-blue-200">
            <span className="" onClick={() => navigate("/dashboard")}>
              <Home />
            </span>

            <span className="fixed z-20 text-xs right-0 bottom-11 group opacity-0 group-hover:opacity-100 bg-black text-white px-2 rounded">
              Dashboard
            </span>
          </div>
          <div className="flex-1">
            {error ? <p className="text-red-500">{error}</p> : <Outlet />}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectBoard;
