


//Version 1 : 

// import { getMealRecommendations } from "./ai.service.js";
// import { redis } from "../../utils/redisClient.js";
// import { generateCacheKey } from "../../utils/cacheKey.js";

// const PAGE_SIZE = 5;

// export const generateMealService = async ({
//   goal,
//   structuredGoal,
//   ingredients,
//   foodType,
//   page = 1,
// }) => {
//   try {
//     const cacheKey = generateCacheKey({
//       structuredGoal,
//       ingredients,
//       foodType,
//     });

//     console.log("Cache Key:", cacheKey, "Page:", page);

//     const cached = await redis.get(cacheKey);

//     let allMeals = [];

//     // ✅ SAFE CACHE HANDLING
//     if (cached) {
//       console.log("⚡ CACHE HIT");

//       try {
//        // const parsed = JSON.parse(cached);
//         const parsed = typeof cached === "string" ? JSON.parse(cached) : cached;

//         allMeals = Array.isArray(parsed)
//           ? parsed
//           : parsed?.recommendations || [];

//       } catch (err) {
//         console.error("❌ Corrupted cache detected → deleting key");
//         await redis.del(cacheKey); // 🔥 IMPORTANT
//         allMeals = [];
//       }
//     }

//     // ✅ CACHE MISS OR INVALID CACHE
//     if (!allMeals.length) {
//       console.log("🔥 CACHE MISS → Calling AI");

//       const aiResponse = await getMealRecommendations({
//         goal,
//         structuredGoal,
//         ingredients,
//         foodType,
//         count: 20,
//       });

//       // 🔥 CRITICAL FIX
//       allMeals = aiResponse?.recommendations || [];

//       if (!Array.isArray(allMeals)) {
//         throw new Error("AI response is not an array");
//       }

//       // ✅ ALWAYS STORE STRING
//       await redis.set(cacheKey, JSON.stringify(allMeals), {
//         ex: 3600,
//       });
//     }

//     // ✅ PAGINATION
//     const start = (page - 1) * PAGE_SIZE;
//     const end = start + PAGE_SIZE;

//     const paginatedMeals = allMeals.slice(start, end);

//     return {
//       recommendations: paginatedMeals,
//     };

//   } catch (err) {
//     console.error("Service Error:", err);
//     throw err;
//   }
// };


// Version 2 : Enhancement of version 1 with vector db

// import { getMealRecommendations } from "./ai.service.js";
// import { redis } from "../../utils/redisClient.js";
// import { generateCacheKey } from "../../utils/cacheKey.js";
// import pool from "../../db/connection.js";

// import { getEmbedding } from "../embedding/embedding.service.js";
// import { buildEmbeddingText } from "../embedding/embeddingText.js";

// const PAGE_SIZE = 5;
// const SIMILARITY_THRESHOLD = 0.3; // 🔥 tune later

// // 🔍 VECTOR SEARCH
// const searchSimilarRecipes = async ({
//   structuredGoal,
//   ingredients,
//   foodType,
// }) => {
//   const text = `
//     Goal: ${structuredGoal.goalType}
//     Ingredients: ${ingredients.join(", ")}
//     Food Type: ${foodType.join(", ")}
//   `;

//   const embedding = await getEmbedding(text);

//   const result = await pool.query(
//     `
//     SELECT *,
//       embedding <-> $1 AS distance
//     FROM recipes
//     WHERE goal_type = $2
//     ORDER BY embedding <-> $1
//     LIMIT 20
//     `,
//     [`[${embedding.join(",")}]`, structuredGoal.goalType]
//   );

//   return result.rows.filter(r => r.distance < SIMILARITY_THRESHOLD);
// };

// // 💾 SAVE RECIPES
// const saveRecipesToDB = async (meals, structuredGoal) => {
//   for (const rec of meals) {
//     const item = rec.items?.[0];
//     if (!item) continue;

//     try {
//       const text = buildEmbeddingText(item, structuredGoal);
//       const embedding = await getEmbedding(text);

//       await pool.query(
//         `
//         INSERT INTO recipes (
//           name, description, goal_type, food_type,
//           ingredients, steps, prep_time, difficulty,
//           calories, protein, carbs, fat,
//           image_url, embedding
//         )
//         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
//         `,
//         [
//           item.name,
//           item.description,
//           structuredGoal.goalType,
//           [item.foodType],
//           item.ingredients,
//           item.steps,
//           item.prepTime,
//           item.difficulty,
//           item.nutrition.calories,
//           item.nutrition.protein,
//           item.nutrition.carbs,
//           item.nutrition.fat,
//           rec.imageUrl,
//           `[${embedding.join(",")}]`,
//         ]
//       );
//     } catch (err) {
//       console.error("❌ Failed to save recipe:", err.message);
//     }
//   }
// };

