import {
    Box,
    Spinner,
    Text,
    VStack,
    useToast
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
    getMyInvitations
} from "../../../services/client/invitation.service";

import type {
    WorkspaceInvitation
} from "../../../types/invitation.types";

import InvitationCard from "../../../components/invitations/InvitationCard";

import InvitationReviewDrawer
from "../../../components/invitations/InvitationReviewDrawer";

const ClientInvitationsPage = () => {

    const toast = useToast();

    const [loading, setLoading] = useState(true);

    const [invitations, setInvitations] = useState<
        WorkspaceInvitation[]
    >([]);

    const [selectedInvitation, setSelectedInvitation] =
    useState<WorkspaceInvitation | null>(null);

    const onClose = () => {
    setSelectedInvitation(null);
};

    const loadInvitations = async () => {

        try {

            const data =
                await getMyInvitations();

            setInvitations(
                data.filter(
                    invitation =>
                        invitation.status ===
                        "PENDING"
                )
            );

        } catch {

            toast({
                title:
                    "Unable to load invitations",
                status: "error"
            });

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadInvitations();

    }, []);

    if (loading) {

        return (
            <Spinner
                size="lg"
                mt={10}
            />
        );

    }

    return (

        <Box
            bg="#F7FAFC"
            minH="100vh"
            p={4}
        >

            <Text
                fontSize="2xl"
                fontWeight="bold"
                mb={5}
            >
                Workspace Invitations
            </Text>

<VStack spacing={4} align="stretch">

    {invitations.length === 0 ? (

        <Text color="gray.500">
            You're not invited to any workspace yet.
        </Text>

    ) : (

        invitations.map((invitation) => (
            <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onReview={setSelectedInvitation}
            />
        ))

    )}

</VStack>

<InvitationReviewDrawer
    invitation={selectedInvitation}
    isOpen={!!selectedInvitation}
    onClose={onClose}
    onSuccess={loadInvitations}
/>

        </Box>

    );

};

export default ClientInvitationsPage;