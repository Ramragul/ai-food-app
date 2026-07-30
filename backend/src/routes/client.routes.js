import express from "express";

import {
  getMyCoachNotes
} from "../controllers/client.controller.js";

import {
  authMiddleware
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/coach-notes",
    authMiddleware,
    getMyCoachNotes
);