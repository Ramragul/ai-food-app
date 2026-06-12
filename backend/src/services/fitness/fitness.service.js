// import pool from "../../db/connection.js";

// export const getCategories =
// async () => {

//   const result =
//     await pool.query(
//       `
//       SELECT DISTINCT category
//       FROM fitness_guides
//       ORDER BY category
//       `
//     );

//   return result.rows;
// };

// export const getGuides =
// async (category) => {

//   const result =
//     await pool.query(
//       `
//       SELECT
//         id,
//         category,
//         title,
//         description,
//         benefits,
//         steps,
//         tips,
//         difficulty,
//         duration_minutes,
//         image_url,
//         target_muscles,
//         equipment_required
//       FROM fitness_guides
//       WHERE category = $1
//       ORDER BY id
//       `,
//       [category]
//     );

//   return result.rows;
// };




// export const getGuideById =
// async (id) => {

//   const result =
//     await pool.query(
//       `
//       SELECT *
//       FROM fitness_guides
//       WHERE id = $1
//       `,
//       [id]
//     );

//   return result.rows[0];
// };


import pool from "../../db/connection.js";

export const getCategories =
async () => {

  const result =
    await pool.query(
      `
      SELECT DISTINCT category
      FROM fitness_guides
      WHERE is_active = true
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
      AND is_active = true
      ORDER BY id
      `,
      [category]
    );

 
  return result.rows.map(
  guide => ({
    ...guide,
    benefits:
      typeof guide.benefits === "string"
        ? JSON.parse(
            guide.benefits
          )
        : guide.benefits,

    target_muscles:
      typeof guide.target_muscles === "string"
        ? JSON.parse(
            guide.target_muscles
          )
        : guide.target_muscles
  })
);
};

export const getGuideById =
async (id) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM fitness_guides
      WHERE id = $1
      AND is_active = true
      `,
      [id]
    );

  const guide =
    result.rows[0];

  if (!guide) {
    return null;
  }

  try {

    guide.benefits =
      typeof guide.benefits ===
      "string"
        ? JSON.parse(
            guide.benefits
          )
        : guide.benefits;

    guide.tips =
      typeof guide.tips ===
      "string"
        ? JSON.parse(
            guide.tips
          )
        : guide.tips;

    guide.target_muscles =
      typeof guide.target_muscles ===
      "string"
        ? JSON.parse(
            guide.target_muscles
          )
        : guide.target_muscles;

    guide.steps =
      typeof guide.steps ===
      "string"
        ? JSON.parse(
            guide.steps
          )
        : guide.steps;

  } catch (error) {

    console.error(
      "Fitness guide JSON parse error:",
      error
    );

  }

  return guide;
};