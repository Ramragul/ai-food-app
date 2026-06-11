// src/components/dashboard/GoalCard.tsx

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge
} from "@chakra-ui/react";

interface Props {
  goalInfo: any;
}

const GoalCard = ({
  goalInfo
}: Props) => {

  if (!goalInfo) {
    return null;
  }

  const formattedGoal =
    goalInfo.goalType
      ?.replaceAll("_", " ")
      ?.toUpperCase();

  return (
    <Box
      bg="linear-gradient(
      135deg,
      #eff6ff,
      #dbeafe
      )"
      borderRadius="3xl"
      p={5}
      mb={5}
      boxShadow="sm"
    >

      <VStack
        align="stretch"
        spacing={3}
      >

        <Text
          fontSize="lg"
          fontWeight="700"
        >
          🎯 Active Goal
        </Text>

        <Text
          fontSize="xl"
          fontWeight="800"
        >
          {formattedGoal}
        </Text>

        <HStack>

          <Box
            flex={1}
            bg="white"
            p={3}
            borderRadius="xl"
          >
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Current
            </Text>

            <Text
              fontWeight="700"
            >
              {
                goalInfo.currentWeight
              }
              kg
            </Text>
          </Box>

          <Box
            flex={1}
            bg="white"
            p={3}
            borderRadius="xl"
          >
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Target
            </Text>

            <Text
              fontWeight="700"
            >
              {
                goalInfo.targetWeight
              }
              kg
            </Text>
          </Box>

        </HStack>

        <HStack
          justify="space-between"
        >

          <Badge
            colorScheme="blue"
            borderRadius="full"
            px={3}
            py={1}
          >
            🏃 {
              goalInfo.activityLevel
            }
          </Badge>

          <Text
            fontSize="sm"
            color="gray.600"
          >
            ⏳ {
              goalInfo.durationDays
            } Days
          </Text>

        </HStack>

      </VStack>

    </Box>
  );
};

export default GoalCard;