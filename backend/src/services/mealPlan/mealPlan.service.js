// Version 1 : working version

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




const calculateScaledMeal = async (
  mealId,
  targetCalories
) => {

  const mealResult = await pool.query(
    `
    SELECT
      m.id,
      m.name,
      m.meal_category,
      m.food_type,
      m.description,
      m.image_url,
      m.preparation_steps,

      mn.calories,
      mn.protein,
      mn.carbs,
      mn.fats,

      msr.min_scale_factor,
      msr.max_scale_factor

    FROM meals m

    JOIN meal_nutrition mn
      ON mn.meal_id = m.id

    LEFT JOIN meal_serving_rules msr
      ON msr.meal_id = m.id

    WHERE m.id = $1
    `,
    [mealId]
  );

  const meal = mealResult.rows[0];

  if (!meal) {
    throw new Error("Meal not found");
  }

  let scaleFactor =
    targetCalories /
    Number(meal.calories);

  scaleFactor = Math.max(
    Number(meal.min_scale_factor || 0.75),
    Math.min(
      Number(meal.max_scale_factor || 2),
      scaleFactor
    )
  );

  const ingredientResult =
    await pool.query(
      `
      SELECT
        mi.quantity_g,

        i.id as ingredient_id,
        i.name,

        np.calories,
        np.protein,
        np.carbs,
        np.fat,
        np.fibre

      FROM meal_ingredients mi

      JOIN ingredients i
        ON i.id = mi.ingredient_id

      JOIN nutrition_per_100g np
        ON np.ingredient_id = i.id

      WHERE mi.meal_id = $1
      `,
      [mealId]
    );

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFiber = 0;

  const ingredients =
    ingredientResult.rows.map((item) => {

      const scaledQty =
        Number(item.quantity_g) *
        scaleFactor;

      totalCalories +=
        (scaledQty * Number(item.calories)) / 100;

      totalProtein +=
        (scaledQty * Number(item.protein)) / 100;

      totalCarbs +=
        (scaledQty * Number(item.carbs)) / 100;

      totalFats +=
        (scaledQty * Number(item.fat)) / 100;

      totalFiber +=
        (scaledQty * Number(item.fibre)) / 100;

      return {
        ingredientId: item.ingredient_id,
        ingredientName: item.name,
        quantity_g: Math.round(scaledQty)
      };
    });

  return {
    mealId: meal.id,
    mealName: meal.name,
    mealCategory: meal.meal_category,
    foodType: meal.food_type,
    imageUrl: meal.image_url,
    description: meal.description,

    scaleFactor: Number(
      scaleFactor.toFixed(2)
    ),

    finalMacros: {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
      fiber: Math.round(totalFiber)
    },

    ingredients,

    preparationSteps:
      meal.preparation_steps || []
  };
};
/*
|--------------------------------------------------------------------------
| GET MEAL OPTIONS
|--------------------------------------------------------------------------
*/

// const getMealOptions = async (
//   mealCategory,
//   target,
//   allowedFoodTypes,
//   limit
// ) => {

//   const result = await pool.query(
//     `
//     SELECT
//       m.id,
//       mn.calories,
//       mn.protein

//     FROM meals m

//     JOIN meal_nutrition mn
//       ON mn.meal_id = m.id

//     WHERE
//       m.meal_category = $1
//       AND m.food_type = ANY($2)
//       AND m.is_active = true

//     ORDER BY
//       ABS(mn.protein - $3),
//       ABS(mn.calories - $4)

//     LIMIT $5
//     `,
//     [
//       mealCategory,
//       allowedFoodTypes,
//       target.protein,
//       target.calories,
//       limit
//     ]
//   );

//   const meals =
//     await Promise.all(
//       result.rows.map((meal) =>
//         calculateScaledMeal(
//           meal.id,
//           target.calories
//         )
//       )
//     );

//   return meals;
// };



const shuffleArray = (array) => {
  const arr = [...array];

  for (
    let i = arr.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [arr[i], arr[j]] =
      [arr[j], arr[i]];
  }

  return arr;
};

