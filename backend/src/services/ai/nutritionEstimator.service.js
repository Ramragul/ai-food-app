// Version 1

// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const estimateNutrition = async (food, quantity) => {
//   const prompt = `
//   Estimate nutrition for ${quantity} serving of ${food}.
//   Return JSON:
//   {
//     "calories": number,
//     "protein": number,
//     "carbs": number,
//     "fats": number
//   }
//   `;

//   const res = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//   });

//   try {
//     return JSON.parse(res.choices[0].message.content);
//   } catch {
//     return { calories: 100, protein: 3, carbs: 10, fats: 3 }; // fallback safe default
//   }
// };


// Version 2 

import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const estimateNutrition = async (food, quantity) => {
  const prompt = `
You are a nutrition API.

Estimate realistic nutrition values.

Food: ${food}
Quantity: ${quantity} serving

Rules:
- Chicken items must have high protein (20g+ per serving)
- Paneer items must have high protein & fat
- Burgers include bun + filling
- Be realistic (not generic values)

Return ONLY valid JSON. No explanation.

{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number
}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let text = res.choices[0].message.content;

  try {
    // 🔥 Clean response (handles ```json blocks)
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    // 🔥 Basic sanity validation
    if (
      typeof parsed.calories !== "number" ||
      typeof parsed.protein !== "number"
    ) {
      throw new Error("Invalid AI structure");
    }

    return parsed;
  } catch (err) {
    console.error("❌ AI Parse Failed:", text);

    // ❌ DO NOT return fake values
    throw new Error("AI parsing failed");
  }
};