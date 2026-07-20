import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react";

import { useState } from "react";

import type {
    ClientDetails
} from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const MyClientCoachNotes = ({
    client
}: Props) => {

    const [note, setNote] = useState("");

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
                mb={5}
            >
                Coach Notes
            </Heading>

            <Textarea
                placeholder="Write a note about today's consultation..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                resize="vertical"
                minH="120px"
            />

            <HStack
                justify="flex-end"
                mt={4}
            >

                <Button
                    colorScheme="brand"
                    isDisabled
                >
                    Save Note
                </Button>

            </HStack>

            <Divider my={6} />

            <VStack
                align="stretch"
                spacing={4}
            >

                {client.coach_notes.length === 0 ? (

                    <Text
                        color="gray.500"
                    >
                        No coach notes yet.
                    </Text>

                ) : (

                    client.coach_notes.map(note => (

                        <Box
                            key={note.id}
                            p={4}
                            bg="gray.50"
                            borderRadius="lg"
                        >

                            <Text
                                fontWeight="600"
                                mb={2}
                            >
                                {new Date(note.created_at).toLocaleDateString()}
                            </Text>

                            <Text>

                                {note.note}

                            </Text>

                        </Box>

                    ))

                )}

            </VStack>

        </Box>

    );

};

export default MyClientCoachNotes;