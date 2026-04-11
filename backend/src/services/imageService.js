import axios from "axios";

//const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const fetchFoodImage = async (query) => {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; 
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: query,
          per_page: 1,
          orientation: "landscape"
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    return response.data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};