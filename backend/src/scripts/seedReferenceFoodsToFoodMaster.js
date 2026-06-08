import pool from "../src/db/connection.js";

import {
  getNutritionFromAI
} from "../src/services/ingredientAI.service.js";

import {
  saveFoodToDB
} from "../src/services/food.service.js";

const seedFoods = async () => {
  try {

    const foods =
      await pool.query(
        `
        SELECT
          id,
          food_name
        FROM food_reference
        WHERE food_master_id IS NULL
        LIMIT 5
        ORDER BY id
        `
      );

    console.log(
      `Found ${foods.rows.length} foods`
    );

    for (
      const food of foods.rows
    ) {

      try {

        console.log(
          `Processing ${food.food_name}`
        );

        const nutrition =
          await getNutritionFromAI(
            food.food_name
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

              foodType:
                null,

              typicalServingWeight:
                null
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
            `Mapped ${food.food_name}`
          );
        }

      } catch (err) {

        console.error(
          `Failed ${food.food_name}`,
          err.message
        );

      }
    }

    console.log(
      "Seeding complete"
    );

    process.exit(0);

  } catch (err) {

    console.error(err);

    process.exit(1);

  }
};

seedFoods();