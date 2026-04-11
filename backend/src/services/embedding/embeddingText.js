export const buildEmbeddingText = (recipe, structuredGoal) => {
    return `
    Dish: ${recipe.name}
    ${recipe.description}
  
    Goal: ${structuredGoal.goalType}
    Food Type: ${recipe.foodType}
  
    Ingredients: ${recipe.ingredients.join(", ")}
  
    Nutrition:
    Protein ${recipe.nutrition.protein}
    Calories ${recipe.nutrition.calories}
    Fat ${recipe.nutrition.fat}
    Carbs ${recipe.nutrition.carbs}
    `;
  };