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

// import pool from "../db/connection.js";
// import { getEmbedding } from "./ai/embedding.service.js";

// /**
//  * 🔥 Normalize input
//  */
// const normalize = (text) => {
//   return text.toLowerCase().trim();
// };

// /**
//  * 🔥 Smart relevance check (prevents wrong matches like chicken → paneer)
//  */
// const isRelevantMatch = (input, dbName) => {
//   const stopWords = ["with", "and", "curry", "masala"];

//   const inputWords = input
//     .split(" ")
//     .filter((w) => !stopWords.includes(w));

//   const dbWords = dbName.split(" ");

//   return inputWords.some((w) => dbWords.includes(w));
// };

// export const matchFood = async (foodName) => {
//   const normalized = normalize(foodName);

//   // 🔥 1. Exact match
//   let res = await pool.query(
//     `SELECT * FROM food_master 
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
//     `SELECT * FROM food_master 
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

//   // 🔥 3. Prefix match
//   res = await pool.query(
//     `SELECT * FROM food_master
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

//   // 🔥 4. Fuzzy match
//   res = await pool.query(
//     `SELECT * FROM food_master
//      WHERE LOWER(name) LIKE '%' || $1 || '%'
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

//   // 🔥 5. TRIGRAM (typo handling)
//   res = await pool.query(
//     `SELECT *, similarity(name, $1) AS score
//      FROM food_master
//      WHERE similarity(name, $1) > 0.3
//      ORDER BY score DESC
//      LIMIT 1`,
//     [normalized]
//   );

//   if (
//     res.rows.length &&
//     res.rows[0].score > 0.6 &&
//     isRelevantMatch(normalized, res.rows[0].name)
//   ) {
//     return {
//       food: res.rows[0],
//       source: "TRIGRAM",
//       confidence: res.rows[0].score,
//     };
//   }

//   // 🔥 6. VECTOR SEARCH (AI-level matching)
//   try {
//     const embedding = await getEmbedding(normalized);

//     // ✅ FIX: format embedding correctly
//     const formattedEmbedding = `[${embedding
//       .map((n) => Number(n))
//       .join(",")}]`;

//     res = await pool.query(
//       `SELECT *, (embedding <-> $1) AS distance
//        FROM food_master
//        WHERE embedding IS NOT NULL
//        ORDER BY distance ASC
//        LIMIT 1`,
//       [formattedEmbedding]
//     );

//     if (res.rows.length) {
//       const confidence = 1 - res.rows[0].distance;

//       // 🔥 IMPORTANT: threshold check
//       if (
//         confidence > 0.75 &&
//         isRelevantMatch(normalized, res.rows[0].name)
//       ) {
//         return {
//           food: res.rows[0],
//           source: "VECTOR",
//           confidence,
//         };
//       }
//     }
//   } catch (err) {
//     console.error("⚠️ Vector search failed:", err.message);
//   }

//   return null;
// };



// Version 4 - Match Food prod issue fix

import pool from "../db/connection.js";
import { getEmbedding } from "./ai/embedding.service.js";

/**
 * =========================================
 * 🔥 NORMALIZE TEXT
 * =========================================
 */
const normalize = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
};

/**
 * =========================================
 * 🔥 TOKENIZER
 * =========================================
 */
const tokenize = (text) => {
  return normalize(text).split(" ");
};

/**
 * =========================================
 * 🔥 STRICT RELEVANCE CHECK
 *
 * Prevents:
 * egg -> egg biryani
 * chicken -> chicken curry
 *
 * Allows:
 * egg fried rice -> egg fried rice
 * =========================================
 */
const isRelevantMatch = (input, dbName) => {
  const inputWords = tokenize(input);
  const dbWords = tokenize(dbName);

  /**
   * ✅ SINGLE WORD INPUT
   *
   * egg -> ONLY egg
   * chicken -> ONLY chicken
   */
  if (inputWords.length === 1) {
    return (
      dbWords.length === 1 &&
      dbWords[0] === inputWords[0]
    );
  }

  /**
   * ✅ MULTI WORD INPUT
   *
   * Every input word must exist
   */
  return inputWords.every((word) =>
    dbWords.includes(word)
  );
};

/**
 * =========================================
 * 🔥 NUTRITION SANITY CHECK
 *
 * Prevents impossible nutrition values
 * =========================================
 */
const validateNutrition = (food) => {
  const name = normalize(food.name);

  /**
   * 🥚 Egg sanity
   */
  if (
    name === "egg" &&
    food.carbs > 5
  ) {
    return false;
  }

  /**
   * 🍗 Chicken sanity
   */
  if (
    name === "chicken" &&
    food.carbs > 10
  ) {
    return false;
  }

  return true;
};