const getMealOptions = async (
  mealCategory,
  target,
  allowedFoodTypes,
  goalType,
  limit
) => {

  const result = await pool.query(
    `
    SELECT
      m.id,
      mn.calories,
      mn.protein

    FROM meals m

    JOIN meal_nutrition mn
      ON mn.meal_id = m.id

    WHERE
      m.meal_category = $1
      AND m.food_type = ANY($2)
      AND m.is_active = true
      AND (
        m.goal_tags IS NULL
        OR $3 = ANY(m.goal_tags)
      )

    ORDER BY
      ABS(mn.protein - $4),
      ABS(mn.calories - $5)

    LIMIT $6
    `,
    [
      mealCategory,
      allowedFoodTypes,
      goalType,
      target.protein,
      target.calories,
      limit
    ]
  );

  const meals = await Promise.all(
    result.rows.map((meal) =>
      calculateScaledMeal(
        meal.id,
        target.calories
      )
    )
  );

  return meals;
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
  profile.goal_type,
  20
);

const lunch = await getMealOptions(
  "lunch",
  targets.lunch,
  allowedFoodTypes,
  profile.goal_type,
  20
);

const snack = await getMealOptions(
  "snack",
  targets.snack,
  allowedFoodTypes,
  profile.goal_type,
  20
);

const dinner = await getMealOptions(
  "dinner",
  targets.dinner,
  allowedFoodTypes,
  profile.goal_type,
  20
);

