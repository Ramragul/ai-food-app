import express from "express";
import { trackMeal } from "../controllers/trackMeal.controller.js";

const router = express.Router();

router.post("/meals", trackMeal);

export default router;