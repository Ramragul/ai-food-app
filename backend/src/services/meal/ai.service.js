



// Version 1 : Clone of version 2 with redis implementations

// import axios from "axios";
// import { fetchFoodImage } from "../imageService.js";

// export const getMealRecommendations = async ({ goal, structuredGoal, ingredients, foodType }) => {

//   console.log("Food Type" +foodType);
//   try {
//     if (!goal || !ingredients?.length) {
//       throw new Error("Invalid input");
//     }

//     const prompt = `
//     You are an expert chef + nutritionist.
    
//     User goals (raw):
//     ${goal}

//     --------------------------------------
//     STRUCTURED UNDERSTANDING
//     --------------------------------------

//     Goal Type: ${structuredGoal?.goalType || "not specified"}

//     Preferences:
//     ${JSON.stringify(structuredGoal?.preferences || {}, null, 2)}

//     Targets:
//     ${JSON.stringify(structuredGoal?.targets || {}, null, 2)}

    
//     Available ingredients:
//     ${ingredients.join(", ")}
    
//     Preferred food types:
//     ${foodType.join(", ")}
    
//     --------------------------------------
//     STEP 1: UNDERSTAND GOALS
//     --------------------------------------
    
//     Extract:
//     - protein / carbs / fat / calories (if mentioned)
//     - body goal (fat loss / lean bulk / weight gain)
    
//     If numbers are missing:
//     → estimate intelligently
    
//     --------------------------------------
//     STEP 2: GENERATE RECOMMENDATIONS
//     --------------------------------------
    
//     - ALWAYS return EXACTLY 5 recommendations
//     - Each recommendation is a COMPLETE meal option
//     - Each recommendation can be:
//       → "single" (one dish)
//       → OR "combo" (multiple items ONLY if needed)
    
//     COMBO RULE:
//     - Use combo ONLY if goal cannot be met realistically with one dish
//     - If combo is used:
//       1. First preference → whey protein shake (1 scoop)
//       2. Then add food items if needed
    
//     --------------------------------------
//     STEP 3: FOOD TYPE RULES
//     --------------------------------------
    
//     - If ONE foodType:
//       → ALL recommendations must belong to that type
//     - If MULTIPLE:
//       → distribute across them
    
//     --------------------------------------
//     STEP 4: TASTE & REALISM (VERY IMPORTANT)
//     --------------------------------------
    
//     - Food must feel DELICIOUS and CRAVABLE
//     - Avoid boring gym food
//     - Use real dishes people love
//     - Keep it practical and cookable
    
//     --------------------------------------
//     STEP 5: NUTRITION RULES
//     --------------------------------------
    
//     - Each recommendation should be within ±15g of protein target (if provided)
//     - Do NOT overload unrealistic macros into one dish
    
//     --------------------------------------
//     STEP 6: COOKING DETAILS (NEW)
//     --------------------------------------
    
//     Each item MUST include:
    
//     - ingredients (array of strings with quantity)
//     - steps (clear step-by-step instructions, 4–8 steps)
//     - prepTime (e.g. "20 mins")
//     - difficulty ("Easy" | "Medium" | "Hard")
    
//     Steps must be:
//     - simple
//     - practical
//     - easy to follow for home cooking
    
//     --------------------------------------
//     OUTPUT FORMAT (STRICT JSON)
//     --------------------------------------
    
//     Return ONLY valid JSON.
//     No markdown.
//     No explanation.
//     No extra text.
    
//     {
//       "recommendations": [
//         {
//           "type": "single" OR "combo",
//           "items": [
//             {
//               "name": "",
//               "foodType": "",
//               "description": "",
//               "spiceLevel": "",
//               "cookingMethod": "",
//               "ingredients": [
//                 "1 cup rice",
//                 "200g chicken"
//               ],
//               "utensils": [
//                 "Pan",
//                 "Knife",
//                 "Mixing bowl"
//               ],
//               "steps": [
//                 "Step 1...",
//                 "Step 2..."
//               ],
//               "prepTime": "",
//               "difficulty": "",
//               "nutrition": {
//                 "protein": "",
//                 "calories": "",
//                 "fat": "",
//                 "carbs": ""
//               }
//             }
//           ],
//           "totalNutrition": {
//             "protein": "",
//             "calories": "",
//             "fat": "",
//             "carbs": ""
//           }
//         }
//       ]
//     }
//     `;

//     const response = await axios.post(
//       // `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       // `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }]
//           }
//         ]
//       }
//     );

//     let text =
//       response.data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!text) {
//       throw new Error("Empty response from AI");
//     }

//     text = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//       let parsed;

//       try {
//         const rawText =
//           response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
//         if (!rawText) {
//           throw new Error("Empty response from AI");
//         }
      
//         // ✅ STEP 1: Clean markdown
//         let cleaned = rawText
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();
      
//         // ✅ STEP 2: Extract ONLY JSON (VERY IMPORTANT)
//         const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      
//         if (!jsonMatch) {
//           console.error("No JSON found:", cleaned);
//           throw new Error("AI did not return JSON");
//         }
      
//         const jsonString = jsonMatch[0];
      
//         // ✅ STEP 3: Parse safely
//         parsed = JSON.parse(jsonString);

//         await Promise.all(
//           parsed.recommendations.map(async (rec) => {
//             const mainItem = rec.items?.[0];
        
//             if (mainItem?.name) {
//               try {
//                 rec.imageUrl = await fetchFoodImage(mainItem.name);
//               } catch (err) {
//                 console.error("Image fetch failed:", err);
//                 rec.imageUrl = null;
//               }
//             }
//           })
//         );
      
//       } catch (err) {
//         console.error("AI RAW RESPONSE:", response.data);
//         throw new Error("AI returned invalid JSON");
//       }

//       // for (const rec of parsed.recommendations) {
//       //   try {
//       //     const mainItem = rec.items?.[0];
      
//       //     if (mainItem?.name) {
//       //       const image = await fetchFoodImage(mainItem.name);
      
//       //       rec.imageUrl = image;
//       //     } else {
//       //       rec.imageUrl = null;
//       //     }
//       //   } catch (err) {
//       //     console.error("Image fetch failed:", err);
//       //     rec.imageUrl = null;
//       //   }
//       // }

     

//     return parsed;

//   } catch (error) {
//     console.error("AI Error:", error.response?.data || error.message);
//     throw new Error("Failed to generate meals");
//   }
// };


// version 2 : clone of version 1

// import axios from "axios";
// import { fetchFoodImage } from "../imageService.js";

// export const getMealRecommendations = async ({ goal, structuredGoal, ingredients, foodType , count = 5 }) => {

