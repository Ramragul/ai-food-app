import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  Flex,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack
} from "@chakra-ui/react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useEffect } from "react";

const MealPlanDetailPage = () => {

  const { state } = useLocation();

  const meal = state;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      pb={10}
    >

      {/* HERO IMAGE */}

      <Box position="relative">

        <Image
          src={
            meal.imageUrl ||
            "/meal-placeholder.jpg"
          }
          w="100%"
          h="260px"
          objectFit="cover"
        />

        <Box
          position="absolute"
          top="15px"
          left="15px"
          bg="white"
          px={3}
          py={2}
          borderRadius="full"
          cursor="pointer"
          boxShadow="md"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Box>

      </Box>

      <Box p={5}>

        <VStack
          align="stretch"
          spacing={6}
        >

          {/* TITLE */}

          <Box>

            {/* <Badge
              colorScheme="blue"
              mb={3}
            >
              {meal.mealCategory}
            </Badge> */}

            <HStack mb={3} spacing={2}>

  <Badge colorScheme="blue">
    {meal.mealCategory}
  </Badge>

  <Badge
    colorScheme={
      meal.foodType === "veg"
        ? "green"
        : meal.foodType === "eggitarian"
        ? "yellow"
        : "red"
    }
  >
    {
      meal.foodType === "veg"
        ? "🟢 Veg"
        : meal.foodType === "eggitarian"
        ? "🟡 Eggitarian"
        : "🔴 Non-Veg"
    }
  </Badge>

</HStack>

            <Heading size="lg">
              {meal.mealName}
            </Heading>

            <Text
              mt={2}
              color="gray.600"
            >
              {meal.description}
            </Text>

          </Box>

          {/* MACROS */}

          <SimpleGrid
            columns={[2, 5]}
            spacing={3}
          >

            <MacroCard
              label="Calories"
              value={meal.finalMacros.calories}
              emoji="🔥"
            />

            <MacroCard
              label="Protein"
              value={`${meal.finalMacros.protein}g`}
              emoji="💪"
            />

            <MacroCard
              label="Carbs"
              value={`${meal.finalMacros.carbs}g`}
              emoji="🍚"
            />

            <MacroCard
              label="Fat"
              value={`${meal.finalMacros.fats}g`}
              emoji="🥑"
            />

            <MacroCard
              label="Fiber"
              value={`${meal.finalMacros.fiber}g`}
              emoji="🌿"
            />

          </SimpleGrid>

          {/* SCALE FACTOR */}

          <Box
            bg="white"
            p={4}
            borderRadius="xl"
            boxShadow="sm"
          >
            <Text
              fontWeight="bold"
              color="brand.700"
            >
              Portion Scaling
            </Text>

            <Text mt={2}>
              This meal was automatically
              adjusted for your fitness goal.
            </Text>

            {/* <Badge
              mt={3}
              colorScheme="green"
            >
              Scale Factor: {meal.scaleFactor}
            </Badge> */}
          </Box>

          {/* INGREDIENTS */}

          <Box
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="sm"
          >

            <Heading
              size="md"
              mb={4}
            >
              Ingredients
            </Heading>

            <VStack
              align="stretch"
              spacing={3}
            >

              {meal.ingredients.map(
                (item: any) => (

                  <Flex
                    key={item.ingredientId}
                    justify="space-between"
                    p={3}
                    borderRadius="lg"
                    bg="gray.50"
                  >

                    <Text
                      fontWeight="medium"
                    >
                      {item.ingredientName}
                    </Text>

                    <Text
                      color="gray.600"
                    >
                      {item.quantity_g} g
                    </Text>

                  </Flex>

                )
              )}

            </VStack>

          </Box>

          {/* COOKING INSTRUCTIONS */}

          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
          >

            <Accordion allowToggle>

              <AccordionItem
                border="none"
              >

                <AccordionButton p={5}>

                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                  >
                    👨‍🍳 Cooking Instructions
                  </Box>

                  <AccordionIcon />

                </AccordionButton>

                <AccordionPanel pb={5}>

                  <VStack
                    align="stretch"
                    spacing={4}
                  >

                    {meal.preparationSteps.map(
                      (
                        step: string,
                        index: number
                      ) => (

                        <Flex
                          key={index}
                          align="start"
                        >

                          <Flex
                            minW="34px"
                            h="34px"
                            borderRadius="full"
                            bg="brand.500"
                            color="white"
                            align="center"
                            justify="center"
                            fontWeight="bold"
                            mr={3}
                          >
                            {index + 1}
                          </Flex>

                          <Text>
                            {step}
                          </Text>

                        </Flex>

                      )
                    )}

                  </VStack>

                </AccordionPanel>

              </AccordionItem>

            </Accordion>

          </Box>

        </VStack>

      </Box>

    </Box>
  );
};

const MacroCard = ({
  label,
  value,
  emoji
}: any) => {

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="xl"
      textAlign="center"
      boxShadow="sm"
    >
      <Text fontSize="2xl">
        {emoji}
      </Text>

      <Text
        fontWeight="bold"
        mt={2}
      >
        {value}
      </Text>

      <Text
        fontSize="sm"
        color="gray.500"
      >
        {label}
      </Text>
    </Box>
  );
};

export default MealPlanDetailPage;