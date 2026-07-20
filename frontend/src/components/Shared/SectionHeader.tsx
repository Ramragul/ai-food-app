import {
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  title: string;

  subtitle?: string;

}

const SectionHeader = ({
  title,
  subtitle
}: Props) => (

  <VStack

    align="start"

    spacing={1}

    mb={5}

  >

    <Heading size="md">

      {title}

    </Heading>

    {

      subtitle && (

        <Text

          color="gray.500"

          fontSize="sm"

        >

          {subtitle}

        </Text>

      )

    }

  </VStack>

);

export default SectionHeader;