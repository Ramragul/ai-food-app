// Version 1 : minimum ui design

// import {
//     Box,
//     Button,
//     HStack,
//     Text,
//     VStack,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// interface Props {
//     workspace: {
//         name: string;
//         organization_type: string;
//     };
// }

// const ClientWorkspaceCard = ({
//     workspace,
// }: Props) => {

//     const navigate = useNavigate();

//     return (

//         <Box
//             bg="white"
//             borderRadius="2xl"
//             p={5}
//             mb={5}
//             boxShadow="0 6px 25px rgba(0,0,0,0.05)"
//         >

//             <HStack justify="space-between">

//                 <VStack
//                     align="start"
//                     spacing={1}
//                 >

//                     <Text
//                         fontSize="lg"
//                         fontWeight="bold"
//                     >
//                         🏋️ {workspace.name}
//                     </Text>

//                     <Text
//                         fontSize="sm"
//                         color="gray.500"
//                     >
//                         Continue your coaching journey
//                     </Text>

//                 </VStack>

//                 <Button
//                     colorScheme="blue"
//                     borderRadius="xl"
//                     onClick={() =>
//                         navigate("/client/workspace")
//                     }
//                 >
//                     Open
//                 </Button>

//             </HStack>

//         </Box>

//     );

// };

// export default ClientWorkspaceCard;


// Version 2 : Enhanced UI Design

// import {
//     Box,
//     Button,
//     Flex,
//     HStack,
//     Icon,
//     SimpleGrid,
//     Text,
//     VStack,
// } from "@chakra-ui/react";
// import {
//     FiArrowRight,
//     FiMessageCircle,
//     FiTrendingUp,
//     FiActivity,
//     FiTarget,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// interface Props {
//     workspace: {
//         id: number;
//         name: string;
//         organization_type: string;
//         workspace_code: string;
//     };
// }

// const FEATURES = [
//     {
//         icon: FiMessageCircle,
//         label: "Coach Updates",
//     },
//     {
//         icon: FiActivity,
//         label: "Nutrition",
//     },
//     {
//         icon: FiTrendingUp,
//         label: "Progress",
//     },
//     {
//         icon: FiTarget,
//         label: "Goals",
//     },
// ];

// const ClientWorkspaceCard = ({
//     workspace,
// }: Props) => {

//     const navigate = useNavigate();

//     return (

//         <Box
//             position="relative"
//             overflow="hidden"
//             borderRadius="32px"
//             p={7}
//             mb={7}
//             bg="linear-gradient(135deg,#3B82F6 0%,#38BDF8 35%,#67E8F9 100%)"
//             boxShadow="
//                 0 25px 70px rgba(59,130,246,.28)
//             "
//             cursor="pointer"
//             transition=".35s"
//             _hover={{
//                 transform: "translateY(-4px)",
//                 boxShadow:
//                     "0 35px 80px rgba(59,130,246,.35)"
//             }}
//             onClick={() =>
//                 navigate("/client/workspace")
//             }
//         >

//             {/* Glow */}
//             <Box
//                 position="absolute"
//                 top="-90px"
//                 right="-70px"
//                 w="230px"
//                 h="230px"
//                 bg="rgba(255,255,255,.18)"
//                 borderRadius="full"
//                 filter="blur(20px)"
//             />

//             <Box
//                 position="absolute"
//                 bottom="-90px"
//                 left="-60px"
//                 w="180px"
//                 h="180px"
//                 bg="rgba(255,255,255,.12)"
//                 borderRadius="full"
//                 filter="blur(16px)"
//             />

//             {/* Frost layer */}

//             <Box
//                 position="relative"
//                 bg="rgba(255,255,255,.16)"
//                 backdropFilter="blur(24px)"
//                 border="1px solid rgba(255,255,255,.22)"
//                 borderRadius="28px"
//                 p={6}
//             >

//                 <Flex
//                     justify="space-between"
//                     align="start"
//                 >

//                     <VStack
//                         align="start"
//                         spacing={1}
//                     >

//                         <Text
//                             color="whiteAlpha.800"
//                             fontSize="xs"
//                             fontWeight="700"
//                             letterSpacing="2px"
//                         >
//                             CLIENT WORKSPACE
//                         </Text>

//                         <Text
//                             color="white"
//                             fontSize="3xl"
//                             fontWeight="900"
//                             lineHeight="1.1"
//                         >
//                             {workspace.name}
//                         </Text>

//                         <Text
//                             color="whiteAlpha.900"
//                             fontSize="md"
//                         >
//                             Your premium coaching hub
//                         </Text>

