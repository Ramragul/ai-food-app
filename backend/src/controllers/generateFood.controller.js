import {
  generateFoodEstimate
} from "../services/generateFood.service.js";

export const generateFood =
async (req,res) => {

  try {

    const {
      foodName
    } = req.body;

    const result =
      await generateFoodEstimate(
        foodName
      );

    return res
      .status(200)
      .json(result);

  } catch(err){

    console.error(err);

    return res
      .status(500)
      .json({
        message:
          "Failed to generate food"
      });
  }
};