// Version 1


// import pool from "../db/connection.js";
// import { calculateCalories } from "../utils/health.js";

// /**
//  * 🔥 MAIN DASHBOARD SERVICE
//  */
// export const getDashboardService = async (userId, type = "DAY") => {

//   /* ---------------- PROFILE ---------------- */
//   const profileRes = await pool.query(
//     "SELECT * FROM user_profile WHERE user_id=$1",
//     [userId]
//   );

//   const user = profileRes.rows[0];

//   const hasProfile = !!user;

//   let target = 0;
//   let targets = null;

//   if (hasProfile) {
//     target = calculateCalories({
//       weight: user.weight_kg,
//       height: user.height_cm,
//       activity: user.activity_level,
//       goal: user.goal_type,
//     });

//     // 🔥 simple macro targets (can improve later)
//     targets = {
//       calories: target,
//       protein: Math.round(user.weight_kg * 1.2), // basic rule
//       carbs: Math.round(target * 0.5 / 4),
//       fats: Math.round(target * 0.25 / 9),
//     };
//   }

//   /* ---------------- DATE FILTER ---------------- */
//   let dateFilter = "CURRENT_DATE";
//   let interval = "";

//   if (type === "WEEK") {
//     interval = "CURRENT_DATE - INTERVAL '6 days'";
//   }

//   if (type === "MONTH") {
//     interval = "CURRENT_DATE - INTERVAL '30 days'";
//   }

//   /* ---------------- DAILY / RANGE DATA ---------------- */

//   let nutritionQuery;

//   if (type === "DAY") {
//     nutritionQuery = await pool.query(
//       `
//       SELECT * FROM daily_nutrition
//       WHERE user_id=$1 AND date=CURRENT_DATE
//       `,
//       [userId]
//     );
//   } else {
//     nutritionQuery = await pool.query(
//       `
//       SELECT 
//         SUM(total_calories) as total_calories,
//         SUM(protein) as protein,
//         SUM(carbs) as carbs,
//         SUM(fats) as fats
//       FROM daily_nutrition
//       WHERE user_id=$1 AND date >= ${interval}
//       `,
//       [userId]
//     );
//   }

//   const data = nutritionQuery.rows[0] || {};

//   /* ---------------- MEAL SPLIT ---------------- */

//   let mealSplit = [];

//   if (type === "DAY") {
//     const meals = await pool.query(
//       `
//       SELECT 
//         meal_type,
//         SUM(calories) as calories,
//         SUM(protein) as protein,
//         SUM(carbs) as carbs,
//         SUM(fats) as fats
//       FROM meal_entries
//       WHERE user_id=$1 AND DATE(created_at)=CURRENT_DATE
//       GROUP BY meal_type
//       `,
//       [userId]
//     );

//     mealSplit = meals.rows;
//   }

//   /* ---------------- TREND (WEEK / MONTH GRAPH) ---------------- */

//   let trend = [];

//   if (type === "WEEK") {
//     const res = await pool.query(
//       `
//       SELECT 
//         TO_CHAR(date, 'Dy') as label,
//         total_calories as calories
//       FROM daily_nutrition
//       WHERE user_id = $1
//         AND date >= CURRENT_DATE - INTERVAL '6 days'
//       ORDER BY date ASC
//       `,
//       [userId]
//     );

//     trend = res.rows;
//   }

//   if (type === "MONTH") {
//     const res = await pool.query(
//       `
//       SELECT 
//         TO_CHAR(date, 'DD Mon') as label,
//         total_calories as calories
//       FROM daily_nutrition
//       WHERE user_id = $1
//         AND date >= CURRENT_DATE - INTERVAL '30 days'
//       ORDER BY date ASC
//       `,
//       [userId]
//     );

//     trend = res.rows;
//   }

//   /* ---------------- STREAK (simple version) ---------------- */

//   const streakRes = await pool.query(
//     `
//     SELECT COUNT(*) as streak
//     FROM daily_nutrition
//     WHERE user_id=$1 
//       AND date >= CURRENT_DATE - INTERVAL '7 days'
//     `,
//     [userId]
//   );

//   const streak = streakRes.rows[0]?.streak || 0;

//   /* ---------------- FINAL RESPONSE ---------------- */

//   return {
//     hasProfile,

//     consumed: Number(data.total_calories || 0),
//     protein: Number(data.protein || 0),
//     carbs: Number(data.carbs || 0),
//     fats: Number(data.fats || 0),

//     target,
//     targets,

