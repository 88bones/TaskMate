import React, { useEffect, useState } from "react";
import { Plus, Trash, Pencil, X, Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { getProjectActivity } from "../services/getActivity";
import { Outlet, useNavigate } from "react-router-dom";
import CreatedTeam from "./CreatedTeam";

const TimeLine = () => {
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const selectedProject = useSelector((state) => state.user.selectedProject);
  const projectId = selectedProject?._id;

  const ActionItems = [
    {
      name: "Add Task",
      path: ``,
      element: <Plus />,
    },
    {
      name: "Edit",
      path: `/project-board/${projectId}/timeline/update-project`,
      element: <Pencil />,
    },
    { name: "Delete", element: <Trash /> },
  ];

  useEffect(() => {
    if (!projectId) return;

    getProjectActivity(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setActivity([]);
        } else {
          setActivity(res);

          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="text-center text-gray-600">
          <Activity className="w-8 h-8 mx-auto mb-3 opacity-60" />
          Please select a project to view its timeline.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-linear-to-br from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <header>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Project Timeline
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedProject.title || "Untitled project"}
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl leading-relaxed">
                {selectedProject.description || "No description available."}
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              {ActionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                    if (item.name === "Edit") setVisible(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {item.element}
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Updates
              </h2>
              <span className="text-sm text-gray-500">
                {Array.isArray(activity) ? activity.length : 0} updates
              </span>
            </div>

            {Array.isArray(activity) && activity.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-6">
                  {activity.map((act, idx) => (
                    <div key={act._id || idx} className="relative pl-12">
                      <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-blue-500" />
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <p className="font-semibold text-gray-900">
                            {act.user?.firstname} {act.user?.lastname}
                          </p>
                          <span className="text-gray-400">•</span>
                          <p>{act.description}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(act.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10">
                <Activity className="w-8 h-8 text-gray-400 mb-3" />
                {error || "No activity has been logged for this project yet."}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <header className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Team</h2>
                <span className="text-sm text-gray-500">
                  {Array.isArray(selectedProject.team)
                    ? selectedProject.team.length
                    : 0}{" "}
                  members
                </span>
              </header>
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <CreatedTeam />
              </div>
            </div>
          </div>
        </div>
      </div>

      {visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setVisible(false)}
            >
              <X />
            </button>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLine;
