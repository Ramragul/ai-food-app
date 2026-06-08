import {
  VStack,
  Text,
  Heading
} from "@chakra-ui/react";

const MealHero = () => {
  const hour =
    new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12)
    greeting = "Good Morning";

  else if (hour < 17)
    greeting = "Good Afternoon";

  return (
    <VStack
      align="start"
      spacing={1}
      mb={8}
    >
      <Text
        fontSize="sm"
        color="gray.500"
      >
        {greeting} 👋
      </Text>

      <Heading
        size="lg"
        lineHeight="1.1"
      >
        What did you eat
        today?
      </Heading>

      <Text color="gray.500">
        Track meals effortlessly.
      </Text>
    </VStack>
  );
};

export default MealHero;