//   console.log("Food Type" +foodType);
//   console.log("ingredients" +ingredients)
//   try {
//     if (!goal || !ingredients?.length) {
//       throw new Error("Invalid input");
//     }

    // const prompt = `
    // You are an expert chef + nutritionist.
    
    // User goals (raw):
    // ${goal}

    // --------------------------------------
    // STRUCTURED UNDERSTANDING
    // --------------------------------------

    // Goal Type: ${structuredGoal?.goalType || "not specified"}

    // Preferences:
    // ${JSON.stringify(structuredGoal?.preferences || {}, null, 2)}

    // Targets:
    // ${JSON.stringify(structuredGoal?.targets || {}, null, 2)}

    
    // Available ingredients:
    // ${ingredients.join(", ")}
    
    // Preferred food types:
    // ${foodType.join(", ")}
    
    // --------------------------------------
    // STEP 1: UNDERSTAND GOALS
    // --------------------------------------
    
    // Extract:
    // - protein / carbs / fat / calories (if mentioned)
    // - body goal (fat loss / lean bulk / weight gain)
    
    // If numbers are missing:
    // → estimate intelligently
    
    // --------------------------------------
    // STEP 2: GENERATE RECOMMENDATIONS
    // --------------------------------------
    
    // - ALWAYS return EXACTLY ${count} recommendations
    // - Each recommendation is a COMPLETE meal option
    // - Each recommendation MUST be UNIQUE
    // - Do NOT repeat similar dishes
    // - Ensure variety across all recommendations

    // - Each recommendation can be:
    //   → "single" (one dish)
    //   → OR "combo" (multiple items ONLY if needed)
    
    // COMBO RULE:
    // - Use combo ONLY if goal cannot be met realistically with one dish
    // - If combo is used:
    //   1. First preference → whey protein shake (1 scoop)
    //   2. Then add food items if needed
    
    // --------------------------------------
    // STEP 3: FOOD TYPE RULES
    // --------------------------------------
    
    // - If ONE foodType:
    //   → ALL recommendations must belong to that type
    // - If MULTIPLE:
    //   → distribute across them
    
    // --------------------------------------
    // STEP 4: TASTE & REALISM (VERY IMPORTANT)
    // --------------------------------------
    
    // - Food must feel DELICIOUS and CRAVABLE
    // - Avoid boring gym food
    // - Use real dishes people love
    // - Keep it practical and cookable
    
    // --------------------------------------
    // STEP 5: NUTRITION RULES
    // --------------------------------------
    
    // - Each recommendation should be within ±15g of protein target (if provided)
    // - Do NOT overload unrealistic macros into one dish
    
    // --------------------------------------
    // STEP 6: COOKING DETAILS (NEW)
    // --------------------------------------
    
    // Each item MUST include:
    
    // - ingredients (array of strings with quantity)
    // - steps (clear step-by-step instructions, 4–8 steps)
    // - prepTime (e.g. "20 mins")
    // - difficulty ("Easy" | "Medium" | "Hard")
    
    // Steps must be:
    // - simple
    // - practical
    // - easy to follow for home cooking
    
    // --------------------------------------
    // OUTPUT FORMAT (STRICT JSON)
    // --------------------------------------
    
    // Return ONLY valid JSON.
    // No markdown.
    // No explanation.
    // No extra text.
    
    // {
    //   "recommendations": [
    //     {
    //       "type": "single" OR "combo",
    //       "items": [
    //         {
    //           "name": "",
    //           "foodType": "",
    //           "description": "",
    //           "spiceLevel": "",
    //           "cookingMethod": "",
    //           "ingredients": [
    //             "1 cup rice",
    //             "200g chicken"
    //           ],
    //           "utensils": [
    //             "Pan",
    //             "Knife",
    //             "Mixing bowl"
    //           ],
    //           "steps": [
    //             "Step 1...",
    //             "Step 2..."
    //           ],
    //           "prepTime": "",
    //           "difficulty": "",
    //           "nutrition": {
    //             "protein": "",
    //             "calories": "",
    //             "fat": "",
    //             "carbs": ""
    //           }
    //         }
    //       ],
    //       "totalNutrition": {
    //         "protein": "",
    //         "calories": "",
    //         "fat": "",
    //         "carbs": ""
    //       }
    //     }
    //   ]
    // }
    // `;

//     const response = await axios.post(
//       // `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       // `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }]
//           }
//         ]
//       }
//     );

//     let text =
//       response.data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!text) {
//       throw new Error("Empty response from AI");
//     }

//     text = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//       let parsed;

//       try {
//         const rawText =
//           response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
//         if (!rawText) {
//           throw new Error("Empty response from AI");
//         }
      
//         // ✅ STEP 1: Clean markdown
//         let cleaned = rawText
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();
      
//         // ✅ STEP 2: Extract ONLY JSON (VERY IMPORTANT)
//         const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      
//         if (!jsonMatch) {
//           console.error("No JSON found:", cleaned);
//           throw new Error("AI did not return JSON");
//         }
      
//         const jsonString = jsonMatch[0];
      
//         // ✅ STEP 3: Parse safely
//         parsed = JSON.parse(jsonString);

//         await Promise.all(
//           parsed.recommendations.map(async (rec) => {
//             const mainItem = rec.items?.[0];
        
//             if (mainItem?.name) {
//               try {
//                 rec.imageUrl = await fetchFoodImage(mainItem.name);
//               } catch (err) {
//                 console.error("Image fetch failed:", err);
//                 rec.imageUrl = null;
//               }
//             }
//           })
//         );
      
//       } catch (err) {
//         console.error("AI RAW RESPONSE:", response.data);
//         throw new Error("AI returned invalid JSON");
//       }

//       // for (const rec of parsed.recommendations) {
//       //   try {
//       //     const mainItem = rec.items?.[0];
      
//       //     if (mainItem?.name) {
//       //       const image = await fetchFoodImage(mainItem.name);
      
//       //       rec.imageUrl = image;
//       //     } else {
//       //       rec.imageUrl = null;
//       //     }
//       //   } catch (err) {
//       //     console.error("Image fetch failed:", err);
//       //     rec.imageUrl = null;
//       //   }
//       // }

     

//     return parsed;

//   } catch (error) {
//     console.error("AI Error:", error.response?.data || error.message);
//     throw new Error("Failed to generate meals");
//   }
// };



// Version 3 : 

// import axios from "axios";
// import pool from "../../db/connection.js";
// import { fetchFoodImage } from "../imageService.js";

// /**
//  * Normalize FE input
//  */
// const normalizeIngredients = (ingredients) => {
//   if (!ingredients) return [];

//   if (Array.isArray(ingredients)) return ingredients;

//   return ingredients
//     .split(",")
//     .map((i) => i.trim().toLowerCase())
//     .filter(Boolean);
// };

// /**
//  * Normalize names (VERY IMPORTANT)
//  */
// const normalizeName = (name) => {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, " ")
//     .replace(/s$/, ""); // onions → onion
// };

