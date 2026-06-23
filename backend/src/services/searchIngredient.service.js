import pool from "../db/connection.js";

export const searchIngredient =
async (query) => {

  const words =
    query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  let sql = `
    SELECT
      i.id,
      i.name,
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
    WHERE 1=1
  `;

  const params = [];

  words.forEach(
    (word, index) => {

      sql += `
        AND LOWER(i.name)
        LIKE $${index + 1}
      `;

      params.push(
        `%${word}%`
      );

    }
  );

  sql += `
    LIMIT 1
  `;

  const result =
    await pool.query(
      sql,
      params
    );

  return (
    result.rows[0] ||
    null
  );

};