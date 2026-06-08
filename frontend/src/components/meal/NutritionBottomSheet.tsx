import {
  Box,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";

const NutritionBottomSheet = ({
  total,
  onConfirm
}: any) => {
  return (
    <Box
      position="fixed"
      bottom="70px"
      left="0"
      right="0"
      px={4}
      zIndex={999}
    >
      <Box
        maxW="420px"
        mx="auto"
      >
        <Box
          bg="white"
          borderRadius="28px"
          p={5}
          mb={3}
          boxShadow="0 20px 40px rgba(0,0,0,0.12)"
        >
          <Text
            fontSize="xs"
            color="gray.500"
          >
            Total Intake
          </Text>

          <Text
            fontSize="42px"
            fontWeight="800"
            lineHeight="1"
          >
            {Math.round(
              total?.calories ?? 0
            )}
          </Text>

          <Text
            color="gray.500"
            mb={4}
          >
            kcal
          </Text>

          <HStack>
            <Macro
              label="Protein"
              value={(
                total?.protein ?? 0
              ).toFixed(1)}
            />

            <Macro
              label="Carbs"
              value={(
                total?.carbs ?? 0
              ).toFixed(1)}
            />

            <Macro
              label="Fat"
              value={(
                total?.fats ?? 0
              ).toFixed(1)}
            />
          </HStack>
        </Box>

        <Button
          h="56px"
          w="100%"
          bg="black"
          color="white"
          borderRadius="full"
          onClick={onConfirm}
        >
          Confirm Meal 🚀
        </Button>
      </Box>
    </Box>
  );
};

const Macro = ({
  label,
  value
}: any) => (
  <Box
    flex={1}
    textAlign="center"
    bg="gray.50"
    p={3}
    borderRadius="16px"
  >
    <Text
      fontSize="xs"
      color="gray.500"
    >
      {label}
    </Text>

    <Text
      fontWeight="700"
    >
      {value}
    </Text>
  </Box>
);

export default NutritionBottomSheet;