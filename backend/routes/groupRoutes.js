import express from "express";
import { createGroupHandler } from "../controllers/groupController.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

router.post("/", verifyToken, createGroupHandler);

export default router;
