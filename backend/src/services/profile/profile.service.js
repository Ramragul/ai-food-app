

// Version 1 : WORKING VERSION

// import pool from "../../db/connection.js";

// /* 🔥 CALCULATE TARGETS */
// const calculateTargets = ({
//   weight,
//   height,
//   gender,
//   activity,
//   goal
// }) => {

//   const age = 25;

//   const bmr =
//     gender === "female"
//       ? 10 * weight + 6.25 * height - 5 * age - 161
//       : 10 * weight + 6.25 * height - 5 * age + 5;

//   const activityMap = {
//     sedentary: 1.2,
//     moderate: 1.55,
//     active: 1.725,
//     athlete: 1.9
//   };

//   let tdee =
//     bmr *
//     (activityMap[activity] || 1.55);

//   const goalConfig = {

//     fat_loss: {
//       calorieAdjustment: -500,
//       proteinMultiplier: 2.2
//     },

//     weight_loss: {
//       calorieAdjustment: -300,
//       proteinMultiplier: 2.0
//     },

//     maintenance: {
//       calorieAdjustment: 0,
//       proteinMultiplier: 1.6
//     },

//     lean_muscle_gain: {
//       calorieAdjustment: 250,
//       proteinMultiplier: 2.2
//     },

//     bulk_up: {
//       calorieAdjustment: 500,
//       proteinMultiplier: 2.0
//     },

//     strength_gain: {
//       calorieAdjustment: 300,
//       proteinMultiplier: 2.3
//     },

//     athletic_performance: {
//       calorieAdjustment: 200,
//       proteinMultiplier: 1.8
//     },

//     healthy_lifestyle: {
//       calorieAdjustment: 0,
//       proteinMultiplier: 1.5
//     }

//   };

//   const config =
//     goalConfig[goal] ||
//     goalConfig.maintenance;

//   tdee += config.calorieAdjustment;

//   const protein =
//     weight *
//     config.proteinMultiplier;

//   const fats =
//     (tdee * 0.25) / 9;

//   const carbs =
//     (
//       tdee -
//       (protein * 4 + fats * 9)
//     ) / 4;

//   return {
//     calories: Math.round(tdee),
//     protein: Math.round(protein),
//     carbs: Math.round(carbs),
//     fats: Math.round(fats)
//   };
// };

// /* 🔥 CREATE NEW GOAL (WITH HISTORY) */
// export const createProfileService = async ({
//   userId,
//   height_cm,
//   weight_kg,
//   gender,
//   goal_type,
//   food_preference,
//   activity_level,
//   target_weight,
//   duration_days
// }) => {

//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");

//     // 🔥 deactivate old goals
//     await client.query(
//       `UPDATE user_profile 
//        SET is_active = false 
//        WHERE user_id = $1`,
//       [userId]
//     );

//     const targets = calculateTargets({
//       weight: weight_kg,
//       height: height_cm,
//       gender,
//       activity: activity_level,
//       goal: goal_type,
//       targetWeight: target_weight,
//       durationDays: duration_days
//     });

//     const result = await client.query(
//       `
//       INSERT INTO user_profile 
//       (user_id, height_cm, weight_kg, gender, goal_type, activity_level,
//        target_weight, duration_days,
//        target_calories, protein_target, carbs_target, fats_target,food_preference,
//        is_active)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,true)
//       RETURNING *
//       `,
//       [
//         userId,
//         height_cm,
//         weight_kg,
//         gender,
//         goal_type,
//         activity_level,
//         target_weight,
//         duration_days,
//         targets.calories,
//         targets.protein,
//         targets.carbs,
//         targets.fats,
//         food_preference
//       ]
//     );

//     await client.query("COMMIT");

//     return result.rows[0];

//   } catch (err) {
//     await client.query("ROLLBACK");
//     throw err;
//   } finally {
//     client.release();
//   }
// };

// /* 🔥 GET ALL GOALS */
// export const getAllProfilesService = async (userId) => {
//   const result = await pool.query(
//     `
//     SELECT * FROM user_profile
//     WHERE user_id = $1
//     ORDER BY created_at DESC
//     `,
//     [userId]
//   );

//   return result.rows;
// };

// /* 🔥 GET ACTIVE GOAL */
// export const getActiveProfileService = async (userId) => {
//   const result = await pool.query(
//     `
//     SELECT * FROM user_profile
//     WHERE user_id = $1 AND is_active = true
//     LIMIT 1
//     `,
//     [userId]
//   );

