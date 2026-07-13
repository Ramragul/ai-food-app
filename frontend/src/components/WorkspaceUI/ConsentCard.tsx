import {
  Box,
  Badge,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  consent: {

    granted: boolean;

    status: string;

    message: string;

  };

}

const ConsentCard = ({
  consent
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="20px"

      p={6}

      shadow="sm"

    >

      <VStack

        align="stretch"

        spacing={4}

      >

        <Text

          fontSize="lg"

          fontWeight="700"

        >

          Health Data Consent

        </Text>

        <HStack>

          <Badge

            colorScheme={
              consent.granted
                ? "green"
                : "red"
            }

            px={3}

            py={1}

            borderRadius="full"

          >

            {consent.status}

          </Badge>

        </HStack>

        <Text

          color="gray.600"

        >

          {consent.message}

        </Text>

      </VStack>

    </Box>

  );

};

export default ConsentCard;