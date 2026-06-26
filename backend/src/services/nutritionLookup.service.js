// Version 1

// import {
//   searchFoods
// } from "./foodSearch.service.js";

// import {
//   searchIngredient
// } from "./searchIngredient.service.js";

// import {
//   getFoodDetails
// } from "./foodDetails.service.js";

// import {
//   getNutritionFromAI
// } from "./ai/ingredientAI.service.js";

// import {
//   insertIngredient
// } from "./ingredient.service.js";

// import {
//   saveGeneratedFood
// } from "./saveGeneratedFood.service.js";

// export const lookupNutritionService =
// async (query) => {

//   /*
//   ----------------------------------
//   STEP 1
//   FOOD SEARCH
//   ----------------------------------
//   */

//   const foods =
//     await searchFoods(query);

//   if (
//     foods &&
//     foods.length > 0
//   ) {

//     const details =
//       await getFoodDetails(
//         foods[0].id
//       );

//     return {

//       found: true,

//       entityType:
//         "FOOD",

//       source:
//         "DATABASE",

//       data:
//         details

//     };

//   }

//   /*
//   ----------------------------------
//   STEP 2
//   INGREDIENT SEARCH
//   ----------------------------------
//   */

//   const ingredient =
//     await searchIngredient(
//       query
//     );

//   if (
//     ingredient
//   ) {

//     return {

//       found: true,

//       entityType:
//         "INGREDIENT",

//       source:
//         "DATABASE",

//       data:
//         ingredient

//     };

//   }

//   /*
//   ----------------------------------
//   STEP 3
//   AI GENERATION
//   ----------------------------------
//   */

//   const ai =
//     await getNutritionFromAI(
//       query
//     );

//   /*
//   ----------------------------------
//   INGREDIENT
//   ----------------------------------
//   */

//   if (
//     ai.entityType ===
//     "INGREDIENT"
//   ) {

//     const saved =
//       await insertIngredient({

//         name:
//           query,
          
//         aliases:
//           ai.aliases,

//         calories:
//           ai.calories,

//         protein:
//           ai.protein,

//         carbs:
//           ai.carbs,

//         fat:
//           ai.fat,

//         fibre:
//           ai.fibre,

//         type:
//           ai.type || "OTHER"

//       });

//     return {

//       found: true,

//       generated: true,

//       saved: true,

//       source:
//         "AI",

//       entityType:
//         "INGREDIENT",

//       data: {

//         id:
//           saved.id,

//         name:
//           query,

//         calories:
//           ai.calories,

//         protein:
//           ai.protein,

//         carbs:
//           ai.carbs,

//         fat:
//           ai.fat,

//         fibre:
//           ai.fibre,

//         foodType:
//           ai.foodType,

//         typicalServingWeight:
//           ai.typicalServingWeight,

//         referenceUnit:
//           ai.referenceUnit

//       }

//     };

//   }

//   /*
//   ----------------------------------
//   FOOD
//   ----------------------------------
//   */

//   const saveResult =
//     await saveGeneratedFood({

//       name:
//         query,

//       caloriesPer100g:
//         ai.calories,

//       proteinPer100g:
//         ai.protein,

//       carbsPer100g:
//         ai.carbs,

//       fatsPer100g:
//         ai.fat,

//       fibre:
//         ai.fibre,

//       foodType:
//         ai.foodType,

//       typicalServingWeight:
//         ai.typicalServingWeight,

//       referenceUnit:
//         ai.referenceUnit

//     });

//   const details =
//     await getFoodDetails(
//       saveResult.foodReferenceId
//     );

//   return {

//     found: true,

//     generated: true,

//     saved: true,

//     source:
//       "AI",

//     entityType:
//       "FOOD",

//     data:
//       details

//   };

// };


// Version 2


// import {
//   searchFoods
// } from "./foodSearch.service.js";

// import {
//   searchIngredient
// } from "./searchIngredient.service.js";

// import {
//   getFoodDetails
// } from "./foodDetails.service.js";

// import {
//   getNutritionFromAI
// } from "./ai/ingredientAI.service.js";

// import {
//   insertIngredient
// } from "./ingredient.service.js";

// import {
//   saveGeneratedFood
// } from "./saveGeneratedFood.service.js";

// export const lookupNutritionService =
// async (query) => {

//   /*
//   ----------------------------------
//   STEP 1
//   FOOD SEARCH
//   ----------------------------------
//   */

//   const foods =
//     await searchFoods(query);

//   if (
//     foods &&
//     foods.length > 0
//   ) {

// const details =
//   await getFoodDetails(
//     foods[0].id
//   );

// return {

//   found: true,

//   entityType: "FOOD",

//   source: "DATABASE",

//   data: {

//     id: details.id,

//     name: details.name,

//     imageUrl: details.imageUrl,

//     calories:
//       details.caloriesPer100g,

