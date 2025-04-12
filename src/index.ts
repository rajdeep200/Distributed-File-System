import express from "express";
import fileRoutes from "./routes/file.route";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
