import {
  scanMealService
} from "../services/nutrition/mealScan.service.js";


export const scanMeal =
async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res
        .status(400)
        .json({

          message:
            "Meal image is required"

        });

    }


    const result =
      await scanMealService(

        req.file.buffer,

        req.file.mimetype

      );


    return res
      .status(200)
      .json(result);


  } catch (err) {

    console.error(
      "Meal scan failed:",
      err
    );


    return res
      .status(500)
      .json({

        message:
          "Failed to analyze meal image"

      });

  }

};