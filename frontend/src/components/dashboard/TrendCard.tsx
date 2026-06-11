// src/components/dashboard/TrendCard.tsx

import {
  Box,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react";

interface Props {
  trend: any[];
}

const TrendCard = ({
  trend
}: Props) => {

  if (!trend?.length) {
    return null;
  }

  const max =
    Math.max(
      ...trend.map(
        (t) =>
          Number(
            t.calories
          )
      )
    );

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={5}
      mt={5}
      boxShadow="sm"
    >

      <Text
        fontWeight="700"
        mb={4}
      >
        📈 Trend
      </Text>

      <VStack
        spacing={3}
        align="stretch"
      >

        {trend.map(
          (item) => {

            const width =
              (
                Number(
                  item.calories
                ) /
                max
              ) *
              100;

            return (
              <Box
                key={
                  item.label
                }
              >

                <HStack
                  justify="space-between"
                  mb={1}
                >
                  <Text
                    fontSize="sm"
                  >
                    {
                      item.label
                    }
                  </Text>

                  <Text
                    fontSize="sm"
                  >
                    {
                      item.calories
                    }
                  </Text>
                </HStack>

                <Box
                  h="8px"
                  bg="gray.100"
                  borderRadius="full"
                >
                  <Box
                    h="8px"
                    w={`${width}%`}
                    bg="brand.500"
                    borderRadius="full"
                  />
                </Box>

              </Box>
            );
          }
        )}

      </VStack>

    </Box>
  );
};

export default TrendCard;