// Version 1

// import pool from "../db/connection.js";

// /**
//  * 🔥 MAIN DASHBOARD SERVICE
//  */
// export const getDashboardService = async (userId, type = "DAY") => {

//   /* ---------------- PROFILE (ONLY ACTIVE) ---------------- */
//   const profileRes = await pool.query(
//     `
//     SELECT *
//     FROM user_profile
//     WHERE user_id = $1 AND is_active = true
//     ORDER BY updated_at DESC
//     LIMIT 1
//     `,
//     [userId]
//   );

//   const user = profileRes.rows[0];
//   const hasProfile = !!user;

//   let target = 0;
//   let targets = null;

//   if (hasProfile) {
//     target = Number(user.target_calories || 0);

//     targets = {
//       calories: Number(user.target_calories || 0),
//       protein: Number(user.protein_target || 0),
//       carbs: Number(user.carbs_target || 0),
//       fats: Number(user.fats_target || 0),
//     };
//   }

//   /* ---------------- DATE FILTER ---------------- */
//   let interval = "";

//   if (type === "WEEK") {
//     interval = "CURRENT_DATE - INTERVAL '6 days'";
//   }

//   if (type === "MONTH") {
//     interval = "CURRENT_DATE - INTERVAL '30 days'";
//   }

//   /* ---------------- NUTRITION DATA ---------------- */

//   let nutritionQuery;

//   if (type === "DAY") {
//     nutritionQuery = await pool.query(
//       `
//       SELECT 
//         total_calories,
//         protein,
//         carbs,
//         fats
//       FROM daily_nutrition
//       WHERE user_id=$1 AND date=CURRENT_DATE
//       `,
//       [userId]
//     );
//   } else {
//     nutritionQuery = await pool.query(
//       `
//       SELECT 
//         COALESCE(SUM(total_calories),0) as total_calories,
//         COALESCE(SUM(protein),0) as protein,
//         COALESCE(SUM(carbs),0) as carbs,
//         COALESCE(SUM(fats),0) as fats
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
//         COALESCE(SUM(calories),0) as calories,
//         COALESCE(SUM(protein),0) as protein,
//         COALESCE(SUM(carbs),0) as carbs,
//         COALESCE(SUM(fats),0) as fats
//       FROM meal_entries
//       WHERE user_id=$1 AND DATE(created_at)=CURRENT_DATE
//       GROUP BY meal_type
//       `,
//       [userId]
//     );

//     mealSplit = meals.rows;
//   }

//   /* ---------------- TREND ---------------- */

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

//   /* ---------------- STREAK (IMPROVED LOGIC) ---------------- */
//   const streakRes = await pool.query(
//     `
//     SELECT COUNT(*) as streak
//     FROM daily_nutrition
//     WHERE user_id=$1 
//       AND date >= CURRENT_DATE - INTERVAL '7 days'
//       AND total_calories > 0
//     `,
//     [userId]
//   );

//   const streak = Number(streakRes.rows[0]?.streak || 0);

//   /* ---------------- FINAL RESPONSE ---------------- */

//   return {
//     hasProfile,

//     consumed: Number(data.total_calories || 0),
//     protein: Number(data.protein || 0),
//     carbs: Number(data.carbs || 0),
//     fats: Number(data.fats || 0),

//     target,
//     targets,

//     mealSplit,   // only DAY
//     trend,       // WEEK / MONTH

//     streak,
//     type
//   };
// };


