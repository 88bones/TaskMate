import React, { useEffect, useMemo, useState } from "react";
import {
  FolderKanban,
  AlertCircle,
  Clock,
  Users,
  Search,
  ChevronDown,
} from "lucide-react";
import { getProjects } from "../services/getProject";
import { deleteProject } from "../services/deleteProject";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        const projectList = Array.isArray(response) ? response : [];
        setProjects(projectList);
        setError(projectList.length === 0 ? "No projects available yet." : "");
      } catch (err) {
        console.error(err);
        setError("Unable to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const decoratedProjects = useMemo(
    () =>
      projects.map((project) => {
        const teamCount = Array.isArray(project.team) ? project.team.length : 0;

        return {
          ...project,
          teamCount,
        };
      }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return (
      decoratedProjects
        .filter((project) => {
          if (!term) return true;
          return (
            project.title?.toLowerCase().includes(term) ||
            project.description?.toLowerCase().includes(term)
          );
        })
        // sorting
        .sort((a, b) => {
          const dir = sortDirection === "asc" ? 1 : -1;
          const valueA = a[sortKey];
          const valueB = b[sortKey];

          if (!valueA && !valueB) return 0;
          if (!valueA) return dir;
          if (!valueB) return -dir;

          if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB) * dir;
          }

          const dateA = new Date(valueA).getTime();
          const dateB = new Date(valueB).getTime();

          return (dateA - dateB) * dir;
        })
    );
  }, [decoratedProjects, searchTerm, sortDirection, sortKey]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("desc");
  };

  const formatDate = (date) => {
    if (!date) return "—";
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date;
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Delete this project permanently?")) return;

    try {
      setPendingDeleteId(projectId);
      setDeleteError("");
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete project. Please try again.");
    } finally {
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-gray-600">
        <Clock className="w-6 h-6 animate-spin mr-2" />
        Loading projects...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Projects Control Center
          </h1>
          <p className="text-gray-600">
            Monitor every project, track timelines, and jump straight into the
            workspaces that need you.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <section className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <ThButton
                    label="Project"
                    sortKey="title"
                    activeKey={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                  />
                  <ThButton
                    label="Owner"
                    sortKey="createdBy"
                    activeKey={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                  />
                  <ThButton
                    label="Team"
                    sortKey="teamCount"
                    activeKey={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                    className="hidden md:table-cell"
                  />
                  <ThButton
                    label="Start"
                    sortKey="startDate"
                    activeKey={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                  />
                  <ThButton
                    label="Due"
                    sortKey="endDate"
                    activeKey={sortKey}
                    direction={sortDirection}
                    onSort={handleSort}
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Nothing matches your filters.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          {project.title || "Untitled project"}
                        </p>
                        <p className="text-gray-500 line-clamp-1">
                          {project.description || "No description"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-light text-gray-900">
                          {project.createdBy?.firstname || "Untitled project"}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          {project.teamCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(project.startDate)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(project.endDate)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={pendingDeleteId === project._id}
                        >
                          {pendingDeleteId === project._id ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              Removing...
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4" />
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

const ThButton = ({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  className,
}) => {
  const isActive = sortKey === activeKey;
  return (
    <th
      className={`px-6 py-3 cursor-pointer select-none ${className || ""}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="inline-flex items-center gap-1">
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            isActive && direction === "asc" ? "rotate-180" : ""
          } ${isActive ? "text-gray-900" : "text-gray-400"}`}
        />
      </div>
    </th>
  );
};

export default AdminProjects;
