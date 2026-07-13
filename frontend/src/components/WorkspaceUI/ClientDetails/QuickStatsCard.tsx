import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  title: string;

  value: string | number;

  subtitle?: string;

}

const QuickStatsCard = ({
  title,
  value,
  subtitle
}: Props) => {

  return (

    <Box

      bg="white"

      p={5}

      borderRadius="18px"

      shadow="sm"

      transition=".25s"

      _hover={{
        transform: "translateY(-2px)",
        shadow: "md"
      }}

    >

      <VStack

        align="start"

        spacing={2}

      >

        <Text

          fontSize="sm"

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

        {

          subtitle && (

            <Text

              fontSize="sm"

              color="gray.500"

            >

              {subtitle}

            </Text>

          )

        }

      </VStack>

    </Box>

  );

};

export default QuickStatsCard;