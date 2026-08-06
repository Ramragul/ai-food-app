import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack
} from "@chakra-ui/react";

import {
    FiArrowRight,
    FiBarChart2,
    FiHeart,
    FiShield,
    FiUsers
} from "react-icons/fi";

interface FeatureProps {

    icon: any;

    title: string;

    description: string;

}

interface Props {

    onContinue: () => void;

    onCancel: () => void;

}

const FeatureCard = ({
    icon,
    title,
    description
}: FeatureProps) => (

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

const WorkspaceWelcomeStep = ({
    onContinue,
    onCancel
}: Props) => {

    return (

        <VStack

            spacing={10}

            align="stretch"

        >

            <VStack spacing={4}>

                <Text fontSize="70px">

                    🏋️

                </Text>

                <Heading
                    textAlign="center"
                    size="xl"
                >

                    Welcome to NEKA Workspaces

                </Heading>

                <Text

                    textAlign="center"

                    color="gray.600"

                    maxW="650px"

                    lineHeight="tall"

                >

                    Your workspace is where your team collaborates,
                    your clients connect, and coaching comes to life.

                    Create one dedicated place to manage your fitness
                    business with NEKA.

                </Text>

            </VStack>

            <SimpleGrid

                columns={{
                    base: 1,
                    md: 2
                }}

                spacing={5}

            >

                <FeatureCard

                    icon={FiUsers}

                    title="Invite Employees"

                    description="Bring trainers, dietitians, receptionists and staff into one collaborative workspace."

                />

                <FeatureCard

                    icon={FiHeart}

                    title="Manage Clients"

                    description="Securely onboard clients, collect consent and manage their wellness journey."

                />

                <FeatureCard

                    icon={FiShield}

                    title="Privacy First"

                    description="Clients stay in control of their health information while collaborating with your team."

                />

                <FeatureCard

                    icon={FiBarChart2}

                    title="Analytics"

                    description="Track growth, assignments, invitations and business insights from one dashboard."

                />

            </SimpleGrid>

            <Box

                bg="blue.50"

                p={6}

                borderRadius="3xl"

            >

                <Heading
                    size="sm"
                    mb={4}
                >

                    Perfect For

                </Heading>

                <Flex
                    wrap="wrap"
                    gap={3}
                >

                    <Box
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        🏋️ Gym
                    </Box>

                    <Box
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        🥗 Nutrition Clinic
                    </Box>

                    <Box
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        💪 Personal Trainer
                    </Box>

                    <Box
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        🧘 Yoga Studio
                    </Box>

                    <Box
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        🏃 Fitness Center
                    </Box>

                </Flex>

            </Box>

            <Box

                bg="gray.50"

                borderRadius="2xl"

                p={5}

            >

                <Text

                    color="gray.600"

                    textAlign="center"

                    lineHeight="tall"

                >

                    <strong>Your personal NEKA account remains unchanged.</strong>

                    <br /><br />

                    Creating a workspace simply allows you to manage your
                    business, invite employees, onboard clients and
                    collaborate securely.

                </Text>

            </Box>

            <Flex

                justify="space-between"

                direction={{
                    base: "column",
                    sm: "row"
                }}

                gap={4}

            >

                <Button

                    size="lg"

                    variant="outline"

                    onClick={onCancel}

                    w={{
                        base: "100%",
                        sm: "auto"
                    }}

                >

                    Maybe Later

                </Button>

                <Button

                    size="lg"

                    colorScheme="blue"

                    rightIcon={<FiArrowRight />}

                    onClick={onContinue}

                    w={{
                        base: "100%",
                        sm: "auto"
                    }}

                >

                    Continue

                </Button>

            </Flex>

        </VStack>

    );

};

export default WorkspaceWelcomeStep;