return {
  goalType: profile.goal_type,

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


// Version 2 : Enhancement of v1 for the meal shuffle logics


// import pool from "../../db/connection.js";

// /*
// |--------------------------------------------------------------------------
// | MEAL DISTRIBUTION
// |--------------------------------------------------------------------------
// */

// const MEAL_DISTRIBUTION = {
//   breakfast: 0.25,
//   lunch: 0.35,
//   snack: 0.10,
//   dinner: 0.30,
// };

// /*
// |--------------------------------------------------------------------------
// | GET ACTIVE USER PROFILE
// |--------------------------------------------------------------------------
// */

// const getActiveUserProfile = async (userId) => {
//   const result = await pool.query(
//     `
//     SELECT *
//     FROM user_profile
//     WHERE user_id = $1
//       AND is_active = true
//     LIMIT 1
//     `,
//     [userId]
//   );

//   if (!result.rows.length) {
//     throw new Error("Active profile not found");
//   }

//   return result.rows[0];
// };

// /*
// |--------------------------------------------------------------------------
// | CALCULATE MEAL TARGETS
// |--------------------------------------------------------------------------
// */

// const calculateMealTargets = (profile) => {
//   const totalCalories = Number(profile.target_calories);
//   const totalProtein = Number(profile.protein_target);
//   const totalCarbs = Number(profile.carbs_target);
//   const totalFats = Number(profile.fats_target);

//   return {
//     breakfast: {
//       calories: Math.round(totalCalories * MEAL_DISTRIBUTION.breakfast),
//       protein: Math.round(totalProtein * MEAL_DISTRIBUTION.breakfast),
//       carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.breakfast),
//       fats: Math.round(totalFats * MEAL_DISTRIBUTION.breakfast),
//     },

//     lunch: {
//       calories: Math.round(totalCalories * MEAL_DISTRIBUTION.lunch),
//       protein: Math.round(totalProtein * MEAL_DISTRIBUTION.lunch),
//       carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.lunch),
//       fats: Math.round(totalFats * MEAL_DISTRIBUTION.lunch),
//     },

//     snack: {
//       calories: Math.round(totalCalories * MEAL_DISTRIBUTION.snack),
//       protein: Math.round(totalProtein * MEAL_DISTRIBUTION.snack),
//       carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.snack),
//       fats: Math.round(totalFats * MEAL_DISTRIBUTION.snack),
//     },

//     dinner: {
//       calories: Math.round(totalCalories * MEAL_DISTRIBUTION.dinner),
//       protein: Math.round(totalProtein * MEAL_DISTRIBUTION.dinner),
//       carbs: Math.round(totalCarbs * MEAL_DISTRIBUTION.dinner),
//       fats: Math.round(totalFats * MEAL_DISTRIBUTION.dinner),
//     },
//   };
// };

// /*
// |--------------------------------------------------------------------------
// | FOOD PREFERENCE MAPPING
// |--------------------------------------------------------------------------
// */

// const getAllowedFoodTypes = (foodPreference) => {
//   const map = {
//     veg: ["veg"],

//     eggitarian: [
//       "veg",
//       "eggitarian",
//     ],

//     nonveg: [
//       "veg",
//       "eggitarian",
//       "nonveg",
//     ],
//   };

//   return map[foodPreference] || ["veg"];
// };




// const calculateScaledMeal = async (
//   mealId,
//   targetCalories
// ) => {

//   const mealResult = await pool.query(
//     `
//     SELECT
//       m.id,
//       m.name,
//       m.meal_category,
//       m.food_type,
//       m.description,
//       m.image_url,
//       m.preparation_steps,

//       mn.calories,
//       mn.protein,
//       mn.carbs,
//       mn.fats,

//       msr.min_scale_factor,
//       msr.max_scale_factor

//     FROM meals m

//     JOIN meal_nutrition mn
//       ON mn.meal_id = m.id

//     LEFT JOIN meal_serving_rules msr
//       ON msr.meal_id = m.id

//     WHERE m.id = $1
//     `,
//     [mealId]
//   );

//   const meal = mealResult.rows[0];

//   if (!meal) {
//     throw new Error("Meal not found");
//   }

//   let scaleFactor =
//     targetCalories /
//     Number(meal.calories);

//   scaleFactor = Math.max(
//     Number(meal.min_scale_factor || 0.75),
//     Math.min(
//       Number(meal.max_scale_factor || 2),
//       scaleFactor
//     )
//   );

//   const ingredientResult =
//     await pool.query(
//       `
//       SELECT
//         mi.quantity_g,

//         i.id as ingredient_id,
//         i.name,

//         np.calories,
//         np.protein,
//         np.carbs,
//         np.fat,
//         np.fibre

//       FROM meal_ingredients mi

//       JOIN ingredients i
//         ON i.id = mi.ingredient_id

//       JOIN nutrition_per_100g np
//         ON np.ingredient_id = i.id

//       WHERE mi.meal_id = $1
//       `,
//       [mealId]
//     );

//   let totalCalories = 0;
//   let totalProtein = 0;
//   let totalCarbs = 0;
//   let totalFats = 0;
//   let totalFiber = 0;

//   const ingredients =
//     ingredientResult.rows.map((item) => {

//       const scaledQty =
//         Number(item.quantity_g) *
//         scaleFactor;

//       totalCalories +=
//         (scaledQty * Number(item.calories)) / 100;

//       totalProtein +=
//         (scaledQty * Number(item.protein)) / 100;

//       totalCarbs +=
//         (scaledQty * Number(item.carbs)) / 100;

//       totalFats +=
//         (scaledQty * Number(item.fat)) / 100;

//       totalFiber +=
//         (scaledQty * Number(item.fibre)) / 100;

//       return {
//         ingredientId: item.ingredient_id,
//         ingredientName: item.name,
//         quantity_g: Math.round(scaledQty)
//       };
//     });

//   return {
//     mealId: meal.id,
//     mealName: meal.name,
//     mealCategory: meal.meal_category,
//     foodType: meal.food_type,
//     imageUrl: meal.image_url,
//     description: meal.description,

//     scaleFactor: Number(
//       scaleFactor.toFixed(2)
//     ),

//     finalMacros: {
//       calories: Math.round(totalCalories),
//       protein: Math.round(totalProtein),
//       carbs: Math.round(totalCarbs),
//       fats: Math.round(totalFats),
//       fiber: Math.round(totalFiber)
//     },

//     ingredients,

//     preparationSteps:
//       meal.preparation_steps || []
//   };
// };
// /*
// |--------------------------------------------------------------------------
// | GET MEAL OPTIONS
// |--------------------------------------------------------------------------
// */

// // const getMealOptions = async (
// //   mealCategory,
// //   target,
// //   allowedFoodTypes,
// //   limit
// // ) => {

// //   const result = await pool.query(
// //     `
// //     SELECT
// //       m.id,
// //       mn.calories,
// //       mn.protein

// //     FROM meals m

// //     JOIN meal_nutrition mn
// //       ON mn.meal_id = m.id

// //     WHERE
// //       m.meal_category = $1
// //       AND m.food_type = ANY($2)
// //       AND m.is_active = true

// //     ORDER BY
// //       ABS(mn.protein - $3),
// //       ABS(mn.calories - $4)

// //     LIMIT $5
// //     `,
// //     [
// //       mealCategory,
// //       allowedFoodTypes,
// //       target.protein,
// //       target.calories,
// //       limit
// //     ]
// //   );

// //   const meals =
// //     await Promise.all(
// //       result.rows.map((meal) =>
// //         calculateScaledMeal(
// //           meal.id,
// //           target.calories
// //         )
// //       )
// //     );

// //   return meals;
// // };



// const shuffleArray = (array) => {
//   const arr = [...array];

//   for (
//     let i = arr.length - 1;
//     i > 0;
//     i--
//   ) {
//     const j = Math.floor(
//       Math.random() * (i + 1)
//     );

//     [arr[i], arr[j]] =
//       [arr[j], arr[i]];
//   }

//   return arr;
// };




// const getMealOptions = async (
//   mealCategory,
//   target,
//   allowedFoodTypes,
//   goalType,
//   limit
// ) => {

//   const result = await pool.query(
//     `
//     SELECT
//       m.id,
//       mn.calories,
//       mn.protein

//     FROM meals m

//     JOIN meal_nutrition mn
//       ON mn.meal_id = m.id

//     WHERE
//       m.meal_category = $1
//       AND m.food_type = ANY($2)
//       AND m.is_active = true
//       AND (
//         m.goal_tags IS NULL
//         OR $3 = ANY(m.goal_tags)
//       )

//     ORDER BY
//       ABS(mn.protein - $4),
//       ABS(mn.calories - $5)

//     LIMIT 25
//     `,
//     [
//       mealCategory,
//       allowedFoodTypes,
//       goalType,
//       target.protein,
//       target.calories,
//     ]
//   );

//   const selectedMeals =
//     shuffleArray(result.rows)
//       .slice(0, limit);

//   const meals = await Promise.all(
//     selectedMeals.map((meal) =>
//       calculateScaledMeal(
//         meal.id,
//         target.calories
//       )
//     )
//   );

//   return meals;
// };

// /*
// |--------------------------------------------------------------------------
// | GENERATE MEAL PLAN
// |--------------------------------------------------------------------------
// */

// export const generateMealPlanService = async (userId) => {
//   const profile = await getActiveUserProfile(userId);

//   const targets = calculateMealTargets(profile);

//   const allowedFoodTypes = getAllowedFoodTypes(
//     profile.food_preference
//   );



//   const breakfast = await getMealOptions(
//   "breakfast",
//   targets.breakfast,
//   allowedFoodTypes,
//   profile.goal_type,
//   5
// );

// const lunch = await getMealOptions(
//   "lunch",
//   targets.lunch,
//   allowedFoodTypes,
//   profile.goal_type,
//   5
// );

// const snack = await getMealOptions(
//   "snack",
//   targets.snack,
//   allowedFoodTypes,
//   profile.goal_type,
//   5
// );

// const dinner = await getMealOptions(
//   "dinner",
//   targets.dinner,
//   allowedFoodTypes,
//   profile.goal_type,
//   5
// );

// return {
//   goalType: profile.goal_type,

//   targets: {
//     calories: profile.target_calories,
//     protein: profile.protein_target,
//     carbs: profile.carbs_target,
//     fats: profile.fats_target,
//   },

//   breakfast,
//   lunch,
//   snack,
//   dinner,
// };
// };