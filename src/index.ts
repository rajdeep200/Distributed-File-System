import express from "express";
import fileRoutes from "./routes/file.route";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { connectProducer } from "./kafka/producer";
import { runConsumer } from "./kafka/consumer";

dotenv.config();
connectDB();
connectProducer();
runConsumer();
const app = express();

app.use(express.json());
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
