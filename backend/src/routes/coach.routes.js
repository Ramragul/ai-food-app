import express from "express";

import {
  getMyClients
} from "../controllers/coach.controller.js";

import {
  authMiddleware
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/* 🔥 MY CLIENTS */

router.get(
  "/my-clients",
  authMiddleware,
  getMyClients
);

export default router;