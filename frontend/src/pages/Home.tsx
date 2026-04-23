import { Box, Heading } from "@chakra-ui/react";
import MealInputForm from "../components/meal/MealInputForm";
import RecommendationList from "../components/meal/RecommendationList";
import { useMeals } from "../hooks/useMeals";
import { useEffect } from "react";

const Home = () => {
  // const { data, generateMeals } = useMeals();
  const { data} = useMeals();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">
        🍽️ AI Meal Planner
      </Heading>

      {/* <MealInputForm onSubmit={generateMeals} /> */}
      <MealInputForm/>

      <RecommendationList data={data} />
    </Box>
  );
};

export default Home;