import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

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

app.listen(PORT, () => {
  console.log("App is running.");
});
