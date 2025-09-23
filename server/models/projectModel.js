import mongoose from "mongoose";
import TaskSchema from "./taskModel";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endTask: {
      type: Date,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
