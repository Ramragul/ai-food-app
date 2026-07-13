import {
  Box,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  nutrition: any;

}

const TodayNutritionCard = ({
  nutrition
}: Props) => {

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

        mb={5}

      >

        🍽 Today's Nutrition

      </Text>

      <SimpleGrid

        columns={{
          base: 2,
          md: 4
        }}

        spacing={5}

      >

        <VStack>

          <Text color="gray.500">

            Calories

          </Text>

          <Text

            fontWeight="700"

          >

            {nutrition?.calories ?? 0}

          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">

            Protein

          </Text>

          <Text

            fontWeight="700"

          >

            {nutrition?.protein ?? 0} g

          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">

            Carbs

          </Text>

          <Text

            fontWeight="700"

          >

            {nutrition?.carbs ?? 0} g

          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">

            Fat

          </Text>

          <Text

            fontWeight="700"

          >

            {nutrition?.fat ?? 0} g

          </Text>

        </VStack>

      </SimpleGrid>

    </Box>

  );

};

export default TodayNutritionCard;