//     protein:
//       details.proteinPer100g,

//     carbs:
//       details.carbsPer100g,

//     fat:
//       details.fatsPer100g,

//     fiber:
//       details.fiberPer100g,

//     // unit: "100g",
//     unit:
//   details.referenceUnit === "ml"
//     ? "100ml"
//     : "100g",

//     foodType:
//       details.foodType,

//     referenceUnit:
//       details.referenceUnit,

//     typicalServingWeight:
//       details.typicalServingWeight,

//     servings:
//       details.servings

//   }

// };

//   }

//   /*
//   ----------------------------------
//   STEP 2
//   INGREDIENT SEARCH
//   ----------------------------------
//   */

//   const ingredient =
//     await searchIngredient(
//       query
//     );

//   if (
//     ingredient
//   ) {

// return {

//   found: true,

//   entityType: "INGREDIENT",

//   source: "DATABASE",

//   data: {

//     id:
//       ingredient.id,

//     name:
//       ingredient.name,

//     imageUrl:
//       ingredient.image_url,

//     calories:
//       ingredient.calories,

//     protein:
//       ingredient.protein,

//     carbs:
//       ingredient.carbs,

//     fat:
//       ingredient.fat,

//     fiber:
//       ingredient.fibre,

//     // unit: "100g",
//     unit:
//   ingredient.referenceUnit === "ml"
//     ? "100ml"
//     : "100g",

//     foodType:
//       "WEIGHT_BASED",

//     referenceUnit:
//       "g",

//     typicalServingWeight:
//       100,

//     servings: []

//   }

// };

//   }

//   /*
//   ----------------------------------
//   STEP 3
//   AI GENERATION
//   ----------------------------------
//   */

//   const ai =
//     await getNutritionFromAI(
//       query
//     );

//     console.log("Response From AIIIIII777" + JSON.stringify(ai));

//   /*
//   ----------------------------------
//   INGREDIENT
//   ----------------------------------
//   */

//   if (
//     ai.entityType ===
//     "INGREDIENT"
//   ) {

//     const saved =
//       await insertIngredient({

//         name:
//           query,
          
//         aliases:
//           ai.aliases,

//         calories:
//           ai.calories,

//         protein:
//           ai.protein,

//         carbs:
//           ai.carbs,

//         fat:
//           ai.fat,

//         fibre:
//           ai.fibre,

//         type:
//           ai.type || "OTHER"

//       });

// return {

//   found: true,

//   generated: true,

//   saved: true,

//   source: "AI",

//   entityType: "INGREDIENT",

//   data: {

//     id:
//       ingredient.id,

//     name:
//       ingredient.name,

//     imageUrl:
//       ingredient.imageUrl,

//     calories:
//       ingredient.calories,

//     protein:
//       ingredient.protein,

//     carbs:
//       ingredient.carbs,

//     fat:
//       ingredient.fat,

//     fiber:
//       ingredient.fibre,

//     // unit:
//     //   "100g",

//     unit:
//     ingredient.referenceUnit === "ml"
//     ? "100ml"
//     : "100g",

//     foodType:
//       "WEIGHT_BASED",

//     referenceUnit:
//       "g",

//     typicalServingWeight:
//       100,

//     servings: []

//   }

// };

//   }

//   /*
//   ----------------------------------
//   FOOD
//   ----------------------------------
//   */

//   const saveResult =
//     await saveGeneratedFood({

//       name:
//         query,

//       caloriesPer100g:
//         ai.calories,

//       proteinPer100g:
//         ai.protein,

//       carbsPer100g:
//         ai.carbs,

//       fatsPer100g:
//         ai.fat,

//       fibre:
//         ai.fibre,

//       foodType:
//         ai.foodType,

//       typicalServingWeight:
//         ai.typicalServingWeight,

//       referenceUnit:
//         ai.referenceUnit

//     });

//   const details =
//     await getFoodDetails(
//       saveResult.foodReferenceId
//     );

// return {

//   found: true,

//   generated: true,

//   saved: true,

//   source: "AI",

//   entityType: "FOOD",

//   data: {

//     id: details.id,

//     name: details.name,

//     imageUrl:details.imageUrl,

//     calories: details.caloriesPer100g,

//     protein: details.proteinPer100g,

//     carbs: details.carbsPer100g,

//     fat: details.fatsPer100g,

//     fiber: details.fiberPer100g,

//     // unit: "100g",
//     unit:
//   details.referenceUnit === "ml"
//     ? "100ml"
//     : "100g",

//     foodType: details.foodType,

//     referenceUnit: details.referenceUnit,

//     typicalServingWeight: details.typicalServingWeight,

//     servings: details.servings

//   }

// };

// };




// VERSION 3 
import {
  searchFoodExact
} from "./searchFoodExact.service.js";

import {
  searchFoodPartial
} from "./foodSearch.service.js";

