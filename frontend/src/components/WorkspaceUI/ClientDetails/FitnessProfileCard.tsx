import {
  Box,
  Button,
  HStack,
  Text,
  VStack
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

        <VStack

          spacing={4}

        >

          <Text

            fontSize="lg"

            fontWeight="700"

          >

            🏋️ Fitness Profile

          </Text>

          <Text

            color="gray.500"

            textAlign="center"

          >

            This client hasn't created a fitness profile yet.

          </Text>

          <Button

            colorScheme="blue"

            variant="outline"

            isDisabled

          >

            Create Profile

          </Button>

        </VStack>

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

        fontWeight="700"

        fontSize="lg"

      >

        🏋️ Fitness Profile

      </Text>

      <HStack

        mt={5}

        spacing={8}

      >

        <VStack align="start">

          <Text color="gray.500">

            Height

          </Text>

          <Text>

            {profile.height} cm

          </Text>

        </VStack>

        <VStack align="start">

          <Text color="gray.500">

            Weight

          </Text>

          <Text>

            {profile.weight} kg

          </Text>

        </VStack>

      </HStack>

    </Box>

  );

};

export default FitnessProfileCard;