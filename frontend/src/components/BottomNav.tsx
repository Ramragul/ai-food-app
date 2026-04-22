// Version 1

// import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiHome,
//   FiPlusCircle,
//   FiTarget,
//   FiActivity
// } from "react-icons/fi";
// import { useLocation, useNavigate } from "react-router-dom";
// import type { IconType } from "react-icons";

// const MotionBox = motion(Box);

// type Tab = {
//   name: string;
//   icon: IconType;
//   path: string;
// };

// const tabs: Tab[] = [
//   { name: "Home", icon: FiHome, path: "/home" },
//   { name: "Add", icon: FiPlusCircle, path: "/add-meal" },
//   { name: "Goal", icon: FiTarget, path: "/goal-setup" },
//   { name: "Track", icon: FiActivity, path: "/track-meal" }
// ];

// const BottomNav: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <Box
//       position="fixed"
//       bottom={0}
//       left={0}
//       right={0}
//       bg="rgba(255,255,255,0.9)"
//       backdropFilter="blur(12px)"
//       borderTop="1px solid rgba(0,0,0,0.05)"
//       py={2}
//       zIndex={100}
//     >
//       {/* <Box
//   position="fixed"
//   bottom="10px"
//   left="50%"
//   transform="translateX(-50%)"
//   w="90%"
//   maxW="420px"
//   bg="rgba(255,255,255,0.7)"
//   backdropFilter="blur(20px)"
//   borderRadius="2xl"
//   boxShadow="0 10px 30px rgba(0,0,0,0.1)"
//   py={2}
// > */}
//       <HStack justify="space-around">
//         {tabs.map((tab) => {
//           const isActive = location.pathname === tab.path;

//           return (
//             <VStack
//               key={tab.path}
//               spacing={1}
//               cursor="pointer"
//               onClick={() => navigate(tab.path)}
//               position="relative"
//             >
//               {/* 🔥 ACTIVE PILL */}
//               {isActive && (
//                 <MotionBox
//                   layoutId="active-pill"
//                   position="absolute"
//                   top="-6px"
//                   w="40px"
//                   h="40px"
//                   borderRadius="full"
//                   bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//                   zIndex={-1}
//                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                 />
//               )}

//               <MotionBox
//                 whileTap={{ scale: 0.85 }}
//                 color={isActive ? "white" : "gray.500"}
//               >
//                 <Icon as={tab.icon} boxSize={5} />
//               </MotionBox>

//               <Text
//                 fontSize="xs"
//                 color={isActive ? "blue.500" : "gray.500"}
//               >
//                 {tab.name}
//               </Text>
//             </VStack>
//           );
//         })}
//       </HStack>
//     </Box>
//   );
// };

// export default BottomNav;


// Version 2 

import {
  Box,
  HStack,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiPlusCircle,
  FiTarget,
  FiActivity
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

type Tab = {
  name: string;
  icon: IconType;
  path: string;
};

const tabs: Tab[] = [
  { name: "Home", icon: FiHome, path: "/home" },
  { name: "Add", icon: FiPlusCircle, path: "/add-meal" },
  { name: "Goal", icon: FiTarget, path: "/goal-setup" },
  { name: "Track", icon: FiActivity, path: "/track-meal" }
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      position="fixed"
      bottom="14px"
      left="50%"
      transform="translateX(-50%)"
      w="92%"
      maxW="420px"
      bg="rgba(255,255,255,0.75)"
      backdropFilter="blur(20px)"
      borderRadius="2xl"
      boxShadow="0 20px 40px rgba(0,0,0,0.08)"
      border="1px solid rgba(0,0,0,0.04)"
      py={2}
      px={2}
      zIndex={100}
    >
      <HStack justify="space-between">

        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <MotionVStack
              key={tab.path}
              spacing={0}
              cursor="pointer"
              flex={1}
              onClick={() => navigate(tab.path)}
              initial={false}
              animate={{
                y: isActive ? -4 : 0
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* 🔥 ICON CONTAINER */}
              <MotionBox
                position="relative"
                w="42px"
                h="42px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                bg={isActive ? "rgba(0,191,255,0.12)" : "transparent"}
                boxShadow={
                  isActive
                    ? "0 0 12px rgba(0,191,255,0.25)"
                    : "none"
                }
                transition="all 0.25s ease"
              >
                <Icon
                  as={tab.icon}
                  boxSize={5}
                  color={isActive ? "blue.500" : "gray.500"}
                />
              </MotionBox>

              {/* 🔥 LABEL */}
              <MotionBox
                mt="2px"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1 : 0.9
                }}
                transition={{ duration: 0.2 }}
              >
                <Text
                  fontSize="10px"
                  fontWeight={isActive ? "600" : "500"}
                  color={isActive ? "blue.500" : "gray.400"}
                >
                  {tab.name}
                </Text>
              </MotionBox>
            </MotionVStack>
          );
        })}

      </HStack>
    </Box>
  );
};

export default BottomNav;