import {
  searchIngredientExact
} from "./searchIngredientExact.service.js";

import {
  searchIngredientPartial
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
INGREDIENT EXACT
----------------------------------
*/

const ingredient =
  await searchIngredientExact(query);

if (ingredient) {

  return {

    found: true,

    entityType: "INGREDIENT",

    source: "DATABASE",

    data: {

      id: ingredient.id,

      name: ingredient.name,

      imageUrl: ingredient.image_url,

      calories: ingredient.calories,

      protein: ingredient.protein,

      carbs: ingredient.carbs,

      fat: ingredient.fat,

      fiber: ingredient.fibre,

      unit: "100g",

      foodType: "WEIGHT_BASED",

      referenceUnit: "g",

      typicalServingWeight: 100,

      servings: []

    }

  };

}

  /*
----------------------------------
STEP 2
FOOD EXACT
----------------------------------
*/

const food =
  await searchFoodExact(query);

if (food) {

  const details =
    await getFoodDetails(food.id);

  return {

    found: true,

    entityType: "FOOD",

    source: "DATABASE",

    data: {

      id: details.id,

      name: details.name,

      imageUrl: details.imageUrl,

      calories: details.caloriesPer100g,

      protein: details.proteinPer100g,

      carbs: details.carbsPer100g,

      fat: details.fatsPer100g,

      fiber: details.fiberPer100g,

      unit:
        details.referenceUnit === "ml"
          ? "100ml"
          : "100g",

      foodType: details.foodType,

      referenceUnit: details.referenceUnit,

      typicalServingWeight:
        details.typicalServingWeight,

      servings: details.servings

    }

  };

}



/*
----------------------------------
STEP 3
INGREDIENT PARTIAL
----------------------------------
*/

const partialIngredient =
  await searchIngredientPartial(query);

if (partialIngredient) {

  return {

    found: true,

    entityType: "INGREDIENT",

    source: "DATABASE",

    data: {

      id: partialIngredient.id,

      name: partialIngredient.name,

      imageUrl: partialIngredient.image_url,

      calories: partialIngredient.calories,

      protein: partialIngredient.protein,

      carbs: partialIngredient.carbs,

      fat: partialIngredient.fat,

      fiber: partialIngredient.fibre,

      unit: "100g",

      foodType: "WEIGHT_BASED",

      referenceUnit: "g",

      typicalServingWeight: 100,

      servings: []

    }

  };

}

/*
----------------------------------
STEP 4
FOOD PARTIAL
----------------------------------
*/

const partialFoods =
  await searchFoodPartial(query);

if (partialFoods.length) {

  const details =
    await getFoodDetails(
      partialFoods[0].id
    );

  return {

    found: true,

    entityType: "FOOD",

    source: "DATABASE",

    data: {

      id: details.id,

      name: details.name,

      imageUrl: details.imageUrl,

      calories: details.caloriesPer100g,

      protein: details.proteinPer100g,

      carbs: details.carbsPer100g,

      fat: details.fatsPer100g,

      fiber: details.fiberPer100g,

      unit:
        details.referenceUnit === "ml"
          ? "100ml"
          : "100g",

      foodType: details.foodType,

      referenceUnit: details.referenceUnit,

      typicalServingWeight:
        details.typicalServingWeight,

      servings: details.servings

    }

  };

}

  /*
  ----------------------------------
  STEP 5
  AI GENERATION
  ----------------------------------
  */

  const ai =
    await getNutritionFromAI(
      query
    );

    console.log("Response From AIIIIII777" + JSON.stringify(ai));

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
          
        aliases:
          ai.aliases,

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

  source: "AI",

  entityType: "INGREDIENT",

  data: {

    id:
      ingredient.id,

    name:
      ingredient.name,

    imageUrl:
      ingredient.imageUrl,

    calories:
      ingredient.calories,

    protein:
      ingredient.protein,

    carbs:
      ingredient.carbs,

    fat:
      ingredient.fat,

    fiber:
      ingredient.fibre,

    // unit:
    //   "100g",

    unit:
    ingredient.referenceUnit === "ml"
    ? "100ml"
    : "100g",

    foodType:
      "WEIGHT_BASED",

    referenceUnit:
      "g",

    typicalServingWeight:
      100,

    servings: []

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

  source: "AI",

  entityType: "FOOD",

  data: {

    id: details.id,

    name: details.name,

    imageUrl:details.imageUrl,

    calories: details.caloriesPer100g,

    protein: details.proteinPer100g,

    carbs: details.carbsPer100g,

    fat: details.fatsPer100g,

    fiber: details.fiberPer100g,

    // unit: "100g",
    unit:
  details.referenceUnit === "ml"
    ? "100ml"
    : "100g",

    foodType: details.foodType,

    referenceUnit: details.referenceUnit,

    typicalServingWeight: details.typicalServingWeight,

    servings: details.servings

  }

};

};