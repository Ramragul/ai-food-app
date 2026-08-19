import axios from "axios";


/*
====================================================
EXTRACT JSON
====================================================
*/

const extractJSON = (text) => {

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


/*
====================================================
MEAL VISION
====================================================
*/

export const analyzeMealImage =
async (
  imageBuffer,
  mimeType
) => {

  if (!imageBuffer) {

    throw new Error(
      "Meal image is required"
    );

  }


  const base64Image =
    imageBuffer.toString("base64");


  const prompt = `
You are NEKA's food vision engine.

Analyze the provided meal photograph.

Your job is to identify the ACTUAL FOOD ITEMS visible
on the plate.

IMPORTANT:

1. Identify foods/dishes, NOT individual ingredients.

WRONG:
- rice
- tomato
- onion
- oil
- salt
- spices

when they are clearly components of a visible dish.

RIGHT:
- chicken biryani
- sambar
- dosa
- chicken curry
- paneer butter masala
- boiled egg
- chapati
- curd rice

2. Identify each visually distinct food item.

3. Estimate the edible portion size in grams.

4. Do NOT assume restaurant-standard serving sizes.
Estimate from the visible plate, bowl, cup or container.

5. Use visual clues such as:
- plate size
- bowl size
- food volume
- thickness
- number of pieces
- relative proportions

6. If quantity cannot be estimated accurately,
give your best practical estimate.

7. Do NOT invent foods that are not visible.

8. If two foods are touching but visually distinguishable,
return them separately.

9. If a food is ambiguous, use the most likely common
dish name and lower the confidence.

10. Do not identify beverages as solid food.

11. Confidence must be between 0 and 1.

Return ONLY this JSON:

{
  "mealDetected": true,
  "items": [
    {
      "name": "Chicken Biryani",
      "estimatedGrams": 250,
      "confidence": 0.91
    }
  ]
}

If this is not a food/meal image:

{
  "mealDetected": false,
  "items": []
}

Do not return markdown.
Do not return explanations.
`;


  try {

    const response =
      await axios.post(

        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

        {
          contents: [

            {
              parts: [

                {
                  inlineData: {
                    mimeType,
                    data:
                      base64Image
                  }
                },

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
          timeout: 30000
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
        "Invalid vision AI response"
      );

    }


    if (
      parsed.mealDetected !== true
    ) {

      return {

        mealDetected: false,

        items: []

      };

    }


    if (
      !Array.isArray(
        parsed.items
      )
    ) {

      throw new Error(
        "Invalid detected food structure"
      );

    }


    const items =
      parsed.items

        .map((item) => ({

          name:
            String(
              item.name || ""
            )
              .trim(),

          estimatedGrams:
            Math.max(
              1,
              Number(
                item.estimatedGrams
              ) || 100
            ),

          confidence:
            Math.min(
              1,
              Math.max(
                0,
                Number(
                  item.confidence
                ) || 0
              )
            )

        }))

        .filter(
          item =>
            item.name
        );


    return {

      mealDetected:
        items.length > 0,

      items

    };


  } catch (error) {

    console.error(
      "========== MEAL VISION ERROR =========="
    );

    console.error(
      error.response?.status
    );

    console.error(
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    console.error(
      error.message
    );

    console.error(
      "========================================"
    );

    throw error;

  }

};