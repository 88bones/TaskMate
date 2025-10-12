import React, { useEffect, useState } from "react";
import { getTeam } from "../services/getTeam";

const CreatedTeam = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTeam()
      .then((res) => {
        if (res.message) {
          setTeams([]);
          setError("No teams for the project");
        } else {
          setTeams(res);
          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(teams);

  return (
    <div>
      <h1>Created Teams</h1>
      {Array.isArray(teams) && teams.length > 0 ? (
        <div className="flex flex-col bg-white gap-5 w-full">
          {teams.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              {Array.isArray(item.team) ? (
                item.team.length > 0 ? (
                  <div>
                    {item.team.map((t) => (
                      <div key={t._id}>{t.firstname}</div>
                    ))}
                  </div>
                ) : (
                  "no teams"
                )
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
};

export default CreatedTeam;
