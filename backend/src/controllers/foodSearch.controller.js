import { searchFoods }
from "../services/searchFoodExact.service.js";

export const searchFood = async (
  req,
  res
) => {
  try {
    const { q } = req.query;

    const foods =
      await searchFoodPartial(q);

    res.status(200).json(foods);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Search failed"
    });
  }
};