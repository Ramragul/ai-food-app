import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import type { ClientDetails } from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const formatGoal = (goal: string) =>
    goal
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

const MyClientHeader = ({ client }: Props) => {

    const { fitness_profile, consent } = client;

    return (

        <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            p={6}
            shadow="sm"
        >

            <Flex
                direction={{
                    base: "column",
                    lg: "row"
                }}
                justify="space-between"
                align={{
                    base: "flex-start",
                    lg: "center"
                }}
                gap={6}
            >

                <HStack
                    spacing={5}
                    align="flex-start"
                >

                    <Avatar
                        size="xl"
                        name={client.client.name}
                    />

                    <VStack
                        align="start"
                        spacing={2}
                    >

                        <Heading size="lg">
                            {client.client.name}
                        </Heading>

                        {client.client.nickname && (
                            <Text
                                color="gray.500"
                                fontSize="sm"
                            >
                                "{client.client.nickname}"
                            </Text>
                        )}

                        <HStack spacing={2} flexWrap="wrap">

                            <Badge colorScheme="purple">

                                {formatGoal(
                                    fitness_profile.goal_type
                                )}

                            </Badge>

                            <Badge colorScheme="blue">

                                {capitalize(
                                    fitness_profile.activity_level
                                )}

                            </Badge>

                            <Badge
                                colorScheme={
                                    consent.granted
                                        ? "green"
                                        : "orange"
                                }
                            >

                                {consent.status}

                            </Badge>

                        </HStack>

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >

                            {client.client.email}

                        </Text>

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >

                            {client.client.mobile}

                        </Text>

                    </VStack>

                </HStack>

                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                >

                    Add Note

                </Button>

            </Flex>

        </Box>

    );

};

export default MyClientHeader;