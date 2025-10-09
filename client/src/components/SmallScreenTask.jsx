import React from "react";

const SmallScreenTask = ({ tasks, setTasks }) => {
  return (
    <div className="bg-gray-100 rounded h-fit w-full p-2">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <table className="w-full">
          {tasks.map((item, index) => (
            <div key={index} className="bg-white mb-2 p-2 rounded text-left">
              <div className="border-b-1 border-gray-400">
                <div className="flex gap-5 mb-2 justify-between">
                  <p className="text-xl font-extrabold">{item.title}</p>
                  <div className="bg-amber-50 w-fit gap-2 flex justify-between">
                    {item.priority === "medium" ? (
                      <span className="bg-green-500 text-white px-2  rounded">
                        {item.priority}
                      </span>
                    ) : item.priority === "high" ? (
                      <span className="bg-red-500 text-white px-2 rounded">
                        {item.priority}
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white px-2 rounded">
                        {item.priority}
                      </span>
                    )}
                    {item.status === "done" ? (
                      <span className="bg-green-500 text-white px-2  rounded">
                        {item.status}
                      </span>
                    ) : item.status === "in-progress" ? (
                      <span className="bg-blue-500 text-white px-2 rounded">
                        {item.status}
                      </span>
                    ) : (
                      <span className="bg-black text-white px-2 rounded">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <tr className="">
                  <th>Project</th>
                  <td>{item.projectId?.title}</td>
                </tr>
                <tr>
                  <th>Assigned To</th>
                  <td>
                    {item.assignedTo?.firstname} {item.assignedTo?.lastname}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{item.assignedTo?.email}</td>
                </tr>
                <tr>
                  <th>Due Date</th>
                  <td>{new Date(item.dueDate).toISOString().split("T")[0]}</td>
                </tr>
              </div>
            </div>
          ))}
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SmallScreenTask;
