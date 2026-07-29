// src/components/dashboard/DashboardHero.tsx

import {
  Box,
  Text,
  Progress,
  VStack,
  HStack,
  Badge
} from "@chakra-ui/react";

interface Props {
  consumed: number;
  target: number;
  remaining: number;
  status: string;
}

const DashboardHero = ({
  consumed,
  target,
  remaining,
  status
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
      borderRadius="3xl"
      p={6}
      boxShadow="lg"
      mb={5}
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack
        spacing={4}
        align="stretch"
      >

        <HStack
          justify="space-between"
        >
          <Text
            fontSize="lg"
            fontWeight="700"
          >
            🔥 Today's Progress
          </Text>

          <Badge
            colorScheme={
              status ===
              "OVER_TARGET"
                ? "red"
                : "green"
            }
            borderRadius="full"
            px={3}
            py={1}
          >
            {status ===
            "OVER_TARGET"
              ? "Over Target"
              : "On Track"}
          </Badge>
        </HStack>

        <Box textAlign="center">

          <Text
            fontSize={{
    base: "5xl",
    md: "6xl",
}}
            fontWeight="900"
            color="brand.500"
          >
            {Math.round(
              consumed
            )}
          </Text>

          <Text
            color="gray.500"
          >
            of {Math.round(target)}
            {" "}
            kcal
          </Text>

        </Box>

        <Progress
          value={progress}
          borderRadius="full"
          h="12px"
          bg="gray.100"
        />

        <HStack
          justify="space-between"
        >

          <Text
            fontSize="sm"
            color="gray.500"
          >
            {progress.toFixed(0)}%
            completed
          </Text>

          <Text
            fontSize="sm"
            fontWeight="700"
            color="green.500"
          >
            {Math.round(
              remaining
            )}
            kcal left
          </Text>

        </HStack>

      </VStack>
    </Box>
  );
};

export default DashboardHero;