//   return result.rows[0] || null;
// };


// export const removeActiveGoalService =
// async (userId) => {

//   await pool.query(
//     `
//     UPDATE user_profile
//     SET is_active = false
//     WHERE user_id = $1
//     AND is_active = true
//     `,
//     [userId]
//   );

// };


// VERSION 2

import pool from "../../db/connection.js";

/* 🔥 CALCULATE TARGETS */
const calculateTargets = ({
  weight,
  height,
  gender,
  activity,
  goal
}) => {

  const age = 25;

  const bmr =
    gender === "female"
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;

  const activityMap = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9
  };

  let tdee =
    bmr *
    (activityMap[activity] || 1.55);

  const goalConfig = {

    fat_loss: {
      calorieAdjustment: -500,
      proteinMultiplier: 2.2
    },

    weight_loss: {
      calorieAdjustment: -300,
      proteinMultiplier: 2.0
    },

    maintenance: {
      calorieAdjustment: 0,
      proteinMultiplier: 1.6
    },

    lean_muscle_gain: {
      calorieAdjustment: 250,
      proteinMultiplier: 2.2
    },

    bulk_up: {
      calorieAdjustment: 500,
      proteinMultiplier: 2.0
    },

    strength_gain: {
      calorieAdjustment: 300,
      proteinMultiplier: 2.3
    },

    athletic_performance: {
      calorieAdjustment: 200,
      proteinMultiplier: 1.8
    },

    healthy_lifestyle: {
      calorieAdjustment: 0,
      proteinMultiplier: 1.5
    }

  };

  const config =
    goalConfig[goal] ||
    goalConfig.maintenance;

  tdee += config.calorieAdjustment;

  const protein =
    weight *
    config.proteinMultiplier;

  const fats =
    (tdee * 0.25) / 9;

  const carbs =
    (
      tdee -
      (protein * 4 + fats * 9)
    ) / 4;

  return {
    calories: Math.round(tdee),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats)
  };
};

/* 🔥 CREATE NEW GOAL (WITH HISTORY) */
export const createProfileService = async ({
  userId,
  height_cm,
  weight_kg,
  gender,
  goal_type,
  food_preference,
  activity_level,
  target_weight,
  duration_days,
  goal_mode = "SMART",
  target_source = "NEKA",

  target_calories,
  protein_target,
  carbs_target,
  fats_target
}) => {

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 🔥 deactivate old goals
    await client.query(
      `UPDATE user_profile 
       SET is_active = false 
       WHERE user_id = $1`,
      [userId]
    );

let targets;

if (goal_mode === "SMART") {

  targets = calculateTargets({
    weight: weight_kg,
    height: height_cm,
    gender,
    activity: activity_level,
    goal: goal_type
  });

} else {

  targets = {
    calories: target_calories,
    protein: protein_target,
    carbs: carbs_target,
    fats: fats_target
  };

}

    const result = await client.query(
      `
      INSERT INTO user_profile 
      (user_id, height_cm, weight_kg, gender, goal_type, activity_level,
       target_weight, duration_days,
       target_calories, protein_target, carbs_target, fats_target,food_preference,goal_mode,
target_source,
       is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,true)
      RETURNING *
      `,
      [
        userId,
        height_cm,
        weight_kg,
        gender,
        goal_type,
        activity_level,
        target_weight,
        duration_days,
        targets.calories,
        targets.protein,
        targets.carbs,
        targets.fats,
        food_preference,
        goal_mode,
        target_source
      ]
    );

    await client.query("COMMIT");

    return result.rows[0];

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

/* 🔥 GET ALL GOALS */
export const getAllProfilesService = async (userId) => {
  const result = await pool.query(
    `
    SELECT * FROM user_profile
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

/* 🔥 GET ACTIVE GOAL */
export const getActiveProfileService = async (userId) => {
  const result = await pool.query(
    `
    SELECT * FROM user_profile
    WHERE user_id = $1 AND is_active = true
    LIMIT 1
    `,
    [userId]
  );

  return result.rows[0] || null;
};


export const removeActiveGoalService =
async (userId) => {

  await pool.query(
    `
    UPDATE user_profile
    SET is_active = false
    WHERE user_id = $1
    AND is_active = true
    `,
    [userId]
  );

};