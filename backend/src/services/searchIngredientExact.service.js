import pool from "../db/connection.js";

export const searchIngredientExact =
async (query) => {

  const result =
    await pool.query(
      `
      SELECT
        i.id,
        i.name,
        i.image_url,
        i.type,
        i.category,
        n.calories,
        n.protein,
        n.carbs,
        n.fat,
        n.fibre
      FROM ingredients i
      INNER JOIN nutrition_per_100g n
        ON n.ingredient_id = i.id
      WHERE

      LOWER(i.name) =
      LOWER($1)

      OR EXISTS (

        SELECT 1

        FROM unnest(i.aliases) alias

        WHERE LOWER(alias) =
        LOWER($1)

      )

      LIMIT 1
      `,
      [query]
    );

  return result.rows[0] || null;

};