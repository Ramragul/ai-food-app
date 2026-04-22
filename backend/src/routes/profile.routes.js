// import express from "express";
// import { createProfile, getAllProfiles, getActiveProfile } from "../controllers/profile.controller.js";

// const router = express.Router();

// // ✅ create / update
// // router.post("/profile", createProfile);

// // // ✅ fetch profile
// // router.get("/profile/:userId", getProfile);

// router.post("/profile", createProfile);
// router.get("/profile/:userId", getAllProfiles);
// router.get("/profile/active/:userId", getActiveProfile);

// export default router;


// version 2 

import express from "express";
import {
  createProfile,
  getAllProfiles,
  getActiveProfile
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ create new fitness state
router.post("/", authMiddleware, createProfile);

// ✅ history
router.get("/", authMiddleware, getAllProfiles);

// ✅ active (MOST IMPORTANT)
router.get("/active/me", authMiddleware, getActiveProfile);

export default router;