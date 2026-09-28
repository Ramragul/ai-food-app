import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getMyClientWorkoutAssignments,
  getMyClientWorkoutAssignmentById,
  startWorkoutSession,
  getActiveWorkoutSession,
  getWorkoutSession,
  pauseWorkoutSession,
  resumeWorkoutSession,
  completeWorkoutSet,
  skipWorkoutSet,
  skipWorkoutRest,
  extendWorkoutRest,
  finishWorkoutSession,
  getWorkoutSessionHistory,
} from "../controllers/workoutUser.controller.js";

const router = express.Router();

router.get("/my/assignments", authMiddleware, getMyClientWorkoutAssignments);
router.get("/my/assignments/:id", authMiddleware, getMyClientWorkoutAssignmentById);

router.post(
  "/my/assignments/:assignmentId/sessions",
  authMiddleware,
  startWorkoutSession
);

router.get("/my/sessions/active", authMiddleware, getActiveWorkoutSession);
router.get("/my/sessions/history", authMiddleware, getWorkoutSessionHistory);
router.get("/my/sessions/:id", authMiddleware, getWorkoutSession);
router.post("/my/sessions/:id/pause", authMiddleware, pauseWorkoutSession);
router.post("/my/sessions/:id/resume", authMiddleware, resumeWorkoutSession);
router.post("/my/sessions/:id/sets/complete", authMiddleware, completeWorkoutSet);
router.post("/my/sessions/:id/sets/skip", authMiddleware, skipWorkoutSet);
router.post("/my/sessions/:id/rest/skip", authMiddleware, skipWorkoutRest);
router.post("/my/sessions/:id/rest/extend", authMiddleware, extendWorkoutRest);
router.post("/my/sessions/:id/finish", authMiddleware, finishWorkoutSession);

export default router;