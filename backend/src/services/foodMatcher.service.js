// Version 1 

// import pool from "../db/connection.js";

// export const matchFood = async (foodName) => {
//   // 1. Exact match
//   let res = await pool.query(
//     `SELECT * FROM food_master WHERE LOWER(name)=LOWER($1) LIMIT 1`,
//     [foodName]
//   );

//   if (res.rows.length) {
//     return { food: res.rows[0], source: "DB", confidence: 0.95 };
//   }

//   // 2. Alias match
//   res = await pool.query(
//     `SELECT * FROM food_master WHERE $1 = ANY(aliases) LIMIT 1`,
//     [foodName.toLowerCase()]
//   );

//   if (res.rows.length) {
//     return { food: res.rows[0], source: "ALIAS", confidence: 0.85 };
//   }

//   // 3. Fuzzy match
//   res = await pool.query(
//     `SELECT * FROM food_master 
//      WHERE name ILIKE '%' || $1 || '%'
//      LIMIT 1`,
//     [foodName]
//   );

//   if (res.rows.length) {
//     return { food: res.rows[0], source: "FUZZY", confidence: 0.7 };
//   }

//   return null;
// };


// Version 2 

// import pool from "../db/connection.js";
// import { getEmbedding } from "./ai/embedding.service.js";

// /**
//  * 🔥 Normalize input (VERY IMPORTANT)
//  */
// const normalize = (text) => {
//   return text.toLowerCase().trim();
// };

// export const matchFood = async (foodName) => {
//   const normalized = normalize(foodName);





//   const isRelevantMatch = (input, dbName) => {
//     const stopWords = ["with", "and", "curry", "masala"];
  
//     const inputWords = input
//       .split(" ")
//       .filter((w) => !stopWords.includes(w));
  
//     const dbWords = dbName.split(" ");
  
//     return inputWords.some((w) => dbWords.includes(w));
//   };

//   // 🔥 1. Exact match (highest priority)
//   let res = await pool.query(
//     `SELECT *, 1.0 AS score 
//      FROM food_master 
//      WHERE LOWER(name) = $1 
//      LIMIT 1`,
//     [normalized]
//   );

//   if (res.rows.length) {
//     return {
//       food: res.rows[0],
//       source: "DB_EXACT",
//       confidence: 0.95,
//     };
//   }

//   // 🔥 2. Alias match
//   res = await pool.query(
//     `SELECT *, 0.9 AS score
//      FROM food_master 
//      WHERE $1 = ANY(aliases)
//      LIMIT 1`,
//     [normalized]
//   );

//   if (res.rows.length) {
//     return {
//       food: res.rows[0],
//       source: "ALIAS",
//       confidence: 0.9,
//     };
//   }




//   res = await pool.query(
//     `SELECT *, 0.8 AS score
//      FROM food_master
//      WHERE LOWER(name) LIKE $1 || '%'
//      LIMIT 1`,
//     [normalized]
//   );
  
//   if (
//     res.rows.length &&
//     isRelevantMatch(normalized, res.rows[0].name)
//   ) {
//     return {
//       food: res.rows[0],
//       source: "PREFIX",
//       confidence: 0.8,
//     };
//   }

//   // 🔥 4. Weak fuzzy (contains match)
//   res = await pool.query(
//     `SELECT *, 0.7 AS score
//      FROM food_master
//      WHERE LOWER(name) LIKE '%' || $1 || '%'
//      ORDER BY score DESC
//      LIMIT 1`,
//     [normalized]
//   );

//   if (
//     res.rows.length &&
//     isRelevantMatch(normalized, res.rows[0].name)
//   ) {
//     return {
//       food: res.rows[0],
//       source: "FUZZY",
//       confidence: 0.7,
//     };
//   }


//   // 🔥 5. TRIGRAM SIMILARITY (BEST MATCH)
// res = await pool.query(
//   `SELECT *, similarity(name, $1) AS score
//    FROM food_master
//    WHERE similarity(name, $1) > 0.3
//    ORDER BY score DESC
//    LIMIT 1`,
//   [normalized]
// );



// if (res.rows.length && res.rows[0].score > 0.6) {
//   return {
//     food: res.rows[0],
//     source: "TRIGRAM",
//     confidence: res.rows[0].score,
//   };
// }



// //6. Vector DB

