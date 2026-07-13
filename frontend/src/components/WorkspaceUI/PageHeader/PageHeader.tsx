import {
  Flex,
  Box,
  Heading,
  Text
} from "@chakra-ui/react";

interface Props {

  title: string;

  subtitle?: string;

  actions?: React.ReactNode;

}

const PageHeader = ({

  title,

  subtitle,

  actions

}: Props) => {

  return (

    <Flex

      justify="space-between"

      align={{

        base: "flex-start",

        md: "center"

      }}

      direction={{

        base: "column",

        md: "row"

      }}

      gap={4}

    >

      <Box>

        <Heading

          size="lg"

        >

          {title}

        </Heading>

        {

          subtitle && (

            <Text

              mt={2}

              color="gray.500"

            >

              {subtitle}

            </Text>

          )

        }

      </Box>

      {actions}

    </Flex>

  );

};

export default PageHeader;