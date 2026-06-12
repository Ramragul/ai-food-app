import {
  Box,
  Text
} from "@chakra-ui/react";

const FitnessHero = () => {

  return (
    <Box
      mb={6}
      bg="
      linear-gradient(
      135deg,
      #2563eb,
      #60a5fa
      )"
      borderRadius="3xl"
      p={6}
      color="white"
    >

      <Text
        fontSize="3xl"
        fontWeight="900"
      >
        💪 NEKA Fitness
      </Text>

      <Text
        mt={2}
        opacity={0.9}
      >
        Home workouts for
        strength, fat loss
        and overall fitness.
      </Text>

    </Box>
  );
};

export default FitnessHero;