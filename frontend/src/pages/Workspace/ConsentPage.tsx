import {
    Box,
    Heading,
    Spinner,
    Text,
    VStack,
    useToast
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ConsentCard from "../../components/ClientUI/Workspace/ConsentCard"

import {
    getConsents,
    grantConsent,
    revokeConsent
} from "../../services/client/consent.service";

import type {
    OrganizationConsent
} from "../../types/consent.types";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    HStack,
    IconButton
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const ConsentPage = () => {

    const navigate = useNavigate();

    const toast = useToast();

    const location = useLocation();

    const highlightedOrganizationId =
        location.state?.organizationId;

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState<number | null>(null);

    const [consents, setConsents] =
        useState<OrganizationConsent[]>([]);

    const loadConsents = async () => {

        try {

            const data =
                await getConsents();

            setConsents(data);

        } catch {

            toast({

                title:
                    "Unable to load consents.",

                status: "error"

            });

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadConsents();

    }, []);

    const handleGrant = async (
        organizationId: number
    ) => {

        try {

            setActionLoading(
                organizationId
            );

            await grantConsent(
                organizationId
            );

            toast({

                title:
                    "Consent granted.",

                status:
                    "success"

            });

            loadConsents();

        } catch {

            toast({

                title:
                    "Unable to grant consent.",

                status:
                    "error"

            });

        } finally {

            setActionLoading(
                null
            );

        }

    };

    const handleRevoke = async (
        organizationId: number
    ) => {

        try {

            setActionLoading(
                organizationId
            );

            await revokeConsent(
                organizationId
            );

            toast({

                title:
                    "Consent revoked.",

                status:
                    "success"

            });

            loadConsents();

        } catch {

            toast({

                title:
                    "Unable to revoke consent.",

                status:
                    "error"

            });

        } finally {

            setActionLoading(
                null
            );

        }

    };

    if (loading) {

        return (

            <Box
                textAlign="center"
                mt={20}
            >

                <Spinner
                    size="xl"
                />

            </Box>

        );

    }

    return (

        <Box
            bg="#F7FAFC"
            minH="100vh"
            p={5}
        >

            {/* <Heading
                size="lg"
                mb={2}
            >

                Workspace Consent

            </Heading>

            <Text
                color="gray.600"
                mb={6}
            >

                Manage which organizations
                are allowed to securely
                access your health data.

            </Text> */}

            <HStack
                mb={6}
                spacing={4}
                align="flex-start"
            >

                <IconButton
                    aria-label="Go back"
                    icon={<ArrowBackIcon />}
                    variant="ghost"
                    borderRadius="full"
                    onClick={() => navigate(-1)}
                />

                <Box>

                    <Heading size="lg">
                        Workspace Consent
                    </Heading>

                    <Text
                        color="gray.600"
                        mt={1}
                    >
                        Manage which organizations are allowed
                        to securely access your health data.
                    </Text>

                </Box>

            </HStack>

            <VStack
                spacing={5}
                align="stretch"
            >

                {consents.map(
                    consent => (

                        <Box
                            key={
                                consent.organization_id
                            }
                            border={
                                consent.organization_id ===
                                highlightedOrganizationId
                                    ? "2px solid"
                                    : "none"
                            }
                            borderColor="blue.400"
                            borderRadius="2xl"
                        >

                            <ConsentCard

                                consent={
                                    consent
                                }

                                loading={
                                    actionLoading ===
                                    consent.organization_id
                                }

                                onGrant={
                                    handleGrant
                                }

                                onRevoke={
                                    handleRevoke
                                }

                            />

                        </Box>

                    )
                )}

            </VStack>

        </Box>

    );

};

export default ConsentPage;