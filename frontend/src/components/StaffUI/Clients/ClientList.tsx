import { VStack } from "@chakra-ui/react";

import ClientCard from "./ClientCard";

import  type { DashboardClient } from "../../../services/staff/dashboard.service";

interface Props {
    clients: DashboardClient[];
}

const ClientList = ({ clients }: Props) => {

    return (

        <VStack
            spacing={5}
            align="stretch"
        >

            {
                clients.map(client => (

                    <ClientCard
                        key={client.member_id}
                        client={client}
                    />

                ))
            }

        </VStack>

    );

};

export default ClientList;