import {
    Badge,
    Box,
    Divider,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";

import type { CoachUpdate } from "../../../types/client.types";

interface CoachUpdateCardProps {

    update: CoachUpdate;

    onClick: () => void;

}

const CoachUpdateCard = ({
    update,
    onClick,
}: CoachUpdateCardProps) => {

    return (

        <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            cursor="pointer"
            transition="0.2s"
            _hover={{
                shadow: "md",
                transform: "translateY(-2px)",
            }}
            onClick={onClick}
        >

            <HStack
                justify="space-between"
                align="start"
                mb={3}
            >

                <HStack
                    spacing={3}
                    align="start"
                >

                    <Icon
                        as={FiUser}
                        boxSize={6}
                        color="blue.500"
                    />

                    <VStack
                        align="start"
                        spacing={0}
                    >

                        <Text
                            fontWeight="bold"
                        >
                            {update.coach_name}
                        </Text>

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            {update.coach_role}
                        </Text>

                    </VStack>

                </HStack>

                <Badge
                    colorScheme={
                        update.is_read
                            ? "gray"
                            : "blue"
                    }
                >
                    {update.is_read ? "Read" : "New"}
                </Badge>

            </HStack>

            <Divider mb={3} />

            <Text
                fontWeight="600"
                mb={2}
            >
                {update.title}
            </Text>

            <Text
                color="gray.600"
                noOfLines={2}
            >
                {update.message}
            </Text>

            <Text
                mt={4}
                fontSize="xs"
                color="gray.400"
            >
                {new Date(update.created_at).toLocaleString()}
            </Text>

        </Box>

    );

};

export default CoachUpdateCard;