// /**
//  * Fetch main ingredients + nutrition
//  */
// const fetchMainIngredientsFromDB = async (ingredientNames) => {
//   const result = await pool.query(
//     `
//     SELECT 
//       i.id, i.name, i.category, i.type, i.aliases,
//       n.calories, n.protein, n.carbs, n.fat
//     FROM ingredients i
//     JOIN nutrition_per_100g n ON i.id = n.ingredient_id
//     WHERE i.is_active = true
//       AND (
//         LOWER(i.name) = ANY($1)
//         OR EXISTS (
//           SELECT 1 FROM unnest(i.aliases) a
//           WHERE LOWER(a) = ANY($1)
//         )
//       )
//     `,
//     [ingredientNames]
//   );

//   return result.rows;
// };

// /**
//  * Fetch supporting + base ingredients WITH nutrition
//  */
// const fetchSupportingIngredients = async () => {
//   const result = await pool.query(
//     `
//     SELECT 
//       i.id, i.name, i.category, i.type, i.aliases,
//       n.calories, n.protein, n.carbs, n.fat
//     FROM ingredients i
//     LEFT JOIN nutrition_per_100g n 
//       ON i.id = n.ingredient_id
//     WHERE i.category IN ('supporting', 'base') 
//       AND i.is_active = true
//     `
//   );

//   return result.rows;
// };

// /**
//  * Build DB map (main + supporting)
//  */
// const buildIngredientMap = (rows) => {
//   const map = {};

//   rows.forEach((i) => {
//     map[normalizeName(i.name)] = i;

//     if (i.aliases) {
//       i.aliases.forEach((alias) => {
//         map[normalizeName(alias)] = i;
//       });
//     }
//   });

//   return map;
// };

// /**
//  * Fuzzy match helper
//  */
// const findClosestMatch = (name, dbMap) => {
//   const keys = Object.keys(dbMap);

//   return keys.find(
//     (key) => key.includes(name) || name.includes(key)
//   );
// };

// /**
//  * Sanitize ingredients (NO FAIL)
//  */
// const sanitizeIngredients = (ingredientsList, dbMap) => {
//   const cleaned = [];

//   for (const item of ingredientsList) {
//     const match = item.match(/(\d+)\s*g\s*(.*)/i);
//     if (!match) continue;

//     const qty = match[1];
//     let name = normalizeName(match[2]);

//     // ✅ Direct match
//     if (dbMap[name]) {
//       cleaned.push(`${qty}g ${dbMap[name].name}`);
//       continue;
//     }

//     // ✅ Fuzzy match
//     const closest = findClosestMatch(name, dbMap);
//     if (closest) {
//       cleaned.push(`${qty}g ${dbMap[closest].name}`);
//       continue;
//     }

//     // ❌ Skip (NO crash)
//     console.warn("⚠️ Skipping unknown ingredient:", name);
//   }

//   return cleaned;
// };

// /**
//  * Nutrition calculation (DB-driven)
//  */
// const calculateNutrition = (ingredientsList, dbMap) => {
//   let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

//   for (const item of ingredientsList) {
//     const match = item.match(/(\d+)\s*g\s*(.*)/i);
//     if (!match) continue;

//     const qty = parseFloat(match[1]);
//     const name = normalizeName(match[2]);

//     const dbItem = dbMap[name];
//     if (!dbItem || !dbItem.calories) continue;

//     total.calories += (dbItem.calories * qty) / 100;
//     total.protein += (dbItem.protein * qty) / 100;
//     total.carbs += (dbItem.carbs * qty) / 100;
//     total.fat += (dbItem.fat * qty) / 100;
//   }

//   return {
//     calories: Math.round(total.calories),
//     protein: Math.round(total.protein),
//     carbs: Math.round(total.carbs),
//     fat: Math.round(total.fat),
//   };
// };


// const extractValidJSON = (text) => {
//   let start = text.indexOf("{");
//   let end = text.lastIndexOf("}");

//   if (start === -1 || end === -1) {
//     throw new Error("No JSON found");
//   }

//   let jsonString = text.substring(start, end + 1);

//   try {
//     return JSON.parse(jsonString);
//   } catch (err) {
//     console.warn("⚠️ First parse failed, trying recovery...");

//     // Try trimming from end until valid
//     for (let i = end; i > start; i--) {
//       try {
//         const attempt = text.substring(start, i);
//         return JSON.parse(attempt);
//       } catch (_) {}
//     }

//     throw new Error("Unable to parse AI JSON safely");
//   }
// };

// const normalizeAIResponse = (parsed) => {
//   // Case 1: correct format
//   if (Array.isArray(parsed?.recommendations)) {
//     return parsed;
//   }

//   // Case 2: nested inside data
//   if (Array.isArray(parsed?.data?.recommendations)) {
//     return {
//       recommendations: parsed.data.recommendations,
//     };
//   }

//   // Case 3: single object → wrap into array
//   if (parsed?.recommendations && typeof parsed.recommendations === "object") {
//     return {
//       recommendations: [parsed.recommendations],
//     };
//   }

//   // Case 4: completely broken → fallback
//   console.warn("⚠️ AI returned unexpected structure:", parsed);

//   return {
//     recommendations: [],
//   };
// };

// export const getMealRecommendations = async ({
//   goal,
//   structuredGoal,
//   ingredients,
//   foodType,
//   count = 5,
// }) => {
//   try {
//     if (!goal || !ingredients) {
//       throw new Error("Invalid input");
//     }

//     // ✅ STEP 1
//     const ingredientNames = normalizeIngredients(ingredients);

//     // ✅ STEP 2
//     const mainIngredients = await fetchMainIngredientsFromDB(
//       ingredientNames
//     );

//     if (!mainIngredients.length) {
//       throw new Error("No valid ingredients found in DB");
//     }

//     // ✅ STEP 3
//     const supportingIngredients = await fetchSupportingIngredients();

//     // ✅ STEP 4 (MERGE)
//     const allIngredients = [
//       ...mainIngredients,
//       ...supportingIngredients,
//     ];

//     const dbMap = buildIngredientMap(allIngredients);

//     // ✅ STEP 5 (PROMPT - YOUR ORIGINAL + CONTROL)
//     const prompt = `
// You are an expert chef + nutritionist.

// --------------------------------------
// STRICT INGREDIENT CONSTRAINT (CRITICAL)
// --------------------------------------

// MAIN INGREDIENTS:
// ${mainIngredients.map((i) => i.name).join(", ")}

// SUPPORTING + BASE INGREDIENTS:
// ${supportingIngredients.map((i) => i.name).join(", ")}

// RULES:
// - ONLY use above ingredients
// - NO external ingredients

// --------------------------------------

// User goals:
// ${goal}

