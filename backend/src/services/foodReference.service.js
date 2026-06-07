import pool from "../db/connection.js";

const normalize = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

export const findReferenceFood = async (
  foodName
) => {
  const normalized =
    normalize(foodName);

  // Exact match
  let result = await pool.query(
    `
    SELECT *
    FROM food_reference
    WHERE LOWER(food_name) = $1
    LIMIT 1
    `,
    [normalized]
  );

  if (result.rows.length) {
    return result.rows[0];
  }

  // Alias match
  result = await pool.query(
    `
    SELECT fr.*
    FROM food_reference fr
    INNER JOIN food_reference_aliases fa
      ON fa.food_reference_id = fr.id
    WHERE LOWER(fa.alias) = $1
    LIMIT 1
    `,
    [normalized]
  );

  return result.rows[0] || null;
};