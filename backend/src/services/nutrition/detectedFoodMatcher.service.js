import pool from "../../db/connection.js";


const normalizeFoodName = (
  name
) => {

  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

};


/*
====================================================
MATCH DETECTED FOOD
====================================================
*/

export const matchDetectedFood =
async (
  foodName
) => {

  const normalized =
    normalizeFoodName(
      foodName
    );


  if (!normalized) {

    return null;

  }


  /*
  -----------------------------------------------
  1. EXACT FOOD NAME
  -----------------------------------------------
  */

  let result =
    await pool.query(

      `
      SELECT

        fr.id,
        fr.food_name,
        fr.food_type,
        fr.typical_serving_weight,
        fr.reference_unit,

        fm.image_url,
        fm.calories_per_100g,
        fm.protein_per_100g,
        fm.carbs_per_100g,
        fm.fats_per_100g,
        fm.fiber,
        fm.density

      FROM food_reference fr

      LEFT JOIN food_master fm
        ON fm.id =
           fr.food_master_id

      WHERE LOWER(
        TRIM(fr.food_name)
      ) = $1

      LIMIT 1
      `,

      [
        normalized
      ]

    );


  if (
    result.rows.length
  ) {

    return result.rows[0];

  }


  /*
  -----------------------------------------------
  2. ALIAS MATCH
  -----------------------------------------------
  */

  result =
    await pool.query(

      `
      SELECT

        fr.id,
        fr.food_name,
        fr.food_type,
        fr.typical_serving_weight,
        fr.reference_unit,

        fm.image_url,
        fm.calories_per_100g,
        fm.protein_per_100g,
        fm.carbs_per_100g,
        fm.fats_per_100g,
        fm.fiber,
        fm.density

      FROM food_reference fr

      INNER JOIN food_reference_aliases fa

        ON fa.food_reference_id =
           fr.id

      LEFT JOIN food_master fm

        ON fm.id =
           fr.food_master_id

      WHERE LOWER(
        TRIM(fa.alias)
      ) = $1

      LIMIT 1
      `,

      [
        normalized
      ]

    );


  if (
    result.rows.length
  ) {

    return result.rows[0];

  }


  /*
  -----------------------------------------------
  3. STARTS WITH
  -----------------------------------------------
  */

  result =
    await pool.query(

      `
      SELECT

        fr.id,
        fr.food_name,
        fr.food_type,
        fr.typical_serving_weight,
        fr.reference_unit,

        fm.image_url,
        fm.calories_per_100g,
        fm.protein_per_100g,
        fm.carbs_per_100g,
        fm.fats_per_100g,
        fm.fiber,
        fm.density

      FROM food_reference fr

      LEFT JOIN food_master fm

        ON fm.id =
           fr.food_master_id

      WHERE LOWER(
        fr.food_name
      ) LIKE $1

      ORDER BY
        LENGTH(fr.food_name)

      LIMIT 1
      `,

      [
        `${normalized}%`
      ]

    );


  if (
    result.rows.length
  ) {

    return result.rows[0];

  }


  /*
  -----------------------------------------------
  4. CONTAINS
  -----------------------------------------------
  */

  result =
    await pool.query(

      `
      SELECT

        fr.id,
        fr.food_name,
        fr.food_type,
        fr.typical_serving_weight,
        fr.reference_unit,

        fm.image_url,
        fm.calories_per_100g,
        fm.protein_per_100g,
        fm.carbs_per_100g,
        fm.fats_per_100g,
        fm.fiber,
        fm.density

      FROM food_reference fr

      LEFT JOIN food_master fm

        ON fm.id =
           fr.food_master_id

      WHERE LOWER(
        fr.food_name
      ) LIKE $1

      ORDER BY
        LENGTH(fr.food_name)

      LIMIT 1
      `,

      [
        `%${normalized}%`
      ]

    );


  if (
    result.rows.length
  ) {

    return result.rows[0];

  }


  return null;

};