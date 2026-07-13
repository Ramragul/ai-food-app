import {
  Box,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  client: {

    mobile: string;

    email: string;

    gender: string;

    age_range: string;

    created_at: string;

  };

}

const PersonalInfoCard = ({
  client
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="20px"

      p={6}

      shadow="sm"

    >

      <Text

        fontSize="lg"

        fontWeight="700"

        mb={5}

      >

        Personal Information

      </Text>

      <SimpleGrid

        columns={{
          base: 1,
          md: 2
        }}

        spacing={6}

      >

        <VStack align="start">

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Mobile

          </Text>

          <Text>

            {client.mobile}

          </Text>

        </VStack>

        <VStack align="start">

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Email

          </Text>

          <Text>

            {client.email}

          </Text>

        </VStack>

        <VStack align="start">

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Gender

          </Text>

          <Text>

            {client.gender}

          </Text>

        </VStack>

        <VStack align="start">

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Age Group

          </Text>

          <Text>

            {client.age_range}

          </Text>

        </VStack>

        <VStack align="start">

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Joined

          </Text>

          <Text>

            {new Date(
              client.created_at
            ).toLocaleDateString()}

          </Text>

        </VStack>

      </SimpleGrid>

    </Box>

  );

};

export default PersonalInfoCard;