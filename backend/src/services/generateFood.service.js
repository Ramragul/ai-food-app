// Version 1

// import {
//   getNutritionFromAI
// } from "./ai/ingredientAI.service.js";

// export const generateFoodEstimate =
// async (
//   foodName
// ) => {

//   const nutrition =
//     await getNutritionFromAI(
//       foodName
//     );

//   return {

//     name:
//       foodName,

//     caloriesPer100g:
//       nutrition.calories,

//     proteinPer100g:
//       nutrition.protein,

//     carbsPer100g:
//       nutrition.carbs,

//     fatsPer100g:
//       nutrition.fat,

//     foodType:
//       nutrition.foodType ||
//       "COUNTABLE",

//     typicalServingWeight:
//       nutrition.typicalServingWeight ||
//       100,

//     referenceUnit:
//       nutrition.referenceUnit ||
//       "g"
//   };
// };


// Version 2

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

    fibre:
      nutrition.fibre,

    foodType:
      nutrition.foodType ||
      "COUNTABLE",

    typicalServingWeight:
      nutrition.typicalServingWeight ||
      100,

    referenceUnit:
      nutrition.referenceUnit ||
      "g"
  };
};