import { useState } from "react";
import { getMealRecommendations } from "../api/mealApi";
import { fetchFoodImage, buildImageQuery } from "../services/imageService";
import type { Recommendation } from "../types/meal";

export const useMeals = () => {
  const [data, setData] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const generateMeals = async (payload: any) => {
    setLoading(true);

    try {
      const res = await getMealRecommendations(payload);

      const enriched: Recommendation[] = await Promise.all(
        res.recommendations.map(async (rec: Recommendation) => {
          const image = await fetchFoodImage(
            buildImageQuery(rec.items[0])
          );

          return { ...rec, imageUrl: image || "" };
        })
      );

      setData(enriched);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return { data, loading, generateMeals };
};