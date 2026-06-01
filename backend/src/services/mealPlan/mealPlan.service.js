import pool from "../../db/connection.js";

/*
|--------------------------------------------------------------------------
| MEAL DISTRIBUTION
|--------------------------------------------------------------------------
*/

const MEAL_DISTRIBUTION = {
  breakfast: 0.25,
  lunch: 0.35,
  snack: 0.10,
  dinner: 0.30,
};

/*
|--------------------------------------------------------------------------
| GET ACTIVE USER PROFILE
|--------------------------------------------------------------------------
*/

const getActiveUserProfile = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM user_profile
    WHERE user_id = $1
      AND is_active = true
    LIMIT 1
    `,
    [userId]
  );

  if (!result.rows.length) {
    throw new Error("Active profile not found");
  }

  return result.rows[0];
};

/*
|--------------------------------------------------------------------------
| CALCULATE MEAL TARGETS
|--------------------------------------------------------------------------
*/

const calculateMealTargets = (profile) => {
  const totalCalories = Number(profile.target_calories);
  const totalProtein = Number(profile.protein_target);
  const totalCarbs = Number(profile.carbs_target);
  const totalFats = Number(profile.fats_target);

  return {
    breakfast: {
      calories: Math.round(totalCalories * MEAL_DISTRIBUTION.breakfast),
      protein: Math.round(totalProtein * MEAL_DISTRIBUTION.breakfast),
      carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.breakfast),
      fats: Math.round(totalFats * MEAL_DISTRIBUTION.breakfast),
    },

    lunch: {
      calories: Math.round(totalCalories * MEAL_DISTRIBUTION.lunch),
      protein: Math.round(totalProtein * MEAL_DISTRIBUTION.lunch),
      carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.lunch),
      fats: Math.round(totalFats * MEAL_DISTRIBUTION.lunch),
    },

    snack: {
      calories: Math.round(totalCalories * MEAL_DISTRIBUTION.snack),
      protein: Math.round(totalProtein * MEAL_DISTRIBUTION.snack),
      carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.snack),
      fats: Math.round(totalFats * MEAL_DISTRIBUTION.snack),
    },

    dinner: {
      calories: Math.round(totalCalories * MEAL_DISTRIBUTION.dinner),
      protein: Math.round(totalProtein * MEAL_DISTRIBUTION.dinner),
      carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.dinner),
      fats: Math.round(totalFats * MEAL_DISTRIBUTION.dinner),
    },
  };
};

/*
|--------------------------------------------------------------------------
| FOOD PREFERENCE MAPPING
|--------------------------------------------------------------------------
*/

const getAllowedFoodTypes = (foodPreference) => {
  const map = {
    veg: ["veg"],

    eggitarian: [
      "veg",
      "eggitarian",
    ],

    nonveg: [
      "veg",
      "eggitarian",
      "nonveg",
    ],
  };

  return map[foodPreference] || ["veg"];
};

/*
|--------------------------------------------------------------------------
| GET MEAL OPTIONS
|--------------------------------------------------------------------------
*/

const getMealOptions = async (
  mealCategory,
  target,
  allowedFoodTypes,
  limit
) => {
  const result = await pool.query(
    `
    SELECT
      m.id,
      m.name,
      m.meal_category,
      m.food_type,
      m.cuisine,
      m.description,
      m.image_url,

      mn.calories,
      mn.protein,
      mn.carbs,
      mn.fats,
      mn.fiber

    FROM meals m

    JOIN meal_nutrition mn
      ON mn.meal_id = m.id

    WHERE
      m.meal_category = $1
      AND m.food_type = ANY($2)
      AND m.is_active = true

    ORDER BY
      ABS(mn.protein - $3) ASC,
      ABS(mn.calories - $4) ASC

    LIMIT $5
    `,
    [
      mealCategory,
      allowedFoodTypes,
      target.protein,
      target.calories,
      limit,
    ]
  );

  return result.rows;
};

/*
|--------------------------------------------------------------------------
| GENERATE MEAL PLAN
|--------------------------------------------------------------------------
*/

export const generateMealPlanService = async (userId) => {
  const profile = await getActiveUserProfile(userId);

  const targets = calculateMealTargets(profile);

  const allowedFoodTypes = getAllowedFoodTypes(
    profile.food_preference
  );

  const breakfast = await getMealOptions(
    "breakfast",
    targets.breakfast,
    allowedFoodTypes,
    5
  );

  const lunch = await getMealOptions(
    "lunch",
    targets.lunch,
    allowedFoodTypes,
    5
  );

  const snack = await getMealOptions(
    "snack",
    targets.snack,
    allowedFoodTypes,
    3
  );

  const dinner = await getMealOptions(
    "dinner",
    targets.dinner,
    allowedFoodTypes,
    5
  );

  return {
    targets: {
      calories: profile.target_calories,
      protein: profile.protein_target,
      carbs: profile.carbs_target,
      fats: profile.fats_target,
    },

    breakfast,
    lunch,
    snack,
    dinner,
  };
};