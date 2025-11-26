import React, { useEffect, useState } from "react";
import { getUser } from "../services/getUser";
import { Pencil, Trash, X } from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

const UserDisplay = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const Avatar = ({ user, sizeClass = "w-12 h-12" }) => {
    const [imgError, setImgError] = useState(false);
    const initials = `${user.firstname?.[0] || ""}${
      user.lastname?.[0] || ""
    }`.toUpperCase();

    const src = user.photo
      ? user.photo.startsWith("http")
        ? user.photo
        : `http://localhost:3001${user.photo}`
      : null;

    return (
      <div
        className={`${sizeClass} rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center border`}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={`${user.firstname} ${user.lastname}`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-sm font-semibold text-gray-700">
            {initials || "U"}
          </div>
        )}
      </div>
    );
  };

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
    <div className="p-4 col-span-2">
      <div className="h-fit rounded-2xl border border-gray-100 bg-white shadow-xl p-6">
        <header className="flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase text-blue-600 tracking-widest">
            Directory
          </p>
          <h1 className="text-2xl font-bold text-gray-900">All users</h1>
        </header>

        <div className="mt-6">
          {Array.isArray(users) && users.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 max-h-128 overflow-y-auto pr-1">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <Avatar user={user} sizeClass="w-12 h-12" />
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-xs font-bold text-blue-600 tracking-wide">
                        {user.department?.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex">
                    {ActionItems.map((item, index) => (
                      <button
                        key={index}
                        className=" rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition"
                        onClick={() => {
                          navigate(`edit-user/${user._id}`);
                          setVisible(true);
                        }}
                      >
                        {item.element}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 border border-dashed border-gray-200 rounded-2xl">
              {error || "No users found yet."}
            </div>
          )}
        </div>
      </div>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6">
            <button
              className="absolute top-4 right-4 p-2 rounded-full text-blue-600 hover:bg-gray-100"
              onClick={() => setVisible(false)}
            >
              <X className="w-5 h-5 text-blue-600" />
            </button>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
