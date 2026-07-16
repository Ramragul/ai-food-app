import express from "express";

import {
  getMyClients,  getDashboard, getClientDetails
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

// router.get(

//   "/dashboard",

//  authMiddleware,

//   getDashboard

// );

export default router;