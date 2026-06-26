// Version 1 : oil , mistaking as boiled issue

// import pool from "../db/connection.js";

// export const searchFoods = async (query) => {
//   if (!query?.trim()) return [];

//   const search = `%${query.toLowerCase()}%`;

//   const result = await pool.query(
//     `
//     SELECT DISTINCT ON (name)
//     *
//     FROM
//     (
//       SELECT
//         fr.id,
//         fr.food_name AS name,
//         'REFERENCE' AS source
//       FROM food_reference fr
//       WHERE LOWER(fr.food_name) LIKE $1

//       UNION ALL

//       SELECT
//         fr.id,
//         fr.food_name AS name,
//         'REFERENCE_ALIAS' AS source
//       FROM food_reference fr
//       INNER JOIN food_reference_aliases fa
//       ON fa.food_reference_id = fr.id
//       WHERE LOWER(fa.alias) LIKE $1


//     ) foods
//     ORDER BY name
//     LIMIT 10
//     `,
//     [search]
//   );

//   return result.rows;
// };



// Version 2 : oil , mistaking as boiled issue fix

import pool from "../db/connection.js";

export const searchFoodPartial = async (query) => {

  if (!query?.trim()) {
    return [];
  }

  const q =
    query
      .toLowerCase()
      .trim();

  const result =
    await pool.query(
      `
      SELECT DISTINCT ON (name)
      *
      FROM
      (

        ----------------------------------
        -- Exact Match
        ----------------------------------

        SELECT
          fr.id,
          fr.food_name AS name,
          'REFERENCE' AS source,
          1 AS priority
        FROM food_reference fr
        WHERE LOWER(fr.food_name) = $1

        UNION ALL

        SELECT
          fr.id,
          fr.food_name AS name,
          'REFERENCE_ALIAS' AS source,
          1 AS priority
        FROM food_reference fr
        INNER JOIN food_reference_aliases fa
        ON fa.food_reference_id = fr.id
        WHERE LOWER(fa.alias) = $1

        ----------------------------------
        -- Starts With
        ----------------------------------

        UNION ALL

        SELECT
          fr.id,
          fr.food_name,
          'REFERENCE',
          2
        FROM food_reference fr
        WHERE LOWER(fr.food_name) LIKE $2

        UNION ALL

        SELECT
          fr.id,
          fr.food_name,
          'REFERENCE_ALIAS',
          2
        FROM food_reference fr
        INNER JOIN food_reference_aliases fa
        ON fa.food_reference_id = fr.id
        WHERE LOWER(fa.alias) LIKE $2

        ----------------------------------
        -- Contains
        ----------------------------------

        UNION ALL

        SELECT
          fr.id,
          fr.food_name,
          'REFERENCE',
          3
        FROM food_reference fr
        WHERE LOWER(fr.food_name) LIKE $3

        UNION ALL

        SELECT
          fr.id,
          fr.food_name,
          'REFERENCE_ALIAS',
          3
        FROM food_reference fr
        INNER JOIN food_reference_aliases fa
        ON fa.food_reference_id = fr.id
        WHERE LOWER(fa.alias) LIKE $3

      ) foods

      ORDER BY
        name,
        priority

      LIMIT 10
      `,
      [
        q,
        `${q}%`,
        `% ${q} %`
      ]
    );

  return result.rows;

};