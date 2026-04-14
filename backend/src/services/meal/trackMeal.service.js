const foodDB = {
    dosa: { calories: 120, protein: 3, carbs: 20, fat: 3 },
    chutney: { calories: 80, protein: 2, carbs: 5, fat: 6 },
    rice: { calories: 200, protein: 4, carbs: 45, fat: 1 },
    sambar: { calories: 150, protein: 6, carbs: 20, fat: 3 },
  };
  
  export const analyzeMealService = async ({ userId, mealType, input }) => {
    const words = input.toLowerCase().split(" ");
  
    let total = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
  
    words.forEach((word) => {
      if (foodDB[word]) {
        total.calories += foodDB[word].calories;
        total.protein += foodDB[word].protein;
        total.carbs += foodDB[word].carbs;
        total.fat += foodDB[word].fat;
      }
    });
  
    return total;
  };