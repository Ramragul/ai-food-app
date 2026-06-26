import {
  lookupNutritionService
} from "../services/nutritionLookup.service.js";

export const lookupNutrition =
async (
  req,
  res
) => {

  try {

    const {
      query
    } = req.body;

    if (
      !query?.trim()
    ) {

      return res
        .status(400)
        .json({
          message:
            "Query required"
        });

    }

    const result =
      await lookupNutritionService(
        query
      );

    return res
      .status(200)
      .json(result);

  } catch(err){

   console.error(
  err.response?.data || err.message
);

    return res
      .status(500)
      .json({
        message:
          "Lookup failed"
      });

  }

};