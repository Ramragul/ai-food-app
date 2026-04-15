import express from "express";
import { createProfile, getAllProfiles, getActiveProfile } from "../controllers/profile.controller.js";

const router = express.Router();

// ✅ create / update
// router.post("/profile", createProfile);

// // ✅ fetch profile
// router.get("/profile/:userId", getProfile);

router.post("/profile", createProfile);
router.get("/profile/:userId", getAllProfiles);
router.get("/profile/active/:userId", getActiveProfile);

export default router;