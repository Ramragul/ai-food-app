import {
  Box,
  HStack,
  Text
} from "@chakra-ui/react";

const FitnessStatsCard = ({
  guide
}: any) => {

  return (

    <HStack
      spacing={4}
      mt={5}
    >

      <Box
        flex={1}
        bg="white"
        p={4}
        borderRadius="2xl"
        textAlign="center"
      >
        <Text fontSize="xs">
          Difficulty
        </Text>

        <Text
          fontWeight="800"
        >
          {guide.difficulty}
        </Text>
      </Box>

      <Box
        flex={1}
        bg="white"
        p={4}
        borderRadius="2xl"
        textAlign="center"
      >
        <Text fontSize="xs">
          Duration
        </Text>

        <Text
          fontWeight="800"
        >
          {guide.duration_minutes}m
        </Text>
      </Box>

      <Box
        flex={1}
        bg="white"
        p={4}
        borderRadius="2xl"
        textAlign="center"
      >
        <Text fontSize="xs">
          Equipment
        </Text>

        <Text
          fontWeight="800"
          fontSize="sm"
        >
          {guide.equipment_required}
        </Text>
      </Box>

    </HStack>

  );
};

export default FitnessStatsCard;