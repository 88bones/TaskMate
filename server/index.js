import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/timely")
  .then(() => console.log("Connected to DB."))
  .catch((error) => console.error("Failed: " + error));

app.listen(PORT, () => {
  console.log("App is running.");
});
