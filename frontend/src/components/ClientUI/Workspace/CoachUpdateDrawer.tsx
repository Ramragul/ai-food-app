// Version 1

// import {
//     Avatar,
//     Badge,
//     Box,
//     Divider,
//     Drawer,
//     DrawerBody,
//     DrawerCloseButton,
//     DrawerContent,
//     DrawerHeader,
//     DrawerOverlay,
//     Heading,
//     HStack,
//     Text,
//     VStack,
// } from "@chakra-ui/react";




// import type { CoachUpdate } from "../../../types/client.types";
// import { formatDate } from "../../../utils/date";
// import { getCategoryColor } from "../../../utils/coachNotes";

// interface CoachUpdateDrawerProps {

//     isOpen: boolean;

//     onClose: () => void;

//     update: CoachUpdate | null;

// }

// const CoachUpdateDrawer = ({
//     isOpen,
//     onClose,
//     update,
// }: CoachUpdateDrawerProps) => {

//     if (!update) return null;

//     return (

//         <Drawer
//             isOpen={isOpen}
//             placement="bottom"
//             size="lg"
//             onClose={onClose}
//         >

//             <DrawerOverlay />

//             <DrawerContent
//                 borderTopRadius="2xl"
//             >

//                 <DrawerCloseButton />

//                 <DrawerHeader>

//                     Coach Update

//                 </DrawerHeader>

//                 <DrawerBody
//                     pb={8}
//                 >

// <VStack
//     align="stretch"
//     spacing={5}
// >

//     <Badge
//         alignSelf="start"
//         colorScheme={getCategoryColor(update.category)}
//     >
//         {update.category}
//     </Badge>

//     <Heading size="md">
//         {update.title}
//     </Heading>

//     <Text
//         color="gray.600"
//     >
//         {update.organization_name}
//     </Text>

//     <Divider />

//     <HStack>

//         <Avatar
//             size="sm"
//             name={update.coach_name}
//         />

//         <Box>

//             <Text fontWeight="bold">
//                 {update.coach_name}
//             </Text>

//             <Text
//                 fontSize="sm"
//                 color="gray.500"
//             >
//                 Coach
//             </Text>

//         </Box>

//     </HStack>

//     <Text
//         lineHeight="2"
//         whiteSpace="pre-wrap"
//     >
//         {update.note}
//     </Text>

//     <Divider />

//     <Text
//         fontSize="sm"
//         color="gray.500"
//     >
//         {formatDate(update.created_at)}
//     </Text>

// </VStack>

//                 </DrawerBody>

//             </DrawerContent>

//         </Drawer>

//     );

// };

// export default CoachUpdateDrawer;


// Version 2

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
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";

import type { CoachUpdate } from "../../../types/client.types";
import { formatDate } from "../../../utils/date";
import { getCategoryColor } from "../../../utils/coachNotes";

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

            <DrawerContent borderTopRadius="3xl">

                <DrawerCloseButton />

                <DrawerHeader>
                    Coach Update
                </DrawerHeader>

                <DrawerBody pb={8}>

                    <VStack
                        align="stretch"
                        spacing={6}
                    >

                        {/* Organization */}

                        <HStack align="start" spacing={4}>

                            <Avatar
                                size="lg"
                                name={update.organization_name}
                            />

                            <Box flex="1">

                                <Text
                                    fontSize="lg"
                                    fontWeight="bold"
                                >
                                    {update.organization_name}
                                </Text>

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    Coach • {update.coach_name}
                                </Text>

                            </Box>

                        </HStack>

                        {/* Category */}

                        <Badge
                            alignSelf="flex-start"
                            colorScheme={getCategoryColor(update.category)}
                            borderRadius="full"
                            px={3}
                            py={1}
                        >
                            {update.category}
                        </Badge>

                        {/* Title */}

                        <Heading size="md">
                            {update.title}
                        </Heading>

                        <Divider />

                        {/* Message */}

                        <Text
                            fontSize="md"
                            lineHeight="2"
                            whiteSpace="pre-wrap"
                        >
                            {update.note}
                        </Text>

                        <Divider />

                        {/* Footer */}

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            {formatDate(update.created_at)}
                        </Text>

                    </VStack>

                </DrawerBody>

            </DrawerContent>

        </Drawer>
    );
};

export default CoachUpdateDrawer;