// // 🧠 MAIN SERVICE
// export const generateMealService = async ({
//   goal,
//   structuredGoal,
//   ingredients,
//   foodType,
//   page = 1,
// }) => {
//   try {
//     const cacheKey = generateCacheKey({
//       structuredGoal,
//       ingredients,
//       foodType,
//     });

//     console.log("Cache Key:", cacheKey, "Page:", page);

//     let allMeals = [];

//     // 🟢 STEP 1: REDIS
//     const cached = await redis.get(cacheKey);

//     if (cached) {
//       console.log("⚡ CACHE HIT");

//       try {
//         const parsed =
//           typeof cached === "string" ? JSON.parse(cached) : cached;

//         allMeals = Array.isArray(parsed)
//           ? parsed
//           : parsed?.recommendations || [];
//       } catch {
//         await redis.del(cacheKey);
//       }
//     }

//     // 🟡 STEP 2: VECTOR SEARCH
//     if (!allMeals.length) {
//       console.log("🔍 VECTOR SEARCH");

//       const vectorResults = await searchSimilarRecipes({
//         structuredGoal,
//         ingredients,
//         foodType,
//       });

//       if (vectorResults.length > 5) {
//         console.log("✅ VECTOR HIT");

//         allMeals = vectorResults.map(r => ({
//           type: "single",
//           items: [
//             {
//               name: r.name,
//               description: r.description,
//               ingredients: r.ingredients,
//               steps: r.steps,
//               prepTime: r.prep_time,
//               difficulty: r.difficulty,
//               nutrition: {
//                 protein: r.protein,
//                 calories: r.calories,
//                 fat: r.fat,
//                 carbs: r.carbs,
//               },
//             },
//           ],
//           imageUrl: r.image_url,
//         }));

//         await redis.set(cacheKey, JSON.stringify(allMeals), {
//           ex: 3600,
//         });
//       }
//     }

//     // 🔴 STEP 3: AI FALLBACK
//     if (!allMeals.length) {
//       console.log("🔥 AI CALL");

//       const aiResponse = await getMealRecommendations({
//         goal,
//         structuredGoal,
//         ingredients,
//         foodType,
//         count: 20,
//       });

//       allMeals = aiResponse?.recommendations || [];

//       if (!Array.isArray(allMeals)) {
//         throw new Error("AI response is not an array");
//       }

//       // 💾 SAVE TO DB
//       await saveRecipesToDB(allMeals, structuredGoal);

//       // ⚡ CACHE
//       await redis.set(cacheKey, JSON.stringify(allMeals), {
//         ex: 3600,
//       });
//     }

//     // 📄 PAGINATION
//     const start = (page - 1) * PAGE_SIZE;
//     const end = start + PAGE_SIZE;

//     return {
//       recommendations: allMeals.slice(start, end),
//     };
//   } catch (err) {
//     console.error("Service Error:", err);
//     throw err;
//   }
// };


// Version 3 : Clone of v2

import { getMealRecommendations } from "./ai.service.js";
import { redis } from "../../utils/redisClient.js";
import { generateCacheKey } from "../../utils/cacheKey.js";
import pool from "../../db/connection.js";

import { getEmbedding } from "../embedding/embedding.service.js";
import { buildEmbeddingText } from "../embedding/embeddingText.js";

const PAGE_SIZE = 5;
const SIMILARITY_THRESHOLD = 0.3;

// 🔍 VECTOR SEARCH
const searchSimilarRecipes = async ({
  structuredGoal,
  ingredients,
  foodType,
}) => {
  try {
    const text = `
      Goal: ${structuredGoal.goalType}
      Ingredients: ${ingredients.join(", ")}
      Food Type: ${foodType.join(", ")}
    `;

    const embedding = await getEmbedding(text);

    // 🛑 SAFETY CHECK
    if (!embedding || !Array.isArray(embedding)) {
      console.log("⚠️ Invalid embedding → skipping vector search");
      return [];
    }

    const result = await pool.query(
      `
      SELECT *,
        embedding <-> $1 AS distance
      FROM recipes
      WHERE goal_type = $2
      ORDER BY embedding <-> $1
      LIMIT 20
      `,
      [`[${embedding.join(",")}]`, structuredGoal.goalType]
    );

    return result.rows.filter(r => r.distance < SIMILARITY_THRESHOLD);

  } catch (err) {
    console.error("❌ Vector search failed:", err.message);
    return [];
  }
};

