import pool from "../db/connection.js";

export const getCategories =
async () => {

  const result =
    await pool.query(
      `
      SELECT DISTINCT category
      FROM fitness_guides
      ORDER BY category
      `
    );

  return result.rows;
};

export const getGuides =
async (category) => {

  const result =
    await pool.query(
      `
      SELECT
        id,
        category,
        title,
        description,
        benefits,
        steps,
        tips,
        difficulty,
        duration_minutes,
        image_url,
        target_muscles,
        equipment_required
      FROM fitness_guides
      WHERE category = $1
      ORDER BY id
      `,
      [category]
    );

  return result.rows;
};




export const getGuideById =
async (id) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM fitness_guides
      WHERE id = $1
      `,
      [id]
    );

  return result.rows[0];
};