import { useEffect, useMemo, useState } from "react";
import { VStack, Text } from "@chakra-ui/react";

import SectionHeader from "../../components/Shared/SectionHeader";
import LoadingState from "../../components/Shared/LoadingState";
import EmptyState from "../../components/Shared/EmptyState";

import ClientSearch from "../../components/StaffUI/Clients/ClientSearch";
import ClientList from "../../components/StaffUI/Clients/ClientList";

import type { DashboardClient } from "../../services/staff/dashboard.service";
import { getClients } from "../../services/staff/client.service";

const StaffClientsPage = () => {

    const [clients, setClients] = useState<DashboardClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = useMemo(() => {

        const query = search.trim().toLowerCase();

        if (!query) {
            return clients;
        }

        return clients.filter(client =>
            client.name.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query) ||
            client.mobile.includes(query)
        );

    }, [clients, search]);

    if (loading) {
        return <LoadingState message="Loading clients..." />;
    }

    return (

        <VStack
            align="stretch"
            spacing={6}
        >

            <SectionHeader
                title="My Clients"
                subtitle="Manage and monitor your assigned clients."
            />

            <ClientSearch
                value={search}
                onChange={setSearch}
            />



            <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="medium"
            >
                Showing <strong>{filteredClients.length}</strong> of{" "}
                <strong>{clients.length}</strong> clients
            </Text>

            {
                filteredClients.length === 0 ? (
                    <EmptyState
                        title="No clients found"
                        description="Try searching using name, email or mobile."
                    />
                ) : (
                    <ClientList
                        clients={filteredClients}
                    />
                )
            }

        </VStack>

    );

};

export default StaffClientsPage;