// Version 1

// import dotenv from "dotenv";

// dotenv.config();
// import pool from "../src/db/connection.js";

// import {
//   getNutritionFromAI
// } from "../src/services/ai/ingredientAI.service.js";

// import {
//   saveFoodToDB
// } from "../src/services/nutrition.service.js";

// const seedFoods = async () => {
//   try {

//     const foods =
//       await pool.query(
//         `
//         SELECT
//           id,
//           food_name
//         FROM food_reference
//         WHERE food_master_id IS NULL
//         ORDER BY id
//         `
//       );

//     console.log(
//       `Found ${foods.rows.length} foods`
//     );

//     for (
//       const food of foods.rows
//     ) {

//       try {

//         console.log(
//           `Processing ${food.food_name}`
//         );

//         const nutrition =
//           await getNutritionFromAI(
//             food.food_name
//           );

//         const foodMasterId =
//           await saveFoodToDB(
//             food.food_name,
//             {
//               caloriesPer100g:
//                 nutrition.calories,

//               proteinPer100g:
//                 nutrition.protein,

//               carbsPer100g:
//                 nutrition.carbs,

//               fatsPer100g:
//                 nutrition.fat,

//               foodType:
//                 null,

//               typicalServingWeight:
//                 null
//             }
//           );

//         if (
//           foodMasterId
//         ) {

//           await pool.query(
//             `
//             UPDATE food_reference
//             SET food_master_id = $1
//             WHERE id = $2
//             `,
//             [
//               foodMasterId,
//               food.id
//             ]
//           );

//           console.log(
//             `Mapped ${food.food_name}`
//           );
//         }

//       } catch (err) {

//         console.error(
//           `Failed ${food.food_name}`,
//           err.message
//         );

//       }
//     }

//     console.log(
//       "Seeding complete"
//     );

//     process.exit(0);

//   } catch (err) {

//     console.error(err);

//     process.exit(1);

//   }
// };

// seedFoods();


// Version 2 

import dotenv from "dotenv";

dotenv.config();

import pool from "../src/db/connection.js";

import {
  getNutritionFromAI
} from "../src/services/ai/ingredientAI.service.js";

import {
  saveFoodToDB
} from "../src/services/nutrition.service.js";

const sleep = (ms) =>
  new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );

const getNutritionWithRetry =
  async (
    foodName,
    maxRetries = 5
  ) => {

    let attempt = 1;

    while (
      attempt <= maxRetries
    ) {

      try {

        console.log(
          `🤖 AI Attempt ${attempt}: ${foodName}`
        );

        const nutrition =
          await getNutritionFromAI(
            foodName
          );

        return nutrition;

      } catch (err) {

        console.error(
          `❌ Attempt ${attempt} failed for ${foodName}`
        );

        if (
          attempt ===
          maxRetries
        ) {
          throw err;
        }

        const waitTime =
          attempt * 10000;

        console.log(
          `⏳ Waiting ${
            waitTime / 1000
          } seconds before retry`
        );

        await sleep(
          waitTime
        );

        attempt++;
      }
    }
  };

const seedFoods =
  async () => {

    try {

      const foods =
        await pool.query(
          `
          SELECT
            id,
            food_name
          FROM food_reference
          WHERE food_master_id IS NULL
          ORDER BY id
          LIMIT 5
          `
        );

      console.log(
        `🚀 Found ${foods.rows.length} foods`
      );

      for (
        const food of foods.rows
      ) {

        try {

          console.log(
            `\n==============================`
          );

          console.log(
            `🍽 Processing ${food.food_name}`
          );

          const nutrition =
            await getNutritionWithRetry(
              food.food_name
            );

          console.log(
            "✅ AI Response",
            nutrition
          );

          const foodMasterId =
            await saveFoodToDB(
              food.food_name,
              {
                caloriesPer100g:
                  nutrition.calories,

                proteinPer100g:
                  nutrition.protein,

                carbsPer100g:
                  nutrition.carbs,

                fatsPer100g:
                  nutrition.fat,
                  
                  fiber:
                  nutrition.fibre
              }
            );

          if (
            foodMasterId
          ) {

            await pool.query(
              `
              UPDATE food_reference
              SET food_master_id = $1
              WHERE id = $2
              `,
              [
                foodMasterId,
                food.id
              ]
            );

            console.log(
              `✅ Mapped ${food.food_name}`
            );
          }

          // Gemini quota protection

          console.log(
            "😴 Cooling down 5 seconds..."
          );

          await sleep(
            5000
          );

        } catch (err) {

          console.error(
            `🚨 Failed ${food.food_name}`
          );

          console.error(
            err.message
          );

          continue;
        }
      }

      console.log(
        "\n🎉 Seeding complete"
      );

      process.exit(0);

    } catch (err) {

      console.error(
        err
      );

      process.exit(1);
    }
  };

seedFoods();