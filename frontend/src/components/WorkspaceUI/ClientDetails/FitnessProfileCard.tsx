import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Badge
} from "@chakra-ui/react";

interface Props {
  profile: any;
}

const FitnessProfileCard = ({
  profile
}: Props) => {

  if (!profile) {

    return (

      <Box
        bg="white"
        p={6}
        borderRadius="20px"
        shadow="sm"
      >
        <Text
          fontSize="lg"
          fontWeight="700"
          mb={3}
        >
          🏋️ Fitness Profile
        </Text>

        <Text color="gray.500">
          No active fitness profile.
        </Text>

      </Box>

    );

  }

  return (

    <Box
      bg="white"
      p={6}
      borderRadius="20px"
      shadow="sm"
    >

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={6}
      >
        🏋️ Fitness Profile
      </Text>

      <SimpleGrid
        columns={{
          base: 2,
          md: 3
        }}
        spacing={6}
      >

        <VStack>

          <Text color="gray.500">
            Goal
          </Text>

          <Badge colorScheme="blue">
            {profile.goal_type}
          </Badge>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Activity
          </Text>

          <Text fontWeight="600">
            {profile.activity_level}
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Height
          </Text>

          <Text fontWeight="600">
            {profile.height_cm} cm
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Weight
          </Text>

          <Text fontWeight="600">
            {profile.weight_kg} kg
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Target Weight
          </Text>

          <Text fontWeight="600">
            {profile.target_weight} kg
          </Text>

        </VStack>

        <VStack>

          <Text color="gray.500">
            Food Preference
          </Text>

          <Text fontWeight="600">
            {profile.food_preference}
          </Text>

        </VStack>

      </SimpleGrid>

    </Box>

  );

};

export default FitnessProfileCard;