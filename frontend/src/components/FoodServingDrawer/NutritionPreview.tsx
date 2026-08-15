import {
  Box,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const NutritionCard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <Box
    bg="white"
    borderRadius="2xl"
    p={4}
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.100"
    transition="all .2s"
    _hover={{
      transform: "translateY(-2px)",
      boxShadow: "md",
    }}
  >
    <VStack
      spacing={2}
      align="start"
    >
      <Text
        fontSize="xl"
      >
        {icon}
      </Text>

      <Text
        fontSize="xs"
        color="gray.500"
      >
        {label}
      </Text>

      <Text
        fontSize="xl"
        fontWeight="800"
      >
        {value}
      </Text>
    </VStack>
  </Box>
);

// interface NutritionCardProps {
//   icon: string;
//   label: string;
//   value: string;
// }

const NutritionPreview = ({
  grams,
  calories,
  protein,
  carbs,
  fats,
}: Props) => {
  return (
    <Box
      bg="brand.50"
      borderRadius="2xl"
      p={5}
    >
      <Text
        fontWeight="700"
        fontSize="md"
      >
        Nutrition Preview
      </Text>

      <Text
        mt={1}
        mb={5}
        color="gray.500"
        fontSize="sm"
      >
        {grams.toFixed(0)} g selected
      </Text>

      <SimpleGrid
        columns={2}
        spacing={4}
      >
        <NutritionCard
          icon="🔥"
          label="Calories"
          value={`${calories.toFixed(0)} kcal`}
        />

        <NutritionCard
          icon="🥩"
          label="Protein"
          value={`${protein.toFixed(1)} g`}
        />

        <NutritionCard
          icon="🍚"
          label="Carbs"
          value={`${carbs.toFixed(1)} g`}
        />

        <NutritionCard
          icon="🥑"
          label="Fat"
          value={`${fats.toFixed(1)} g`}
        />
      </SimpleGrid>
    </Box>
  );
};

export default NutritionPreview;