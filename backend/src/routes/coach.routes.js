import express from "express";

import {
  getMyClients,  getDashboard, getClientDetails , getCoachNotes, createCoachNote , updateCoachNote,
   deleteCoachNote,getClientActivity,assignClientGoal, getNutritionIntelligence
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

/* 🔥 COACH DASHBOARD */

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

/* 🔥 CLIENT DETAILS */

router.get(
  "/client/:memberId",
  authMiddleware,
  getClientDetails
);

router.get(
    "/client/:memberId/notes",
    authMiddleware,
    getCoachNotes
);



router.post(
    "/client/:memberId/notes",
    authMiddleware,
    createCoachNote
);

router.put(
    "/notes/:noteId",
    authMiddleware,
    updateCoachNote
);

router.delete(
    "/notes/:noteId",
    authMiddleware,
    deleteCoachNote
);

router.get(
    "/client/:memberId/activity",
    authMiddleware,
    getClientActivity
);

router.post(
    "/client/:memberId/goal",
    authMiddleware,
    assignClientGoal
);


router.get(
    "/client/:memberId/nutrition-intelligence",
    authMiddleware,
    getNutritionIntelligence
);



// router.get(

//   "/dashboard",

//  authMiddleware,

//   getDashboard

// );

export default router;