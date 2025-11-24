import React, { useEffect, useState } from "react";
import { getProjects } from "../services/getProject";
import { getUser } from "../services/getUser";
import { getTasks } from "../services/getTask";
import {
  Users,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  Activity,
} from "lucide-react";

const AdminAnalytics = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch projects
        const projectsRes = await getProjects();
        const projectsData = Array.isArray(projectsRes) ? projectsRes : [];
        setProjects(projectsData);

        // Fetch users
        const usersRes = await getUser();
        const usersData = Array.isArray(usersRes) ? usersRes : [];
        setUsers(usersData);

        // Fetch tasks for all projects
        const tasksPromises = projectsData.map((project) => {
          if (project._id) {
            return getTasks(project._id).catch(() => []);
          }
          return Promise.resolve([]);
        });

        const tasksResults = await Promise.all(tasksPromises);
        const flattenedTasks = tasksResults
          .flat()
          .filter((task) => task && !task.message);
        setAllTasks(flattenedTasks);

        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Calculate metrics
  const metrics = {
    totalProjects: projects.length,
    totalUsers: users.length,
    totalTasks: allTasks.length,
    completedTasks: allTasks.filter((task) => task.status === "done").length,
    inProgressTasks: allTasks.filter((task) => task.status === "in-progress")
      .length,
    todoTasks: allTasks.filter((task) => task.status === "todo").length,
    reviewTasks: allTasks.filter((task) => task.status === "review").length,
    newTasks: allTasks.filter((task) => task.status === "new").length,
    highPriorityTasks: allTasks.filter((task) => task.priority === "high")
      .length,
    mediumPriorityTasks: allTasks.filter((task) => task.priority === "medium")
      .length,
    lowPriorityTasks: allTasks.filter((task) => task.priority === "low").length,
    overdueTasks: allTasks.filter((task) => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date() && task.status !== "done";
    }).length,
    activeProjects: projects.filter((project) => {
      if (!project.endDate) return true;
      return new Date(project.endDate) >= new Date();
    }).length,
    completedProjects: projects.filter((project) => {
      if (!project.endDate) return false;
      return new Date(project.endDate) < new Date();
    }).length,
  };

  // Task status distribution
  const taskStatusData = [
    { label: "New", count: metrics.newTasks, color: "bg-gray-400" },
    { label: "To Do", count: metrics.todoTasks, color: "bg-red-500" },
    {
      label: "In Progress",
      count: metrics.inProgressTasks,
      color: "bg-orange-500",
    },
    { label: "Review", count: metrics.reviewTasks, color: "bg-yellow-500" },
    { label: "Done", count: metrics.completedTasks, color: "bg-green-500" },
  ];

  // Priority distribution
  const priorityData = [
    { label: "High", count: metrics.highPriorityTasks, color: "bg-red-600" },
    {
      label: "Medium",
      count: metrics.mediumPriorityTasks,
      color: "bg-yellow-500",
    },
    { label: "Low", count: metrics.lowPriorityTasks, color: "bg-green-500" },
  ];

  // Calculate completion rate
  const completionRate =
    metrics.totalTasks > 0
      ? ((metrics.completedTasks / metrics.totalTasks) * 100).toFixed(1)
      : 0;

  // Recent projects (last 5)
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  // Projects with most tasks
  const projectsWithTaskCount = projects.map((project) => {
    const projectTasks = allTasks.filter(
      (task) =>
        task.projectId === project._id || task.projectId?._id === project._id
    );
    return {
      ...project,
      taskCount: projectTasks.length,
    };
  });

  const topProjects = [...projectsWithTaskCount]
    .sort((a, b) => b.taskCount - a.taskCount)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of projects, tasks, and team performance
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Projects"
            value={metrics.totalProjects}
            icon={<FolderKanban className="w-6 h-6" />}
            color="bg-blue-500"
            subtitle={`${metrics.activeProjects} active`}
          />
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            icon={<Users className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <MetricCard
            title="Total Tasks"
            value={metrics.totalTasks}
            icon={<Target className="w-6 h-6" />}
            color="bg-indigo-500"
            subtitle={`${completionRate}% completed`}
          />
          <MetricCard
            title="Overdue Tasks"
            value={metrics.overdueTasks}
            icon={<AlertCircle className="w-6 h-6" />}
            color="bg-red-500"
            warning={metrics.overdueTasks > 0}
          />
        </div>

        {/* Task Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Task Status Distribution
            </h2>
            <div className="space-y-4">
              {taskStatusData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{
                        width: `${
                          metrics.totalTasks > 0
                            ? (item.count / metrics.totalTasks) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Task Priority Distribution
            </h2>
            <div className="space-y-4">
              {priorityData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label} Priority
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{
                        width: `${
                          metrics.totalTasks > 0
                            ? (item.count / metrics.totalTasks) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="In Progress"
            value={metrics.inProgressTasks}
            icon={<Clock className="w-5 h-5" />}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Under Review"
            value={metrics.reviewTasks}
            icon={<Activity className="w-5 h-5" />}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Completed"
            value={metrics.completedTasks}
            icon={<CheckCircle2 className="w-5 h-5" />}
            color="text-green-600"
            bgColor="bg-green-50"
          />
        </div>

        {/* Recent Projects & Top Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Projects
            </h2>
            <div className="space-y-3">
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <h3 className="font-medium text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description || "No description"}
                    </p>
                    {project.startDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Started:{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No projects found</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Top Projects by Tasks
            </h2>
            <div className="space-y-3">
              {topProjects.length > 0 ? (
                topProjects.map((project) => (
                  <div
                    key={project._id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {project.taskCount} tasks
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {project.taskCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No projects found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, color, subtitle, warning }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p
            className={`text-3xl font-bold ${
              warning ? "text-red-600" : "text-gray-900"
            }`}
          >
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, bgColor }) => {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 border-2 border-transparent hover:border-gray-300 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
