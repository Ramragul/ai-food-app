import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Progress,
    Text,
    VStack
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import type { DashboardClient } from "../../../services/staff/dashboard.service";

interface Props {
    client: DashboardClient;
}

const ClientCard = ({ client }: Props) => {

    const navigate = useNavigate();

    const calorieProgress =
        client.target_calories > 0
            ? Math.min(
                  (client.consumed_calories / client.target_calories) * 100,
                  100
              )
            : 0;

    const proteinProgress =
        client.target_protein > 0
            ? Math.min(
                  (client.consumed_protein / client.target_protein) * 100,
                  100
              )
            : 0;

    return (

        <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            p={6}
            shadow="sm"
            transition="all .2s"
            _hover={{
                shadow: "md",
                borderColor: "blue.300"
            }}
        >

            <Flex
                justify="space-between"
                align="flex-start"
                mb={5}
            >

                <HStack
                    spacing={4}
                    align="flex-start"
                >

                    <Avatar
                        name={client.name}
                        size="md"
                    />

                    <VStack
                        align="start"
                        spacing={1}
                    >

                        <Text
                            fontWeight="bold"
                            fontSize="lg"
                        >
                            {client.name}
                        </Text>

                        <Badge
                            colorScheme="purple"
                            borderRadius="full"
                        >
                            {client.goal.label}
                        </Badge>

                    </VStack>

                </HStack>

                <Badge
                    colorScheme={client.status.color}
                    borderRadius="full"
                    px={3}
                    py={1}
                >
                    {client.status.label}
                </Badge>

            </Flex>

            <VStack
                spacing={5}
                align="stretch"
            >

                <Box>

                    <Flex
                        justify="space-between"
                        mb={2}
                    >

                        <Text
                            fontWeight="medium"
                        >
                            Calories
                        </Text>

                        <Text
                            color="gray.600"
                            fontSize="sm"
                        >
                            {client.consumed_calories} / {client.target_calories} kcal
                        </Text>

                    </Flex>

                    <Progress
                        value={calorieProgress}
                        borderRadius="full"
                        colorScheme="blue"
                    />

                </Box>

                <Box>

                    <Flex
                        justify="space-between"
                        mb={2}
                    >

                        <Text
                            fontWeight="medium"
                        >
                            Protein
                        </Text>

                        <Text
                            color="gray.600"
                            fontSize="sm"
                        >
                            {client.consumed_protein} / {client.target_protein} g
                        </Text>

                    </Flex>

                    <Progress
                        value={proteinProgress}
                        borderRadius="full"
                        colorScheme="green"
                    />

                </Box>

            </VStack>

            <Divider my={5} />

            <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                gap={3}
            >

                <Badge
                    colorScheme={
                        client.consent_granted
                            ? "green"
                            : "orange"
                    }
                    variant="subtle"
                    px={3}
                    py={1}
                >
                    {client.consent_granted
                        ? "Consent Granted"
                        : "Consent Pending"}
                </Badge>

                <Button
                    variant="ghost"
                    colorScheme="blue"
                    rightIcon={<ChevronRightIcon />}
                    onClick={() =>
                        navigate(
                            `/staff/clients/${client.member_id}`
                        )
                    }
                >
                    Open Profile
                </Button>

            </Flex>

        </Box>

    );

};

export default ClientCard;