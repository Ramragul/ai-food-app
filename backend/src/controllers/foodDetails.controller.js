import {
  getFoodDetails
} from "../services/foodDetails.service.js";

export const getFoodDetailsById =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      const food =
        await getFoodDetails(
          id
        );

      if (!food) {
        return res
          .status(404)
          .json({
            message:
              "Food not found"
          });
      }

      return res
        .status(200)
        .json(food);

    } catch (err) {
      console.error(err);

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch food details"
        });
    }
  };