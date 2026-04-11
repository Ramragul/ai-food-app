import { Box, Heading } from "@chakra-ui/react";
import MealInputForm from "../components/meal/MealInputForm";
import RecommendationList from "../components/meal/RecommendationList";
import { useMeals } from "../hooks/useMeals";

const Home = () => {
  const { data, generateMeals } = useMeals();

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">
        🍽️ AI Meal Planner
      </Heading>

      <MealInputForm onSubmit={generateMeals} />

      <RecommendationList data={data} />
    </Box>
  );
};

export default Home;