import {
  Box,
  Heading,
  Text,
  HStack
} from "@chakra-ui/react";

const NutritionHero = () => {

  return (

<Box
bg="linear-gradient(
135deg,
#E0F2FE,
#F8FBFF
)"
borderRadius="3xl"
p={6}
boxShadow="lg"
>

<HStack
align="flex-start"
spacing={4}
>

<Box
fontSize="4xl"
>
🍎
</Box>

<Box>

<Heading
size="lg"
color="gray.800"
>

Nutrition Search

</Heading>

<Text
mt={2}
color="gray.600"
fontSize="sm"
lineHeight="tall"
>

Discover calories,
protein, carbs and healthy fats
for any food or ingredient.

</Text>

</Box>

</HStack>

</Box>

  );

};

export default NutritionHero;