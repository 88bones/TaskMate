import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    action: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
