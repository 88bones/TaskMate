import React, { useEffect, useState } from "react";
import { getTeam } from "../services/getTeam";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

const CreatedTeam = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const ActionItems = [
    { name: "Edit", path: ``, element: <Pencil /> },
    { name: "Delete", path: ``, element: <Trash /> },
  ];

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
    <div className="bg-gray-100 w-full shadow-md rounded h-94 p-4 col-span-4 overflow-scroll overflow-x-hidden">
      <header className="mb-2 font-extrabold text-xl">
        <p>Created Teams</p>
      </header>
      {Array.isArray(teams) && teams.length > 0 ? (
        <div className="mt-2 grid grid-cols-3 gap-4 w-full max-sm:w-full  max-sm:grid-cols-1 ">
          {teams.map((item, index) => (
            <div
              key={index}
              className="max-sm:mb-4 w-full rounded shadow-md p-2 h-fit bg-white"
            >
              <div className="flex justify-between">
                <p className="font-extrabold text-xl">{item.title}</p>
                <div className="inline-flex items-center w-28 justify-evenly pr-2">
                  {ActionItems.map((items, index) => (
                    <button
                      className="relative flex group items-center cursor-pointer size-5"
                      key={index}
                      onClick={() => navigate(`${items.path}${project._id}`)}
                    >
                      {items.element}
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -top-8
                                   hidden group-hover:block
                                     bg-black text-white text-xs rounded-md
                                        px-2 py-1 whitespace-nowrap shadow-md
                                          transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                      >
                        {items.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {Array.isArray(item.team) ? (
                item.team.length > 0 ? (
                  <div className="">
                    {item.team.map((t) => (
                      <div key={t._id} className="flex justify-between ">
                        <p className="flex flex-col mb-2">
                          {t.firstname} {t.lastname}
                          <span className="text-xs text-gray-400">
                            {t.email}
                          </span>
                        </p>
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
