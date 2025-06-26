import express from "express";
import { createRole, getRoles } from "../controllers/roleController";
import { verifyToken } from "../utils/auth.js";
import { isAdmin } from "../utils/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createRole);
router.get("/", verifyToken, isAdmin, getRoles);
