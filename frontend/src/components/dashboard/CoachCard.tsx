// src/components/dashboard/CoachCard.tsx

import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {
  data: any;
}

const CoachCard = ({
  data
}: Props) => {

  let title =
    "🔥 Great Job";

  let message =
    "You're on track today.";

  if (
    data.remaining?.protein >
    50
  ) {

    title =
      "💪 Protein Needed";

    message = `
Need ${Math.round(
  data.remaining.protein
)}g more protein today.
    `;
  }

  else if (
    data.remaining?.calories <
    300
  ) {

    title =
      "🎯 Almost There";

    message =
      "You're very close to your calorie target.";
  }

  return (
    <Box
      mt={5}
      bg="linear-gradient(
      135deg,
      #bfdbfe,
      #93c5fd
      )"
      color="gray.800"
      borderRadius="3xl"
      p={5}
    >

      <VStack
        align="stretch"
        spacing={2}
      >

        <Text
          fontWeight="800"
          fontSize="lg"
        >
          {title}
        </Text>

        <Text>
          {message}
        </Text>

      </VStack>

    </Box>
  );
};

export default CoachCard;