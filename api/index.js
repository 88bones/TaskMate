import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "../../server/routes/userRoutes.js";
import loginRoutes from "../../server/routes/loginRoutes.js";
import projectRoutes from "../../server/routes/projectRoutes.js";
import taskRoutes from "../../server/routes/taskRoutes.js";
import teamRoutes from "../../server/routes/teamRoutes.js";
import activityRoutes from "../../server/routes/activityRoutes.js";
import notificationRoute from "../../server/routes/notificationRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongodbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/taskmate";

if (!mongoose.connections[0].readyState) {
  mongoose
    .connect(mongodbUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection failed:", error));
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/signin", loginRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notification", notificationRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