// Structured:
// ${JSON.stringify(structuredGoal || {}, null, 2)}

// Food Types:
// ${foodType.join(", ")}

// --------------------------------------

// - Return EXACTLY ${count} UNIQUE meals
// - Include ingredients with quantity (100g format)
// - Include steps, prepTime, difficulty
// - Nutrition is approximate

// --------------------------------------

// STRICT JSON ONLY
// `;

//     // ✅ STEP 6 AI CALL
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );

//     let rawText =
//       response.data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!rawText) throw new Error("Empty AI response");

//     let cleaned = rawText
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .replace(/\n/g, " ")
//     .trim();
  
//   let parsed;
  
//   try {
//     let parsed = extractValidJSON(cleaned);

//     // 🔥 normalize structure
//     parsed = normalizeAIResponse(parsed);
//   } catch (err) {
//     console.warn("⚠️ Retry AI due to JSON issue...");
  
//     // 🔁 RETRY ONCE
//     const retryResponse = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );
  
//     let retryText =
//       retryResponse.data.candidates?.[0]?.content?.parts?.[0]?.text;
  
//     if (!retryText) throw new Error("Retry failed");
  
//     retryText = retryText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .replace(/\n/g, " ")
//       .trim();
  
//     parsed = extractValidJSON(retryText);
//   }

//     // ✅ STEP 7 POST PROCESS
//     if (!Array.isArray(parsed.recommendations)) {
//       console.warn("⚠️ recommendations is not array, fixing...");
//       parsed.recommendations = [];
//     }
    
//     for (const rec of parsed.recommendations) {
//       if (!Array.isArray(rec.items)) {
//         console.warn("⚠️ Missing items, skipping rec");
//         continue;
//       }

//       for (const item of rec.items) {
//         // 🔥 sanitize (NO FAIL)
//         item.ingredients = sanitizeIngredients(
//           item.ingredients,
//           dbMap
//         );

//         // 🔥 nutrition fix
//         item.nutrition = calculateNutrition(
//           item.ingredients,
//           dbMap
//         );
//       }

//       // total nutrition
//       rec.totalNutrition = rec.items.reduce(
//         (acc, item) => {
//           acc.calories += item.nutrition.calories;
//           acc.protein += item.nutrition.protein;
//           acc.carbs += item.nutrition.carbs;
//           acc.fat += item.nutrition.fat;
//           return acc;
//         },
//         { calories: 0, protein: 0, carbs: 0, fat: 0 }
//       );

//       // image
//       const mainItem = rec.items?.[0];
//       if (mainItem?.name) {
//         try {
//           rec.imageUrl = await fetchFoodImage(mainItem.name);
//         } catch {
//           rec.imageUrl = null;
//         }
//       }
//     }

//     return parsed;
//   } catch (error) {
//     console.error("AI Error:", error.response?.data || error.message);
//     throw new Error("Failed to generate meals");
//   }
// };



// version 4

// import axios from "axios";
// import pool from "../../db/connection.js";
// import { fetchFoodImage } from "../imageService.js";

// /**
//  * Normalize FE input
//  */
// const normalizeIngredients = (ingredients) => {
//   if (!ingredients) return [];
//   if (Array.isArray(ingredients)) return ingredients;

//   return ingredients
//     .split(",")
//     .map((i) => i.trim().toLowerCase())
//     .filter(Boolean);
// };

// const normalizeName = (name) => {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, " ")
//     .replace(/s$/, "");
// };

// /**
//  * DB fetch
//  */
// const fetchMainIngredientsFromDB = async (ingredientNames) => {
//   const result = await pool.query(
//     `
//     SELECT 
//       i.id, i.name, i.category, i.type, i.aliases,
//       n.calories, n.protein, n.carbs, n.fat
//     FROM ingredients i
//     JOIN nutrition_per_100g n ON i.id = n.ingredient_id
//     WHERE i.is_active = true
//       AND (
//         LOWER(i.name) = ANY($1)
//         OR EXISTS (
//           SELECT 1 FROM unnest(i.aliases) a
//           WHERE LOWER(a) = ANY($1)
//         )
//       )
//     `,
//     [ingredientNames]
//   );

//   return result.rows;
// };

// const fetchSupportingIngredients = async () => {
//   const result = await pool.query(
//     `
//     SELECT 
//       i.id, i.name, i.category, i.type, i.aliases,
//       n.calories, n.protein, n.carbs, n.fat
//     FROM ingredients i
//     LEFT JOIN nutrition_per_100g n 
//       ON i.id = n.ingredient_id
//     WHERE i.category IN ('supporting', 'base') 
//       AND i.is_active = true
//     `
//   );

//   return result.rows;
// };

// const buildIngredientMap = (rows) => {
//   const map = {};

//   rows.forEach((i) => {
//     map[normalizeName(i.name)] = i;

//     if (i.aliases) {
//       i.aliases.forEach((alias) => {
//         map[normalizeName(alias)] = i;
//       });
//     }
//   });

//   return map;
// };

// const findClosestMatch = (name, dbMap) => {
//   return Object.keys(dbMap).find(
//     (key) => key.includes(name) || name.includes(key)
//   );
// };

// const sanitizeIngredients = (ingredientsList, dbMap) => {
//   const cleaned = [];

//   for (const item of ingredientsList) {
//     const match = item.match(/(\d+)\s*g\s*(.*)/i);
//     if (!match) continue;

//     const qty = match[1];
//     let name = normalizeName(match[2]);

//     if (dbMap[name]) {
//       cleaned.push(`${qty}g ${dbMap[name].name}`);
//       continue;
//     }

//     const closest = findClosestMatch(name, dbMap);
//     if (closest) {
//       cleaned.push(`${qty}g ${dbMap[closest].name}`);
//       continue;
//     }

//     console.warn("⚠️ Skipping unknown ingredient:", name);
//   }

//   return cleaned;
// };

// const calculateNutrition = (ingredientsList, dbMap) => {
//   let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

//   for (const item of ingredientsList) {
//     const match = item.match(/(\d+)\s*g\s*(.*)/i);
//     if (!match) continue;

//     const qty = parseFloat(match[1]);
//     const name = normalizeName(match[2]);

//     const dbItem = dbMap[name];
//     if (!dbItem || !dbItem.calories) continue;

//     total.calories += (dbItem.calories * qty) / 100;
//     total.protein += (dbItem.protein * qty) / 100;
//     total.carbs += (dbItem.carbs * qty) / 100;
//     total.fat += (dbItem.fat * qty) / 100;
//   }

//   return {
//     calories: Math.round(total.calories),
//     protein: Math.round(total.protein),
//     carbs: Math.round(total.carbs),
//     fat: Math.round(total.fat),
//   };
// };

// /**
//  * 🔥 ULTRA ROBUST JSON PARSER
//  */
// const extractValidJSON = (text) => {
//   if (!text) return null;

