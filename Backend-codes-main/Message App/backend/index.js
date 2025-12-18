import express from "express";
import connectDB from "./config/Database.con.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { config } from "dotenv";

config();
connectDB()

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
