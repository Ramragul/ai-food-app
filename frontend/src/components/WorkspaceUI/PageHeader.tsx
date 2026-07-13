import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";

import type {
  ReactNode
} from "react";

interface PageHeaderProps {

  title: string;

  subtitle?: string;

  actions?: ReactNode;

}

const PageHeader = ({

  title,

  subtitle,

  actions

}: PageHeaderProps) => {

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

      gap={5}

    //   mb={2}

    >

      <Box>

        <Heading

          size="lg"

          color="gray.800"

        >

          {title}

        </Heading>

        {

          subtitle && (

            <Text

              mt={2}

              color="gray.500"

              fontSize="md"

            >

              {subtitle}

            </Text>

          )

        }

      </Box>

      {

        actions && (

          <ButtonGroup>

            {actions}

          </ButtonGroup>

        )

      }

    </Flex>

  );

};

export default PageHeader;