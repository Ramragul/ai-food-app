import { Box, VStack, Text, Button, Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RecommendationList from "../components/meal/RecommendationList";

const MealResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { goal, ingredients, foodType, initialMeals = [] } = state || {};

  const [meals, setMeals] = useState<any[]>(initialMeals);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

    // ✅ USE BACKEND DATA DIRECTLY (NO OVERRIDE)
    if (initialMeals.length > 0) {
      setMeals(initialMeals);
    } else {
      fetchMeals(1);
    }
  }, []);

  const fetchMeals = async (pageNumber: number) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3004/api/meals/generate",
        {
          goal,
          ingredients,
          foodType,
          page: pageNumber,
        }
      );

      const newMeals = res.data.recommendations || [];

      setMeals((prev) =>
        pageNumber === 1 ? newMeals : [...prev, ...newMeals]
      );
    } catch (err) {
      console.error("Error fetching meals", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchMeals(next);
  };

  return (
    <Box p={6} maxW="1100px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          🍽️ Generated Meals
        </Text>

        {/* EMPTY STATE */}
        {!loading && meals.length === 0 && (
          <Text textAlign="center">No meals found</Text>
        )}

        {/* ✅ YOUR EXISTING UI */}
        <RecommendationList data={meals} />

        {/* LOADING */}
        {loading && <Spinner alignSelf="center" />}

        {/* LOAD MORE */}
        <Button onClick={handleLoadMore} isDisabled={loading}>
          Load More
        </Button>

        {/* BACK */}
        <Button variant="outline" onClick={() => navigate("/")}>
          🔙 Back
        </Button>
      </VStack>
    </Box>
  );
};

export default MealResultsPage;