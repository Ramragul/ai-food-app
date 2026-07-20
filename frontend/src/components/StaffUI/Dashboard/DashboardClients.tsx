import {
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";

import DashboardClientCard from "./DashboardClientCard";

import  type {
  DashboardClient
} from "../../../services/staff/dashboard.service";

interface Props {

  clients: DashboardClient[];

}

const DashboardClients = ({
  clients
}: Props) => {

  return (

    <VStack
      spacing={6}
      align="stretch"
    >

      <Heading
        size="md"
      >

        Today's Clients

      </Heading>

      {

        clients.length === 0 ? (

          <Text
            color="gray.500"
          >

            No assigned clients.

          </Text>

        ) : (

          clients.map(client => (

            <DashboardClientCard

              key={
                client.member_id
              }

              client={client}

            />

          ))

        )

      }

    </VStack>

  );

};

export default DashboardClients;