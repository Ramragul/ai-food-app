import {
  analyzeMealImage
} from "./mealVision.service.js";

import {
  matchDetectedFood
} from "./detectedFoodMatcher.service.js";

import {
  estimateScannedFoodNutrition
} from "./scanNutritionFallback.service.js";


/*
====================================================
SCAN MEAL
====================================================
*/

export const scanMealService =
async (
  imageBuffer,
  mimeType
) => {

  /*
  -----------------------------------------------
  STEP 1
  AI VISION
  -----------------------------------------------
  */

  const vision =
    await analyzeMealImage(
      imageBuffer,
      mimeType
    );


  if (
    !vision.mealDetected
  ) {

    return {

      success: true,

      mealDetected: false,

      items: []

    };

  }


  /*
  -----------------------------------------------
  STEP 2
  MATCH EACH FOOD
  -----------------------------------------------
  */

  const items = [];


  for (
    const detected
    of vision.items
  ) {

    const matched =
      await matchDetectedFood(
        detected.name
      );


    /*
    ---------------------------------------------
    DATABASE MATCH
    ---------------------------------------------
    */

    if (matched) {

      const grams =
        Number(
          detected.estimatedGrams
        );


      const calories =
        (
          grams *
          Number(
            matched.calories_per_100g || 0
          )
        ) / 100;


      const protein =
        (
          grams *
          Number(
            matched.protein_per_100g || 0
          )
        ) / 100;


      const carbs =
        (
          grams *
          Number(
            matched.carbs_per_100g || 0
          )
        ) / 100;


      const fats =
        (
          grams *
          Number(
            matched.fats_per_100g || 0
          )
        ) / 100;


      const fiber =
        (
          grams *
          Number(
            matched.fiber || 0
          )
        ) / 100;


      items.push({

        foodId:
          matched.id,

        name:
          matched.food_name,

        serving: {

          id:
            "SCAN",

          value:
            grams,

          unit:
            "g",

          label:
            `${grams} g`,

          grams

        },

        quantity:
          1,

        preparationStyle:
          "REGULAR",

        grams,

        calories:
          Number(
            calories.toFixed(0)
          ),

        protein:
          Number(
            protein.toFixed(1)
          ),

        carbs:
          Number(
            carbs.toFixed(1)
          ),

        fats:
          Number(
            fats.toFixed(1)
          ),

        fiber:
          Number(
            fiber.toFixed(1)
          ),

        confidence:
          detected.confidence,

        source:
          "DATABASE"

      });


      continue;

    }


    /*
    ---------------------------------------------
    AI FALLBACK
    ---------------------------------------------
    */

    const estimated =
      await estimateScannedFoodNutrition(
        detected.name
      );


    const grams =
      Number(
        detected.estimatedGrams
      );


    const calories =
      (
        grams *
        estimated.caloriesPer100g
      ) / 100;


    const protein =
      (
        grams *
        estimated.proteinPer100g
      ) / 100;


    const carbs =
      (
        grams *
        estimated.carbsPer100g
      ) / 100;


    const fats =
      (
        grams *
        estimated.fatsPer100g
      ) / 100;


    const fiber =
      (
        grams *
        estimated.fiberPer100g
      ) / 100;


    items.push({

      /*
      ------------------------------------------
      IMPORTANT:
      No fake food ID.
      ------------------------------------------
      */

      foodId:
        null,

      name:
        detected.name,

      serving: {

        id:
          "SCAN",

        value:
          grams,

        unit:
          "g",

        label:
          `${grams} g`,

        grams

      },

      quantity:
        1,

      preparationStyle:
        "REGULAR",

      grams,

      calories:
        Number(
          calories.toFixed(0)
        ),

      protein:
        Number(
          protein.toFixed(1)
        ),

      carbs:
        Number(
          carbs.toFixed(1)
        ),

      fats:
        Number(
          fats.toFixed(1)
        ),

      fiber:
        Number(
          fiber.toFixed(1)
        ),

      confidence:
        detected.confidence,

      source:
        "AI_ESTIMATE"

    });

  }


  /*
  -----------------------------------------------
  STEP 3
  TOTALS
  -----------------------------------------------
  */

  const total =
    items.reduce(

      (acc, item) => {

        acc.calories +=
          item.calories || 0;

        acc.protein +=
          item.protein || 0;

        acc.carbs +=
          item.carbs || 0;

        acc.fats +=
          item.fats || 0;

        acc.fiber +=
          item.fiber || 0;

        return acc;

      },

      {

        calories: 0,

        protein: 0,

        carbs: 0,

        fats: 0,

        fiber: 0

      }

    );


  return {

    success: true,

    mealDetected: true,

    items,

    total: {

      calories:
        Math.round(
          total.calories
        ),

      protein:
        Number(
          total.protein.toFixed(1)
        ),

      carbs:
        Number(
          total.carbs.toFixed(1)
        ),

      fats:
        Number(
          total.fats.toFixed(1)
        ),

      fiber:
        Number(
          total.fiber.toFixed(1)
        )

    }

  };

};