import { analyzeMealService } from "../services/meal/trackMeal.service.js";

export const trackMeal = async (req, res) => {
  try {
    const { userId, mealType, input } = req.body;

    const result = await analyzeMealService({ userId, mealType, input });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to analyze meal" });
  }
};