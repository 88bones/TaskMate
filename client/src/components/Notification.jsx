import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProjectNotification } from "../services/getNotification";
import { markAllRead } from "../services/updateNotification";
import { useState } from "react";
import { Clock } from "lucide-react";

const Notification = ({ onCount }) => {
  const { _id: userId } = useSelector((state) => state.user);

  const [notifications, setIsNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    getProjectNotification(userId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
          setIsNotifications([]);
        } else {
          const notificationList = Array.isArray(res.data) ? res.data : [];
          setIsNotifications(notificationList);
          onCount(notificationList.length);
          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load notifications");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64 text-gray-600">
        <Clock className="w-6 h-6 animate-spin mr-2" />
        Loading notifications...
      </div>
    );
  }

  const handleMarkAllRead = async () => {
    const res = await markAllRead(userId);

    if (res) console.log("asd");
    setIsNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onCount(0);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-xl w-full max-w-sm">
      <h1 className="text-lg font-semibold text-gray-800 mb-3">
        Notifications
      </h1>
      {error && <p className="text-gray-500 text-sm mb-2">{error}</p>}
      <div className="bg-white rounded-lg shadow-sm max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-400 text-sm">
            No notifications yet
          </div>
        ) : (
          <ul className="flex flex-col divide-y">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">
                      {notification.message}
                    </p>
                    <div className="flex  items-center gap-2 mt-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-950 text-xs rounded font-semibold">
                        {notification.entityType}
                      </span>
                      <span className="text-gray-400 text-xs whitespace-nowrap ml-2">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleMarkAllRead}
        className="px-2 text-xs text-blue-900 mt-2 hover:underline cursor-pointer w-full flex justify-end"
      >
        Mark all as read
      </button>
    </div>
  );
};

export default Notification;
