import {
  Box,
  Button,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  onCreate: () => void;

}

const EmptyCoachNotes = ({
  onCreate
}: Props) => {

  return (

    <Box

      bg="gray.50"

      borderRadius="xl"

      borderWidth="1px"

      borderStyle="dashed"

      borderColor="gray.300"

      py={12}

      px={8}

      textAlign="center"

    >

      <VStack spacing={4}>

        <Text fontSize="5xl">

          📝

        </Text>

        <Text
          fontSize="xl"
          fontWeight="bold"
        >

          No Coach Notes Yet

        </Text>

        <Text
          color="gray.500"
        >

          Record observations, progress,
          nutrition advice and reminders
          for this client.

        </Text>

        <Button

          colorScheme="blue"

          onClick={onCreate}

        >

          Add First Note

        </Button>

      </VStack>

    </Box>

  );

};

export default EmptyCoachNotes;