import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["bug", "question", "enhancement"],
    },
    severity: {
      type: String,
      enum: ["minor", "normal", "important", "critical"],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;
