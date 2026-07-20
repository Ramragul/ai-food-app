import {
  Center,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  message?: string;

}

const LoadingState = ({
  message = "Loading..."
}: Props) => (

  <Center

    py={20}

  >

    <VStack>

      <Spinner

        size="xl"

      />

      <Text

        color="gray.500"

      >

        {message}

      </Text>

    </VStack>

  </Center>

);

export default LoadingState;