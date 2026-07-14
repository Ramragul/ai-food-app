import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Progress
} from "@chakra-ui/react";

interface Props {
  nutrition: any;
}

const TodayNutritionCard = ({
  nutrition
}: Props) => {

  if (!nutrition) {

    return null;

  }

  return (

    <Box
      bg="white"
      p={6}
      borderRadius="20px"
      shadow="sm"
    >

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={6}
      >
        🍽 Today's Nutrition
      </Text>

      <SimpleGrid
        columns={{
          base: 2,
          md: 4
        }}
        spacing={6}
      >

        <VStack>

          <Text color="gray.500">
            Calories
          </Text>

          <Text
            fontWeight="700"
            fontSize="lg"
          >
            {nutrition.consumed.calories}
          </Text>

          <Progress
            value={
              nutrition.target.calories
                ? (nutrition.consumed.calories /
                    nutrition.target.calories) * 100
                : 0
            }
            w="100%"
            borderRadius="full"
          />

          <Text
            fontSize="xs"
            color="gray.500"
          >
            {nutrition.remaining.calories} kcal left
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Protein
          </Text>

          <Text
            fontWeight="700"
            fontSize="lg"
          >
            {nutrition.consumed.protein.toFixed(1)} g
          </Text>

          <Text
            fontSize="xs"
            color="gray.500"
          >
            / {nutrition.target.protein} g
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Carbs
          </Text>

          <Text
            fontWeight="700"
            fontSize="lg"
          >
            {nutrition.consumed.carbs.toFixed(1)} g
          </Text>

          <Text
            fontSize="xs"
            color="gray.500"
          >
            / {nutrition.target.carbs} g
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Fats
          </Text>

          <Text
            fontWeight="700"
            fontSize="lg"
          >
            {nutrition.consumed.fats.toFixed(1)} g
          </Text>

          <Text
            fontSize="xs"
            color="gray.500"
          >
            / {nutrition.target.fats} g
          </Text>

        </VStack>

      </SimpleGrid>

    </Box>

  );

};

export default TodayNutritionCard;