//                     </VStack>

//                     <Box
//                         fontSize="54px"
//                     >
//                         🏋️
//                     </Box>

//                 </Flex>

//                 <SimpleGrid
//                     columns={2}
//                     spacing={3}
//                     mt={8}
//                 >

//                     {FEATURES.map((item) => (

//                         <HStack
//                             key={item.label}
//                             bg="rgba(255,255,255,.20)"
//                             backdropFilter="blur(18px)"
//                             borderRadius="18px"
//                             p={3}
//                             border="1px solid rgba(255,255,255,.18)"
//                         >

//                             <Icon
//                                 as={item.icon}
//                                 color="white"
//                                 boxSize={5}
//                             />

//                             <Text
//                                 color="white"
//                                 fontWeight="600"
//                                 fontSize="sm"
//                             >
//                                 {item.label}
//                             </Text>

//                         </HStack>

//                     ))}

//                 </SimpleGrid>

//                 <Button
//                     mt={8}
//                     w="full"
//                     h="56px"
//                     borderRadius="18px"
//                     bg="white"
//                     color="#2563EB"
//                     fontWeight="800"
//                     fontSize="md"
//                     rightIcon={<FiArrowRight />}
//                     _hover={{
//                         bg: "whiteAlpha.900"
//                     }}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         navigate("/client/workspace");
//                     }}
//                 >
//                     Open Workspace
//                 </Button>

//             </Box>

//         </Box>

//     );

// };

// export default ClientWorkspaceCard;


// Version 3

// import {
//     Badge,
//     Box,
//     Button,
//     HStack,
//     Text,
//     VStack,
// } from "@chakra-ui/react";
// import { FiArrowRight } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// interface Props {
//     workspace: {
//         name: string;
//     };
// }

// export default function ClientWorkspaceCard({
//     workspace,
// }: Props) {

//     const navigate = useNavigate();

//     return (

//         <Box
//             mb={6}
//             position="relative"
//             overflow="hidden"
//             borderRadius="30px"
//             // bg="linear-gradient(135deg,#6D5EF9 0%,#A855F7 30%,#EC4899 65%,#F59E0B 100%)"
// // bg="linear-gradient(135deg,
// // #7DD3FC 0%,
// // #38BDF8 35%,
// // #0EA5E9 100%)"

// bg="
// linear-gradient(
// 135deg,
// #DFF6FF 0%,
// #B8ECFF 25%,
// #7DD3FC 55%,
// #38BDF8 100%
// )
// "
//             p={6}
//             boxShadow="0 20px 50px rgba(168,85,247,.28)"
//             transition=".3s"
//             _hover={{
//                 transform:"translateY(-2px)"
//             }}
//         >

//             {/* Glow */}

//             <Box
//                 position="absolute"
//                 top="-50px"
//                 right="-50px"
//                 w="140px"
//                 h="140px"
//                 bg="rgba(255,255,255,.18)"
//                 borderRadius="full"
//                 filter="blur(30px)"
//             />

//             <HStack
//                 align="center"
//                 justify="space-between"
//                 spacing={5}
//             >

//                 {/* LEFT */}

//                 <HStack
//                     spacing={5}
//                     align="center"
//                     flex={1}
//                 >

//                     <Box
//                         fontSize="58px"
//                     >
//                         🏋️
//                     </Box>

//                     <VStack
//                         align="start"
//                         spacing={2}
//                     >

//                         <Badge
//                             colorScheme="whiteAlpha"
//                             px={3}
//                             py={1}
//                             borderRadius="full"
//                             fontSize="10px"
//                         >
//                             CLIENT WORKSPACE
//                         </Badge>

//                         <Text
//                             color="white"
//                             fontWeight="900"
//                             fontSize="2xl"
//                             lineHeight="1"
//                         >
//                             {workspace.name}
//                         </Text>

//                         <Text
//                             color="whiteAlpha.900"
//                             fontSize="sm"
//                         >
//                             Your coaching journey starts here.
//                         </Text>

//                         <HStack
//                             spacing={2}
//                             pt={1}
//                             flexWrap="wrap"
//                         >

//                             <Badge
//                                 bg="rgba(255,255,255,.22)"
//                                 color="white"
//                                 borderRadius="full"
//                                 px={3}
//                                 py={1}
//                             >
//                                 📝 Updates
//                             </Badge>

//                             <Badge
//                                 bg="rgba(255,255,255,.22)"
//                                 color="white"
//                                 borderRadius="full"
//                                 px={3}
//                                 py={1}
//                             >
//                                 📈 Progress
//                             </Badge>

