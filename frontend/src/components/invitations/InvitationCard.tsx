import {
    Box,
    Button,
    HStack,
    Text,
    VStack,
    Badge
} from "@chakra-ui/react";

import type { WorkspaceInvitation } from "../../types/invitation.types";

interface InvitationCardProps {
    invitation: WorkspaceInvitation;
    onReview: (invitation: WorkspaceInvitation) => void;
}

const InvitationCard = ({
    invitation,
    onReview
}: InvitationCardProps) => {

    const expiryDate = new Date(
        invitation.expires_at
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (

        <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="0 6px 25px rgba(0,0,0,0.05)"
        >

            <HStack
                justify="space-between"
                align="start"
            >

                <VStack
                    align="start"
                    spacing={2}
                >

                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                    >
                        🏢 {invitation.organization_name}
                    </Text>

                    <HStack>

                        <Badge
                            colorScheme="blue"
                            borderRadius="full"
                            px={3}
                        >
                            {invitation.organization_type}
                        </Badge>

                        <Badge
                            colorScheme="green"
                            borderRadius="full"
                            px={3}
                        >
                            {invitation.role}
                        </Badge>

                    </HStack>

                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        Expires {expiryDate}
                    </Text>

                </VStack>

                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() =>
                        onReview(invitation)
                    }
                >
                    Review →
                </Button>

            </HStack>

        </Box>

    );

};

export default InvitationCard;