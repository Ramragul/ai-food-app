// Version 1  

// import pool from "../db/connection.js";
// import { parseFoodWithAI } from "./ai/foodParser.service.js";
// import { matchFood } from "./foodMatcher.service.js";
// import { estimateNutrition } from "./ai/nutritionEstimator.service.js";
// import { convertToServing } from "../utils/unitConverter.js";

// import { getEmbedding } from "./ai/embedding.service.js";


// /**
//  * 🔥 Normalize food names (improves consistency)
//  */
// const normalizeFood = (name) => {
//   const lower = name.toLowerCase().trim();

//   if (lower.includes("chicken")) return "chicken curry";
//   if (lower.includes("paneer")) return "paneer curry";
//   if (lower.includes("tea")) return "milk tea";

//   return lower;
// };

// /**
//  * 🔥 SAVE AI FOOD INTO DB (CACHE)
//  */
// // const saveFoodToDB = async (food, nutritionPerServing) => {
// //   try {
// //     await pool.query(
// //       `INSERT INTO food_master 
// //       (name, unit, calories, protein, carbs, fats, aliases, category)
// //       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
// //       ON CONFLICT DO NOTHING`,
// //       [
// //         food,
// //         "serving",
// //         nutritionPerServing.calories,
// //         nutritionPerServing.protein,
// //         nutritionPerServing.carbs,
// //         nutritionPerServing.fats,
// //         [
// //           food,
// //           food.replace("curry", "").trim(),
// //           food.replace("gravy", "").trim(),
// //         ],
// //         "AI_GENERATED",
// //       ]
// //     );
// //   } catch (err) {
// //     console.error("❌ DB Save Failed:", err.message);
// //   }
// // };







// const saveFoodToDB = async (food, nutritionPerServing) => {
//   try {
//     const embedding = await getEmbedding(food);

//     // ✅ FIX: correct vector format
//     const formattedEmbedding = `[${embedding
//       .map((n) => Number(n))
//       .join(",")}]`;

//     await pool.query(
//       `INSERT INTO food_master 
//       (name, unit, calories, protein, carbs, fats, aliases, category, embedding)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//       ON CONFLICT DO NOTHING`,
//       [
//         food,
//         "serving",
//         nutritionPerServing.calories,
//         nutritionPerServing.protein,
//         nutritionPerServing.carbs,
//         nutritionPerServing.fats,
//         [
//           food,
//           food.replace("curry", "").trim(),
//           food.replace("gravy", "").trim(),
//         ],
//         "AI_GENERATED",
//         formattedEmbedding,
//       ]
//     );
//   } catch (err) {
//     console.error("❌ DB Save Failed:", err.message);
//   }
// };

// /**
//  * 🔥 STEP 1: Parse + Enrich (NO DB SAVE except AI cache)
//  */
// export const addMealService = async ({ userId, input, mealType }) => {
//   const items = await parseFoodWithAI(input);

//   if (!items?.length) throw new Error("Invalid input");

//   let total = { calories: 0, protein: 0, carbs: 0, fats: 0 };
//   let enrichedItems = [];

//   for (let item of items) {
//     const normalizedFood = normalizeFood(item.food);

//     let match = await matchFood(normalizedFood);

//     const servingQty = convertToServing(
//       item.quantity,
//       item.unit,
//       normalizedFood
//     );

//     let nutrition;
//     let source = "AI";
//     let confidence = 0.6;

//     if (match) {
//       // ✅ DB HIT
//       const f = match.food;

//       nutrition = {
//         calories: f.calories * servingQty,
//         protein: f.protein * servingQty,
//         carbs: f.carbs * servingQty,
//         fats: f.fats * servingQty,
//       };

//       source = match.source;
//       confidence = match.confidence;

//     } else {
//       // 🔥 AI CALL
//       try {
//         const aiData = await estimateNutrition(normalizedFood, servingQty);

//         nutrition = aiData;

//         // 🔥 VERY IMPORTANT: Save PER SERVING (not total)
//         await saveFoodToDB(normalizedFood, {
//           calories: aiData.calories / servingQty,
//           protein: aiData.protein / servingQty,
//           carbs: aiData.carbs / servingQty,
//           fats: aiData.fats / servingQty,
//         });

