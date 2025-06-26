import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/adminRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/groups", groupRoutes);

export default app;
