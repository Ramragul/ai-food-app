// import express from "express";
// import { addMeal } from "../controllers/nutrition.controller.js";
// import { getDashboard } from "../controllers/dashboard.controller.js";

// const router = express.Router();

// router.post("/add/meal", addMeal);
// router.get("/dashboard", getDashboard);

// export default router;

// version 2 


// import express from "express";
// import {
//   getDashboard,
// //   getWeeklySummary,
// //   getMonthlySummary
// } from "../controllers/dashboard.controller.js";
// import { addMeal } from "../controllers/nutrition.controller.js";

// const router = express.Router();

// router.post("/add-meal", addMeal);

// // 🔥 NEW
// router.get("/dashboard-summary", getDashboard);
// // router.get("/weekly-summary", getWeeklySummary);
// // router.get("/monthly-summary", getMonthlySummary);

// export default router;



// Version 3 

import express from "express";
import {
  addMeal,
  confirmMeal
} from "../controllers/nutrition.controller.js";

import { getDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/add-meal", addMeal);          // AI parse + preview
router.post("/confirm-meal", confirmMeal);  // Save to DB

router.get("/dashboard-summary", getDashboard);

export default router;