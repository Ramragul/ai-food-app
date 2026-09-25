// version 1

import express from "express";
import {
  createProfile,
  getAllProfiles,
  getActiveProfile,
  removeActiveGoal
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ create new fitness state
router.post("/", authMiddleware, createProfile);

// ✅ history
router.get("/", authMiddleware, getAllProfiles);

router.delete("/active", authMiddleware, removeActiveGoal)

// ✅ active (MOST IMPORTANT)
router.get("/active/me", authMiddleware, getActiveProfile);

export default router;