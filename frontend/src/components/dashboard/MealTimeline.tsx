// src/components/dashboard/MealTimeline.tsx

import {
  Box,
  Text,
  VStack,
  HStack,
  Collapse
} from "@chakra-ui/react";

import { useState } from "react";

interface Props {
  meals: any[];
}

const MealTimeline = ({
  meals
}: Props) => {

  const [expanded,
    setExpanded] =
    useState<string | null>(
      null
    );

  if (!meals?.length) {
    return null;
  }

  const getIcon = (
    mealType: string
  ) => {

    switch (
      mealType
    ) {
      case "BREAKFAST":
        return "🍳";

      case "LUNCH":
        return "🍛";

      case "DINNER":
        return "🌙";

      case "SNACK":
        return "🍎";

      default:
        return "🥗";
    }
  };

  return (
    <Box mt={5}>

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={4}
      >
        Today's Meals
      </Text>

      <VStack
        spacing={3}
        align="stretch"
      >

        {meals.map(
          (meal) => (

            <Box
              key={
                meal.meal_type
              }
              bg="white"
              borderRadius="2xl"
              p={4}
              boxShadow="sm"
              cursor="pointer"
              onClick={() =>
                setExpanded(
                  expanded ===
                  meal.meal_type
                    ? null
                    : meal.meal_type
                )
              }
            >

              <HStack
                justify="space-between"
              >

                <Text
                  fontWeight="700"
                >
                  {
                    getIcon(
                      meal.meal_type
                    )
                  }{" "}
                  {
                    meal.meal_type
                  }
                </Text>

                <Text
                  fontWeight="700"
                  color="brand.500"
                >
                  {Math.round(
                    meal.calories
                  )} kcal
                </Text>

              </HStack>

              <Collapse
                in={
                  expanded ===
                  meal.meal_type
                }
              >

                <VStack
                  align="stretch"
                  mt={4}
                  spacing={2}
                >

                  {meal.foods?.map(
                    (
                      food: any,
                      idx: number
                    ) => (
                      <Box
                        key={idx}
                        bg="gray.50"
                        p={3}
                        borderRadius="lg"
                      >
                        <Text
                          fontWeight="600"
                        >
                          🍽️ {
                            food.name
                          }
                        </Text>

                        <Text
                          fontSize="xs"
                          color="gray.500"
                        >
                          {
                            food.calories
                          } kcal
                        </Text>
                      </Box>
                    )
                  )}

                </VStack>

              </Collapse>

            </Box>
          )
        )}

      </VStack>

    </Box>
  );
};

export default MealTimeline;