// // 🔥 VECTOR SEARCH (BEST)
// const embedding = await getEmbedding(normalized);

// res = await pool.query(
//   `SELECT *, (embedding <-> $1) AS distance
//    FROM food_master
//    ORDER BY distance ASC
//    LIMIT 1`,
//   [embedding]
// );

// if (res.rows.length) {
//   return {
//     food: res.rows[0],
//     source: "VECTOR",
//     confidence: 1 - res.rows[0].distance, // convert distance → score
//   };
// }
//   return null;
// };



// Version 3 : Bug fix of version 2

import pool from "../db/connection.js";
import { getEmbedding } from "./ai/embedding.service.js";

/**
 * 🔥 Normalize input
 */
const normalize = (text) => {
  return text.toLowerCase().trim();
};

/**
 * 🔥 Smart relevance check (prevents wrong matches like chicken → paneer)
 */
const isRelevantMatch = (input, dbName) => {
  const stopWords = ["with", "and", "curry", "masala"];

  const inputWords = input
    .split(" ")
    .filter((w) => !stopWords.includes(w));

  const dbWords = dbName.split(" ");

  return inputWords.some((w) => dbWords.includes(w));
};

export const matchFood = async (foodName) => {
  const normalized = normalize(foodName);

  // 🔥 1. Exact match
  let res = await pool.query(
    `SELECT * FROM food_master 
     WHERE LOWER(name) = $1 
     LIMIT 1`,
    [normalized]
  );

  if (res.rows.length) {
    return {
      food: res.rows[0],
      source: "DB_EXACT",
      confidence: 0.95,
    };
  }

  // 🔥 2. Alias match
  res = await pool.query(
    `SELECT * FROM food_master 
     WHERE $1 = ANY(aliases)
     LIMIT 1`,
    [normalized]
  );

  if (res.rows.length) {
    return {
      food: res.rows[0],
      source: "ALIAS",
      confidence: 0.9,
    };
  }

  // 🔥 3. Prefix match
  res = await pool.query(
    `SELECT * FROM food_master
     WHERE LOWER(name) LIKE $1 || '%'
     LIMIT 1`,
    [normalized]
  );

  if (
    res.rows.length &&
    isRelevantMatch(normalized, res.rows[0].name)
  ) {
    return {
      food: res.rows[0],
      source: "PREFIX",
      confidence: 0.8,
    };
  }

  // 🔥 4. Fuzzy match
  res = await pool.query(
    `SELECT * FROM food_master
     WHERE LOWER(name) LIKE '%' || $1 || '%'
     LIMIT 1`,
    [normalized]
  );

  if (
    res.rows.length &&
    isRelevantMatch(normalized, res.rows[0].name)
  ) {
    return {
      food: res.rows[0],
      source: "FUZZY",
      confidence: 0.7,
    };
  }

  // 🔥 5. TRIGRAM (typo handling)
  res = await pool.query(
    `SELECT *, similarity(name, $1) AS score
     FROM food_master
     WHERE similarity(name, $1) > 0.3
     ORDER BY score DESC
     LIMIT 1`,
    [normalized]
  );

  if (
    res.rows.length &&
    res.rows[0].score > 0.6 &&
    isRelevantMatch(normalized, res.rows[0].name)
  ) {
    return {
      food: res.rows[0],
      source: "TRIGRAM",
      confidence: res.rows[0].score,
    };
  }

  // 🔥 6. VECTOR SEARCH (AI-level matching)
  try {
    const embedding = await getEmbedding(normalized);

    // ✅ FIX: format embedding correctly
    const formattedEmbedding = `[${embedding
      .map((n) => Number(n))
      .join(",")}]`;

    res = await pool.query(
      `SELECT *, (embedding <-> $1) AS distance
       FROM food_master
       WHERE embedding IS NOT NULL
       ORDER BY distance ASC
       LIMIT 1`,
      [formattedEmbedding]
    );

    if (res.rows.length) {
      const confidence = 1 - res.rows[0].distance;

      // 🔥 IMPORTANT: threshold check
      if (
        confidence > 0.75 &&
        isRelevantMatch(normalized, res.rows[0].name)
      ) {
        return {
          food: res.rows[0],
          source: "VECTOR",
          confidence,
        };
      }
    }
  } catch (err) {
    console.error("⚠️ Vector search failed:", err.message);
  }

  return null;
};