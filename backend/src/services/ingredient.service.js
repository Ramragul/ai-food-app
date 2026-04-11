import pool from "../db/connection.js";

export const getIngredients = async ({ category, type, search }) => {
  let query = `
    SELECT 
      i.id,
      i.name,
      i.type,
      i.category,
      i.image_url,
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

  // Category filter
  if (category && category !== "all") {
    query += ` AND i.category = $${index}`;
    values.push(category);
    index++;
  }

  // Type filter
  if (type) {
    query += ` AND i.type = $${index}`;
    values.push(type);
    index++;
  }

  // Search (name + aliases 🔥)
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