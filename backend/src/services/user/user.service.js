import pool from "../../db/connection.js";

/**
 * GET USER PROFILE SERVICE
 */
export const getUserProfileService = async (userId) => {
  const result = await pool.query(
    `SELECT id, name, nickname, email, mobile, age_range, gender, goal
     FROM users WHERE id = $1`,
    [userId]
  );

  return result.rows[0];
};

/**
 * UPDATE USER PROFILE SERVICE
 */
export const updateUserProfileService = async (userId, data) => {
  const {
    name,
    nickname,
    age_range,
    gender,
    goal
  } = data;

  await pool.query(
    `UPDATE users
     SET name=$1, nickname=$2, age_range=$3, gender=$4, goal=$5
     WHERE id=$6`,
    [name, nickname, age_range, gender, goal, userId]
  );

  return { message: "Profile updated successfully" };
};