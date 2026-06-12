import {
  Box,
  Text,
  Button,
  HStack,
  VStack
} from "@chakra-ui/react";

import {
  useNavigate
} from "react-router-dom";

interface Props {
  mealCount: number;
}

const AddMealCTA = ({
  mealCount
}: Props) => {

  const navigate =
    useNavigate();

  let title =
    "🍽️ Ready to Log a Meal?";

  let subtitle =
    "Every meal tracked helps NEKA provide smarter nutrition insights.";

  if (
    mealCount === 0
  ) {

    title =
      "🌅 Start Your Day";

    subtitle =
      "Track your first meal and begin building your nutrition journey.";
  }

  else if (
    mealCount === 1
  ) {

    title =
      "🥗 Keep The Momentum";

    subtitle =
      "You've logged one meal. Let's stay consistent today.";
  }

  else if (
    mealCount >= 3
  ) {

    title =
      "🏆 Excellent Progress";

    subtitle =
      "You're doing great today. Keep tracking for better insights.";
  }

  return (
<Box
  mb={5}
  bg="white"
  borderRadius="2xl"
  p={4}
  border="1px solid"
  borderColor="blue.100"
  boxShadow="sm"
>
  <HStack justify="space-between">

    <Box>
      <Text
        fontWeight="800"
        fontSize="md"
      >
        🍽️ Log Your Next Meal
      </Text>

      <Text
        fontSize="sm"
        color="gray.500"
      >
        Keep your nutrition tracking up to date
      </Text>
    </Box>

    <Button
      colorScheme="blue"
      borderRadius="xl"
      px={6}
      fontWeight="700"
      onClick={() => navigate('/add-meal')}
    >
      + Add
    </Button>

  </HStack>
</Box>
  );
};

export default AddMealCTA;