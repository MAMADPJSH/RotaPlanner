import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
