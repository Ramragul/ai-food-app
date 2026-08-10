import {
  Box,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";

import type {
  ReactNode
} from "react";

interface Props {

  title: string;

  description?: string;

  children: ReactNode;

}

const SettingsSection = ({
  title,
  description,
  children
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="20px"

      p={{
        base: 5,
        md: 7
      }}

      shadow="sm"

    >

      <VStack

        align="stretch"

        spacing={6}

      >

        <Box>

          <Heading size="md">

            {title}

          </Heading>

          {description && (

            <Text

              mt={1}

              fontSize="sm"

              color="gray.500"

            >

              {description}

            </Text>

          )}

        </Box>

        {children}

      </VStack>

    </Box>

  );

};

export default SettingsSection;