// import crypto from "crypto";

// export const generateCacheKey = ({
//   structuredGoal,
//   ingredients,
//   foodType,

// }) => {
//   const normalized = {
//     goalType: structuredGoal?.goalType || "",
//     preferences: structuredGoal?.preferences || {},
//     targets: structuredGoal?.targets || {},

//     ingredients: [...ingredients].sort(),
//     foodType: [...foodType].sort(),

//   };

//   return (
//     "meal:v1:" +
//     crypto
//       .createHash("md5")
//       .update(JSON.stringify(normalized))
//       .digest("hex")
//   );
// };


// version 2 

import crypto from "crypto";

// 🔥 helper to sort object keys (VERY IMPORTANT)
const sortObject = (obj = {}) => {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

export const generateCacheKey = ({
  structuredGoal,
  ingredients = [],
  foodType = [],
}) => {
  const normalized = {
    goalType: structuredGoal?.goalType || "",

    // ✅ SORT OBJECT KEYS
    preferences: sortObject(structuredGoal?.preferences),
    targets: sortObject(structuredGoal?.targets),

    // ✅ NORMALIZE ARRAYS (CRITICAL FIX)
    ingredients: ingredients
      .map(i => i.trim().toLowerCase())
      .sort(),

    foodType: foodType
      .map(f => f.trim().toLowerCase())
      .sort(),
  };

  const keyString = JSON.stringify(normalized);

  console.log("🔑 NORMALIZED KEY DATA:", keyString);

  return (
    "meal:v2:" + // 🔥 bump version to avoid old cache conflict
    crypto
      .createHash("md5")
      .update(keyString)
      .digest("hex")
  );
};