// Version 1 

// import { addMealService } from "../services/nutrition.service.js";

// export const addMeal = async (req, res) => {
//   try {
//     const data = await addMealService(req.body);
//     res.status(201).json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// };


// Version 2 

import {
  addMealService,
  confirmMealService
} from "../services/nutrition.service.js";

// 🔥 Step 1: Parse + Preview
export const addMeal = async (req, res) => {
  try {
    const data = await addMealService(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// 🔥 Step 2: Save after confirmation
export const confirmMeal = async (req, res) => {
  try {
    await confirmMealService(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save meal" });
  }
};