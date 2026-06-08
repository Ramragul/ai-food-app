import pool from "../db/connection.js";

export const searchFoods = async (query) => {
  if (!query?.trim()) return [];

  const search = `%${query.toLowerCase()}%`;

  const result = await pool.query(
    `
    SELECT DISTINCT ON (name)
    *
    FROM
    (
      SELECT
        fr.id,
        fr.food_name AS name,
        'REFERENCE' AS source
      FROM food_reference fr
      WHERE LOWER(fr.food_name) LIKE $1

      UNION ALL

      SELECT
        fr.id,
        fr.food_name AS name,
        'REFERENCE_ALIAS' AS source
      FROM food_reference fr
      INNER JOIN food_reference_aliases fa
      ON fa.food_reference_id = fr.id
      WHERE LOWER(fa.alias) LIKE $1

      UNION ALL

      SELECT
        fm.id,
        fm.name,
        'CACHE' AS source
      FROM food_master fm
      WHERE LOWER(fm.name) LIKE $1
    ) foods
    ORDER BY name
    LIMIT 10
    `,
    [search]
  );

  return result.rows;
};