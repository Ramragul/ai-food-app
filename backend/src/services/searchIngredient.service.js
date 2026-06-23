import pool from "../db/connection.js";

export const searchIngredient =
async (query) => {

//   const result =
//     await pool.query(
//       `
//       SELECT
//         i.id,
//         i.name,
//         i.type,
//         i.category,

//         n.calories,
//         n.protein,
//         n.carbs,
//         n.fat,
//         n.fibre

//       FROM ingredients i

//       INNER JOIN nutrition_per_100g n
//       ON n.ingredient_id = i.id

//       WHERE
//       LOWER(i.name)
//       LIKE LOWER($1)

//       LIMIT 1
//       `,
//       [`%${query}%`]
//     );

const result =
  await pool.query(
    `
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
    WHERE
    (
      i.name ILIKE $1
      OR LOWER($2) = ANY(i.aliases)
    )
    LIMIT 1
    `,
    [
      `%${query}%`,
      query.toLowerCase()
    ]
  );

  return (
    result.rows[0] || null
  );

};