import express from "express";

import { authMiddleware }
from "../middlewares/auth.middleware.js";

import {
  getMealPlan,
} from "../controllers/mealPlan.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getMealPlan
);

export default router;