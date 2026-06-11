// src/components/dashboard/MacroProgressCard.tsx

import {
  Box,
  Text,
  Progress,
  VStack
} from "@chakra-ui/react";

interface Props {
  label: string;
  consumed: number;
  target: number;
  color: string;
}

const MacroProgressCard = ({
  label,
  consumed,
  target,
  color
}: Props) => {

  const progress =
    target > 0
      ? Math.min(
          (consumed / target) * 100,
          100
        )
      : 0;

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="2xl"
      boxShadow="sm"
      flex={1}
    >
      <VStack
        align="stretch"
        spacing={2}
      >

        <Text
          fontWeight="700"
        >
          {label}
        </Text>

        <Text
          fontSize="xl"
          fontWeight="800"
        >
          {Math.round(consumed)}
          g
        </Text>

        <Text
          fontSize="xs"
          color="gray.500"
        >
          Target {Math.round(target)}g
        </Text>

        <Progress
          value={progress}
          colorScheme={color}
          borderRadius="full"
          h="8px"
        />

        <Text
          fontSize="xs"
          color="gray.500"
        >
          {progress.toFixed(0)}%
          completed
        </Text>

      </VStack>
    </Box>
  );
};

export default MacroProgressCard;