import {
  Box,
  Button,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {
  foods: string[];
  onAnalyze: () => void;
  loading?: boolean;
}

const MealComposer = ({
  foods,
  onAnalyze,
  loading
}: Props) => {
  if (
    foods.length === 0
  ) {
    return null;
  }

  return (
    <Box
      mt={8}
      bg="white"
      borderRadius="28px"
      p={5}
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 8px 24px rgba(0,0,0,0.05)"
    >
      <VStack
        align="stretch"
        spacing={4}
      >
        <Text
          fontSize="lg"
          fontWeight="700"
        >
          Meal Summary
        </Text>

        <Text
          color="gray.500"
          fontSize="sm"
        >
          {foods.length} foods selected
        </Text>

        <Button
          h="54px"
          bg="black"
          color="white"
          borderRadius="18px"
          isLoading={loading}
          onClick={onAnalyze}
        >
          Analyze Meal
        </Button>
      </VStack>
    </Box>
  );
};

export default MealComposer;