// Version 1

// import { generateMealService } from "../services/meal/meal.service.js";

// export const generateMeal = async (req, res) => {
//   try {
//     const { goal, ingredients, foodType } = req.body;

//     const result = await generateMealService({ goal, ingredients, foodType });

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };


// Version 2 : Clone of v1 , with redis changes

import { generateMealService } from "../services/meal/meal.service.js";
import { parseGoal } from "../utils/goalParser.js";

export const generateMeal = async (req, res) => {
  try {
    const { goal, ingredients, foodType , page = 1 } = req.body;

    // 🔥 Parse goal
    const structuredGoal = parseGoal(goal);

    const result = await generateMealService({
      goal,
      structuredGoal,
      ingredients,
      foodType,
      page,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};