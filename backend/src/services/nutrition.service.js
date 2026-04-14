import pool from "../db/connection.js";
import { parseFoodWithAI } from "./ai/foodparser.service.js";

export const addMealService = async ({ userId, input, mealType }) => {
  // 🔥 STEP 1: AI PARSE INPUT → ITEMS
  const items = await parseFoodWithAI(input);

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Invalid or empty food items from AI");
  }

  let total = { calories: 0, protein: 0, carbs: 0, fats: 0 };

  // 🔥 STEP 2: CALCULATE NUTRITION
  for (let item of items) {
    const res = await pool.query(
      "SELECT * FROM food_master WHERE LOWER(name) = LOWER($1)",
      [item.food]
    );

    const food = res.rows[0];

    if (!food) {
      console.warn("Food not found:", item.food);
      continue;
    }

    total.calories += food.calories * item.quantity;
    total.protein += food.protein * item.quantity;
    total.carbs += food.carbs * item.quantity;
    total.fats += food.fats * item.quantity;
  }

  // 🔥 STEP 3: INSERT MEAL
  await pool.query(
    `
    INSERT INTO meal_entries 
    (user_id, meal_type, food_items, calories, protein, carbs, fats)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    `,
    [
      userId,
      mealType,
      JSON.stringify(items),
      total.calories,
      total.protein,
      total.carbs,
      total.fats,
    ]
  );

  // 🔥 STEP 4: UPDATE DAILY SUMMARY
  await pool.query(
    `
    INSERT INTO daily_nutrition (user_id, date, total_calories, protein, carbs, fats)
    VALUES ($1, CURRENT_DATE, $2, $3, $4, $5)
    ON CONFLICT (user_id, date)
    DO UPDATE SET
      total_calories = daily_nutrition.total_calories + $2,
      protein = daily_nutrition.protein + $3,
      carbs = daily_nutrition.carbs + $4,
      fats = daily_nutrition.fats + $5
    `,
    [userId, total.calories, total.protein, total.carbs, total.fats]
  );

  return {
    parsedItems: items,
    total,
  };
};