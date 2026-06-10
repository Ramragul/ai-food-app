import pool from "../db/connection.js";

export const saveGeneratedFood =
async (food) => {

  const client =
    await pool.connect();

  try {

    await client.query(
      "BEGIN"
    );

    const existing =
      await client.query(
        `
        SELECT
          fr.id
        FROM food_reference fr
        WHERE LOWER(
          fr.food_name
        ) =
        LOWER($1)
        LIMIT 1
        `,
        [
          food.name
        ]
      );

    if (
      existing.rows.length
    ) {

      await client.query(
        "ROLLBACK"
      );

      return {
        alreadyExists:
          true,

        foodReferenceId:
          existing.rows[0].id
      };
    }

    const master =
      await client.query(
        `
        INSERT INTO
        food_master (
          name,
          food_type,
          calories_per_100g,
          protein_per_100g,
          carbs_per_100g,
          fats_per_100g,
          typical_serving_weight
        )
          INSERT INTO food_master (
            name,
            unit,
            fiber,
            food_type,
            calories_per_100g,
            protein_per_100g,
            carbs_per_100g,
            fats_per_100g,
            typical_serving_weight
            )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        RETURNING id
        `,
        [
          food.name,
          food.referenceUnit,
          food.fibre,
          food.foodType,
          food.caloriesPer100g,
          food.proteinPer100g,
          food.carbsPer100g,
          food.fatsPer100g,
          food.typicalServingWeight
        ]
      );

    const foodMasterId =
      master.rows[0].id;

    const reference =
      await client.query(
        `
        INSERT INTO
        food_reference (
          food_name,
          food_type,
          typical_serving_weight,
          reference_unit,
          food_master_id
        )
        VALUES (
          $1,$2,$3,'g',$4
        )
        RETURNING id
        `,
        [
          food.name,
          food.foodType,
          food.typicalServingWeight,
          foodMasterId
        ]
      );

    const foodReferenceId =
      reference.rows[0].id;

    await client.query(
      `
      INSERT INTO
      food_reference_aliases (
        food_reference_id,
        alias
      )
      VALUES (
        $1,
        $2
      )
      `,
      [
        foodReferenceId,
        food.name
      ]
    );

    await client.query(
      "COMMIT"
    );

    return {
      alreadyExists:
        false,

      foodReferenceId,

      foodMasterId
    };

  } catch (err) {

    await client.query(
      "ROLLBACK"
    );

    throw err;

  } finally {

    client.release();

  }
};