import {
    Box,
    Heading,
    Spinner,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CoachUpdateCard from "../../../components/ClientUI/Workspace/CoachUpdateCard";
import CoachUpdateDrawer from "../../../components/ClientUI/Workspace/CoachUpdateDrawer";
import {
    getCoachUpdates,
    markAsRead,
} from "../../../services/client/coachUpdates.service";
import type { CoachUpdate } from "../../../types/client.types";

const CoachUpdatesPage = () => {

    const toast = useToast();

    const [loading, setLoading] = useState(true);

    const [updates, setUpdates] = useState<CoachUpdate[]>([]);

    const [selectedUpdate, setSelectedUpdate] =
        useState<CoachUpdate | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        loadUpdates();
    }, []);

    const loadUpdates = async () => {

        try {

            const data = await getCoachUpdates();

            setUpdates(data);

        } catch {

            toast({
                title: "Unable to load updates.",
                status: "error",
            });

        } finally {

            setLoading(false);

        }

    };

    const openUpdate = async (update: CoachUpdate) => {

        setSelectedUpdate(update);

        setIsOpen(true);

        if (!update.is_read) {

            await markAsRead(update.id);

            setUpdates(prev =>
                prev.map(item =>
                    item.id === update.id
                        ? { ...item, is_read: true }
                        : item
                )
            );

        }

    };

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={20}
            >
                <Spinner size="xl" />
            </Box>
        );

    }

    return (

        <Box p={5}>

            <Heading size="lg" mb={6}>
                Coach Updates
            </Heading>

            {updates.length === 0 ? (

                <Box
                    py={16}
                    textAlign="center"
                >

                    <Text
                        fontSize="lg"
                        fontWeight="600"
                    >
                        No updates yet
                    </Text>

                    <Text
                        color="gray.500"
                        mt={2}
                    >
                        Your coach hasn't shared any updates.
                    </Text>

                </Box>

            ) : (

                <VStack
                    spacing={4}
                    align="stretch"
                >

                    {updates.map(update => (

                        <CoachUpdateCard
                            key={update.id}
                            update={update}
                            onClick={() =>
                                openUpdate(update)
                            }
                        />

                    ))}

                </VStack>

            )}

            <CoachUpdateDrawer
                isOpen={isOpen}
                onClose={() => {
                    setSelectedUpdate(null);
                    setIsOpen(false);
                }}
                update={selectedUpdate}
            />

        </Box>

    );

};

export default CoachUpdatesPage;