/**
 * =========================================
 * 🔥 SAFE RESULT BUILDER
 * =========================================
 */
const buildResult = (
  row,
  source,
  confidence
) => {
  if (!validateNutrition(row)) {
    return null;
  }

  return {
    food: row,
    source,
    confidence,
  };
};

/**
 * =========================================
 * 🔥 MAIN MATCHER
 * =========================================
 */
export const matchFood = async (foodName) => {
  try {
    const normalized = normalize(foodName);

    /**
     * =====================================
     * 1️⃣ EXACT MATCH
     * =====================================
     */
    let res = await pool.query(
      `
      SELECT *
      FROM food_master
      WHERE LOWER(name) = $1
      LIMIT 1
      `,
      [normalized]
    );

    if (res.rows.length) {
      return buildResult(
        res.rows[0],
        "DB_EXACT",
        0.99
      );
    }

    /**
     * =====================================
     * 2️⃣ ALIAS MATCH
     * =====================================
     */
    res = await pool.query(
      `
      SELECT *
      FROM food_master
      WHERE $1 = ANY(aliases)
      LIMIT 1
      `,
      [normalized]
    );

    if (res.rows.length) {
      return buildResult(
        res.rows[0],
        "ALIAS",
        0.95
      );
    }

    /**
     * =====================================
     * 3️⃣ STRICT TOKEN MATCH
     *
     * Much safer than LIKE
     * =====================================
     */
    res = await pool.query(
      `
      SELECT *
      FROM food_master
      ORDER BY LENGTH(name) ASC
      `
    );

    for (const row of res.rows) {
      if (
        isRelevantMatch(
          normalized,
          row.name
        )
      ) {
        return buildResult(
          row,
          "TOKEN_MATCH",
          0.9
        );
      }
    }

    /**
     * =====================================
     * 4️⃣ PREFIX MATCH
     * =====================================
     */
    res = await pool.query(
      `
      SELECT *
      FROM food_master
      WHERE LOWER(name) LIKE $1 || '%'
      ORDER BY LENGTH(name) ASC
      LIMIT 5
      `,
      [normalized]
    );

    for (const row of res.rows) {
      if (
        isRelevantMatch(
          normalized,
          row.name
        )
      ) {
        return buildResult(
          row,
          "PREFIX",
          0.8
        );
      }
    }

    /**
     * =====================================
     * 5️⃣ FUZZY MATCH
     * =====================================
     */
    res = await pool.query(
      `
      SELECT *
      FROM food_master
      WHERE LOWER(name) LIKE '%' || $1 || '%'
      ORDER BY LENGTH(name) ASC
      LIMIT 10
      `,
      [normalized]
    );

    for (const row of res.rows) {
      if (
        isRelevantMatch(
          normalized,
          row.name
        )
      ) {
        return buildResult(
          row,
          "FUZZY",
          0.7
        );
      }
    }

    /**
     * =====================================
     * 6️⃣ TRIGRAM MATCH
     * =====================================
     */
    res = await pool.query(
      `
      SELECT *,
      similarity(LOWER(name), $1) AS score
      FROM food_master
      WHERE similarity(LOWER(name), $1) > 0.5
      ORDER BY score DESC
      LIMIT 5
      `,
      [normalized]
    );

    for (const row of res.rows) {
      if (
        row.score > 0.7 &&
        isRelevantMatch(
          normalized,
          row.name
        )
      ) {
        return buildResult(
          row,
          "TRIGRAM",
          row.score
        );
      }
    }

    /**
     * =====================================
     * 7️⃣ VECTOR SEARCH (LAST RESORT)
     *
     * AI should NEVER override
     * deterministic matching
     * =====================================
     */
    try {
      const embedding =
        await getEmbedding(normalized);

      const formattedEmbedding = `[${embedding.join(
        ","
      )}]`;

      res = await pool.query(
        `
        SELECT *,
        (embedding <-> $1) AS distance
        FROM food_master
        WHERE embedding IS NOT NULL
        ORDER BY distance ASC
        LIMIT 5
        `,
        [formattedEmbedding]
      );

      for (const row of res.rows) {
        const confidence =
          1 - row.distance;

        /**
         * 🔥 VERY STRICT
         */
        if (
          confidence > 0.88 &&
          isRelevantMatch(
            normalized,
            row.name
          )
        ) {
          return buildResult(
            row,
            "VECTOR",
            confidence
          );
        }
      }
    } catch (err) {
      console.error(
        "⚠️ Vector search failed:",
        err.message
      );
    }

    /**
     * =====================================
     * ❌ NO MATCH
     * =====================================
     */
    return null;
  } catch (err) {
    console.error(
      "❌ Food match failed:",
      err.message
    );

    return null;
  }
};

