import {
    Badge,
    Box,
    Button,
    Divider,
    HStack,
    Icon,
    Text,
    VStack
} from "@chakra-ui/react";

import {
    FiCheckCircle,
    FiShield,
    FiShieldOff
} from "react-icons/fi";

import type {
    OrganizationConsent
} from "../../../types/consent.types";

interface ConsentCardProps {

    consent: OrganizationConsent;

    loading?: boolean;

    onGrant: (
        organizationId: number
    ) => void;

    onRevoke: (
        organizationId: number
    ) => void;

}

const ConsentCard = ({
    consent,
    loading,
    onGrant,
    onRevoke
}: ConsentCardProps) => {

    return (

        <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="0 10px 30px rgba(0,0,0,0.05)"
            border="1px solid"
            borderColor="gray.100"
        >

            <VStack
                align="stretch"
                spacing={5}
            >

                <HStack
                    justify="space-between"
                    align="start"
                >

                    <VStack
                        align="start"
                        spacing={1}
                    >

                        <Text
                            fontSize="lg"
                            fontWeight="700"
                        >
                            🏢 {consent.organization_name}
                        </Text>

                        <Badge
                            colorScheme="blue"
                            w="fit-content"
                        >
                            {consent.organization_type}
                        </Badge>

                    </VStack>

                    {consent.granted ? (

                        <Icon
                            as={FiCheckCircle}
                            color="green.400"
                            boxSize={6}
                        />

                    ) : (

                        <Icon
                            as={FiShieldOff}
                            color="orange.400"
                            boxSize={6}
                        />

                    )}

                </HStack>

                <Divider />

                {consent.granted ? (

                    <VStack
                        align="start"
                        spacing={2}
                    >

                        <Text
                            fontWeight="600"
                            color="green.600"
                        >
                            Consent Granted
                        </Text>

                        <Text
                            color="gray.500"
                            fontSize="sm"
                        >
                            Granted on{" "}
                            {new Date(
                                consent.granted_at!
                            ).toLocaleDateString()}
                        </Text>

                    </VStack>

                ) : (

                    <VStack
                        align="start"
                        spacing={3}
                    >

                        <Text
                            fontWeight="600"
                            color="orange.500"
                        >
                            Consent Required
                        </Text>

                        <Text
                            color="gray.600"
                            fontSize="sm"
                        >
                            Grant permission so your
                            organization can securely
                            access your health and
                            nutrition information.
                        </Text>

                        <VStack
                            align="start"
                            spacing={1}
                            pl={2}
                        >

                            <Text>
                                ✓ Nutrition
                            </Text>

                            <Text>
                                ✓ Weight
                            </Text>

                            <Text>
                                ✓ Measurements
                            </Text>

                            <Text>
                                ✓ Progress
                            </Text>

                            <Text>
                                ✓ Meal History
                            </Text>

                        </VStack>

                    </VStack>

                )}

                <Button
                    leftIcon={
                        <Icon
                            as={
                                consent.granted
                                    ? FiShieldOff
                                    : FiShield
                            }
                        />
                    }
                    colorScheme={
                        consent.granted
                            ? "red"
                            : "blue"
                    }
                    isLoading={loading}
                    onClick={() =>

                        consent.granted

                            ? onRevoke(
                                consent.organization_id
                            )

                            : onGrant(
                                consent.organization_id
                            )

                    }
                >

                    {consent.granted

                        ? "Revoke Consent"

                        : "Grant Consent"}

                </Button>

            </VStack>

        </Box>

    );

};

export default ConsentCard;