//   try {
//     return JSON.parse(text);
//   } catch (_) {}

//   const match = text.match(/\{[\s\S]*\}/);
//   if (match) {
//     try {
//       return JSON.parse(match[0]);
//     } catch (_) {}
//   }

//   let start = text.indexOf("{");
//   let end = text.lastIndexOf("}");

//   if (start === -1 || end === -1) return null;

//   for (let i = end; i > start; i--) {
//     try {
//       return JSON.parse(text.substring(start, i));
//     } catch (_) {}
//   }

//   return null;
// };

// /**
//  * Normalize ANY AI response shape
//  */
// const normalizeAIResponse = (parsed) => {
//   if (Array.isArray(parsed?.recommendations)) return parsed;

//   if (Array.isArray(parsed?.data?.recommendations)) {
//     return { recommendations: parsed.data.recommendations };
//   }

//   if (parsed?.recommendations && typeof parsed.recommendations === "object") {
//     return { recommendations: [parsed.recommendations] };
//   }

//   if (parsed?.mealName && parsed?.ingredients) {
//     return {
//       recommendations: [
//         {
//           type: "single",
//           items: [
//             {
//               name: parsed.mealName,
//               foodType: parsed.foodType || "",
//               description: parsed.description || "",
//               ingredients: parsed.ingredients.map(
//                 (i) => `${i.quantity} ${i.item}`
//               ),
//               steps: parsed.steps || [],
//               prepTime: parsed.prepTime || "",
//               difficulty: parsed.difficulty || "",
//               nutrition: {},
//             },
//           ],
//         },
//       ],
//     };
//   }

//   console.warn("⚠️ Unknown AI format:", parsed);
//   return { recommendations: [] };
// };

// export const getMealRecommendations = async ({
//   goal,
//   structuredGoal,
//   ingredients,
//   foodType,
//   count = 5,
// }) => {
//   try {
//     if (!goal || !ingredients) {
//       throw new Error("Invalid input");
//     }

//     const ingredientNames = normalizeIngredients(ingredients);

//     const mainIngredients = await fetchMainIngredientsFromDB(
//       ingredientNames
//     );

//     const supportingIngredients = await fetchSupportingIngredients();

//     // console.log("Supporting Ingredients before dbMap :" +JSON.stringify(supportingIngredients))


//     const dbMap = buildIngredientMap([
//       // ...mainIngredients,
//       ...supportingIngredients,
//     ]);

  

//     const dbIngredientNames = [
//       ...new Set(Object.values(dbMap).map(i => i.name))
//     ];


//     console.log("Main Ingredients" +ingredients)
//     console.log(" Supporting / Base Ingredients" +dbIngredientNames)

//     // ✅ YOUR ORIGINAL PROMPT (UNCHANGED)
//     // const prompt = `<<< KEEP YOUR FULL ORIGINAL PROMPT HERE EXACTLY >>>`;

//     console.log("Ingredients before Prompting :" +ingredients)

// //     const prompt = `
// //     You are an expert chef + nutritionist.
    
// //     User goals (raw):
// //     ${goal}

// //     --------------------------------------
// //     STRUCTURED UNDERSTANDING
// //     --------------------------------------

// //     Goal Type: ${structuredGoal?.goalType || "not specified"}

// //     Preferences:
// //     ${JSON.stringify(structuredGoal?.preferences || {}, null, 2)}

// //     Targets:
// //     ${JSON.stringify(structuredGoal?.targets || {}, null, 2)}


    
// //     Main ingredients: 
// //     ${ingredients.join(", ")}
    
// //     Supporting / Base ingredients 
// //     ${dbIngredientNames.join(", ")}
    
// //     Preferred food types:
// //     ${foodType.join(", ")}
    
// //     --------------------------------------
// //     STEP 1: UNDERSTAND GOALS
// //     --------------------------------------
    
// //     Extract:
// //     - protein / carbs / fat / calories (if mentioned)
// //     - body goal (fat loss / lean bulk / weight gain)
    
// //     If numbers are missing:
// //     → estimate intelligently
    
// //     --------------------------------------
// //     STEP 2: GENERATE RECOMMENDATIONS
// //     --------------------------------------
    
// //     - ALWAYS return EXACTLY ${count} recommendations
// //     - Each recommendation is a COMPLETE meal option
// //     - Each recommendation MUST be UNIQUE
// //     - Do NOT repeat similar dishes
// //     - Ensure variety across all recommendations

// //     - Each recommendation can be:
// //       → "single" (one dish)
// //       → OR "combo" (multiple items ONLY if needed)
    
// //     COMBO RULE:
// //     - Use combo ONLY if goal cannot be met realistically with one dish
// //     - If combo is used:
// //       1. First preference → whey protein shake (1 scoop)
// //       2. Then add food items if needed
    
// //     --------------------------------------
// //     STEP 3: FOOD TYPE RULES
// //     --------------------------------------
    
// //     - If ONE foodType:
// //       → ALL recommendations must belong to that type
// //     - If MULTIPLE:
// //       → distribute across them
    
// //     --------------------------------------
// //     STEP 4: TASTE & REALISM (VERY IMPORTANT)
// //     --------------------------------------
    
// //     - Food must feel DELICIOUS and CRAVABLE
// //     - Avoid boring gym food
// //     - Use real dishes people love
// //     - Keep it practical and cookable
    
// //     --------------------------------------
// //     STEP 5: NUTRITION RULES
// //     --------------------------------------
    
// //     - Each recommendation should be within ±15g of protein target (if provided)
// //     - Do NOT overload unrealistic macros into one dish
    
// //     --------------------------------------
// //     STEP 6: COOKING DETAILS (NEW)
// //     --------------------------------------
    
// //     Each item MUST include:
    
// //     - Main ingredients (array of strings with quantity)
// //     - steps (clear step-by-step instructions, 4–8 steps)
// //     - prepTime (e.g. "20 mins")
// //     - difficulty ("Easy" | "Medium" | "Hard")
    
// //     Steps must be:
// //     - simple
// //     - practical
// //     - easy to follow for home cooking

// //       --------------------------------------
// //       SMART INGREDIENT USAGE RULES (VERY IMPORTANT)
// //       --------------------------------------

// //       MAIN INGREDIENT RULES:

// //       - The user-selected main ingredients are:
// //         → ${ingredients.join(", ")}

// //       - You MUST use these ingredients across the recommendations.

// //       - DO NOT blindly combine all main ingredients into one dish.

// //       - Each dish should:
// //         → Use 1 or 2 compatible main ingredients only
// //         → Avoid unrealistic combinations (e.g. chicken + fish + mutton together)

// //       - Across ALL recommendations:
// //         → Try to cover ALL selected main ingredients at least once
// //         → Distribute them intelligently across different dishes

