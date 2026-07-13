import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

import type {
  Invitation
} from "../../services/workspace/invitations.service";

interface Props {

  invitations: Invitation[];

}

const formatDate = (date: string) => {

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );

};

const getStatusColor = (status: string) => {

  switch (status) {

    case "ACCEPTED":
      return "green";

    case "PENDING":
      return "orange";

    case "EXPIRED":
      return "red";

    default:
      return "gray";

  }

};

const getTypeColor = (type: string) => {

  switch (type) {

    case "EMPLOYEE":
      return "purple";

    case "CLIENT":
      return "blue";

    default:
      return "gray";

  }

};

const InvitationsList = ({
  invitations
}: Props) => {

  const isDesktop =
    useBreakpointValue({

      base: false,

      lg: true

    });

  if (isDesktop) {

    return (

      <TableContainer

        bg="white"

        borderRadius="20px"

        shadow="sm"

      >

        <Table>

          <Thead>

            <Tr>

              <Th>Name</Th>

              <Th>Type</Th>

              <Th>Role</Th>

              <Th>Status</Th>

              <Th>Invited</Th>

              <Th></Th>

            </Tr>

          </Thead>

          <Tbody>

            {

              invitations.map(invitation => (

                <Tr key={invitation.id}>

                  <Td>

                    <VStack

                      align="start"

                      spacing={0}

                    >

                      <Text

                        fontWeight="600"

                      >

                        {invitation.invited_name}

                      </Text>

                      <Text

                        fontSize="sm"

                        color="gray.500"

                      >

                        {invitation.invited_mobile}

                      </Text>

                    </VStack>

                  </Td>

                  <Td>

                    <Badge

                      colorScheme={
                        getTypeColor(
                          invitation.invitation_type
                        )
                      }

                    >

                      {invitation.invitation_type}

                    </Badge>

                  </Td>

                  <Td>

                    {invitation.role}

                  </Td>

                  <Td>

                    <Badge

                      colorScheme={
                        getStatusColor(
                          invitation.status
                        )
                      }

                    >

                      {invitation.status}

                    </Badge>

                  </Td>

                  <Td>

                    {

                      formatDate(
                        invitation.created_at
                      )

                    }

                  </Td>

                  <Td>

                    <Button

                      size="sm"

                      variant="ghost"

                      colorScheme="blue"

                    >

                      View

                    </Button>

                  </Td>

                </Tr>

              ))

            }

          </Tbody>

        </Table>

      </TableContainer>

    );

  }

  return (

    <SimpleGrid

      columns={1}

      spacing={4}

    >

      {

        invitations.map(invitation => (

          <Box

            key={invitation.id}

            bg="white"

            borderRadius="20px"

            p={5}

            shadow="sm"

          >

            <VStack

              align="stretch"

              spacing={4}

            >

              <Box>

                <Text

                  fontWeight="700"

                  fontSize="lg"

                >

                  {invitation.invited_name}

                </Text>

                <Text

                  fontSize="sm"

                  color="gray.500"

                >

                  {invitation.invited_mobile}

                </Text>

              </Box>

              <HStack>

                <Badge

                  colorScheme={
                    getTypeColor(
                      invitation.invitation_type
                    )
                  }

                >

                  {invitation.invitation_type}

                </Badge>

                <Badge>

                  {invitation.role}

                </Badge>

              </HStack>

              <HStack

                justify="space-between"

              >

                <Text

                  fontSize="sm"

                  color="gray.500"

                >

                  Invited

                </Text>

                <Text

                  fontSize="sm"

                >

                  {

                    formatDate(
                      invitation.created_at
                    )

                  }

                </Text>

              </HStack>

              <Badge

                alignSelf="flex-start"

                colorScheme={
                  getStatusColor(
                    invitation.status
                  )
                }

              >

                {invitation.status}

              </Badge>

              <Button

                colorScheme="blue"

                variant="outline"

                borderRadius="12px"

              >

                View

              </Button>

            </VStack>

          </Box>

        ))

      }

    </SimpleGrid>

  );

};

export default InvitationsList;