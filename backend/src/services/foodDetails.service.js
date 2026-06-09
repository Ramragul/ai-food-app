// Version 1

// import pool from "../db/connection.js";

// export const getFoodDetails =
//   async (foodId) => {

//     const food =
//       await pool.query(
//         `
//         SELECT
//           *
//         FROM food_master
//         WHERE id = $1
//         `,
//         [foodId]
//       );

//     if (
//       !food.rows.length
//     ) {
//       return null;
//     }

//     const servings =
//       await pool.query(
//         `
//         SELECT
//           *
//         FROM food_servings
//         WHERE food_id = $1
//         ORDER BY
//           is_default DESC,
//           id ASC
//         `,
//         [foodId]
//       );

//     return {
//       ...food.rows[0],
//       servings:
//         servings.rows
//     };
//   };



// Version 2 :

import pool from "../db/connection.js";

export const getFoodDetails = async (
  foodId
) => {

  const result =
    await pool.query(
      `
      SELECT
        id,
        food_name,
        food_type,
        typical_serving_weight,
        reference_unit
      FROM food_reference
      WHERE id = $1
      `,
      [foodId]
    );

  if (
    !result.rows.length
  ) {
    return null;
  }

  const food =
    result.rows[0];

const nutrition =
  await pool.query(
    `
    SELECT
      fm.calories_per_100g,
      fm.protein_per_100g,
      fm.carbs_per_100g,
      fm.fats_per_100g
    FROM food_reference fr
    INNER JOIN food_master fm
    ON fm.id = fr.food_master_id
    WHERE fr.id = $1
    `,
    [foodId]
  );

  const nutritionRow =
  nutrition.rows[0] || {
    calories_per_100g: 0,
    protein_per_100g: 0,
    carbs_per_100g: 0,
    fats_per_100g: 0
  };

  let servings = [];

  switch (
    food.food_type
  ) {

    case "COUNTABLE":

      servings = [
        {
          id: 1,
          serving_name: "Small",
          grams: Math.round(
            food.typical_serving_weight *
            0.8
          )
        },
        {
          id: 2,
          serving_name: "Regular",
          grams: Math.round(
            food.typical_serving_weight
          )
        },
        {
          id: 3,
          serving_name: "Large",
          grams: Math.round(
            food.typical_serving_weight *
            1.3
          )
        }
      ];

      break;

    case "VOLUME_BASED":

      servings = [
        {
          id: 1,
          serving_name: "100 ml",
          grams: 100
        },
        {
          id: 2,
          serving_name: "250 ml",
          grams: 250
        },
        {
          id: 3,
          serving_name: "500 ml",
          grams: 500
        }
      ];

      break;

    case "WEIGHT_BASED":

      servings = [
        {
          id: 1,
          serving_name: "100 g",
          grams: 100
        },
        {
          id: 2,
          serving_name: "150 g",
          grams: 150
        },
        {
          id: 3,
          serving_name: "200 g",
          grams: 200
        }
      ];

      break;

    default:

      servings = [
        {
          id: 1,
          serving_name: "Regular",
          grams:
            food.typical_serving_weight
        }
      ];
  }

//   return {
//     id: food.id,

//     name:
//       food.food_name,

//     foodType:
//       food.food_type,

//     typicalServingWeight:
//       food.typical_serving_weight,

//     referenceUnit:
//       food.reference_unit,

//     servings
//   };

  return {
  id: food.id,

  name:
    food.food_name,

  foodType:
    food.food_type,

  typicalServingWeight:
    food.typical_serving_weight,

  referenceUnit:
    food.reference_unit,

  servings,

  caloriesPer100g:
    nutritionRow.calories_per_100g,

  proteinPer100g:
    nutritionRow.protein_per_100g,

  carbsPer100g:
    nutritionRow.carbs_per_100g,

  fatsPer100g:
    nutritionRow.fats_per_100g
};
};