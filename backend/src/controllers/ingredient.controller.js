// export const fetchIngredients = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const { type, search } = req.query;

//     const data = await getIngredients({ category, type, search });

//     res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     console.error("Error fetching ingredients:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch ingredients",
//     });
//   }
// };


// Version 2 

// import { getIngredients } from "../services/ingredient.service.js";

// export const fetchIngredients = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const { type, search } = req.query;

//     // ✅ VALIDATION HERE
//     const allowedCategories = ["core", "supporting", "all","base"];

//     if (!allowedCategories.includes(category)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid category",
//       });
//     }

//     const data = await getIngredients({ category, type, search });

//     res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     console.error("Error fetching ingredients:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch ingredients",
//     });
//   }
// };


// Version 3 

import {
  getIngredients,
  findIngredientByName,
  insertIngredient
} from "../services/ingredient.service.js";

import { getNutritionFromAI } from "../services/ai/ingredientAI.service.js";

/**
 * 🔥 FETCH
 */
export const fetchIngredients = async (req, res) => {
  try {
    const { category } = req.params;
    const { type, search, mode } = req.query;

    const data = await getIngredients({
      category,
      type,
      search,
      mode
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/**
 * 🔥 CREATE FROM AI (PREVIEW)
 */
export const createIngredientFromAI = async (req, res) => {
  const { name } = req.body;

  try {
    const existing = await findIngredientByName(name);

    if (existing) {
      return res.json({
        success: true,
        exists: true,
        data: existing
      });
    }

    const nutrition = await getNutritionFromAI(name);

    res.json({
      success: true,
      exists: false,
      preview: {
        name,
        ...nutrition
      }
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/**
 * 🔥 CONFIRM SAVE
 */
export const confirmIngredient = async (req, res) => {
  try {
    const data = req.body;

    const result = await insertIngredient(data);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};