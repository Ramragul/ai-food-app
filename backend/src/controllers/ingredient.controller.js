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

import { getIngredients } from "../services/ingredient.service.js";

export const fetchIngredients = async (req, res) => {
  try {
    const { category } = req.params;
    const { type, search } = req.query;

    // ✅ VALIDATION HERE
    const allowedCategories = ["core", "supporting", "all","base"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const data = await getIngredients({ category, type, search });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error fetching ingredients:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ingredients",
    });
  }
};