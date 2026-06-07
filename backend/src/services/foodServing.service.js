// services/foodServing.service.js

import pool from "../db/connection.js";

export const getServingsForFood = async (foodId) => {
  const result = await pool.query(
    `
    SELECT
      id,
      serving_name,
      grams,
      multiplier,
      is_default
    FROM food_servings
    WHERE food_id = $1
    ORDER BY multiplier
    `,
    [foodId]
  );

  return result.rows;
};

export const createDefaultServings = async (
  foodId,
  foodType
) => {
  try {
  let values = [];
  console.log(
  "🔥 Creating servings",
  foodId,
  foodType
);

  switch (foodType) {

    case "COUNTABLE":
      values = [
        [
          foodId,
          "1 Piece",
          "PIECE",
          40,
          null,
          1,
          true
        ],
        [
          foodId,
          "2 Pieces",
          "PIECE",
          80,
          null,
          2,
          false
        ],
        [
          foodId,
          "100g",
          "WEIGHT",
          100,
          null,
          null,
          false
        ]
      ];
      break;

    case "VOLUME_BASED":
      values = [
        [
          foodId,
          "100ml",
          "VOLUME",
          null,
          100,
          null,
          true
        ],
        [
          foodId,
          "250ml",
          "VOLUME",
          null,
          250,
          null,
          false
        ],
        [
          foodId,
          "500ml",
          "VOLUME",
          null,
          500,
          null,
          false
        ]
      ];
      break;

    default:
      values = [
        [
          foodId,
          "100g",
          "WEIGHT",
          100,
          null,
          null,
          true
        ],
        [
          foodId,
          "150g",
          "WEIGHT",
          150,
          null,
          null,
          false
        ],
        [
          foodId,
          "200g",
          "WEIGHT",
          200,
          null,
          null,
          false
        ]
      ];
  }

  for (const row of values) {
    console.log("Serving row:", row);
    await pool.query(
      `
      INSERT INTO food_servings
      (
        food_id,
        serving_name,
        serving_type,
        grams,
        ml,
        piece_count,
        is_default
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      `,
      row
    );
  }
} catch (err) {
    console.error(
      "❌ createDefaultServings failed",
      err
    );
  }
};
