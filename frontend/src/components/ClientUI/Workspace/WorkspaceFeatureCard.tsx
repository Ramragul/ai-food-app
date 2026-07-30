import {
    Box,
    HStack,
    Icon,
    Text,
    VStack
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import type { IconType } from "react-icons";

interface Props {

    title: string;

    description: string;

    icon: IconType;

    onClick: () => void;

}

const WorkspaceFeatureCard = ({
    title,
    description,
    icon,
    onClick
}: Props) => (

    <Box
        bg="white"
        p={5}
        rounded="xl"
        shadow="sm"
        border="1px solid"
        borderColor="gray.100"
        cursor="pointer"
        onClick={onClick}
    >

        <HStack justify="space-between">

            <HStack spacing={4}>

                <Icon
                    as={icon}
                    boxSize={6}
                    color="blue.500"
                />

                <VStack
                    align="start"
                    spacing={0}
                >

                    <Text fontWeight="bold">
                        {title}
                    </Text>

                    <Text
                        color="gray.500"
                        fontSize="sm"
                    >
                        {description}
                    </Text>

                </VStack>

            </HStack>

            <ChevronRightIcon boxSize={6} />

        </HStack>

    </Box>

);

export default WorkspaceFeatureCard;