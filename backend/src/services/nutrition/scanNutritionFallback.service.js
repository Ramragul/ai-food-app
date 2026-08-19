import axios from "axios";


const extractJSON = (
  text
) => {

  try {

    return JSON.parse(text);

  } catch (_) {}

  const match =
    text.match(/\{[\s\S]*\}/);

  if (match) {

    try {

      return JSON.parse(
        match[0]
      );

    } catch (_) {}

  }

  return null;

};


export const estimateScannedFoodNutrition =
async (
  foodName
) => {

  const prompt = `

You are NEKA's nutrition estimation engine.

Estimate realistic nutrition for this FOOD/DISH:

${foodName}

IMPORTANT:

This is a FOOD/DISH, not an ingredient.

Return nutrition PER 100 GRAMS.

Be realistic for typical Indian food preparation.

Return ONLY JSON:

{
  "caloriesPer100g": 0,
  "proteinPer100g": 0,
  "carbsPer100g": 0,
  "fatsPer100g": 0,
  "fiberPer100g": 0
}

Do not return explanations.

`;


  const response =
    await axios.post(

      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text:
                  prompt
              }
            ]
          }
        ],

        generationConfig: {

          temperature: 0.1,

          responseMimeType:
            "application/json"

        }

      },

      {
        timeout: 15000
      }

    );


  let text =
    response
      .data
      .candidates?.[0]
      ?.content
      ?.parts?.[0]
      ?.text || "";


  text =
    text
      .replace(
        /```json/g,
        ""
      )
      .replace(
        /```/g,
        ""
      )
      .trim();


  const parsed =
    extractJSON(text);


  if (!parsed) {

    throw new Error(
      "Unable to estimate scanned food nutrition"
    );

  }


  return {

    caloriesPer100g:
      Number(
        parsed.caloriesPer100g
      ) || 0,

    proteinPer100g:
      Number(
        parsed.proteinPer100g
      ) || 0,

    carbsPer100g:
      Number(
        parsed.carbsPer100g
      ) || 0,

    fatsPer100g:
      Number(
        parsed.fatsPer100g
      ) || 0,

    fiberPer100g:
      Number(
        parsed.fiberPer100g
      ) || 0

  };

};