// //       - If ingredients are naturally compatible (e.g. paneer + vegetables):
// //         → You MAY combine them


// //       SUPPORTING / BASE INGREDIENT RULES:

// //       - You are given a full list of available supporting ingredients:
// //         → ${dbIngredientNames.join(", ")}

// //       - DO NOT use all supporting ingredients blindly.

// //       - Use ONLY what is necessary to:
// //         → make the dish tasty
// //         → make it realistic
// //         → improve texture, flavor, and cooking quality

// //       - Prefer minimal, clean ingredient usage.

// //       - Always include essential cooking basics when needed:
// //         → salt, oil, spices, etc.


// //       REALISM RULE (CRITICAL):

// //       - Every dish must feel:
// //         → realistic
// //         → cookable in a home kitchen
// //         → something a normal person would actually eat

// //       - Avoid over-complicated or overloaded ingredient lists


// // CRITICAL RULE (MUST FOLLOW):

// // - "ingredients" field is MANDATORY
// // - It MUST contain at least 4 ingredients
// // - It MUST NEVER be empty
// // - NEVER return "ingredients": []
// // - If unsure, generate realistic ingredients

// // If ingredients is empty → response is INVALID
    
// //     --------------------------------------
// //     OUTPUT FORMAT (STRICT JSON)
// //     --------------------------------------
    
// //     Return ONLY valid JSON.
// //     No markdown.
// //     No explanation.
// //     No extra text.
    
// //     {
// //       "recommendations": [
// //         {
// //           "type": "single" OR "combo",
// //           "items": [
// //             {
// //               "name": "",
// //               "foodType": "",
// //               "description": "",
// //               "spiceLevel": "",
// //               "cookingMethod": "",
// //               "ingredients": [
// //                 "rice",
// //                 "chicken",
// //                 "salt",
// //               ],
// //               "utensils": [
// //                 "Pan",
// //                 "Knife",
// //                 "Mixing bowl"
// //               ],
// //               "steps": [
// //                 "Step 1...",
// //                 "Step 2..."
// //               ],
// //               "prepTime": "",
// //               "difficulty": "",
// //               "nutrition": {
// //                 "protein": "",
// //                 "calories": "",
// //                 "fat": "",
// //                 "carbs": ""
// //               }
// //             }
// //           ],
// //           "totalNutrition": {
// //             "protein": "",
// //             "calories": "",
// //             "fat": "",
// //             "carbs": ""
// //           }
// //         }
// //       ]
// //     }
// //     `;


// const prompt = `
// You are an expert chef + nutritionist.

// User goals (raw):
// ${goal}

// --------------------------------------
// STRUCTURED UNDERSTANDING
// --------------------------------------

// Goal Type: ${structuredGoal?.goalType || "not specified"}

// Preferences:
// ${JSON.stringify(structuredGoal?.preferences || {}, null, 2)}

// Targets:
// ${JSON.stringify(structuredGoal?.targets || {}, null, 2)}

// --------------------------------------
// AVAILABLE INGREDIENTS (STRICT CONSTRAINT)
// --------------------------------------

// Main ingredients:
// ${ingredients.join(", ")}

// Supporting / Base ingredients:
// ${dbIngredientNames.slice(0, 25).join(", ")}

// 🚨 RULE:
// - You MUST ONLY use ingredients from the above lists
// - DO NOT use anything outside
// - Kitchen constraint is STRICT

// --------------------------------------
// 🚨 CRITICAL OUTPUT RULE (HIGHEST PRIORITY)
// --------------------------------------

// Each item MUST include:

// - "ingredients" (MANDATORY)
// - MUST have at least 3 items
// - MUST NEVER be empty
// - NEVER return []

// Format MUST be:

// "ingredients": ["chicken", "rice", "onion"]

// ❌ NOT:
// "ingredients": []
// ❌ NOT:
// "1 cup rice"

// If ingredients are missing → RESPONSE IS INVALID

// --------------------------------------
// STEP 1: UNDERSTAND GOALS
// --------------------------------------

// Extract:
// - protein / carbs / fat / calories
// - body goal

// If missing → estimate intelligently

// --------------------------------------
// STEP 2: GENERATE RECOMMENDATIONS
// --------------------------------------

// - EXACTLY ${count} recommendations
// - UNIQUE dishes only
// - realistic & practical

// - Types:
//   → "single"
//   → "combo" (ONLY if needed)

// COMBO RULE:
// - Use only if necessary
// - First add whey protein if needed

// --------------------------------------
// STEP 3: FOOD TYPE RULES
// --------------------------------------

// - Respect foodType strictly
// - Distribute if multiple

// --------------------------------------
// STEP 4: TASTE & REALISM
// --------------------------------------

// - Must be tasty
// - Must be cookable
// - Avoid boring food

// --------------------------------------
// STEP 5: NUTRITION RULES
// --------------------------------------

// - Within ±15g protein
// - Avoid unrealistic macros

// --------------------------------------
// STEP 6: COOKING DETAILS
// --------------------------------------

// Each item MUST include:

// - ingredients (MANDATORY — already defined above)
// - steps (4–8 steps)
// - prepTime
// - difficulty

// Steps MUST USE the ingredients listed above

// --------------------------------------
// SMART INGREDIENT RULES
// --------------------------------------

// - Use user ingredients:
//   ${ingredients.join(", ")}

// - Use 1–2 per dish
// - Distribute across dishes

// - Supporting ingredients:
//   → use only when needed
//   → keep minimal

// --------------------------------------
// OUTPUT FORMAT (STRICT JSON)
// --------------------------------------

// Return ONLY JSON.

// {
//   "recommendations": [
//     {
//       "type": "single",
//       "items": [
//         {
//           "name": "",
//           "foodType": "",
//           "description": "",
//           "spiceLevel": "",
//           "cookingMethod": "",
//           "ingredients": [
//             "chicken",
//             "rice",
//             "onion"
//           ],
//           "utensils": [],
//           "steps": [],
//           "prepTime": "",
//           "difficulty": "",
//           "nutrition": {}
//         }
//       ],
//       "totalNutrition": {}
//     }
//   ]
// }
// `;


//     const callAI = async () => {
//       const res = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
//         { contents: [{ parts: [{ text: prompt }] }] }
//       );

//       let text =
//         res.data.candidates?.[0]?.content?.parts?.[0]?.text;

//       return text
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .replace(/\n/g, " ")
//         .trim();
//     };

//     let parsed;

//     try {
//       const cleaned = await callAI();
//       parsed = extractValidJSON(cleaned);

//       if (!parsed) throw new Error("Parse failed");

//       parsed = normalizeAIResponse(parsed);
//     } catch {
//       console.warn("⚠️ Retry AI...");
//       const cleaned = await callAI();

