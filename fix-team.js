const fs = require("fs");

const content = `import React, { useEffect, useState } from "react";
import { getTeam } from "../services/getTeam";
import { useSelector } from "react-redux";

const CreatedTeam = () => {
  const { selectedProject } = useSelector((state) => state.user);
  const projectId = selectedProject._id;

  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");

  const Avatar = ({ member, sizeClass = "w-10 h-10" }) => {
    const [imgError, setImgError] = useState(false);
    const initials = \`\${member.firstname?.[0] || ""}\${member.lastname?.[0] || ""}\`.toUpperCase();

    const src = member.photo
      ? member.photo.startsWith("http")
        ? member.photo
        : \`http://localhost:3001\${member.photo}\`
      : null;

    return (
      <div className={\`\${sizeClass} rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center border\`}>
        {src && !imgError ? (
          <img
            src={src}
            alt={\`\${member.firstname} \${member.lastname}\`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs font-semibold text-gray-700">
            {initials || "M"}
          </div>
        )}
      </div>
    );
  };

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
            <div key={member._id} className="mb-2 p-2 border-b flex items-center gap-3">
              <Avatar member={member} sizeClass="w-10 h-10" />

              <div>
                <p className="">
                  {member.firstname} {member.lastname}
                </p>
                <p className="text-xs text-gray-400">{member.email}</p>
              </div>
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
`;

fs.writeFileSync(
  "c:\\Users\\user\\Documents\\My-Projects\\REACT\\TaskMate\\client\\src\\components\\CreatedTeam.jsx",
  content,
  "utf8"
);
console.log("CreatedTeam.jsx updated successfully");
