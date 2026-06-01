import {
  generateMealPlanService,
} from "../services/mealPlan/mealPlan.service.js";

export const getMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;

    const data =
      await generateMealPlanService(userId);

    return res.status(200).json({
      success: true,
      message: "Meal plan generated successfully",
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};