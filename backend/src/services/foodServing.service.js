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

export const createDefaultServings = async (foodId) => {
  try {
    await pool.query(
      `
      INSERT INTO food_servings
      (
        food_id,
        serving_name,
        grams,
        multiplier,
        is_default
      )
      VALUES
      ($1,'Small',75,0.75,false),
      ($1,'Medium',100,1.0,true),
      ($1,'Large',150,1.5,false)
      `,
      [foodId]
    );
  } catch (err) {
    console.error(
      "❌ Create Servings Failed:",
      err.message
    );
  }
};