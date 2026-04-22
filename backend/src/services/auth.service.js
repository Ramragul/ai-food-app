import pool from "../db/connection.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const signupService = async (data) => {
  const {
    name,
    nickname,
    mobile,
    email,
    age_range,
    gender,
    goal,
    password
  } = data;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users 
    (name, nickname, mobile, email, age_range, gender, goal, password)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING id, name, nickname`,
    [name, nickname, mobile, email, age_range, gender, goal, hashed]
  );

  const user = result.rows[0];

  return {
    token: generateToken(user),
    user
  };
};


export const loginService = async (mobile, password) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE mobile=$1",
    [mobile]
  );

  if (!result.rows.length) throw new Error("User not found");

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Invalid password");

  return {
    token: generateToken(user),
    user: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      gender: user.gender
    }
  };
};


export const resetPasswordService = async (mobile, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);

  await pool.query(
    "UPDATE users SET password=$1 WHERE mobile=$2",
    [hashed, mobile]
  );

  return { message: "Password updated" };
};