//                             <Badge
//                                 bg="rgba(255,255,255,.22)"
//                                 color="white"
//                                 borderRadius="full"
//                                 px={3}
//                                 py={1}
//                             >
//                                 🥗 Nutrition
//                             </Badge>

//                         </HStack>

//                     </VStack>

//                 </HStack>

//             </HStack>

//             <Button
//                 mt={5}
//                 w="full"
//                 bg="white"
//                 color="#7C3AED"
//                 borderRadius="16px"
//                 h="50px"
//                 fontWeight="800"
//                 rightIcon={<FiArrowRight />}
//                 _hover={{
//                     bg:"gray.100"
//                 }}
//                 onClick={() =>
//                     navigate("/client/workspace")
//                 }
//             >
//                 Open Workspace
//             </Button>

//         </Box>

//     );

// }



// Version 4

import {
    Badge,
    Box,
    Button,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Props {
    workspace: {
        name: string;
    };
}

export default function ClientWorkspaceCard({
    workspace,
}: Props) {

    const navigate = useNavigate();

    return (

        <Box
            mb={6}
            position="relative"
            overflow="hidden"
            borderRadius="30px"
            bg="
                linear-gradient(
                    135deg,
                    #DFF6FF 0%,
                    #C9F1FF 20%,
                    #A9E8FF 45%,
                    #7DD3FC 70%,
                    #38BDF8 100%
                )
            "
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.600"
            boxShadow="0 18px 45px rgba(56,189,248,.22)"
            transition="all .3s ease"
            _hover={{
                transform: "translateY(-3px)",
                boxShadow:
                    "0 25px 60px rgba(56,189,248,.30)"
            }}
        >

            {/* Top Glow */}

            <Box
                position="absolute"
                top="-40px"
                right="-30px"
                w="140px"
                h="140px"
                bg="whiteAlpha.400"
                borderRadius="full"
                filter="blur(60px)"
            />

            {/* Bottom Glow */}

            <Box
                position="absolute"
                bottom="-60px"
                left="-40px"
                w="120px"
                h="120px"
                bg="whiteAlpha.300"
                borderRadius="full"
                filter="blur(50px)"
            />

            <HStack
                justify="space-between"
                align="center"
                spacing={5}
            >

                <HStack
                    spacing={5}
                    align="center"
                    flex={1}
                >

                    <Box
                        fontSize="56px"
                    >
                        🏋️
                    </Box>

                    <VStack
                        align="start"
                        spacing={2}
                    >

                        <Badge
                            bg="whiteAlpha.700"
                            color="blue.700"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="10px"
                            fontWeight="700"
                        >
                            CLIENT WORKSPACE
                        </Badge>

                        <Text
                            color="gray.900"
                            fontWeight="900"
                            fontSize="2xl"
                            lineHeight="1"
                        >
                            {workspace.name}
                        </Text>

                        <Text
                            color="gray.700"
                            fontSize="sm"
                            fontWeight="500"
                        >
                            Your premium coaching workspace
                        </Text>

                        <HStack
                            spacing={2}
                            pt={2}
                            flexWrap="wrap"
                        >

                            <Badge
                                bg="whiteAlpha.700"
                                color="gray.800"
                                borderRadius="full"
                                px={3}
                                py={1}
                                border="1px solid"
                                borderColor="whiteAlpha.700"
                            >
                                📝 Updates
                            </Badge>

                            <Badge
                                bg="whiteAlpha.700"
                                color="gray.800"
                                borderRadius="full"
                                px={3}
                                py={1}
                                border="1px solid"
                                borderColor="whiteAlpha.700"
                            >
                                📈 Progress
                            </Badge>

                            <Badge
                                bg="whiteAlpha.700"
                                color="gray.800"
                                borderRadius="full"
                                px={3}
                                py={1}
                                border="1px solid"
                                borderColor="whiteAlpha.700"
                            >
                                🥗 Nutrition
                            </Badge>

                        </HStack>

                    </VStack>

                </HStack>

            </HStack>

            <Button
                mt={5}
                w="full"
                h="52px"
                bg="whiteAlpha.900"
                color="blue.700"
                borderRadius="18px"
                fontWeight="800"
                fontSize="md"
                backdropFilter="blur(20px)"
                rightIcon={<FiArrowRight />}
                transition=".2s"
                _hover={{
                    bg: "white",
                    transform: "translateY(-1px)"
                }}
                onClick={() =>
                    navigate("/client/workspace")
                }
            >
                Open Workspace
            </Button>

        </Box>

    );

}