//       parsed = extractValidJSON(cleaned);

//       if (!parsed) {
//         console.warn("⚠️ AI failed twice, fallback empty");
//         parsed = { recommendations: [] };
//       } else {
//         parsed = normalizeAIResponse(parsed);
//       }
//     }

//     if (!Array.isArray(parsed.recommendations)) {
//       parsed.recommendations = [];
//     }

//     for (const rec of parsed.recommendations) {
//       for (const item of rec.items || []) {
//         item.ingredients = sanitizeIngredients(
//           item.ingredients,
//           dbMap
//         );

//         item.nutrition = calculateNutrition(
//           item.ingredients,
//           dbMap
//         );
//       }

//       const mainItem = rec.items?.[0];
//       if (mainItem?.name) {
//         try {
//           rec.imageUrl = await fetchFoodImage(mainItem.name);
//         } catch {
//           rec.imageUrl = null;
//         }
//       }
//     }

//     return parsed;
//   } catch (error) {
//     console.error("AI Error:", error.message);
//     throw new Error("Failed to generate meals");
//   }
// };


// Version 5

import axios from "axios";
import pool from "../../db/connection.js";
import { fetchFoodImage } from "../imageService.js";

/**
 * Normalize FE input
 */
const normalizeIngredients = (ingredients) => {
  if (!ingredients) return [];
  if (Array.isArray(ingredients)) return ingredients;

  return ingredients
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);
};

const normalizeName = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/s$/, "");
};

/**
 * DB fetch
 */
const fetchMainIngredientsFromDB = async (ingredientNames) => {
  const result = await pool.query(
    `
    SELECT 
      i.id, i.name, i.category, i.type, i.aliases,
      n.calories, n.protein, n.carbs, n.fat
    FROM ingredients i
    JOIN nutrition_per_100g n ON i.id = n.ingredient_id
    WHERE i.is_active = true
      AND (
        LOWER(i.name) = ANY($1)
        OR EXISTS (
          SELECT 1 FROM unnest(i.aliases) a
          WHERE LOWER(a) = ANY($1)
        )
      )
    `,
    [ingredientNames]
  );

  return result.rows;
};

const fetchSupportingIngredients = async () => {
  const result = await pool.query(
    `
    SELECT 
      i.id, i.name, i.category, i.type, i.aliases,
      n.calories, n.protein, n.carbs, n.fat
    FROM ingredients i
    LEFT JOIN nutrition_per_100g n 
      ON i.id = n.ingredient_id
    WHERE i.category IN ('supporting', 'base') 
      AND i.is_active = true
    `
  );

  return result.rows;
};

const buildIngredientMap = (rows) => {
  const map = {};

  rows.forEach((i) => {
    map[normalizeName(i.name)] = i;

    if (i.aliases) {
      i.aliases.forEach((alias) => {
        map[normalizeName(alias)] = i;
      });
    }
  });

  return map;
};

const findClosestMatch = (name, dbMap) => {
  return Object.keys(dbMap).find(
    (key) => key.includes(name) || name.includes(key)
  );
};

/**
 * 🔥 UPDATED sanitize (supports plain names ALSO)
 */
// const sanitizeIngredients = (ingredientsList = [], dbMap) => {
//   const cleaned = [];

//   for (const item of ingredientsList) {
//     if (!item) continue;

//     let name = item.toLowerCase().trim();

//     // remove quantity if exists
//     name = name.replace(/(\d+)\s*g\s*/i, "").trim();

//     const normalized = normalizeName(name);

//     if (dbMap[normalized]) {
//       cleaned.push(dbMap[normalized].name);
//       continue;
//     }

//     const closest = findClosestMatch(normalized, dbMap);
//     if (closest) {
//       cleaned.push(dbMap[closest].name);
//       continue;
//     }

//     // 🔥 DO NOT DROP
//     cleaned.push(name);
//   }

//   return cleaned;
// };

const sanitizeIngredients = (ingredientsList = [], dbMap) => {
  const cleaned = [];

  for (const item of ingredientsList) {
    if (!item) continue;

    let name = item.name?.toLowerCase().trim();
    const quantity = item.quantity || 100;
    const unit = item.unit || "g";

    const normalized = normalizeName(name);

    if (dbMap[normalized]) {
      cleaned.push({
        name: dbMap[normalized].name,
        quantity,
        unit,
      });
      continue;
    }

    const closest = findClosestMatch(normalized, dbMap);
    if (closest) {
      cleaned.push({
        name: dbMap[closest].name,
        quantity,
        unit,
      });
      continue;
    }

    // 🔥 fallback
    cleaned.push({
      name,
      quantity,
      unit,
    });
  }

  return cleaned;
};

// const calculateNutrition = (ingredientsList, dbMap) => {
//   let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

//   for (const item of ingredientsList) {
//     const name = normalizeName(item);
//     const dbItem = dbMap[name];

//     if (!dbItem || !dbItem.calories) continue;

//     total.calories += dbItem.calories;
//     total.protein += dbItem.protein;
//     total.carbs += dbItem.carbs;
//     total.fat += dbItem.fat;
//   }

//   return {
//     calories: Math.round(total.calories),
//     protein: Math.round(total.protein),
//     carbs: Math.round(total.carbs),
//     fat: Math.round(total.fat),
//   };
// };


const calculateNutrition = (ingredientsList, dbMap) => {
  let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  for (const item of ingredientsList) {
    const name = normalizeName(item.name);
    const qty = item.quantity || 100;

    const dbItem = dbMap[name];
    if (!dbItem || !dbItem.calories) continue;

    total.calories += (dbItem.calories * qty) / 100;
    total.protein += (dbItem.protein * qty) / 100;
    total.carbs += (dbItem.carbs * qty) / 100;
    total.fat += (dbItem.fat * qty) / 100;
  }

  return {
    calories: Math.round(total.calories),
    protein: Math.round(total.protein),
    carbs: Math.round(total.carbs),
    fat: Math.round(total.fat),
  };
};

/**
 * 🔥 NEW: Extract ingredients from steps
 */
const extractIngredientsFromSteps = (steps = [], dbMap = {}) => {
  const found = new Set();

  for (const step of steps) {
    const lower = step.toLowerCase();

    Object.keys(dbMap).forEach((key) => {
      if (lower.includes(key)) {
        found.add(dbMap[key].name);
      }
    });
  }

  return Array.from(found);
};

/**
 * JSON parser
 */
const extractValidJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {}

  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (_) {}
  }

  return null;
};

const normalizeAIResponse = (parsed) => {
  if (Array.isArray(parsed?.recommendations)) return parsed;

  return { recommendations: [] };
};

