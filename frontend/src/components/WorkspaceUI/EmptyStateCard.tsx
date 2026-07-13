import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  title: string;

  message: string;

}

const EmptyStateCard = ({
  title,
  message
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="20px"

      p={8}

      shadow="sm"

    >

      <VStack spacing={3}>

        <Text

          fontWeight="700"

          fontSize="lg"

        >

          {title}

        </Text>

        <Text

          color="gray.500"

          textAlign="center"

        >

          {message}

        </Text>

      </VStack>

    </Box>

  );

};

export default EmptyStateCard;