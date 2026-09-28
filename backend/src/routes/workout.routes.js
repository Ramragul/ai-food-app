


// Version 1

import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getMuscleGroups,
  getWorkoutTrainingGoals,
  getEquipment,
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getWorkoutTemplates,
  getWorkoutTemplateById,
  createWorkoutTemplate,
  updateWorkoutTemplate,
  deleteWorkoutTemplate,
  addWorkoutTemplateExercise,
  updateWorkoutTemplateExercise,
  deleteWorkoutTemplateExercise,
  reorderWorkoutTemplateExercises,
  getMyWorkoutAssignments,
  createWorkoutAssignment,
  getWorkoutAssignmentById,
  updateWorkoutAssignment,
  deleteWorkoutAssignment,
  deleteClientWorkoutAssignments
} from "../controllers/workout.controller.js";


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


/* ======================================================
   EXERCISE MASTER
====================================================== */

router.get("/muscle-groups", authMiddleware, getMuscleGroups);
router.get("/training-goals", authMiddleware, getWorkoutTrainingGoals);
router.get("/equipment", authMiddleware, getEquipment);
router.get("/exercises", authMiddleware, getExercises);
router.get("/exercises/:id", authMiddleware, getExerciseById);
router.post("/exercises", authMiddleware, createExercise);
router.put("/exercises/:id", authMiddleware, updateExercise);
router.delete("/exercises/:id", authMiddleware, deleteExercise);


/* ======================================================
   WORKOUT TEMPLATES
====================================================== */

router.get("/templates", authMiddleware, getWorkoutTemplates);
router.get("/templates/:id", authMiddleware, getWorkoutTemplateById);
router.post("/templates", authMiddleware, createWorkoutTemplate);
router.put("/templates/:id", authMiddleware, updateWorkoutTemplate);
router.delete("/templates/:id", authMiddleware, deleteWorkoutTemplate);


/* ======================================================
   TEMPLATE EXERCISES
====================================================== */

router.post(
  "/templates/:id/exercises",
  authMiddleware,
  addWorkoutTemplateExercise
);

router.put(
  "/templates/:id/exercises/:exerciseId",
  authMiddleware,
  updateWorkoutTemplateExercise
);

router.delete(
  "/templates/:id/exercises/:exerciseId",
  authMiddleware,
  deleteWorkoutTemplateExercise
);

router.put(
  "/templates/:id/reorder",
  authMiddleware,
  reorderWorkoutTemplateExercises
);


/* ======================================================
   WORKOUT ASSIGNMENTS
====================================================== */

router.get("/assignments", authMiddleware, getMyWorkoutAssignments);
router.post("/assignments", authMiddleware, createWorkoutAssignment);

// Keep the client bulk route before /assignments/:id.
router.delete(
  "/assignments/client/:clientMemberId",
  authMiddleware,
  deleteClientWorkoutAssignments
);

router.get("/assignments/:id", authMiddleware, getWorkoutAssignmentById);
router.put("/assignments/:id", authMiddleware, updateWorkoutAssignment);
router.delete("/assignments/:id", authMiddleware, deleteWorkoutAssignment);



/* ======================================================
   WORKOUT Execution Routes
====================================================== */


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