//     mealSplit,   // only for DAY
//     trend,       // only for WEEK / MONTH

//     streak,
//     type
//   };
// };



// Version 2 

import pool from "../db/connection.js";

/**
 * 🔥 MAIN DASHBOARD SERVICE
 */
export const getDashboardService = async (userId, type = "DAY") => {

  /* ---------------- PROFILE (ONLY ACTIVE) ---------------- */
  const profileRes = await pool.query(
    `
    SELECT *
    FROM user_profile
    WHERE user_id = $1 AND is_active = true
    ORDER BY updated_at DESC
    LIMIT 1
    `,
    [userId]
  );

  const user = profileRes.rows[0];
  const hasProfile = !!user;

  let target = 0;
  let targets = null;

  if (hasProfile) {
    target = Number(user.target_calories || 0);

    targets = {
      calories: Number(user.target_calories || 0),
      protein: Number(user.protein_target || 0),
      carbs: Number(user.carbs_target || 0),
      fats: Number(user.fats_target || 0),
    };
  }

  /* ---------------- DATE FILTER ---------------- */
  let interval = "";

  if (type === "WEEK") {
    interval = "CURRENT_DATE - INTERVAL '6 days'";
  }

  if (type === "MONTH") {
    interval = "CURRENT_DATE - INTERVAL '30 days'";
  }

  /* ---------------- NUTRITION DATA ---------------- */

  let nutritionQuery;

  if (type === "DAY") {
    nutritionQuery = await pool.query(
      `
      SELECT 
        total_calories,
        protein,
        carbs,
        fats
      FROM daily_nutrition
      WHERE user_id=$1 AND date=CURRENT_DATE
      `,
      [userId]
    );
  } else {
    nutritionQuery = await pool.query(
      `
      SELECT 
        COALESCE(SUM(total_calories),0) as total_calories,
        COALESCE(SUM(protein),0) as protein,
        COALESCE(SUM(carbs),0) as carbs,
        COALESCE(SUM(fats),0) as fats
      FROM daily_nutrition
      WHERE user_id=$1 AND date >= ${interval}
      `,
      [userId]
    );
  }

  const data = nutritionQuery.rows[0] || {};

  /* ---------------- MEAL SPLIT ---------------- */

  let mealSplit = [];

  if (type === "DAY") {
    const meals = await pool.query(
      `
      SELECT 
        meal_type,
        COALESCE(SUM(calories),0) as calories,
        COALESCE(SUM(protein),0) as protein,
        COALESCE(SUM(carbs),0) as carbs,
        COALESCE(SUM(fats),0) as fats
      FROM meal_entries
      WHERE user_id=$1 AND DATE(created_at)=CURRENT_DATE
      GROUP BY meal_type
      `,
      [userId]
    );

    mealSplit = meals.rows;
  }

  /* ---------------- TREND ---------------- */

  let trend = [];

  if (type === "WEEK") {
    const res = await pool.query(
      `
      SELECT 
        TO_CHAR(date, 'Dy') as label,
        total_calories as calories
      FROM daily_nutrition
      WHERE user_id = $1
        AND date >= CURRENT_DATE - INTERVAL '6 days'
      ORDER BY date ASC
      `,
      [userId]
    );

    trend = res.rows;
  }

  if (type === "MONTH") {
    const res = await pool.query(
      `
      SELECT 
        TO_CHAR(date, 'DD Mon') as label,
        total_calories as calories
      FROM daily_nutrition
      WHERE user_id = $1
        AND date >= CURRENT_DATE - INTERVAL '30 days'
      ORDER BY date ASC
      `,
      [userId]
    );

    trend = res.rows;
  }

  /* ---------------- STREAK (IMPROVED LOGIC) ---------------- */
  const streakRes = await pool.query(
    `
    SELECT COUNT(*) as streak
    FROM daily_nutrition
    WHERE user_id=$1 
      AND date >= CURRENT_DATE - INTERVAL '7 days'
      AND total_calories > 0
    `,
    [userId]
  );

  const streak = Number(streakRes.rows[0]?.streak || 0);

  /* ---------------- FINAL RESPONSE ---------------- */

  return {
    hasProfile,

    consumed: Number(data.total_calories || 0),
    protein: Number(data.protein || 0),
    carbs: Number(data.carbs || 0),
    fats: Number(data.fats || 0),

    target,
    targets,

    mealSplit,   // only DAY
    trend,       // WEEK / MONTH

    streak,
    type
  };
};