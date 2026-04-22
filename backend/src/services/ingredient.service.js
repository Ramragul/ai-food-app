// import pool from "../db/connection.js";

// export const getIngredients = async ({ category, type, search }) => {
//   let query = `
//     SELECT 
//       i.id,
//       i.name,
//       i.type,
//       i.category,
//       i.image_url,
//       n.calories,
//       n.protein,
//       n.carbs,
//       n.fat,
//       n.fibre
//     FROM ingredients i
//     LEFT JOIN nutrition_per_100g n 
//       ON i.id = n.ingredient_id
//     WHERE 
//       i.is_active = true
//       AND i.is_user_selectable = true
//   `;

//   const values = [];
//   let index = 1;

//   // Category filter
//   if (category && category !== "all") {
//     query += ` AND i.category = $${index}`;
//     values.push(category);
//     index++;
//   }

//   // Type filter
//   if (type) {
//     query += ` AND i.type = $${index}`;
//     values.push(type);
//     index++;
//   }

//   // Search (name + aliases 🔥)
//   if (search) {
//     query += ` AND (
//       i.name ILIKE $${index}
//       OR $${index} = ANY(i.aliases)
//     )`;
//     values.push(`%${search}%`);
//     index++;
//   }

//   query += ` ORDER BY i.name`;

//   const { rows } = await pool.query(query, values);
//   return rows;
// };


// Version 2 : Home / Restaurant 


import pool from "../db/connection.js";

/**
 * 🔥 GET INGREDIENTS
 */
export const getIngredients = async ({ category, type, search, mode }) => {

  console.log("🔥 CORE API HIT");
  
  let query = `
    SELECT 
      i.id,
      i.name,
      i.type,
      i.category,
      i.image_url,
      i.is_restaurant_available,
      i.is_home_available,
      n.calories,
      n.protein,
      n.carbs,
      n.fat,
      n.fibre
    FROM ingredients i
    LEFT JOIN nutrition_per_100g n 
      ON i.id = n.ingredient_id
    WHERE 
      i.is_active = true
      AND i.is_user_selectable = true
  `;

  const values = [];
  let index = 1;

  // 🔥 MODE FILTER
  // if (mode === "home") {
  //   query += ` AND i.is_home_available = true`;
  // } else {
  //   query += ` AND i.is_restaurant_available = true`;
  // }

  if (mode === "restaurant") {
    query += ` AND i.is_restaurant_available = true`;
  } 
    


  // Category
  if (category && category !== "all") {
    query += ` AND i.category = $${index}`;
    values.push(category);
    index++;
  }

  // Type
  if (type) {
    query += ` AND i.type = $${index}`;
    values.push(type);
    index++;
  }

  // Search
  if (search) {
    query += ` AND (
      i.name ILIKE $${index}
      OR $${index} = ANY(i.aliases)
    )`;
    values.push(`%${search}%`);
    index++;
  }

  query += ` ORDER BY i.name`;

  const { rows } = await pool.query(query, values);
  return rows;
};

/**
 * 🔥 FIND BY NAME
 */
export const findIngredientByName = async (name) => {
  const { rows } = await pool.query(
    `SELECT * FROM ingredients WHERE LOWER(name) = LOWER($1) LIMIT 1`,
    [name]
  );

  return rows[0];
};

/**
 * 🔥 INSERT NEW INGREDIENT
 */
export const insertIngredient = async (data) => {
  const {
    name,
    calories,
    protein,
    carbs,
    fat,
    fibre, 
    type
  } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertIngredientQuery = `
      INSERT INTO ingredients (name, type, is_home_available, is_restaurant_available)
      VALUES ($1, $2, true, false)
      RETURNING id
    `;

    // const result = await client.query(insertIngredientQuery, [name]);
    const result = await client.query(insertIngredientQuery, [
      name,
      type,
    ]);
    const ingredientId = result.rows[0].id;

    await client.query(
      `INSERT INTO nutrition_per_100g 
       (ingredient_id, calories, protein, carbs, fat, fibre)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [ingredientId, calories, protein, carbs, fat, fibre]
    );

    await client.query("COMMIT");

    return { id: ingredientId, name };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};