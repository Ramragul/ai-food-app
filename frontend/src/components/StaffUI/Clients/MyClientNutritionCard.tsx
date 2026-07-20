import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    Progress,
    Text,
    VStack
} from "@chakra-ui/react";

import type {
    ClientDetails
} from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const NutritionRow = ({
    label,
    consumed,
    target
}: {
    label: string;
    consumed: number;
    target: number;
}) => {

    const percentage =
        target > 0
            ? (consumed / target) * 100
            : 0;

    return (

        <Box w="100%">

            <Text
                fontSize="sm"
                mb={1}
            >
                {label}
            </Text>

            <Progress
                value={percentage}
                borderRadius="full"
                mb={1}
            />

            <Text
                fontSize="xs"
                color="gray.500"
            >
                {consumed} / {target}
            </Text>

        </Box>

    );

};

const MyClientNutritionCard = ({
    client
}: Props) => {

    const profile = client.fitness_profile;

    if (!client.today) {

        return (

            <Box
                bg="white"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.200"
                shadow="sm"
                p={6}
            >

                <Heading
                    size="md"
                    mb={5}
                >
                    Today's Nutrition
                </Heading>

                <Alert
                    status="info"
                    borderRadius="lg"
                >
                    <AlertIcon />
                    No meals logged today.
                </Alert>

            </Box>

        );

    }

    return (

        <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            shadow="sm"
            p={6}
        >

            <Heading
                size="md"
                mb={6}
            >
                Today's Nutrition
            </Heading>

            <VStack spacing={5}>

                <NutritionRow
                    label="Calories"
                    consumed={client.today.consumed.calories}
                    target={profile.target_calories}
                />

                <NutritionRow
                    label="Protein"
                    consumed={client.today.consumed.protein}
                    target={profile.protein_target}
                />

                <NutritionRow
                    label="Carbs"
                    consumed={client.today.consumed.carbs}
                    target={profile.carbs_target}
                />

                <NutritionRow
                    label="Fats"
                    consumed={client.today.consumed.fats}
                    target={profile.fats_target}
                />

            </VStack>

        </Box>

    );

};

export default MyClientNutritionCard;