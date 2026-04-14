import { addMealService } from "../services/nutrition.service.js";

export const addMeal = async (req, res) => {
  try {
    const data = await addMealService(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};