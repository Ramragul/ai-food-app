import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    Text,
    VStack,
    useClipboard,
    useToast
} from "@chakra-ui/react";

import {
    FiCheckCircle,
    FiCopy,
    FiHome,
    FiUsers
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

interface Props {

    workspace: any;

}

const WorkspaceSuccessStep = ({
    workspace
}: Props) => {

    const navigate =
        useNavigate();

    const toast =
        useToast();

    const {

        hasCopied,

        onCopy

    } = useClipboard(
        workspace.workspace_code
    );

    const copyCode = () => {

        onCopy();

        toast({

            title: "Workspace code copied.",

            status: "success",

            duration: 2000,

            isClosable: true

        });

    };

    return (

        <VStack

            spacing={8}

            align="stretch"

        >

            <VStack
                spacing={4}
            >

                <Icon

                    as={FiCheckCircle}

                    boxSize={20}

                    color="green.400"

                />

                <Heading
                    textAlign="center"
                >

                    Workspace Created 🎉

                </Heading>

                <Text

                    color="gray.600"

                    textAlign="center"

                >

                    Your workspace is ready.

                    You can now invite employees,

                    onboard clients and start

                    collaborating.

                </Text>

            </VStack>

            <Box

                bg="gray.50"

                borderRadius="3xl"

                p={8}

            >

                <VStack
                    spacing={5}
                >

                    <Box
                        textAlign="center"
                    >

                        <Text
                            color="gray.500"
                            fontSize="sm"
                        >

                            Workspace

                        </Text>

                        <Heading
                            size="md"
                            mt={2}
                        >

                            {workspace.name}

                        </Heading>

                    </Box>

                    <Divider />

                    <Box
                        textAlign="center"
                    >

                        <Text
                            color="gray.500"
                            fontSize="sm"
                        >

                            Workspace Code

                        </Text>

                        <Heading

                            size="lg"

                            color="blue.600"

                            mt={2}

                        >

                            {workspace.workspace_code}

                        </Heading>

                    </Box>

                    <Button

                        leftIcon={<FiCopy />}

                        variant="outline"

                        onClick={copyCode}

                    >

                        {

                            hasCopied

                                ? "Copied"

                                : "Copy Code"

                        }

                    </Button>

                </VStack>

            </Box>

            <Box

                bg="blue.50"

                borderRadius="2xl"

                p={6}

            >

                <Heading

                    size="sm"

                    mb={4}

                >

                    Recommended Next Steps

                </Heading>

                <VStack

                    align="start"

                    spacing={3}

                >

                    <Text>

                        ✅ Invite your trainers and staff

                    </Text>

                    <Text>

                        ✅ Invite your clients

                    </Text>

                    <Text>

                        ✅ Start assigning coaches

                    </Text>

                    <Text>

                        ✅ Explore your workspace dashboard

                    </Text>

                </VStack>

            </Box>

            <HStack

                spacing={4}

                flexDirection={{

                    base: "column",

                    md: "row"

                }}

            >

                <Button

                    w="100%"

                    leftIcon={<FiHome />}

                    variant="outline"

                    onClick={() =>
                        navigate("/home")
                    }

                >

                    Home

                </Button>

                <Button

                    w="100%"

                    leftIcon={<FiUsers />}

                    colorScheme="blue"

                    onClick={() =>
                        navigate("/workspace/dashboard")
                    }

                >

                    Open Workspace

                </Button>

            </HStack>

        </VStack>

    );

};

export default WorkspaceSuccessStep;