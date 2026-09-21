// Version 1

// import express from "express";

// import { authMiddleware } from "../middlewares/auth.middleware.js";

// import {
//   getMuscleGroups,
//   getEquipment,
//   getExercises,
//   getExerciseById,
//   createExercise,
//   updateExercise
// } from "../controllers/workout.controller.js";


// const router =
//   express.Router();


// /* ======================================================
//    EXERCISE MASTER
// ====================================================== */

// router.get(
//   "/muscle-groups",
//   authMiddleware,
//   getMuscleGroups
// );


// router.get(
//   "/equipment",
//   authMiddleware,
//   getEquipment
// );


// router.get(
//   "/exercises",
//   authMiddleware,
//   getExercises
// );


// router.get(
//   "/exercises/:id",
//   authMiddleware,
//   getExerciseById
// );


// router.post(
//   "/exercises",
//   authMiddleware,
//   createExercise
// );


// router.put(
//   "/exercises/:id",
//   authMiddleware,
//   updateExercise
// );


// export default router;


// Version 2

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
  getWorkoutTemplates,
  getWorkoutTemplateById,
  createWorkoutTemplate,
  updateWorkoutTemplate,
  deleteWorkoutTemplate,
  addWorkoutTemplateExercise,
  updateWorkoutTemplateExercise,
  deleteWorkoutTemplateExercise,
  reorderWorkoutTemplateExercises
} from "../controllers/workout.controller.js";


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


export default router;
