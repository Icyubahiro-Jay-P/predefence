import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./db/connectDB.js"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
})