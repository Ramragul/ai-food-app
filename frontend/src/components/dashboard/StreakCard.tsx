// src/components/dashboard/StreakCard.tsx

import {
  Box,
  Text,
  HStack
} from "@chakra-ui/react";

interface Props {
  streak: number;
}

const StreakCard = ({
  streak
}: Props) => {

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={5}
      mt={5}
      boxShadow="sm"
    >

      <HStack
        justify="space-between"
      >

        <Text
          fontWeight="700"
        >
          🔥 Current Streak
        </Text>

        <Text
          fontSize="2xl"
          fontWeight="900"
          color="orange.400"
        >
          {streak}
        </Text>

      </HStack>

      <Text
        mt={2}
        color="gray.500"
        fontSize="sm"
      >
        Consecutive days logged
      </Text>

    </Box>
  );
};

export default StreakCard;