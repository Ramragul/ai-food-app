import pool from "../db/connection.js";

export const getFoodDetails =
  async (foodId) => {

    const food =
      await pool.query(
        `
        SELECT
          *
        FROM food_master
        WHERE id = $1
        `,
        [foodId]
      );

    if (
      !food.rows.length
    ) {
      return null;
    }

    const servings =
      await pool.query(
        `
        SELECT
          *
        FROM food_servings
        WHERE food_id = $1
        ORDER BY
          is_default DESC,
          id ASC
        `,
        [foodId]
      );

    return {
      ...food.rows[0],
      servings:
        servings.rows
    };
  };