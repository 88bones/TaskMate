import React, { useEffect, useState } from "react";
import { getUser } from "../services/getUser";
import { Pencil, Trash, X } from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

const UserDisplay = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const ActionItems = [
    { name: "Edit", element: <Pencil /> },
    { name: "Delete", element: <Trash /> },
  ];

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setUsers(res);
          setError("");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 col-span-2 w-full">
      <div className="h-fit shadow p-4 rounded">
        <header className="font-bold text-xl">
          <h1>All users</h1>
        </header>

        <div className="mt-4 relative">
          {Array.isArray(users) && users.length > 0 ? (
            <ul className="flex rounded h-88 flex-col gap-4 overflow-scroll overflow-x-hidden">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    {user.firstname} {user.lastname}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {ActionItems.map((item, index) => (
                      <button
                        key={index}
                        className="p-2 hover:bg-gray-200 rounded"
                        onClick={() => {
                          navigate(`edit-user/${user._id}`);
                          setVisible(true);
                        }}
                      >
                        {item.element}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      {visible && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center backdrop-blur-2xl z-20">
          <Outlet />
          <button
            className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200"
            onClick={() => setVisible(false)}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
