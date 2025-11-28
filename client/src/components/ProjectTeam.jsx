import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getTeam } from "../services/getTeam";
import { getUser } from "../services/getUser";
import { addTeamMember } from "../services/postTeam";
import { Plus, X } from "lucide-react";

const ProjectTeam = () => {
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject?._id;

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getTeam(projectId)
      .then((res) => {
        const members = Array.isArray(res?.team)
          ? res.team
          : Array.isArray(res)
          ? res
          : [];
        setTeamMembers(members);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load team members");
      })
      .finally(() => setLoading(false));

    // Fetch all users for add modal
    getUser()
      .then((users) => {
        setAllUsers(Array.isArray(users) ? users : []);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [projectId]);

  const departments = useMemo(() => {
    const setDept = new Set();
    teamMembers.forEach((m) => {
      if (m.department) setDept.add(m.department);
    });
    return ["all", ...Array.from(setDept)];
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    if (departmentFilter === "all") return teamMembers;
    return teamMembers.filter(
      (m) => String(m.department) === String(departmentFilter)
    );
  }, [teamMembers, departmentFilter]);

  // Get users not already in team
  const availableUsers = useMemo(() => {
    const teamUserIds = new Set(teamMembers.map((m) => String(m._id)));
    return allUsers.filter((u) => !teamUserIds.has(String(u._id)));
  }, [allUsers, teamMembers]);

  const handleAddMember = async () => {
    if (!selectedUserId || !projectId) return;
    setAddingMember(true);
    try {
      await addTeamMember(projectId, selectedUserId);
      // Refresh team members
      const res = await getTeam(projectId);
      const members = Array.isArray(res?.team)
        ? res.team
        : Array.isArray(res)
        ? res
        : [];
      setTeamMembers(members);
      setShowAddModal(false);
      setSelectedUserId("");
    } catch (err) {
      console.error("Failed to add member:", err);
      alert("Failed to add member to team");
    } finally {
      setAddingMember(false);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading team...</div>;

  return (
    <div className="p-6 bg-linear-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Project Team</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredMembers.length} member
            {filteredMembers.length !== 1 ? "s" : ""} in selected department
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Filter by Department
        </label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All Departments" : d}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {filteredMembers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 text-sm">
            No members found for this department.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 transform hover:scale-105 duration-200"
            >
              <div className="flex flex-col items-center text-center">
                {member.photo ? (
                  <img
                    src={`http://localhost:3001${member.photo}`}
                    alt={`${member.firstname} ${member.lastname}`}
                    className="w-16 h-16 rounded-full object-cover bg-gray-200 mb-3 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg font-bold text-white mb-3 shadow-md">
                    {member.firstname
                      ? `${member.firstname[0]}${
                          member.lastname ? member.lastname[0] : ""
                        }`
                      : member.username?.slice(0, 2)}
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-800">
                  {member.firstname} {member.lastname}
                </div>
                <div className="text-xs text-gray-500 mt-1 break-all">
                  {member.email}
                </div>
                <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {member.department}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Add Team Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {availableUsers.length === 0 ? (
              <p className="text-gray-600 text-sm">
                All users are already in the team.
              </p>
            ) : (
              <>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                  <option value="">Select a user...</option>
                  {availableUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstname} {user.lastname} ({user.department})
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    disabled={!selectedUserId || addingMember}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingMember ? "Adding..." : "Add Member"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTeam;