// Version 2 : clone of v1
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
    let goalInfo = null;



    if (hasProfile) {

      target =
        Number(
          user.target_calories || 0
        );

      targets = {
        calories:
          Number(
            user.target_calories || 0
          ),

        protein:
          Number(
            user.protein_target || 0
          ),

        carbs:
          Number(
            user.carbs_target || 0
          ),

        fats:
          Number(
            user.fats_target || 0
          )
      };

      goalInfo = {

        goalType:
          user.goal_type,

        activityLevel:
          user.activity_level,

        currentWeight:
          Number(
            user.weight_kg || 0
          ),

        targetWeight:
          Number(
            user.target_weight || 0
          ),

        durationDays:
          Number(
            user.duration_days || 0
          ),

        foodPreference:
          user.food_preference,

        targetCalories:
          Number(
            user.target_calories || 0
          ),

        proteinTarget:
          Number(
            user.protein_target || 0
          ),

        carbsTarget:
          Number(
            user.carbs_target || 0
          ),

        fatsTarget:
          Number(
            user.fats_target || 0
          )
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
        fats,
        fiber
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
        COALESCE(SUM(fats),0) as fats,
        COALESCE(SUM(fiber),0) as fiber
      FROM daily_nutrition
      WHERE user_id=$1 AND date >= ${interval}
      `,
      [userId]
    );
  }

 

  const data =
  nutritionQuery.rows[0] || {};

const consumed =
  Number(
    data.total_calories || 0
  );

const protein =
  Number(
    data.protein || 0
  );

const carbs =
  Number(
    data.carbs || 0
  );

const fats =
  Number(
    data.fats || 0
  );

const fiber =
  Number(
    data.fiber || 0
  );

      let status =
  "ON_TRACK";

if (
  hasProfile &&
  consumed > target
) {
  status =
    "OVER_TARGET";
}

  /* ---------------- MEAL SPLIT ---------------- */

  let mealSplit = [];

  if (type === "DAY") {
const meals =
  await pool.query(
    `
    SELECT

      meal_type,

      COALESCE(
        SUM(calories),
        0
      ) as calories,

      COALESCE(
        SUM(protein),
        0
      ) as protein,

      COALESCE(
        SUM(carbs),
        0
      ) as carbs,

      COALESCE(
        SUM(fats),
        0
      ) as fats,

      COALESCE(
        SUM(fiber),
        0
      ) as fiber,

      jsonb_agg(
        food_items
      ) as foods

    FROM meal_entries

    WHERE user_id = $1

    AND DATE(created_at) =
    (
      CURRENT_TIMESTAMP
      AT TIME ZONE
      'Asia/Kolkata'
    )::DATE

    GROUP BY meal_type
    `,
    [userId]
  );

// mealSplit =
//   meals.rows;
//   }

mealSplit = meals.rows.map(
  meal => ({
    ...meal,
    foods:
      meal.foods?.flat() || []
  })
);

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
        AND date >= (
            CURRENT_TIMESTAMP
            AT TIME ZONE
            'Asia/Kolkata'
            )::DATE
            - INTERVAL '6 days'
        
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
        AND date >= (
            CURRENT_TIMESTAMP
            AT TIME ZONE
            'Asia/Kolkata'
            )::DATE - INTERVAL '30 days'
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
      AND date >= (
            CURRENT_TIMESTAMP
            AT TIME ZONE
            'Asia/Kolkata'
            )::DATE - INTERVAL '7 days'
      AND total_calories > 0
    `,
    [userId]
  );

  const streak = Number(streakRes.rows[0]?.streak || 0);


  /* ---------------- REMAINING SECTION ------------- */


  const remaining = {

  calories:
    Math.max(
      0,
      target - consumed
    ),

  protein:
    Math.max(
      0,
      (
        targets?.protein || 0
      ) - protein
    ),

  carbs:
    Math.max(
      0,
      (
        targets?.carbs || 0
      ) - carbs
    ),

  fats:
    Math.max(
      0,
      (
        targets?.fats || 0
      ) - fats
    )

};

  /* ---------------- FINAL RESPONSE ---------------- */

return {

  hasProfile,

  consumed,

  protein,

  carbs,

  fats,

  fiber,

  target,

  targets,

  goalInfo,

  remaining,

  status,

  mealSplit,

  trend,

  streak,

  type

};

}; 

