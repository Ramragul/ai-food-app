import {
    Avatar,
    Badge,
    Box,
    Button,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    FiArrowLeft,
    FiUsers,
} from "react-icons/fi";

import {
    getWorkspaceMembers,
} from "../../../services/client/workspace.service";

import type {
    WorkspaceMembersResponse,
} from "../../../types/client.types";

import MemberCard from "../../../components/ClientUI/Workspace/MemberCard";

const MembersPage = () => {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [workspace, setWorkspace] =
        useState<WorkspaceMembersResponse | null>(null);

    useEffect(() => {

        loadMembers();

    }, []);

    const loadMembers = async () => {

        try {

            const data =
                await getWorkspaceMembers();

            setWorkspace(data);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={20}
            >

                <Spinner
                    size="xl"
                />

            </Box>

        );

    }

    if (!workspace) {

        return null;

    }

    return (

        <Box
            p={{
                base: 4,
                md: 6,
            }}
            maxW="1100px"
            mx="auto"
        >

            {/* Back */}

            <Button
                leftIcon={<FiArrowLeft />}
                variant="ghost"
                mb={5}
                onClick={() =>
                    navigate(-1)
                }
            >
                Back
            </Button>

            {/* Hero */}

            <Box

                bg="
                linear-gradient(
                135deg,
                #DFF6FF,
                #B8ECFF,
                #7DD3FC
                )
                "

                borderRadius="3xl"

                p={7}

                mb={8}

                position="relative"

                overflow="hidden"

                boxShadow="
                0 20px 45px
                rgba(56,189,248,.22)
                "

            >

                <Box

                    position="absolute"

                    top="-40px"

                    right="-40px"

                    w="140px"

                    h="140px"

                    bg="rgba(255,255,255,.30)"

                    borderRadius="full"

                    filter="blur(30px)"

                />

                <HStack
                    spacing={5}
                    align="center"
                >

                    <Avatar

                        size="xl"

                        bg="white"

                        color="blue.500"

                        icon={
                            <FiUsers />
                        }

                    />

                    <VStack
                        align="start"
                        spacing={2}
                    >

                        <Badge

                            bg="white"

                            color="blue.700"

                            borderRadius="full"

                            px={3}

                            py={1}

                        >

                            YOUR TEAM

                        </Badge>

                        <Heading
                            color="gray.800"
                            size="lg"
                        >

                            {workspace.organization.name}

                        </Heading>

                        <Text
                            color="gray.700"
                        >

                            Meet the professionals supporting your health journey.

                        </Text>

                    </VStack>

                </HStack>

            </Box>

            {/* Summary */}

            <SimpleGrid

                columns={{
                    base: 1,
                    md: 3,
                }}

                spacing={5}

                mb={8}

            >

                <Box

                    bg="white"

                    borderRadius="2xl"

                    p={5}

                    boxShadow="sm"

                >

                    <Text
                        color="gray.500"
                        fontSize="sm"
                    >
                        Team Members
                    </Text>

                    <Heading mt={1}>
                        {workspace.members.length}
                    </Heading>

                </Box>

                <Box

                    bg="white"

                    borderRadius="2xl"

                    p={5}

                    boxShadow="sm"

                >

                    <Text
                        color="gray.500"
                        fontSize="sm"
                    >
                        Organization
                    </Text>

                    <Heading
                        size="md"
                        mt={1}
                    >
                        {workspace.organization.organization_type}
                    </Heading>

                </Box>

                <Box

                    bg="white"

                    borderRadius="2xl"

                    p={5}

                    boxShadow="sm"

                >

                    <Text
                        color="gray.500"
                        fontSize="sm"
                    >
                        Workspace Code
                    </Text>

                    <Heading
                        size="md"
                        mt={1}
                    >
                        {workspace.organization.workspace_code}
                    </Heading>

                </Box>

            </SimpleGrid>

            {/* Members */}

            <VStack
                spacing={5}
                align="stretch"
            >

                {workspace.members.map(member => (

                    <MemberCard

                        key={member.id}

                        member={member}

                    />

                ))}

            </VStack>

        </Box>

    );

};

export default MembersPage;