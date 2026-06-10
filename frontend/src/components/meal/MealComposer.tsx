import {
  Box,
  Button,
  Text,
  VStack
} from "@chakra-ui/react";

// interface Props {
//   foods: string[];
//   onAnalyze: () => void;
//   loading?: boolean;
// }



interface Props {
  foods: any[];

  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };

  onSave: () => void;

  loading?: boolean;
}

const MealComposer = ({
  foods,
  totals,
  onSave,
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
bg="linear-gradient(
135deg,
#eff6ff,
#dbeafe
)"
  color="gray.800"
  borderRadius="28px"
  p={5}
  boxShadow="
    0 12px 40px
    rgba(0,0,0,0.25)
  "
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

    {/* <Box
  textAlign="center"
  py={3}
> */}
    <Box
  bg="white"
  borderRadius="2xl"
  p={4}
  boxShadow="sm"
  textAlign="center"
  py={3}
>
  
  <Text
    fontSize="xs"
    color="gray.500"
    textTransform="uppercase"
    letterSpacing="1px"
  >
    Total Calories
  </Text>

  <Text
    fontSize="5xl"
    lineHeight="1"
    fontWeight="900"
  >
    🔥
  </Text>

  {/* <Text
    fontSize="4xl"
    fontWeight="900"
    color="white"
    lineHeight="1"
  >
    {Math.round(
      totals.calories
    )}
  </Text> */}

  <Text
  fontSize="4xl"
  fontWeight="900"
  color="brand.500"
>
  {Math.round(
    totals.calories
  )}
</Text>

  <Text
    fontSize="sm"
    color="gray.400"
  >
    kcal
  </Text>
</Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(3,1fr)"
        gap={2}
      >

        <Box
bg="rgba(168,85,247,0.15)"
border="1px solid"
borderColor="rgba(168,85,247,0.25)"
          p={3}
          borderRadius="lg"
          textAlign="center"
        >
          <Text
            fontSize="xs"
          >
            Protein
          </Text>

          <Text
            fontWeight="700"
          >
            {totals.protein.toFixed(1)}g
          </Text>
        </Box>

        <Box
bg="rgba(249,115,22,0.15)"
border="1px solid"
borderColor="rgba(249,115,22,0.25)"
          p={3}
          borderRadius="lg"
          textAlign="center"
        >
          <Text
            fontSize="xs"
          >
            Carbs
          </Text>

          <Text
            fontWeight="700"
          >
            {totals.carbs.toFixed(1)}g
          </Text>
        </Box>

        <Box
bg="rgba(34,197,94,0.15)"
border="1px solid"
borderColor="rgba(34,197,94,0.25)"
          p={3}
          borderRadius="lg"
          textAlign="center"
        >
          <Text
            fontSize="xs"
          >
            Fat
          </Text>

          <Text
            fontWeight="700"
          >
            {totals.fats.toFixed(1)}g
          </Text>
        </Box>

      </Box>

<Button
  h="60px"
  fontSize="md"
  fontWeight="700"
  bg="brand.500"
  color="white"
  borderRadius="18px"
  isLoading={loading}
  onClick={onSave}
>
  🍽 Save Meal
</Button>

    </VStack>
  </Box>
);
};

export default MealComposer;