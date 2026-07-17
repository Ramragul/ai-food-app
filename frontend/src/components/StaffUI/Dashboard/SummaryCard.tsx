import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  title: string;

  value: number;

}

const SummaryCard = ({
  title,
  value
}: Props) => (

  <Box

    bg="white"

    p={6}

    borderRadius="20px"

    shadow="sm"

    transition=".2s"

    _hover={{

      shadow: "lg",

      transform:
        "translateY(-3px)"

    }}

  >

    <VStack
      align="start"
      spacing={2}
    >

      <Text
        color="gray.500"
      >

        {title}

      </Text>

      <Text

        fontSize="3xl"

        fontWeight="700"

      >

        {value}

      </Text>

    </VStack>

  </Box>

);

export default SummaryCard;