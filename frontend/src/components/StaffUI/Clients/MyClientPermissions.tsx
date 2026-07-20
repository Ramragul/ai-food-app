import {
    Badge,
    Box,
    Heading,
    HStack,
    VStack,
    Text
} from "@chakra-ui/react";

import type {
    ClientDetails
} from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const PermissionRow = ({
    label,
    value
}: {
    label: string;
    value: boolean;
}) => (

    <HStack
        justify="space-between"
    >

        <Text>

            {label}

        </Text>

        <Badge
            colorScheme={
                value
                    ? "green"
                    : "red"
            }
        >

            {value
                ? "Allowed"
                : "Not Allowed"}

        </Badge>

    </HStack>

);

const MyClientPermissions = ({
    client
}: Props) => {

    const p = client.permissions;

    return (

        <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            p={6}
            shadow="sm"
        >

            <Heading
                size="md"
                mb={6}
            >
                Permissions
            </Heading>

            <VStack
                align="stretch"
                spacing={4}
            >

                <PermissionRow
                    label="View Profile"
                    value={p.can_view_profile}
                />

                <PermissionRow
                    label="View Nutrition"
                    value={p.can_view_nutrition}
                />

                <PermissionRow
                    label="Write Notes"
                    value={p.can_write_notes}
                />

                <PermissionRow
                    label="Create Goal"
                    value={p.can_create_goal}
                />

            </VStack>

        </Box>

    );

};

export default MyClientPermissions;