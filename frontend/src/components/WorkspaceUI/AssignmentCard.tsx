import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";

import type {
  CoachAssignment
} from "../../services/workspace/assignments.service";

interface Props {

  assignment: CoachAssignment;

}

const formatDate = (date: string) =>

  new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );

const AssignmentCard = ({
  assignment
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="20px"

      p={6}

      shadow="sm"

    >

      <VStack

        align="stretch"

        spacing={4}

      >

        <Box>

          <Text

            fontSize="lg"

            fontWeight="700"

          >

            {assignment.coach.name}

          </Text>

          <Text

            color="gray.500"

            fontSize="sm"

          >

            {assignment.coach.role}

          </Text>

        </Box>

        <Badge

          colorScheme="blue"

          alignSelf="flex-start"

          borderRadius="full"

          px={3}

        >

          {assignment.total_clients} Client
          {assignment.total_clients > 1 && "s"}

        </Badge>

        <Divider />

        <VStack

          align="stretch"

          spacing={3}

        >

          {assignment.clients.map(client => (

            <HStack

              key={client.member_id}

              justify="space-between"

            >

              <Box>

                <Text

                  fontWeight="600"

                >

                  {client.name}

                </Text>

                <Text

                  fontSize="xs"

                  color="gray.500"

                >

                  Assigned {formatDate(client.assigned_at)}

                </Text>

              </Box>

              <Badge

                colorScheme={
                  client.consent_granted
                    ? "green"
                    : "orange"
                }

              >

                {client.consent_granted
                  ? "Consent"
                  : "Pending"}

              </Badge>

            </HStack>

          ))}

        </VStack>

        <Button

          colorScheme="blue"

          variant="outline"

          borderRadius="12px"

        >

          Manage Assignment

        </Button>

      </VStack>

    </Box>

  );

};

export default AssignmentCard;