//       } catch {
//         nutrition = {
//           calories: 0,
//           protein: 0,
//           carbs: 0,
//           fats: 0,
//         };

//         source = "UNKNOWN";
//         confidence = 0.3;
//       }
//     }

//     total.calories += nutrition.calories;
//     total.protein += nutrition.protein;
//     total.carbs += nutrition.carbs;
//     total.fats += nutrition.fats;

//     enrichedItems.push({
//       ...item,
//       food: normalizedFood,
//       quantity: servingQty,
//       ...nutrition,
//       source,
//       confidence,
//     });
//   }

//   return {
//     parsedItems: enrichedItems,
//     total,
//   };
// };

// /**
//  * 🔥 STEP 2: SAVE TO DB (TRANSACTION SAFE)
//  */
// export const confirmMealService = async ({
//   userId,
//   mealType,
//   items,
//   total,
// }) => {
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");

//     await client.query(
//       `INSERT INTO meal_entries 
//       (user_id, meal_type, food_items, calories, protein, carbs, fats)
//       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
//       [
//         userId,
//         mealType,
//         JSON.stringify(items),
//         total.calories,
//         total.protein,
//         total.carbs,
//         total.fats,
//       ]
//     );

//     await client.query(
//       `INSERT INTO daily_nutrition 
//       (user_id, date, total_calories, protein, carbs, fats)
//       VALUES ($1, CURRENT_DATE, $2, $3, $4, $5)
//       ON CONFLICT (user_id, date)
//       DO UPDATE SET
//         total_calories = daily_nutrition.total_calories + $2,
//         protein = daily_nutrition.protein + $3,
//         carbs = daily_nutrition.carbs + $4,
//         fats = daily_nutrition.fats + $5`,
//       [userId, total.calories, total.protein, total.carbs, total.fats]
//     );

//     await client.query("COMMIT");
//   } catch (err) {
//     await client.query("ROLLBACK");
//     throw err;
//   } finally {
//     client.release();
//   }
// };


// Version 2 : Enhancement to V1


import pool from "../db/connection.js";
import { parseFoodWithAI } from "./ai/foodParser.service.js";
import { matchFood } from "./foodMatcher.service.js";
import { estimateNutrition } from "./ai/nutritionEstimator.service.js";
import { convertToServing } from "../utils/unitConverter.js";

import { getEmbedding } from "./ai/embedding.service.js";
import { getServingsForFood , createDefaultServings } from "./foodServing.service.js";


/**
 * 🔥 Normalize food names (improves consistency)
 */
const normalizeFood = (name) => {
  const lower = name.toLowerCase().trim();

  if (lower.includes("chicken")) return "chicken curry";
  if (lower.includes("paneer")) return "paneer curry";
  if (lower.includes("tea")) return "milk tea";

  return lower;
};

/**
 * 🔥 SAVE AI FOOD INTO DB (CACHE)
 */
// const saveFoodToDB = async (food, nutritionPerServing) => {
//   try {
//     await pool.query(
//       `INSERT INTO food_master 
//       (name, unit, calories, protein, carbs, fats, aliases, category)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//       ON CONFLICT DO NOTHING`,
//       [
//         food,
//         "serving",
//         nutritionPerServing.calories,
//         nutritionPerServing.protein,
//         nutritionPerServing.carbs,
//         nutritionPerServing.fats,
//         [
//           food,
//           food.replace("curry", "").trim(),
//           food.replace("gravy", "").trim(),
//         ],
//         "AI_GENERATED",
//       ]
//     );
//   } catch (err) {
//     console.error("❌ DB Save Failed:", err.message);
//   }
// };




const buildAliases = (food) => {
  const aliases = new Set();

  aliases.add(food.toLowerCase().trim());

  aliases.add(
    food.toLowerCase().replace("curry", "").trim()
  );

  aliases.add(
    food.toLowerCase().replace("gravy", "").trim()
  );

  return [...aliases].filter(Boolean);
};


