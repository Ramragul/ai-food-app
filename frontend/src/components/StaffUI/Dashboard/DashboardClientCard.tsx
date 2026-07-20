import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

import type {
  DashboardClient
} from "../../../services/staff/dashboard.service";

interface Props {
  client: DashboardClient;
}

const DashboardClientCard = ({ client }: Props) => {

  const navigate = useNavigate();

  const calorieProgress =
    client.target_calories
      ? (client.consumed_calories /
          client.target_calories) *
        100
      : 0;

  const proteinProgress =
    client.target_protein
      ? (client.consumed_protein /
          client.target_protein) *
        100
      : 0;

  return (

    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      border="1px solid"
      borderColor="gray.100"
      shadow="sm"
      transition="all .25s"
      _hover={{
        shadow: "lg",
        transform: "translateY(-3px)"
      }}
    >

      <Flex
        justify="space-between"
        align="flex-start"
        mb={6}
      >

        <Flex gap={4}>

          <Avatar
            name={client.name}
            size="md"
            bg="brand.500"
          />

          <VStack
            align="start"
            spacing={1}
          >

            <Heading size="md">

              {client.name}

            </Heading>

            <Text
              color="gray.500"
              fontSize="sm"
            >

              {client.goal.label}

            </Text>

          </VStack>

        </Flex>

        <Badge

          colorScheme={
            client.status.color
          }

          borderRadius="full"

          px={3}

          py={1}

        >

          {client.status.label}

        </Badge>

      </Flex>

      <Stack spacing={5}>

        <Box>

          <Flex
            justify="space-between"
            mb={2}
          >

            <Text fontWeight="600">

              Calories

            </Text>

            <Text>

              {client.consumed_calories}

              {" / "}

              {client.target_calories}

              {" kcal"}

            </Text>

          </Flex>

          <Progress

            value={calorieProgress}

            colorScheme="blue"

            borderRadius="full"

          />

        </Box>

        <Box>

          <Flex
            justify="space-between"
            mb={2}
          >

            <Text fontWeight="600">

              Protein

            </Text>

            <Text>

              {client.consumed_protein}

              {" / "}

              {client.target_protein}

              {" g"}

            </Text>

          </Flex>

          <Progress

            value={proteinProgress}

            colorScheme="green"

            borderRadius="full"

          />

        </Box>

      </Stack>

      <Flex
        justify="flex-end"
        mt={6}
      >

        <Button

          colorScheme="brand"

          rightIcon={
            <ChevronRightIcon />
          }

          onClick={() =>
            navigate(
              `/staff/clients/${client.member_id}`
            )
          }

        >

          View Client

        </Button>

      </Flex>

    </Box>

  );

};

export default DashboardClientCard;