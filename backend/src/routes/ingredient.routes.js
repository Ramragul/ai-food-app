// import express from "express";
// import { fetchIngredients } from "../controllers/ingredient.controller.js";

// const router = express.Router();

// // router.get("/core", fetchCoreIngredients);
// router.get("/:category", fetchIngredients);

// export default router;


// Version 2 

import express from "express";
import {
  fetchIngredients,
  createIngredientFromAI,
  confirmIngredient
} from "../controllers/ingredient.controller.js";

const router = express.Router();

router.get("/:category", fetchIngredients);

router.post("/create-from-ai", createIngredientFromAI);
router.post("/confirm", confirmIngredient);

export default router;