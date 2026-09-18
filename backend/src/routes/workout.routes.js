import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getMuscleGroups,
  getEquipment,
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise
} from "../controllers/workout.controller.js";


const router =
  express.Router();


/* ======================================================
   EXERCISE MASTER
====================================================== */

router.get(
  "/muscle-groups",
  authMiddleware,
  getMuscleGroups
);


router.get(
  "/equipment",
  authMiddleware,
  getEquipment
);


router.get(
  "/exercises",
  authMiddleware,
  getExercises
);


router.get(
  "/exercises/:id",
  authMiddleware,
  getExerciseById
);


router.post(
  "/exercises",
  authMiddleware,
  createExercise
);


router.put(
  "/exercises/:id",
  authMiddleware,
  updateExercise
);


export default router;