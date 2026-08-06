import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack
} from "@chakra-ui/react";

import {
    FiArrowRight,
    FiHeart,
    FiShield,
    FiUsers,
    FiBarChart2
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const FeatureCard = ({
    icon,
    title,
    description
}: any) => (

    <Box
        bg="white"
        p={6}
        borderRadius="3xl"
        border="1px solid"
        borderColor="gray.100"
        transition=".25s"
        _hover={{
            transform: "translateY(-4px)",
            shadow: "xl"
        }}
    >

        <Icon
            as={icon}
            boxSize={7}
            color="blue.500"
            mb={4}
        />

        <Heading
            size="sm"
            mb={2}
        >
            {title}
        </Heading>

        <Text
            color="gray.600"
            fontSize="sm"
            lineHeight="tall"
        >
            {description}
        </Text>

    </Box>

);

const CreateWorkspacePage = () => {

    const navigate =
        useNavigate();

    return (

        <Box

            bg="gray.50"

            minH="100vh"

            py={14}

        >

            <Container
                maxW="6xl"
            >

                <VStack
                    spacing={10}
                >

                    <Text
                        fontSize="72px"
                    >
                        🏋️
                    </Text>

                    <VStack
                        spacing={5}
                    >

                        <Heading
                            size="2xl"
                            textAlign="center"
                        >

                            Create Your Workspace

                        </Heading>

                        <Text

                            maxW="700px"

                            textAlign="center"

                            color="gray.600"

                            fontSize="lg"

                            lineHeight="tall"

                        >

                            Your workspace is where your team collaborates,
                            your clients connect,
                            and coaching comes to life.

                        </Text>

                    </VStack>

                    <SimpleGrid

                        columns={{
                            base:1,
                            md:2
                        }}

                        spacing={6}

                        w="100%"

                    >

                        <FeatureCard

                            icon={FiUsers}

                            title="Invite Your Team"

                            description="Bring trainers, dietitians, receptionists and staff together into one collaborative workspace."

                        />

                        <FeatureCard

                            icon={FiHeart}

                            title="Manage Clients"

                            description="Invite clients securely, collect consent and manage their wellness journey."

                        />

                        <FeatureCard

                            icon={FiShield}

                            title="Secure Collaboration"

                            description="Health data stays protected while enabling coaches to access only what clients approve."

                        />

                        <FeatureCard

                            icon={FiBarChart2}

                            title="Workspace Insights"

                            description="Monitor employees, client growth, assignments and activity from a unified dashboard."

                        />

                    </SimpleGrid>

                    <Box

                        bg="blue.50"

                        borderRadius="3xl"

                        p={8}

                        w="100%"

                    >

                        <Heading
                            size="md"
                            mb={4}
                        >

                            Perfect For

                        </Heading>

                        <Flex
                            wrap="wrap"
                            gap={4}
                        >

                            <Box>🏋️ Gyms</Box>

                            <Box>🥗 Nutrition Clinics</Box>

                            <Box>💪 Personal Trainers</Box>

                            <Box>🧘 Yoga Studios</Box>

                            <Box>🏃 Fitness Centers</Box>

                        </Flex>

                    </Box>

                    <Box

                        bg="white"

                        borderRadius="3xl"

                        p={8}

                        textAlign="center"

                        w="100%"

                    >

                        <Text
                            color="gray.600"
                            lineHeight="tall"
                        >

                            Your personal meals,
                            nutrition history,
                            health data and AI insights remain part of your
                            personal NEKA account.

                            Creating a workspace simply enables collaboration
                            with your employees and clients.

                        </Text>

                    </Box>

                    <Flex
                        gap={5}
                    >

                        <Button

                            size="lg"

                            variant="outline"

                            onClick={() =>
                                navigate("/home")
                            }

                        >

                            Maybe Later

                        </Button>

                        <Button

                            size="lg"

                            colorScheme="blue"

                            rightIcon={<FiArrowRight />}

                            onClick={() =>
                                navigate("/workspace/create/details")
                            }

                        >

                            Continue

                        </Button>

                    </Flex>

                </VStack>

            </Container>

        </Box>

    );

};

export default CreateWorkspacePage;