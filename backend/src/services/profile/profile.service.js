


// Version 1 :

// import pool from "../../db/connection.js";

// /* 🔥 CALCULATE TARGETS */
// const calculateTargets = ({
//   weight,
//   height,
//   gender,
//   activity,
//   goal,
//   targetWeight,
//   durationDays
// }) => {
//   const age = 25; // fallback (later we can add real age)

//   // ✅ BMR with gender
//   const bmr =
//     gender === "female"
//       ? 10 * weight + 6.25 * height - 5 * age - 161
//       : 10 * weight + 6.25 * height - 5 * age + 5;

//   const activityMap = {
//     sedentary: 1.2,
//     moderate: 1.55,
//     active: 1.725,
//   };

//   let tdee = bmr * (activityMap[activity] || 1.2);

//   // 🔥 SMART GOAL LOGIC
//   if (goal === "weight_loss" && targetWeight && durationDays) {
//     const deficit =
//       ((weight - targetWeight) * 7700) / durationDays;
//     tdee -= deficit;
//   }

//   if (goal === "weight_gain") {
//     tdee += 300;
//   }

//   // 🔥 MACROS
//   const protein = weight * 1.5;
//   const fats = (tdee * 0.25) / 9;
//   const carbs = (tdee - (protein * 4 + fats * 9)) / 4;

//   return {
//     calories: Math.round(tdee),
//     protein: Math.round(protein),
//     carbs: Math.round(carbs),
//     fats: Math.round(fats),
//   };
// };

// /* 🔥 CREATE / UPDATE PROFILE */
// export const upsertProfileService = async ({
//   userId,
//   height_cm,
//   weight_kg,
//   gender,
//   goal_type,
//   activity_level,
//   target_weight,
//   duration_days
// }) => {

//   // ✅ Calculate targets
//   const targets = calculateTargets({
//     weight: weight_kg,
//     height: height_cm,
//     gender,
//     activity: activity_level,
//     goal: goal_type,
//     targetWeight: target_weight,
//     durationDays: duration_days
//   });

//   const result = await pool.query(
//     `
//     INSERT INTO user_profile 
//     (user_id, height_cm, weight_kg, gender, goal_type, activity_level, target_weight, duration_days,
//      target_calories, protein_target, carbs_target, fats_target)
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
//     ON CONFLICT (user_id)
//     DO UPDATE SET
//       height_cm=$2,
//       weight_kg=$3,
//       gender=$4,
//       goal_type=$5,
//       activity_level=$6,
//       target_weight=$7,
//       duration_days=$8,
//       target_calories=$9,
//       protein_target=$10,
//       carbs_target=$11,
//       fats_target=$12
//     RETURNING *
//     `,
//     [
//       userId,
//       height_cm,
//       weight_kg,
//       gender,
//       goal_type,
//       activity_level,
//       target_weight,
//       duration_days,
//       targets.calories,
//       targets.protein,
//       targets.carbs,
//       targets.fats
//     ]
//   );

//   return result.rows[0];
// };

// /* 🔥 GET PROFILE */
// export const getProfileService = async (userId) => {
//   const result = await pool.query(
//     "SELECT * FROM user_profile WHERE user_id = $1",
//     [userId]
//   );

//   return result.rows[0] || null;
// };


// Version 2 : History and new functionality inclusions

import pool from "../../db/connection.js";

/* 🔥 CALCULATE TARGETS */
const calculateTargets = ({
  weight,
  height,
  gender,
  activity,
  goal,
  targetWeight,
  durationDays
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
  };

  let tdee = bmr * (activityMap[activity] || 1.2);

  if (goal === "weight_loss" && targetWeight && durationDays) {
    const deficit =
      ((weight - targetWeight) * 7700) / durationDays;
    tdee -= deficit;
  }

  if (goal === "weight_gain") {
    tdee += 300;
  }

  const protein = weight * 1.5;
  const fats = (tdee * 0.25) / 9;
  const carbs = (tdee - (protein * 4 + fats * 9)) / 4;

  return {
    calories: Math.round(tdee),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
  };
};

/* 🔥 CREATE NEW GOAL (WITH HISTORY) */
export const createProfileService = async ({
  userId,
  height_cm,
  weight_kg,
  gender,
  goal_type,
  activity_level,
  target_weight,
  duration_days
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

    const targets = calculateTargets({
      weight: weight_kg,
      height: height_cm,
      gender,
      activity: activity_level,
      goal: goal_type,
      targetWeight: target_weight,
      durationDays: duration_days
    });

    const result = await client.query(
      `
      INSERT INTO user_profile 
      (user_id, height_cm, weight_kg, gender, goal_type, activity_level,
       target_weight, duration_days,
       target_calories, protein_target, carbs_target, fats_target,
       is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true)
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
        targets.fats
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