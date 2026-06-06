// services/foodServing.service.js

import pool from "../db/connection.js";

export const getServingsForFood = async (foodId) => {
  const result = await pool.query(
    `
    SELECT
      id,
      serving_name,
      grams,
      multiplier,
      is_default
    FROM food_servings
    WHERE food_id = $1
    ORDER BY multiplier
    `,
    [foodId]
  );

  return result.rows;
};