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

  //   console.log(teams);

  return (
    <div className="bg-white w-full shadow-md rounded h-94 p-4 col-span-4 overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Teams</p>
      </header>
      {Array.isArray(teams) && teams.length > 0 ? (
        <div className="mt-2 grid grid-cols-3 gap-4 w-full max-sm:w-full  max-sm:grid-cols-1 ">
          {teams.map((item, index) => (
            <div
              key={index}
              className="max-sm:mb-4 w-full rounded shadow-md p-2 ml-2"
            >
              <p className="font-extrabold">{item.title}</p>
              {Array.isArray(item.team) ? (
                item.team.length > 0 ? (
                  <div>
                    {item.team.map((t) => (
                      <div key={t._id} className="flex justify-between">
                        <p>
                          {t.firstname} {t.lastname}
                        </p>
                        <span>{t.email}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  "No team made"
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
