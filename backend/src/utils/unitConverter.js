// 🔥 Convert grams/ml/pieces into "servings"

export const convertToServing = (quantity, unit, food) => {
    if (!unit) return quantity;
  
    unit = unit.toLowerCase();
  
    // 🔥 Approx standard serving sizes
    const servingMap = {
      "greek yogurt": 100, // 100g = 1 serving
      milk: 200, // 200ml = 1 serving
      rice: 150,
      chicken: 100,
      paneer: 100,
    };
  
    const base = servingMap[food.toLowerCase()] || 100;
  
    if (unit === "g" || unit === "grams") {
      return quantity / base;
    }
  
    if (unit === "ml") {
      return quantity / base;
    }
  
    if (unit === "piece") {
      return quantity;
    }
  
    return quantity;
  };