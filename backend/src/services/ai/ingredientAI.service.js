import axios from "axios";

/**
 * 🔥 Extract JSON safely
 */
const extractJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {}

  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (_) {}
  }

  return null;
};

/**
 * 🔥 FALLBACK
 */
const fallbackNutrition = () => ({
  calories: 100,
  protein: 3,
  carbs: 15,
  fat: 3,
  fibre: 2,
  type: ""
});

/**
 * 🔥 AI CALL
 */
export const getNutritionFromAI = async (ingredientName) => {
const prompt = `
You are a nutrition API.

Return nutrition per 100g in STRICT JSON format.

{
  "entityType": string,
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "fibre": number,
  "type": string,
  "foodType": string,
  "typicalServingWeight": number,
  "referenceUnit": string
}

Rules:

entityType must be one of:

INGREDIENT
FOOD

Examples:

Egg -> INGREDIENT
Milk -> INGREDIENT
Paneer -> INGREDIENT
Rice -> INGREDIENT
Chicken Breast -> INGREDIENT

Chicken 65 -> FOOD
Chicken Biryani -> FOOD
Milk Tea -> FOOD
Masala Dosa -> FOOD
Paneer Butter Masala -> FOOD

foodType must be one of:
- COUNTABLE
- WEIGHT_BASED
- VOLUME_BASED

Examples:

Idli -> COUNTABLE
Dosa -> COUNTABLE
Egg -> COUNTABLE

Chicken Breast -> WEIGHT_BASED
Paneer -> WEIGHT_BASED
Rice -> WEIGHT_BASED

Milk -> VOLUME_BASED
Lassi -> VOLUME_BASED
Smoothie -> VOLUME_BASED
Protein Shake -> VOLUME_BASED
Juices -> VOLUME_BASED

referenceUnit must be:
- g for COUNTABLE and WEIGHT_BASED
- ml for VOLUME_BASED

typicalServingWeight should represent a realistic single serving.

Ingredient: ${ingredientName}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let text =
      res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = extractJSON(text);

    if (!parsed) throw new Error("Invalid AI response");

 return {

  entityType:
    parsed.entityType ||
    "FOOD",

  calories:
    Number(parsed.calories) || 0,

  protein:
    Number(parsed.protein) || 0,

  carbs:
    Number(parsed.carbs) || 0,

  fat:
    Number(parsed.fat) || 0,

  fibre:
    Number(parsed.fibre) || 0,

  type:
    parsed.type || null,

  foodType:
    parsed.foodType ||
    "COUNTABLE",

  typicalServingWeight:
    Number(
      parsed.typicalServingWeight
    ) || 100,

  referenceUnit:
    parsed.referenceUnit ||
    "g"
};

  // } catch (err) {
  //   console.error("❌ AI Error:", err.message);
  //   return fallbackNutrition();
  // }

  }catch (err) {

  console.error(
    "❌ AI Error:",
    err.message
  );

  throw err;
}

  
};