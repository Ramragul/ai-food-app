import {
  Box,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";



interface Serving {
  id: number;
  value: number;
  unit: string;
  label: string;
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
    {serving.value}
  </Text>

  <Text
    fontSize="xs"
    opacity={0.85}
    textTransform="uppercase"
  >
    {serving.unit}
  </Text>

  {serving.unit !== "g" && (
    <Text
      mt={2}
      fontSize="xs"
      color={
        active
          ? "whiteAlpha.800"
          : "gray.500"
      }
      fontWeight="600"
    >
      ≈ {serving.grams} g
    </Text>
  )}

</VStack>
            </Box>
          );
        })}



      </HStack>

    </Box>
  );
};

export default ServingSelector;


