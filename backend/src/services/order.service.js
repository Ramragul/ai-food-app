import pool from "../db/connection.js";

// ✅ Create Order
// export const createOrderService = async ({ userId, recipe }) => {
//   const query = `
//     INSERT INTO orders (user_id, recipe_name, recipe_data)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//   `;

//   const values = [userId, recipe.name, recipe];

//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

export const createOrderService = async ({ userId, recipe }) => {
    const client = await pool.connect();
  
    try {
      await client.query("BEGIN");
  
      const orderQuery = `
        INSERT INTO orders (user_id, recipe_name, recipe_data, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
  
      const orderValues = [userId, recipe.name, recipe, "PLACED"];
  
      const orderResult = await client.query(orderQuery, orderValues);
      const order = orderResult.rows[0];
  
      // 🔥 Insert initial tracking
      await client.query(
        `INSERT INTO order_tracking (order_id, status) VALUES ($1, $2)`,
        [order.id, "PLACED"]
      );
  
      await client.query("COMMIT");
  
      return order;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  };

// ✅ Get Orders by User
export const getOrdersByUserService = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// ✅ Update Order Status
export const updateOrderStatusService = async (orderId, status) => {
  await pool.query(
    `UPDATE orders SET status = $1 WHERE id = $2`,
    [status, orderId]
  );

  // 🔥 Track history
  await pool.query(
    `INSERT INTO order_tracking (order_id, status) VALUES ($1, $2)`,
    [orderId, status]
  );

  return true;
};

// ✅ Get Single Order
export const getOrderByIdService = async (orderId) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE id = $1`,
    [orderId]
  );
  return result.rows[0];
};