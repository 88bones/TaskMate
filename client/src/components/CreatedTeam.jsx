import React, { useEffect, useState } from "react";
import { getTeam } from "../services/getTeam";
import { useSelector } from "react-redux";

const CreatedTeam = () => {
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTeam(projectId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setTeam([]);
        } else {
          setTeam(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load team.");
      });
  }, [projectId]);

  return (
    <div>
      {Array.isArray(team.team) && team.team.length > 0 ? (
        <div className="">
          {team.team.map((member) => (
            <div key={member._id} className="mb-2 p-2 border-b">
              <p className="">
                {member.firstname} {member.lastname}
              </p>
              <p className="text-xs text-gray-400">{member.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">{error || "No team members found."}</p>
      )}
    </div>
  );
};

export default CreatedTeam;
