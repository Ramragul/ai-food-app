import {
    Badge,
    Box,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";

import { FiBriefcase } from "react-icons/fi";

interface OrganizationCardProps {

    organizationName: string;

    organizationType: string;

    granted: boolean;

    onClick?: () => void;

}

const OrganizationCard = ({
    organizationName,
    organizationType,
    granted,
    onClick
}: OrganizationCardProps) => {

    return (

        <Box
            bg="white"
            borderRadius="xl"
            p={5}
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            cursor={onClick ? "pointer" : "default"}
            onClick={onClick}
        >

            <HStack
                justify="space-between"
                align="start"
            >

                <HStack
                    spacing={4}
                >

                    <FiBriefcase size={22} />

                    <VStack
                        align="start"
                        spacing={0}
                    >

                        <Text
                            fontWeight="bold"
                        >
                            {organizationName}
                        </Text>

                        <Text
                            color="gray.500"
                            fontSize="sm"
                        >
                            {organizationType}
                        </Text>

                    </VStack>

                </HStack>

                <Badge
                    colorScheme={
                        granted
                            ? "green"
                            : "orange"
                    }
                >
                    {
                        granted
                            ? "Granted"
                            : "Consent Required"
                    }
                </Badge>

            </HStack>

        </Box>

    );

};

export default OrganizationCard;