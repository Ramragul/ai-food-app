// Version 1 : working version

// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const estimateNutrition = async (food, quantity) => {
//   const prompt = `
// You are a nutrition API.

// Estimate realistic nutrition values.

// Food: ${food}
// Quantity: ${quantity} serving

// Rules:
// - Chicken items must have high protein (20g+ per serving)
// - Paneer items must have high protein & fat
// - Burgers include bun + filling
// - Be realistic (not generic values)

// Return ONLY valid JSON. No explanation.

// {
//   "calories": number,
//   "protein": number,
//   "carbs": number,
//   "fats": number
// }
// `;

//   const res = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.2,
//   });

//   let text = res.choices[0].message.content;

//   try {
//     // 🔥 Clean response (handles ```json blocks)
//     text = text.replace(/```json|```/g, "").trim();

//     const parsed = JSON.parse(text);

//     // 🔥 Basic sanity validation
//     if (
//       typeof parsed.calories !== "number" ||
//       typeof parsed.protein !== "number"
//     ) {
//       throw new Error("Invalid AI structure");
//     }

//     return parsed;
//   } catch (err) {
//     console.error("❌ AI Parse Failed:", text);

//     // ❌ DO NOT return fake values
//     throw new Error("AI parsing failed");
//   }
// };


// Version 2 : Enhancements to version 1

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const estimateNutrition = async (
  food
) => {
  const prompt = `
You are a nutrition database API.

Food:
${food}

Return realistic nutrition values PER 100 GRAMS.

Classify the food into exactly one of:

COUNTABLE
WEIGHT_BASED
VOLUME_BASED
MIXED

Definitions:

COUNTABLE
Examples:
Idli
Dosa
Chapathi
Egg
Vada
Banana

WEIGHT_BASED
Examples:
Rice
Chicken Breast
Paneer
Fish
Vegetables

VOLUME_BASED
Examples:
Milk
Coffee
Tea
Juices
Buttermilk

MIXED
Examples:
Biryani
Fried Rice
Noodles
Pasta
Curries
Restaurant Dishes

Also estimate a realistic typical serving weight in grams.

Rules:

- Return nutrition PER 100g only
- Be realistic
- Chicken should be protein rich
- Paneer should be protein and fat rich
- Restaurant foods can have higher calories
- Typical serving weight must be greater than 0

Return ONLY valid JSON.

{
  "foodType": "COUNTABLE",

  "caloriesPer100g": 0,
  "proteinPer100g": 0,
  "carbsPer100g": 0,
  "fatsPer100g": 0,
  "fiberPer100g":0,

  "typicalServingWeight": 0
}
`;

  const res =
    await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
    });

  let text =
    res.choices?.[0]?.message?.content || "";

  try {
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    const validFoodTypes = [
      "COUNTABLE",
      "WEIGHT_BASED",
      "VOLUME_BASED",
      "MIXED",
    ];

    if (
      !validFoodTypes.includes(
        parsed.foodType
      )
    ) {
      throw new Error(
        "Invalid foodType"
      );
    }

    if (
      typeof parsed.caloriesPer100g !==
        "number" ||
      typeof parsed.proteinPer100g !==
        "number" ||
      typeof parsed.carbsPer100g !==
        "number" ||
      typeof parsed.fatsPer100g !==
        "number" || 
      typeof parsed.fiberPer100g !==
        "number" ||
      typeof parsed.typicalServingWeight !==
        "number"
    ) {
      throw new Error(
        "Invalid nutrition structure"
      );
    }

    return parsed;
  } catch (err) {
    console.error(
      "❌ AI Parse Failed:",
      text
    );

    throw new Error(
      "AI nutrition parsing failed"
    );
  }
};