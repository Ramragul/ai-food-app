import express from "express";
import { fetchIngredients } from "../controllers/ingredient.controller.js";

const router = express.Router();

// router.get("/core", fetchCoreIngredients);
router.get("/:category", fetchIngredients);

export default router;