const normalizeIngredient = (ing) => {
  return ing
    .toLowerCase()
    .replace(/,.*$/, "") // remove ", diced"
    .replace(/breast|boneless|skinless|shredded|cubed|sliced/g, "")
    .trim();
};

// 💾 SAVE RECIPES
const saveRecipesToDB = async (meals, structuredGoal) => {


  for (const rec of meals) {
    const item = rec.items?.[0];

    // console.log("👉 FULL REC:", JSON.stringify(rec, null, 2));
    // console.log("👉 ITEM:", item);
    // console.log("👉 INGREDIENTS:", item?.ingredients);

    if (!item) continue;

    try {
      const text = buildEmbeddingText(item, structuredGoal);
      const embedding = await getEmbedding(text);

      // 🛑 SAFETY CHECK
      if (!embedding || !Array.isArray(embedding)) {
        console.log("⚠️ Skipping save → embedding failed");
        continue;
      }

      await pool.query(
        `
        INSERT INTO recipes (
          name, description, goal_type, food_type,
          ingredients, steps, prep_time, difficulty,
          calories, protein, carbs, fat,
          image_url, embedding
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        `,
        [
          item.name,
          item.description,
          structuredGoal.goalType,
          item.foodType ? [item.foodType] : [],

          // 🔥 FIX: ensure arrays always
          item.ingredients || [],
          item.steps || [],

          item.prepTime,
          item.difficulty,

          rec.totalNutrition?.calories || 0,
          rec.totalNutrition?.protein || 0,
          rec.totalNutrition?.carbs || 0,
          rec.totalNutrition?.fat || 0,

          rec.imageUrl,

          `[${embedding.join(",")}]`,
        ]
      );

    } catch (err) {
      console.error("❌ Failed to save recipe:", err.message);
    }
  }
};

// 🧠 MAIN SERVICE
export const generateMealService = async ({
  goal,
  structuredGoal,
  ingredients,
  foodType,
  page = 1,
}) => {
  try {
    const cacheKey = generateCacheKey({
      structuredGoal,
      ingredients,
      foodType,
    });

    console.log("Cache Key:", cacheKey, "Page:", page);

    let allMeals = [];

    // 🟢 STEP 1: REDIS
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("⚡ SOURCE: REDIS");

      try {
        const parsed =
          typeof cached === "string" ? JSON.parse(cached) : cached;

        allMeals = Array.isArray(parsed)
          ? parsed
          : parsed?.recommendations || [];
      } catch {
        await redis.del(cacheKey);
      }
    }

    // 🟡 STEP 2: VECTOR SEARCH
    if (!allMeals.length) {
      console.log("🔍 SOURCE: VECTOR");

      const vectorResults = await searchSimilarRecipes({
        structuredGoal,
        ingredients,
        foodType,
      });

      if (vectorResults.length > 5) {
        console.log("✅ VECTOR HIT");

        allMeals = vectorResults.map(r => ({
          type: "single",
          items: [
            {
              name: r.name,
              description: r.description,
              ingredients: r.ingredients || [],
              steps: r.steps || [],
              prepTime: r.prep_time,
              difficulty: r.difficulty,
              nutrition: {
                protein: r.protein,
                calories: r.calories,
                fat: r.fat,
                carbs: r.carbs,
              },
            },
          ],
          imageUrl: r.image_url,
        }));

        await redis.set(cacheKey, JSON.stringify(allMeals), {
          ex: 3600,
        });
      }
    }

    // 🔴 STEP 3: AI FALLBACK
    if (!allMeals.length) {
      console.log("🔥 SOURCE: AI");

      const aiResponse = await getMealRecommendations({
        goal,
        structuredGoal,
        ingredients,
        foodType,
        count: 20,
      });

      allMeals = aiResponse?.recommendations || [];

      console.log("AI Response :" +JSON.stringify(allMeals))

      if (!Array.isArray(allMeals)) {
        throw new Error("AI response is not an array");
      }

      // 💾 SAVE TO DB
      await saveRecipesToDB(allMeals, structuredGoal);

      // ⚡ CACHE
      await redis.set(cacheKey, JSON.stringify(allMeals), {
        ex: 3600,
      });
    }

    // 📄 PAGINATION
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return {
      recommendations: allMeals.slice(start, end),
    };

  } catch (err) {
    console.error("Service Error:", err);
    throw err;
  }
};