import axios from "axios";

/**
 * Extract JSON safely
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
 * Fallback parser (VERY IMPORTANT)
 */
const fallbackParser = (input) => {
  const text = input.toLowerCase();
  const result = [];

  if (text.includes("idli") || text.includes("idly")) {
    result.push({ food: "idli", quantity: 2, unit: "piece" });
  }

  if (text.includes("sambar")) {
    result.push({ food: "sambar", quantity: 1, unit: "cup" });
  }

  return result;
};

/**
 * MAIN PARSER
 */
export const parseFoodWithAI = async (input) => {
  try {
    const prompt = `
You are an Indian food parser.

Convert user input into STRICT JSON ARRAY.

Rules:
- Normalize names (idly → idli)
- Units:
  idli/dosa → piece
  rice → bowl
  sambar/dal → cup
- If quantity missing → assume 1
- RETURN ONLY JSON ARRAY
- NO explanation

Example:
Input: 2 idly with sambar
Output:
[
  { "food": "idli", "quantity": 2, "unit": "piece" },
  { "food": "sambar", "quantity": 1, "unit": "cup" }
]

Input: ${input}
`;

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    let text =
      res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🔥 Clean markdown
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = extractValidJSON(text);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid AI format");
    }

    return parsed;

  } catch (err) {
    console.error("Food Parser Error:", err.message);
    return fallbackParser(input);
  }
};