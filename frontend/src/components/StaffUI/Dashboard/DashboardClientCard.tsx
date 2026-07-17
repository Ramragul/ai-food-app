import {
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
import type { DashboardClient } from "../../../services/staff/dashboard.service";

interface Props {
  client: DashboardClient;
}

const DashboardClientCard = ({ client }: Props) => {

  const navigate = useNavigate();

  return (

    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      transition=".25s"
      _hover={{
        shadow: "lg",
        transform: "translateY(-2px)"
      }}
    >

      <Flex
        justify="space-between"
        align="flex-start"
        mb={5}
      >

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

            {client.goal_type
              ?.replaceAll("_", " ")
              .replace(/\b\w/g, c => c.toUpperCase())}

          </Text>

        </VStack>

        <Badge

          colorScheme={client.status.color}

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

            <Text
              fontWeight="600"
            >

              Calories

            </Text>

            <Text>

              {client.consumed_calories}
              {" / "}
              {client.target_calories}

            </Text>

          </Flex>

          <Progress

            value={client.status.progress}

            borderRadius="full"

          />

        </Box>

        <Box>

          <Flex
            justify="space-between"
            mb={2}
          >

            <Text
              fontWeight="600"
            >

              Protein

            </Text>

            <Text>

              {client.consumed_protein}
              {" / "}
              {client.target_protein}g

            </Text>

          </Flex>

          <Progress

            value={
              client.target_protein
                ? (client.consumed_protein /
                    client.target_protein) *
                  100
                : 0
            }

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

          onClick={() =>
            navigate(
              `/staff/clients/${client.member_id}`
            )
          }

        >

          View Client →

        </Button>

      </Flex>

    </Box>

  );

};

export default DashboardClientCard;