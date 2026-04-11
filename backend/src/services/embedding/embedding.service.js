import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getEmbedding = async (text) => {
  try {
    const res = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return res.data[0].embedding;
  } catch (err) {
    console.error("❌ Embedding Error:", err.message);
    throw err;
  }
};


const emb = await getEmbedding("chicken rice muscle gain");
console.log(emb.length);