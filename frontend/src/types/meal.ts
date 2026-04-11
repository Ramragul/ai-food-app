export interface Nutrition {
    protein: string;
    calories: string;
    fat: string;
    carbs: string;
  }
  
  export interface MealItem {
    name: string;
    foodType: string;
    description: string;
    spiceLevel: string;
    cookingMethod: string;
    ingredients: string[];   
    utensils: string[];      
    steps: string[];         
    prepTime: string;        
    difficulty: string;
    nutrition: Nutrition;
  }
  
  export interface Recommendation {
    type: "single" | "combo";
    items: MealItem[];
    totalNutrition: Nutrition;
    imageUrl?: string;
  }