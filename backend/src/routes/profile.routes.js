import express from "express";
import { createProfile, getProfile } from "../controllers/profile.controller.js";

const router = express.Router();

// ✅ create / update
router.post("/profile", createProfile);

// ✅ fetch profile
router.get("/profile/:userId", getProfile);

export default router;