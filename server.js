import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const port = 8080;

app.listen(port, () => {
  console.warn(`Server running on ${port}`.bgMagenta.white);
});
