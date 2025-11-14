import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/taskmate")
  .then(() => console.log("Connected to DB."))
  .catch((error) => console.error("Failed: " + error));

app.use("/api/users", userRoutes);
app.use("/api/signin", loginRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/activity", activityRoutes);

app.listen(PORT, () => {
  console.log("App is running.");
});
