import {
    Avatar,
    Badge,
    Box,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";

import type { CoachUpdate } from "../../../types/client.types";

interface CoachUpdateDrawerProps {

    isOpen: boolean;

    onClose: () => void;

    update: CoachUpdate | null;

}

const CoachUpdateDrawer = ({
    isOpen,
    onClose,
    update,
}: CoachUpdateDrawerProps) => {

    if (!update) return null;

    return (

        <Drawer
            isOpen={isOpen}
            placement="bottom"
            size="lg"
            onClose={onClose}
        >

            <DrawerOverlay />

            <DrawerContent
                borderTopRadius="2xl"
            >

                <DrawerCloseButton />

                <DrawerHeader>

                    Coach Update

                </DrawerHeader>

                <DrawerBody
                    pb={8}
                >

                    <VStack
                        spacing={5}
                        align="stretch"
                    >

                        <HStack>

                            <Avatar
                                size="md"
                                name={update.coach_name}
                            />

                            <Box>

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

                            </Box>

                        </HStack>

                        <Divider />

                        <HStack
                            justify="space-between"
                        >

                            <Text
                                fontWeight="bold"
                                fontSize="lg"
                            >
                                {update.title}
                            </Text>

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

                        <Text
                            whiteSpace="pre-wrap"
                            lineHeight="tall"
                        >
                            {update.message}
                        </Text>

                        <Divider />

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            {new Date(update.created_at).toLocaleString()}
                        </Text>

                    </VStack>

                </DrawerBody>

            </DrawerContent>

        </Drawer>

    );

};

export default CoachUpdateDrawer;