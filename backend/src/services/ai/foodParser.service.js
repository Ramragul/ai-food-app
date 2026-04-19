// Version 1


// import axios from "axios";

// /**
//  * 🔥 Extract JSON safely
//  */
// const extractValidJSON = (text) => {
//   try {
//     return JSON.parse(text);
//   } catch (_) {}

//   const match = text.match(/\[[\s\S]*\]/);
//   if (match) {
//     try {
//       return JSON.parse(match[0]);
//     } catch (_) {}
//   }

//   return null;
// };


// /**
//  * 🔥 SMART FALLBACK PARSER (unit-aware)
//  */
// const fallbackParser = (input) => {
//   const text = input.toLowerCase();
//   const result = [];

//   // 🔥 Regex for quantity + unit
//   const regex = /(\d+)\s*(g|grams|ml|piece|pieces)?\s*([a-zA-Z ]+)/g;

//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     const quantity = Number(match[1]);
//     const unit = match[2] || "piece";
//     const food = match[3].trim();

//     result.push({
//       food,
//       quantity,
//       unit,
//     });
//   }

//   // fallback if nothing matched
//   if (result.length === 0) {
//     result.push({
//       food: text,
//       quantity: 1,
//       unit: "piece",
//     });
//   }

//   return result;
// };


// /**
//  * 🔥 MAIN PARSER (PRODUCTION GRADE)
//  */
// export const parseFoodWithAI = async (input) => {
//   try {
//     const prompt = `
// You are a STRICT food parsing API.

// Convert user input into JSON ARRAY.

// IMPORTANT RULES:
// - Extract quantity AND unit correctly
// - Units allowed: g, ml, piece, cup, bowl
// - If user says "10g", quantity = 10, unit = "g"
// - If user says "1 burger", unit = "piece"
// - Normalize food names (idly → idli)
// - DO NOT assume wrong quantities
// - DO NOT add explanation

// Return ONLY JSON ARRAY.

// Example:
// Input: 10g greek yogurt
// Output:
// [
//   { "food": "greek yogurt", "quantity": 10, "unit": "g" }
// ]

// Input: 2 idly with sambar
// Output:
// [
//   { "food": "idli", "quantity": 2, "unit": "piece" },
//   { "food": "sambar", "quantity": 1, "unit": "cup" }
// ]

// Input: ${input}
// `;

//     const res = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );

//     let text =
//       res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     // 🔥 Clean markdown
//     text = text.replace(/```json/g, "").replace(/```/g, "").trim();

//     const parsed = extractValidJSON(text);

//     if (!Array.isArray(parsed)) {
//       throw new Error("Invalid AI format");
//     }

//     // 🔥 Normalize output (VERY IMPORTANT)
//     const normalized = parsed.map((item) => ({
//       food: item.food?.toLowerCase().trim(),
//       quantity: Number(item.quantity) || 1,
//       unit: item.unit?.toLowerCase() || "piece",
//     }));

//     return normalized;

//   } catch (err) {
//     console.error("❌ Food Parser Error:", err.message);

//     // 🔥 Smart fallback
//     return fallbackParser(input);
//   }
// };



// Version 2 


import axios from "axios";

/**
 * 🔥 Extract JSON safely
 */
const extractValidJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {}

  const match = text.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (_) {}
  }

  return null;
};

/**
 * 🔥 SMART FALLBACK PARSER (ROBUST + REAL WORLD)
 */
const fallbackParser = (input) => {
  const text = input.toLowerCase();

  // 🔥 normalize separators
  const normalized = text
    .replace(/\+/g, ",")
    .replace(/\band\b/g, ",")
    .replace(/\bwith\b/g, ",")
    .replace(/\s+/g, " ");

  const items = normalized
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  return items.map((item) => {
    const match = item.match(
      /^(\d+)\s*(g|grams|ml|piece|pieces|cup|bowl)?\s*(.*)$/
    );

    if (match) {
      return {
        food: (match[3] || item).trim(),
        quantity: Number(match[1]),
        unit: match[2] || "piece",
      };
    }

    return {
      food: item,
      quantity: 1,
      unit: "piece",
    };
  });
};

/**
 * 🔥 Delay helper
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * 🔥 Count expected items (SMART)
 */
const getInputItemCount = (input) => {
  return input
    .toLowerCase()
    .replace(/\+/g, ",")
    .replace(/\band\b/g, ",")
    .replace(/\bwith\b/g, ",")
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean).length;
};

/**
 * 🔥 MAIN PARSER (PRODUCTION GRADE)
 */
export const parseFoodWithAI = async (input, retryCount = 0) => {
  const MAX_RETRIES = 2;

  const prompt = `
You are a STRICT food parsing API.

Convert user input into JSON ARRAY.

IMPORTANT RULES:
- Extract quantity AND unit correctly
- Units allowed: g, ml, piece, cup, bowl
- If missing quantity → assume 1
- Normalize food names (idly → idli)
- Split combined foods correctly
- DO NOT add explanation

Return ONLY JSON ARRAY.

Example:
Input: 2 idly with sambar
Output:
[
  { "food": "idli", "quantity": 2, "unit": "piece" },
  { "food": "sambar", "quantity": 1, "unit": "cup" }
]

Input: ${input}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        timeout: 4000, // 🔥 prevents hanging
      }
    );

    let text =
      res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = extractValidJSON(text);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid AI format");
    }

    const normalized = parsed.map((item) => ({
      food: item.food?.toLowerCase().trim(),
      quantity: Number(item.quantity) || 1,
      unit: item.unit?.toLowerCase() || "piece",
    }));

    // 🔥 Validate completeness
    const expectedCount = getInputItemCount(input);

    if (normalized.length < expectedCount) {
      console.log("⚠️ AI incomplete → fallback");
      return fallbackParser(input);
    }

    return normalized;

  } catch (err) {
    console.error("❌ Food Parser Error:", err.message);

    // 🔥 Retry logic (SAFE LIMIT)
    if (err.response?.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`🔁 Retry ${retryCount + 1}/${MAX_RETRIES}`);
      await delay(1000);

      return parseFoodWithAI(input, retryCount + 1);
    }

    // 🔥 fallback always works
    console.log("⚠️ Using fallback parser");
    return fallbackParser(input);
  }
};