import {
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {

  title: string;

  value: number | string;

  icon?: ReactNode;

}

const StatCard = ({
  title,
  value,
  icon
}: Props) => (

  <Box

    bg="white"

    p={6}

    borderRadius="2xl"

    shadow="sm"

    transition=".25s"

    _hover={{

      shadow:"lg",

      transform:"translateY(-3px)"

    }}

  >

    <Flex

      justify="space-between"

      align="center"

      mb={3}

    >

      <Text

        color="gray.500"

      >

        {title}

      </Text>

      {icon}

    </Flex>

    <Text

      fontSize="3xl"

      fontWeight="700"

    >

      {value}

    </Text>

  </Box>

);

export default StatCard;