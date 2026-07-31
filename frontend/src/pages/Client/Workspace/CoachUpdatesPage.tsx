// import {
//     Box,
//     Heading,
//     Icon,
//     Spinner,
//     Text,
//     VStack,
//     useToast,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// import CoachUpdateCard from "../../../components/ClientUI/Workspace/CoachUpdateCard";
// import CoachUpdateDrawer from "../../../components/ClientUI/Workspace/CoachUpdateDrawer";
// import {
//     getCoachUpdates,
//     // markAsRead,
// } from "../../../services/client/coachUpdates.service";
// import type { CoachUpdate } from "../../../types/client.types";
// import { FiMessageCircle } from "react-icons/fi";

// const CoachUpdatesPage = () => {

//     const toast = useToast();

//     const [loading, setLoading] = useState(true);

//     const [updates, setUpdates] = useState<CoachUpdate[]>([]);

//     const [selectedUpdate, setSelectedUpdate] =
//         useState<CoachUpdate | null>(null);

//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         loadUpdates();
//     }, []);

//     const loadUpdates = async () => {

//         try {

//             const data = await getCoachUpdates();

//             setUpdates(data);

//         } catch {

//             toast({
//                 title: "Unable to load updates.",
//                 status: "error",
//             });

//         } finally {

//             setLoading(false);

//         }

//     };

//     const openUpdate = async (update: CoachUpdate) => {

//         setSelectedUpdate(update);

//         setIsOpen(true);

//         // if (!update.is_read) {

//         //     await markAsRead(update.id);

//         //     setUpdates(prev =>
//         //         prev.map(item =>
//         //             item.id === update.id
//         //                 ? { ...item, is_read: true }
//         //                 : item
//         //         )
//         //     );

//         // }

//     };

//     if (loading) {

//         return (
//             <Box
//                 display="flex"
//                 justifyContent="center"
//                 mt={20}
//             >
//                 <Spinner size="xl" />
//             </Box>
//         );

//     }

//     return (

//         <Box p={5}>

//         <VStack
//             align="stretch"
//             spacing={1}
//             mb={6}
//         >

//             <Heading size="lg">
//                 Coach Updates
//             </Heading>

//             <Text color="gray.500">
//                 Advice and guidance shared by your coaches.
//             </Text>

//         </VStack>

//             {updates.length === 0 ? (

//                 <Box
//                     py={16}
//                     textAlign="center"
//                 >

//                 <VStack
//                     py={20}
//                     spacing={4}
//                 >

//                     <Icon
//                         as={FiMessageCircle}
//                         boxSize={14}
//                         color="gray.300"
//                     />

//                     <Heading
//                         size="md"
//                     >
//                         No Coach Updates
//                     </Heading>

//                     <Text
//                         color="gray.500"
//                         textAlign="center"
//                     >
//                         Your coach hasn't shared any updates yet.
//                     </Text>

//                 </VStack>

//                     <Text
//                         color="gray.500"
//                         mt={2}
//                     >
//                         Your coach hasn't shared any updates.
//                     </Text>

//                 </Box>

//             ) : (

//                 <VStack
//                     spacing={4}
//                     align="stretch"
//                 >

//                     {updates.map(update => (

//                         <CoachUpdateCard
//                             key={update.id}
//                             update={update}
//                             onClick={() =>
//                                 openUpdate(update)
//                             }
//                         />

//                     ))}

//                 </VStack>

//             )}

//             <CoachUpdateDrawer
//                 isOpen={isOpen}
//                 onClose={() => {
//                     setSelectedUpdate(null);
//                     setIsOpen(false);
//                 }}
//                 update={selectedUpdate}
//             />

//         </Box>

//     );

// };

// export default CoachUpdatesPage;



// Version 2

import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Spinner,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";

import CoachUpdateCard from "../../../components/ClientUI/Workspace/CoachUpdateCard";
import CoachUpdateDrawer from "../../../components/ClientUI/Workspace/CoachUpdateDrawer";
import { getCoachUpdates } from "../../../services/client/coachUpdates.service";
import type { CoachUpdate } from "../../../types/client.types";

const CoachUpdatesPage = () => {

    const navigate = useNavigate();

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
                title: "Unable to load coach updates.",
                status: "error",
                isClosable: true,
            });

        } finally {

            setLoading(false);

        }

    };

    const openUpdate = (update: CoachUpdate) => {

        setSelectedUpdate(update);

        setIsOpen(true);

    };

    if (loading) {

        return (

            <Flex
                h="60vh"
                align="center"
                justify="center"
            >

                <Spinner
                    size="xl"
                    thickness="4px"
                />

            </Flex>

        );

    }

    return (

        <Box
            p={5}
            maxW="900px"
            mx="auto"
        >

            <HStack
                spacing={3}
                mb={6}
                align="start"
            >

                <IconButton
                    aria-label="Go Back"
                    icon={<FiArrowLeft />}
                    variant="ghost"
                    borderRadius="full"
                    onClick={() => navigate(-1)}
                />

                <Box flex={1}>

                    <Heading size="lg">
                        Coach Updates
                    </Heading>

                    <Text
                        mt={1}
                        color="gray.500"
                    >
                        Advice and guidance shared by your coaches.
                    </Text>

                </Box>

            </HStack>

            {updates.length === 0 ? (

                <VStack
                    py={24}
                    spacing={5}
                >

                    <Icon
                        as={FiMessageCircle}
                        boxSize={14}
                        color="gray.300"
                    />

                    <Heading
                        size="md"
                    >
                        No Coach Updates
                    </Heading>

                    <Text
                        color="gray.500"
                        textAlign="center"
                        maxW="400px"
                    >
                        Your coaches haven't shared any updates yet.
                        Check back later for personalized guidance.
                    </Text>

                </VStack>

            ) : (

                <VStack
                    spacing={5}
                    align="stretch"
                >

                    {updates.map((update) => (

                        <CoachUpdateCard
                            key={update.id}
                            update={update}
                            onClick={() => openUpdate(update)}
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