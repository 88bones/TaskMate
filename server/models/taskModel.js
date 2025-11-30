import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["new", "todo", "in-progress", "review", "done"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    dueDate: Date,
    attachments: [String],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
