import {
  Box,
  Flex,
  Heading,

  Text
} from "@chakra-ui/react";



interface InsightCardProps {

  title: string;

  description: string;

  onClick?: () => void;

}

const InsightCard = ({

  title,

  description,

  onClick

}: InsightCardProps) => {

  return (

    <Box

      bg="white"

      p={6}

      borderRadius="24px"

      border="1px solid"

      borderColor="gray.100"

      boxShadow="sm"

      cursor={

        onClick

          ? "pointer"

          : "default"

      }

      transition="all .25s"

      _hover={{

        transform:"translateY(-3px)",

        boxShadow:"lg"

      }}

      onClick={onClick}

    >

      <Flex

        justify="space-between"

        align="center"

      >

        <Box>

          <Heading

            size="sm"

            mb={2}

          >

            {title}

          </Heading>

          <Text

            color="gray.500"

          >

            {description}

          </Text>

        </Box>

        {/* <Icon

          as={ArrowRight}

          boxSize={5}

          color="brand.500"

        /> */}

      </Flex>

    </Box>

  );

};

export default InsightCard;