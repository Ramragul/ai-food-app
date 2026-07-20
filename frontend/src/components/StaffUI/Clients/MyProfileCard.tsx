import {
    Badge,
    Box,
    Divider,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack
} from "@chakra-ui/react";

import type {
    ClientDetails
} from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

const formatGoal = (goal: string) =>
    goal
        .split("_")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

const ProfileItem = ({
    label,
    value
}: {
    label: string;
    value: string | number;
}) => (

    <VStack
        align="start"
        spacing={1}
    >
        <Text
            fontSize="sm"
            color="gray.500"
        >
            {label}
        </Text>

        <Text
            fontWeight="600"
            fontSize="md"
        >
            {value}
        </Text>
    </VStack>

);

const MyClientProfileCard = ({
    client
}: Props) => {

    const profile = client.fitness_profile;

    return (

        <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            shadow="sm"
            p={6}
        >

            <HStack
                justify="space-between"
                mb={5}
            >

                <Heading size="md">

                    Fitness Profile

                </Heading>

                <Badge
                    colorScheme="purple"
                >

                    {formatGoal(profile.goal_type)}

                </Badge>

            </HStack>

            <Divider mb={6} />

            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2
                }}
                spacing={6}
            >

                <ProfileItem
                    label="Height"
                    value={`${profile.height_cm} cm`}
                />

                <ProfileItem
                    label="Current Weight"
                    value={`${profile.weight_kg} kg`}
                />

                <ProfileItem
                    label="Target Weight"
                    value={`${profile.target_weight} kg`}
                />

                <ProfileItem
                    label="Activity Level"
                    value={capitalize(profile.activity_level)}
                />

                <ProfileItem
                    label="Duration"
                    value={`${profile.duration_days} Days`}
                />

                <ProfileItem
                    label="Food Preference"
                    value={capitalize(profile.food_preference)}
                />

                <ProfileItem
                    label="Goal Mode"
                    value={profile.goal_mode}
                />

                <ProfileItem
                    label="Target Source"
                    value={profile.target_source}
                />

            </SimpleGrid>

        </Box>

    );

};

export default MyClientProfileCard;