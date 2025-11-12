import mongoose from "mongoose";

const SprintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    goal: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["planned", "active", "completed"],
      default: "planned",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Sprint = mongoose.model("Sprint", SprintSchema);
export default Sprint;
