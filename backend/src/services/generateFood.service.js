import {
  getNutritionFromAI
} from "./ai/ingredientAI.service.js";

export const generateFoodEstimate =
async (
  foodName
) => {

  const nutrition =
    await getNutritionFromAI(
      foodName
    );

  return {

    name:
      foodName,

    caloriesPer100g:
      nutrition.calories,

    proteinPer100g:
      nutrition.protein,

    carbsPer100g:
      nutrition.carbs,

    fatsPer100g:
      nutrition.fat,

    foodType:
      "COUNTABLE",

    typicalServingWeight:
      100
  };
};