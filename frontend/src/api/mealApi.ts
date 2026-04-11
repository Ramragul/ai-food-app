import axios from "axios";

const BASE_URL = "http://localhost:3004";

export const getMealRecommendations = async (payload: any) => {
  const response = await axios.post(
    `${BASE_URL}/api/meals/generate`,
    payload
  );
  return response.data;
};