const saveFoodToDB = async (
  food,
  nutritionPerServing
) => {
  try {
    // ✅ prevent duplicate inserts
    const existing = await matchFood(food);

    if (existing) {
      console.log(
        `✅ Food already exists: ${existing.food.name}`
      );

      return existing.food.id;
    }

    const embedding = await getEmbedding(food);

    const formattedEmbedding = `[${embedding
      .map((n) => Number(n))
      .join(",")}]`;

    const aliases = buildAliases(food);

    const result = await pool.query(
      `
      INSERT INTO food_master
      (
        name,
        unit,
        calories,
        protein,
        carbs,
        fats,
        aliases,
        category,
        embedding
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      RETURNING id
      `,
      [
        food.toLowerCase().trim(),
        "serving",
        nutritionPerServing.calories,
        nutritionPerServing.protein,
        nutritionPerServing.carbs,
        nutritionPerServing.fats,
        aliases,
        "AI_GENERATED",
        formattedEmbedding,
      ]
    );

    const foodId = result.rows[0]?.id;

    if (foodId) {
  await createDefaultServings(foodId);
}

    console.log(
      `✅ New food saved: ${food} (${foodId})`
    );

    return foodId;
  } catch (err) {
    console.error(
      "❌ DB Save Failed:",
      err.message
    );

    return null;
  }
};

/**
 * 🔥 STEP 1: Parse + Enrich (NO DB SAVE except AI cache)
 */
export const addMealService = async ({ userId, input, mealType }) => {
  const items = await parseFoodWithAI(input);

  if (!items?.length) throw new Error("Invalid input");

  let total = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  let enrichedItems = [];

  for (let item of items) {
    const normalizedFood = normalizeFood(item.food);

    let match = await matchFood(normalizedFood);

    const servingQty = convertToServing(
      item.quantity,
      item.unit,
      normalizedFood
    );

    let nutrition;
    let source = "AI";
    let confidence = 0.6;

if (match) {
  const f = match.food;

  const servings = await getServingsForFood(f.id);

  nutrition = {
    calories: f.calories * servingQty,
    protein: f.protein * servingQty,
    carbs: f.carbs * servingQty,
    fats: f.fats * servingQty,
  };

  source = match.source;
  confidence = match.confidence;

  item.servings = servings;

  item.selectedServing =
    servings.find((s) => s.is_default) ||
    servings[0] ||
    null;
} else {
      // 🔥 AI CALL
      try {
        const aiData = await estimateNutrition(normalizedFood, servingQty);

        nutrition = aiData;

        // 🔥 VERY IMPORTANT: Save PER SERVING (not total)
        await saveFoodToDB(normalizedFood, {
          calories: aiData.calories / servingQty,
          protein: aiData.protein / servingQty,
          carbs: aiData.carbs / servingQty,
          fats: aiData.fats / servingQty,
        });

      } catch {
        nutrition = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        };

        source = "UNKNOWN";
        confidence = 0.3;
      }
    }

    total.calories += nutrition.calories;
    total.protein += nutrition.protein;
    total.carbs += nutrition.carbs;
    total.fats += nutrition.fats;

    enrichedItems.push({
      ...item,
      food: normalizedFood,
      quantity: servingQty,

      ...nutrition,

      source,
      confidence,

      servings: item.servings || [],

      selectedServing:
        item.selectedServing || null,
    });
  }

  return {
    parsedItems: enrichedItems,
    total,
  };
};

/**
 * 🔥 STEP 2: SAVE TO DB (TRANSACTION SAFE)
 */
export const confirmMealService = async ({
  userId,
  mealType,
  items,
  total,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO meal_entries 
      (user_id, meal_type, food_items, calories, protein, carbs, fats)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        userId,
        mealType,
        JSON.stringify(items),
        total.calories,
        total.protein,
        total.carbs,
        total.fats,
      ]
    );

    await client.query(
      `INSERT INTO daily_nutrition 
      (user_id, date, total_calories, protein, carbs, fats)
      VALUES ($1, CURRENT_DATE, $2, $3, $4, $5)
      ON CONFLICT (user_id, date)
      DO UPDATE SET
        total_calories = daily_nutrition.total_calories + $2,
        protein = daily_nutrition.protein + $3,
        carbs = daily_nutrition.carbs + $4,
        fats = daily_nutrition.fats + $5`,
      [userId, total.calories, total.protein, total.carbs, total.fats]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};