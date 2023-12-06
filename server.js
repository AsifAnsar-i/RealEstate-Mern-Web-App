import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import listingRoutes from "./routes/listingRoute.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const port = 8080;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", listingRoutes);

app.listen(port, () => {
  console.warn(`Server running on ${port}`.bgMagenta.white);
});
