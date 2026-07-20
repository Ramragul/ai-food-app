import {
  Box,
  Button,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";

import { FiFileText } from "react-icons/fi";

interface Props {

  onCreate: () => void;

}

const EmptyCoachNotes = ({
  onCreate
}: Props) => {

  return (

    <Box

      borderWidth="1px"

      borderRadius="xl"

      p={10}

      textAlign="center"

      bg="white"

    >

      <VStack spacing={4}>

        <Icon

          as={FiFileText}

          boxSize={10}

          color="gray.400"

        />

        <Text

          fontSize="lg"

          fontWeight="semibold"

        >

          No coach notes yet

        </Text>

        <Text color="gray.500">

          Start documenting client progress, observations and recommendations.

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