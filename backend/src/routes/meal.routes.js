import express from "express";
import { generateMeal } from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/generate", generateMeal);

export default router;