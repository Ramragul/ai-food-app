// Version 1

// import {
//     Button,
//     HStack,
//     Modal,
//     ModalBody,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Text,
//     VStack,
//     useToast
// } from "@chakra-ui/react";

// import {
//     leaveWorkspace
// } from "../../../services/client/workspace.service";

// interface Props {

//     isOpen: boolean;

//     onClose: () => void;

//     organizationName: string;

//     onSuccess: () => void;

// }

//  const LeaveWorkspaceDialog = ({

//     isOpen,

//     onClose,

//     organizationName,

//     onSuccess

// }: Props) => {

//     const toast =
//         useToast();

//     const handleLeave =
//         async () => {

//             try {

//                 await leaveWorkspace();

//                 toast({

//                     title:
//                         "Workspace left successfully.",

//                     status:
//                         "success"

//                 });

//                 onSuccess();

//             }

//             catch (err: any) {

//                 toast({

//                     title:
//                         err?.response?.data?.error ??
//                         "Unable to leave workspace.",

//                     status:
//                         "error"

//                 });

//             }

//         };

//     return (

//         <Modal

//             isOpen={isOpen}

//             onClose={onClose}

//             isCentered

//             size="lg"

//         >

//             <ModalOverlay />

//             <ModalContent
//                 borderRadius="3xl"
//             >

//                 <ModalHeader>

//                     Leave Workspace

//                 </ModalHeader>

//                 <ModalBody>

//                     <VStack
//                         spacing={5}
//                         align="stretch"
//                     >

//                         <Text
//                             color="gray.600"
//                         >

//                             Are you sure you want to leave

//                             <strong>

//                                 {" "}
//                                 {organizationName}

//                             </strong>

//                             ?

//                         </Text>

//                         <VStack
//                             align="start"
//                             spacing={3}
//                             bg="gray.50"
//                             p={5}
//                             borderRadius="2xl"
//                         >

//                             <Text>

//                                 You'll lose access to:

//                             </Text>

//                             <Text>
//                                 • Coach Updates
//                             </Text>

//                             <Text>
//                                 • Assigned Trainer
//                             </Text>

//                             <Text>
//                                 • Shared Goals
//                             </Text>

//                             <Text>
//                                 • Organization Insights
//                             </Text>

//                         </VStack>

//                         <Text
//                             color="gray.500"
//                             fontSize="sm"
//                         >

//                             Your NEKA account,

//                             nutrition history,

//                             meals,

//                             and personal health data

//                             will remain safe.

//                         </Text>

//                     </VStack>

//                 </ModalBody>

//                 <ModalFooter>

//                     <HStack>

//                         <Button
//                             variant="ghost"
//                             onClick={onClose}
//                         >

//                             Cancel

//                         </Button>

//                         <Button

//                             colorScheme="red"

//                             onClick={handleLeave}

//                         >

//                             Leave Workspace

//                         </Button>

//                     </HStack>

//                 </ModalFooter>

//             </ModalContent>

//         </Modal>

//     );

// };

// export default LeaveWorkspaceDialog;


// Version 2

import {
    Box,
    Button,
    Divider,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";

import {
    FiAlertTriangle,
    FiLogOut,
} from "react-icons/fi";

import {
    leaveWorkspace,
} from "../../../services/client/workspace.service";

interface Props {

    isOpen: boolean;

    onClose: () => void;

    organizationName: string;

    onSuccess: () => void;

}

const LeaveWorkspaceDialog = ({

    isOpen,

    onClose,

    organizationName,

    onSuccess,

}: Props) => {

    const toast =
        useToast();

    const handleLeave =
        async () => {

            try {

                await leaveWorkspace();

                toast({

                    title:
                        "Workspace left successfully.",

                    description:
                        "You can join this workspace again if invited.",

                    status:
                        "success",

                    duration: 3000,

                    isClosable: true,

                });

                onSuccess();

            }

            catch (err: any) {

                toast({

                    title:
                        err?.response?.data?.error ??
                        "Unable to leave workspace.",

                    status:
                        "error",

                    duration: 3000,

                    isClosable: true,

                });

            }

        };

    return (

        <Modal

            isOpen={isOpen}

            onClose={onClose}

            isCentered

            size="lg"

        >

            <ModalOverlay
                backdropFilter="blur(8px)"
            />

            <ModalContent
                borderRadius="32px"
                overflow="hidden"
            >

                <Box

                    bg="linear-gradient(135deg,#FFF5F5,#FFE5E5)"

                    py={8}

                    textAlign="center"

                >

                    <Icon

                        as={FiLogOut}

                        boxSize={14}

                        color="red.500"

                    />

                    <ModalHeader
                        pb={1}
                    >

                        Leave Workspace

                    </ModalHeader>

                    <Text
                        color="gray.600"
                        px={8}
                    >

                        Disconnect from

                        <strong>

                            {" "}
                            {organizationName}

                        </strong>

                    </Text>

                </Box>

                <ModalBody
                    py={6}
                >

                    <Box

                        bg="gray.50"

                        borderRadius="2xl"

                        p={5}

                    >

                        <HStack
                            mb={4}
                        >

                            <Icon

                                as={FiAlertTriangle}

                                color="orange.400"

                            />

                            <Text
                                fontWeight="700"
                            >

                                After leaving you'll lose access to

                            </Text>

                        </HStack>

                        <VStack

                            spacing={3}

                            align="stretch"

                        >

                            <Text>
                                👨‍🏫 Coach Updates
                            </Text>

                            <Text>
                                🎯 Assigned Trainer
                            </Text>

                            <Text>
                                🥗 Nutrition Collaboration
                            </Text>

                            <Text>
                                📊 Shared Progress
                            </Text>

                        </VStack>

                    </Box>

                    <Divider my={6} />

                    <Text

                        color="gray.600"

                        fontSize="sm"

                        lineHeight="tall"

                    >

                        Your <strong>NEKA account</strong>,
                        meals,
                        nutrition history,
                        progress,
                        and personal health data
                        will remain safe.

                        <br /><br />

                        If you're invited again,
                        you can rejoin this workspace anytime.

                    </Text>

                </ModalBody>

                <ModalFooter>

                    <HStack
                        w="100%"
                    >

                        <Button

                            flex={1}

                            variant="outline"

                            borderRadius="xl"

                            onClick={onClose}

                        >

                            Stay

                        </Button>

                        <Button

                            flex={1}

                            colorScheme="red"

                            borderRadius="xl"

                            leftIcon={<FiLogOut />}

                            onClick={handleLeave}

                        >

                            Leave Workspace

                        </Button>

                    </HStack>

                </ModalFooter>

            </ModalContent>

        </Modal>

    );

};

export default LeaveWorkspaceDialog;