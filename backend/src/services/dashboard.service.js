// import pool from "../db/connection.js";
// import { calculateCalories } from "../utils/health.js";

// export const getDashboardService = async (userId) => {
//   const today = await pool.query(
//     "SELECT * FROM daily_nutrition WHERE user_id=$1 AND date=CURRENT_DATE",
//     [userId]
//   );

//   const meals = await pool.query(
//     `
//     SELECT meal_type, SUM(calories) as calories,SUM(protein) as protein,
//   SUM(carbs) as carbs,
//   SUM(fats) as fats
//     FROM meal_entries
//     WHERE user_id=$1 AND DATE(created_at)=CURRENT_DATE
//     GROUP BY meal_type
//     `,
//     [userId]
//   );

//   const profile = await pool.query(
//     "SELECT * FROM user_profile WHERE user_id=$1",
//     [userId]
//   );

//   const user = profile.rows[0];

//   const target = calculateCalories({
//     weight: user.weight_kg,
//     height: user.height_cm,
//     activity: user.activity_level,
//     goal: user.goal_type,
//   });

//   const data = today.rows[0] || {};

//   return {
//     consumed: data.total_calories || 0,
//     protein: data.protein || 0,
//     carbs: data.carbs || 0,
//     fats: data.fats || 0,
//     target,
//     mealSplit: meals.rows,
//   };
// };



// // Get Weekly Summary

// export const getWeeklySummaryService = async (userId) => {
//     const result = await pool.query(
//       `
//       SELECT 
//         TO_CHAR(date, 'Dy') as day,
//         SUM(total_calories) as calories
//       FROM daily_nutrition
//       WHERE user_id = $1
//         AND date >= CURRENT_DATE - INTERVAL '6 days'
//       GROUP BY date
//       ORDER BY date ASC
//       `,
//       [userId]
//     );
  
//     return result.rows;
//   };



//   // Get Monthly Summary


//   export const getMonthlySummaryService = async (userId) => {
//     const result = await pool.query(
//       `
//       SELECT 
//         TO_CHAR(date, 'DD Mon') as day,
//         SUM(total_calories) as calories
//       FROM daily_nutrition
//       WHERE user_id = $1
//         AND date >= CURRENT_DATE - INTERVAL '30 days'
//       GROUP BY date
//       ORDER BY date ASC
//       `,
//       [userId]
//     );
  
//     return result.rows;
//   };


import pool from "../db/connection.js";
import { calculateCalories } from "../utils/health.js";

/**
 * 🔥 MAIN DASHBOARD SERVICE
 */
export const getDashboardService = async (userId, type = "DAY") => {

  /* ---------------- PROFILE ---------------- */
  const profileRes = await pool.query(
    "SELECT * FROM user_profile WHERE user_id=$1",
    [userId]
  );

  const user = profileRes.rows[0];

  const hasProfile = !!user;

  let target = 0;
  let targets = null;

  if (hasProfile) {
    target = calculateCalories({
      weight: user.weight_kg,
      height: user.height_cm,
      activity: user.activity_level,
      goal: user.goal_type,
    });

    // 🔥 simple macro targets (can improve later)
    targets = {
      calories: target,
      protein: Math.round(user.weight_kg * 1.2), // basic rule
      carbs: Math.round(target * 0.5 / 4),
      fats: Math.round(target * 0.25 / 9),
    };
  }

  /* ---------------- DATE FILTER ---------------- */
  let dateFilter = "CURRENT_DATE";
  let interval = "";

  if (type === "WEEK") {
    interval = "CURRENT_DATE - INTERVAL '6 days'";
  }

  if (type === "MONTH") {
    interval = "CURRENT_DATE - INTERVAL '30 days'";
  }

  /* ---------------- DAILY / RANGE DATA ---------------- */

  let nutritionQuery;

  if (type === "DAY") {
    nutritionQuery = await pool.query(
      `
      SELECT * FROM daily_nutrition
      WHERE user_id=$1 AND date=CURRENT_DATE
      `,
      [userId]
    );
  } else {
    nutritionQuery = await pool.query(
      `
      SELECT 
        SUM(total_calories) as total_calories,
        SUM(protein) as protein,
        SUM(carbs) as carbs,
        SUM(fats) as fats
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
        SUM(calories) as calories,
        SUM(protein) as protein,
        SUM(carbs) as carbs,
        SUM(fats) as fats
      FROM meal_entries
      WHERE user_id=$1 AND DATE(created_at)=CURRENT_DATE
      GROUP BY meal_type
      `,
      [userId]
    );

    mealSplit = meals.rows;
  }

  /* ---------------- TREND (WEEK / MONTH GRAPH) ---------------- */

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

  /* ---------------- STREAK (simple version) ---------------- */

  const streakRes = await pool.query(
    `
    SELECT COUNT(*) as streak
    FROM daily_nutrition
    WHERE user_id=$1 
      AND date >= CURRENT_DATE - INTERVAL '7 days'
    `,
    [userId]
  );

  const streak = streakRes.rows[0]?.streak || 0;

  /* ---------------- FINAL RESPONSE ---------------- */

  return {
    hasProfile,

    consumed: Number(data.total_calories || 0),
    protein: Number(data.protein || 0),
    carbs: Number(data.carbs || 0),
    fats: Number(data.fats || 0),

    target,
    targets,

    mealSplit,   // only for DAY
    trend,       // only for WEEK / MONTH

    streak,
    type
  };
};