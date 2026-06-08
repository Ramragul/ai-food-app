import { searchFoods }
from "../services/foodSearch.service.js";

export const searchFood = async (
  req,
  res
) => {
  try {
    const { q } = req.query;

    const foods =
      await searchFoods(q);

    res.status(200).json(foods);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Search failed"
    });
  }
};