import axios from "axios";

const UNSPLASH_ACCESS_KEY = "yprUTptxGk0glF1mQz6aJIfZPgneOlCJKtbfzHMsRvY";

export const buildImageQuery = (item: any): string => {
  return `${item.foodType} ${item.name}, delicious food, restaurant style`;
};

export const fetchFoodImage = async (query: string): Promise<string | null> => {
  try {
    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: { query, per_page: 1 },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    return res.data.results[0]?.urls?.regular || null;
  } catch {
    return null;
  }
};