export const getMealRecommendations = async ({
  goal,
  structuredGoal,
  ingredients,
  foodType,
  count = 5,
}) => {
  try {
    const ingredientNames = normalizeIngredients(ingredients);

    const mainIngredients = await fetchMainIngredientsFromDB(
      ingredientNames
    );

    const supportingIngredients = await fetchSupportingIngredients();

    const dbMap = buildIngredientMap([
      ...supportingIngredients,
    ]);

    const dbIngredientNames = [
      ...new Set(Object.values(dbMap).map(i => i.name))
    ];

    
const prompt = `
You are an expert chef + nutritionist.

User goals (raw):
${goal}

--------------------------------------
STRUCTURED UNDERSTANDING
--------------------------------------

Goal Type: ${structuredGoal?.goalType || "not specified"}

Preferences:
${JSON.stringify(structuredGoal?.preferences || {}, null, 2)}

Targets:
${JSON.stringify(structuredGoal?.targets || {}, null, 2)}

--------------------------------------
AVAILABLE INGREDIENTS (STRICT CONSTRAINT)
--------------------------------------

Main ingredients:
${ingredients.join(", ")}

Supporting / Base ingredients:
${dbIngredientNames.slice(0, 25).join(", ")}

🚨 RULE:
- You MUST ONLY use ingredients from the above lists
- DO NOT use anything outside
- Kitchen constraint is STRICT

--------------------------------------
🚨 CRITICAL OUTPUT RULE (HIGHEST PRIORITY)
--------------------------------------

Each item MUST include:

- "ingredients" (MANDATORY)
- MUST have at least 3 items
- MUST NEVER be empty
- NEVER return []

Format MUST be:


"ingredients": [
  { "name": "chicken", "quantity": 200, "unit": "g" },
  { "name": "rice", "quantity": 100, "unit": "g" }
]

❌ NOT:
"ingredients": []
❌ NOT:
"1 cup rice"

If ingredients are missing → RESPONSE IS INVALID

--------------------------------------
STEP 1: UNDERSTAND GOALS
--------------------------------------

Extract:
- protein / carbs / fat / calories
- body goal

If missing → estimate intelligently

--------------------------------------
STEP 2: GENERATE RECOMMENDATIONS
--------------------------------------

- EXACTLY ${count} recommendations
- UNIQUE dishes only
- realistic & practical

- Types:
  → "single"
  → "combo" (ONLY if needed)

COMBO RULE:
- Use only if necessary
- First add whey protein if needed

--------------------------------------
STEP 3: FOOD TYPE RULES
--------------------------------------

- Respect foodType strictly
- Distribute if multiple

--------------------------------------
STEP 4: TASTE & REALISM
--------------------------------------

- Must be tasty
- Must be cookable
- Avoid boring food

--------------------------------------
STEP 5: NUTRITION RULES
--------------------------------------

- Within ±15g protein
- Avoid unrealistic macros

--------------------------------------
STEP 6: COOKING DETAILS
--------------------------------------

Each item MUST include:

- ingredients (MANDATORY — already defined above)
- steps (4–8 steps)
- prepTime
- difficulty

Steps MUST USE the ingredients listed above

--------------------------------------
SMART INGREDIENT RULES
--------------------------------------

- Use user ingredients:
  ${ingredients.join(", ")}

- Use 1–2 per dish
- Distribute across dishes

- Supporting ingredients:
  → use only when needed
  → keep minimal

--------------------------------------
OUTPUT FORMAT (STRICT JSON)
--------------------------------------

Return ONLY JSON.

{
  "recommendations": [
    {
      "type": "single",
      "items": [
        {
          "name": "",
          "foodType": "",
          "description": "",
          "spiceLevel": "",
          "cookingMethod": "",
          "ingredients": [
            "chicken",
            "rice",
            "onion"
          ],
          "utensils": [],
          "steps": [],
          "prepTime": "",
          "difficulty": "",
          "nutrition": {
            "protein": "",
            "calories": "",
            "fat": "",
              "carbs": ""
          }
        }
      ],
      "totalNutrition": {
        "protein": "",
        "calories": "",
        "fat": "",
        "carbs": ""
      }
    }
  ]
}
`;

    const callAI = async () => {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );

      return res.data.candidates?.[0]?.content?.parts?.[0]?.text;
    };

    let parsed;

    const cleaned = await callAI();
    parsed = extractValidJSON(cleaned);
    parsed = normalizeAIResponse(parsed);

    // for (const rec of parsed.recommendations) {
    //   for (const item of rec.items || []) {

    //     // 🔥 MAIN FIX
    //     if (!item.ingredients || item.ingredients.length === 0) {
    //       console.log("⚠️ Extracting ingredients from steps");

    //       item.ingredients = extractIngredientsFromSteps(
    //         item.steps,
    //         dbMap
    //       );
    //     }

    //     item.ingredients = sanitizeIngredients(
    //       item.ingredients,
    //       dbMap
    //     );

    //     item.nutrition = calculateNutrition(
    //       item.ingredients,
    //       dbMap
    //     );
    //   }

    //   const mainItem = rec.items?.[0];
    //   if (mainItem?.name) {
    //     try {
    //       rec.imageUrl = await fetchFoodImage(mainItem.name);
    //       console.log("Imageurl" +rec.imageUrl) 
    //     } catch {
    //       rec.imageUrl = null;
    //     }
    //   }
    // }

    for (const rec of parsed.recommendations) {
      for (const item of rec.items || []) {
    
        // 🔥 STEP 1: fallback if AI gives empty ingredients
        if (!item.ingredients || item.ingredients.length === 0) {
          console.log("⚠️ Extracting ingredients from steps");
    
          const extracted = extractIngredientsFromSteps(
            item.steps,
            dbMap
          );
    
          // ✅ convert to structured format
          item.ingredients = extracted.map(name => ({
            name,
            quantity: 100, // default for now
            unit: "g",
          }));
        }
    
        // 🔥 STEP 2: normalize existing AI ingredients (IMPORTANT)
        else {
          item.ingredients = item.ingredients.map(i => {
            // if already object → keep
            if (typeof i === "object") return i;
    
            // if string → convert
            return {
              name: i,
              quantity: 100,
              unit: "g",
            };
          });
        }
    
        // 🔥 STEP 3: sanitize (DB mapping)
        item.ingredients = sanitizeIngredients(
          item.ingredients,
          dbMap
        );
    
        // 🔥 STEP 4: nutrition calculation
        item.nutrition = calculateNutrition(
          item.ingredients,
          dbMap
        );
      }
    
      const mainItem = rec.items?.[0];
      if (mainItem?.name) {
        try {
          rec.imageUrl = await fetchFoodImage(mainItem.name);
          console.log("Imageurl " + rec.imageUrl);
        } catch {
          rec.imageUrl = null;
        }
      }
    }

    return parsed;

  } catch (error) {
    console.error("AI Error:", error.message);
    throw new Error("Failed to generate meals");
  }
};