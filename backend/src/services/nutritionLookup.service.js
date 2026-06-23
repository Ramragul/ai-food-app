import {
  searchFoods
} from "./foodSearch.service.js";

import {
  searchIngredient
} from "./searchIngredient.service.js";

import {
  getFoodDetails
} from "./foodDetails.service.js";

import {
  getNutritionFromAI
} from "./ai/ingredientAI.service.js";

import {
  insertIngredient
} from "./ingredient.service.js";

import {
  saveGeneratedFood
} from "./saveGeneratedFood.service.js";

export const lookupNutritionService =
async (query) => {

  /*
  ----------------------------------
  STEP 1
  FOOD SEARCH
  ----------------------------------
  */

  const foods =
    await searchFoods(query);

  if (
    foods &&
    foods.length > 0
  ) {

    const details =
      await getFoodDetails(
        foods[0].id
      );

    return {

      found: true,

      entityType:
        "FOOD",

      source:
        "DATABASE",

      data:
        details

    };

  }

  /*
  ----------------------------------
  STEP 2
  INGREDIENT SEARCH
  ----------------------------------
  */

  const ingredient =
    await searchIngredient(
      query
    );

  if (
    ingredient
  ) {

    return {

      found: true,

      entityType:
        "INGREDIENT",

      source:
        "DATABASE",

      data:
        ingredient

    };

  }

  /*
  ----------------------------------
  STEP 3
  AI GENERATION
  ----------------------------------
  */

  const ai =
    await getNutritionFromAI(
      query
    );

  /*
  ----------------------------------
  INGREDIENT
  ----------------------------------
  */

  if (
    ai.entityType ===
    "INGREDIENT"
  ) {

    const saved =
      await insertIngredient({

        name:
          query,

        calories:
          ai.calories,

        protein:
          ai.protein,

        carbs:
          ai.carbs,

        fat:
          ai.fat,

        fibre:
          ai.fibre,

        type:
          ai.type || "OTHER"

      });

    return {

      found: true,

      generated: true,

      saved: true,

      source:
        "AI",

      entityType:
        "INGREDIENT",

      data: {

        id:
          saved.id,

        name:
          query,

        calories:
          ai.calories,

        protein:
          ai.protein,

        carbs:
          ai.carbs,

        fat:
          ai.fat,

        fibre:
          ai.fibre,

        foodType:
          ai.foodType,

        typicalServingWeight:
          ai.typicalServingWeight,

        referenceUnit:
          ai.referenceUnit

      }

    };

  }

  /*
  ----------------------------------
  FOOD
  ----------------------------------
  */

  const saveResult =
    await saveGeneratedFood({

      name:
        query,

      caloriesPer100g:
        ai.calories,

      proteinPer100g:
        ai.protein,

      carbsPer100g:
        ai.carbs,

      fatsPer100g:
        ai.fat,

      fibre:
        ai.fibre,

      foodType:
        ai.foodType,

      typicalServingWeight:
        ai.typicalServingWeight,

      referenceUnit:
        ai.referenceUnit

    });

  const details =
    await getFoodDetails(
      saveResult.foodReferenceId
    );

  return {

    found: true,

    generated: true,

    saved: true,

    source:
      "AI",

    entityType:
      "FOOD",

    data:
      details

  };

};