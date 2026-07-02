import {
  Box,
  HStack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { FiEdit3 } from "react-icons/fi";

interface Serving {
  id: number;
  serving_name: string;
  grams: number;
}

interface Props {
  servings: Serving[];
  selectedServingId: string;
  onChange: (value: string) => void;
}

const CARD_WIDTH = "118px";

const ServingSelector = ({
  servings,
  selectedServingId,
  onChange,
}: Props) => {
  return (
    <Box>

      <Text
        mb={3}
        fontSize="md"
        fontWeight="700"
      >
        Choose Serving
      </Text>

      <HStack
        spacing={3}
        overflowX="auto"
        pb={2}
        css={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {servings.map((serving) => {
          const active =
            selectedServingId ===
            String(serving.id);

          return (
            <Box
              key={serving.id}
              minW={CARD_WIDTH}
              p={4}
              borderRadius="2xl"
              cursor="pointer"
              bg={
                active
                  ? "brand.500"
                  : "white"
              }
              color={
                active
                  ? "white"
                  : "gray.800"
              }
              borderWidth="1px"
              borderColor={
                active
                  ? "brand.500"
                  : "gray.200"
              }
              boxShadow={
                active
                  ? "lg"
                  : "sm"
              }
              transition="all .22s ease"
              transform={
                active
                  ? "translateY(-3px)"
                  : "translateY(0px)"
              }
              _hover={{
                transform:
                  "translateY(-3px)",
                boxShadow: "lg",
              }}
              onClick={() =>
                onChange(
                  String(serving.id)
                )
              }
            >
              <VStack spacing={1}>

                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  lineHeight="1"
                >
                  {serving.grams}
                </Text>

                <Text
                  fontSize="xs"
                  opacity={0.85}
                >
                  grams
                </Text>

                <Text
                  mt={2}
                  textAlign="center"
                  fontSize="sm"
                  fontWeight="600"
                  noOfLines={2}
                >
                  {serving.serving_name}
                </Text>

              </VStack>
            </Box>
          );
        })}

        {/* Custom Card */}

        {/* <Box
          minW={CARD_WIDTH}
          p={4}
          borderRadius="2xl"
          cursor="pointer"
          bg={
            selectedServingId ===
            "CUSTOM"
              ? "brand.500"
              : "white"
          }
          color={
            selectedServingId ===
            "CUSTOM"
              ? "white"
              : "gray.800"
          }
          borderWidth="1px"
          borderColor={
            selectedServingId ===
            "CUSTOM"
              ? "brand.500"
              : "gray.200"
          }
          boxShadow={
            selectedServingId ===
            "CUSTOM"
              ? "lg"
              : "sm"
          }
          transition="all .22s ease"
          transform={
            selectedServingId ===
            "CUSTOM"
              ? "translateY(-3px)"
              : "translateY(0px)"
          }
          _hover={{
            transform:
              "translateY(-3px)",
            boxShadow: "lg",
          }}
          onClick={() =>
            onChange("CUSTOM")
          }
        >
          <VStack
            justify="center"
            h="100%"
            spacing={3}
          >
            <Icon
              as={FiEdit3}
              boxSize={6}
            />

            <Text
              fontWeight="700"
            >
              Custom
            </Text>

            <Text
              fontSize="xs"
              textAlign="center"
              opacity={0.8}
            >
              Enter exact amount
            </Text>

          </VStack>
        </Box> */}

      </HStack>

    </Box>
  );
};

export default ServingSelector;