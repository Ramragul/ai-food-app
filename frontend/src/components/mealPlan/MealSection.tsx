import {
  Box,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";

import MealPlanCard from "./MealPlanCard";

const MealSection = ({
  title,
  meals
}: any) => {

  if (!meals?.length)
    return null;

  return (
    <Box mb={10}>
      <Heading
        mb={4}
        size="md"
      >
        {title}
      </Heading>

      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={5}
      >
        {meals.map(
          (meal: any) => (
            <MealPlanCard
              key={meal.mealId}
              meal={meal}
            />
          )
        )}
      </SimpleGrid>
    </Box>
  );
};

export default MealSection;