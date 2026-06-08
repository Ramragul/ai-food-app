import {
  HStack,
  Button
} from "@chakra-ui/react";

const mealOptions = [
  {
    label: "🌅 Breakfast",
    value: "BREAKFAST"
  },
  {
    label: "🍛 Lunch",
    value: "LUNCH"
  },
  {
    label: "🌙 Dinner",
    value: "DINNER"
  },
  {
    label: "🍿 Snack",
    value: "SNACK"
  }
];

const MealTypeSelector = ({
  mealType,
  setMealType
}: any) => {
  return (
    <HStack
      overflowX="auto"
      spacing={3}
      pb={2}
      mb={8}
    >
      {mealOptions.map(
        (item) => {
          const active =
            mealType ===
            item.value;

          return (
            <Button
              key={item.value}
              minW="140px"
              h="52px"
              borderRadius="18px"
              bg={
                active
                  ? "brand.500"
                  : "white"
              }
              color={
                active
                  ? "white"
                  : "gray.700"
              }
              border="1px solid"
              borderColor={
                active
                  ? "brand.500"
                  : "gray.200"
              }
              onClick={() =>
                setMealType(
                  item.value
                )
              }
            >
              {item.label}
            </Button>
          );
        }
      )}
    </HStack>
  );
};

export default MealTypeSelector;