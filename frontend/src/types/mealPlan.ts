export interface MealIngredient {
  ingredientId: number;
  ingredientName: string;
  quantity_g: number;
}

export interface MealMacros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface MealPlanMeal {
  mealId: number;
  mealName: string;
  mealCategory: string;
  foodType: string;
  imageUrl: string | null;
  description: string;
  scaleFactor: number;

  finalMacros: MealMacros;

  ingredients: MealIngredient[];

  preparationSteps: string[];
}

export interface MealPlanResponse {
  goalType: string;

  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };

  breakfast: MealPlanMeal[];
  lunch: MealPlanMeal[];
  snack: MealPlanMeal[];
  dinner: MealPlanMeal[];
}