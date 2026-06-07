export const calculateNutritionFromGrams = (
  food,
  grams
) => {
  return {
    calories:
      (food.calories_per_100g / 100) *
      grams,

    protein:
      (food.protein_per_100g / 100) *
      grams,

    carbs:
      (food.carbs_per_100g / 100) *
      grams,

    fats:
      (food.fats_per_100g / 100) *
      grams,
  };
};