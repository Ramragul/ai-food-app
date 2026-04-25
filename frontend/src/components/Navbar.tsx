// Version 1

// import {
//     Box,
//     HStack,
//     Text,
//     Avatar,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem
//   } from "@chakra-ui/react";
//   import { useAuth } from "../context/AuthContext";
//   import { useNavigate } from "react-router-dom";
  
//   const Navbar = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
  
//     const handleLogout = () => {
//       logout();
//       navigate("/");
//     };
  
//     return (
//       <Box
//         bg="white"
//         px={6}
//         py={3}
//         boxShadow="sm"
//         position="sticky"
//         top={0}
//         zIndex={10}
//       >
//         <HStack justify="space-between">
  
//           {/* 🔥 LEFT */}
//           <Text fontWeight="bold" fontSize="lg" color="brand.600">
//             Cotton Candy Health 💙
//           </Text>
  
//           {/* 🔥 RIGHT */}
//           <Menu>
//             {/* <MenuButton>
//               <Avatar size="sm" name={user?.name}/>
//             </MenuButton> */}

//             <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name}
//               bg="brand.300"
//               color="gray.800"
//               fontWeight="bold"
//             />
//           </MenuButton>
  
//             <MenuList borderRadius="xl">
  
//               <MenuItem onClick={() => navigate("/home")}>
//                 🏠 Home
//               </MenuItem>

//               <MenuItem onClick={() => navigate("/add-meal")}>
//                 🍔 Add Meal
//               </MenuItem>
  
//               <MenuItem onClick={() => navigate("/goal-setup")}>
//                 🎯 My Goal
//               </MenuItem>
  
//               <MenuItem onClick={() => navigate("/track-meal")}>
//                 📊 My Day
//               </MenuItem>
  
//               <MenuItem color="red.500" onClick={handleLogout}>
//                 🚪 Logout
//               </MenuItem>
  
//             </MenuList>
//           </Menu>
  
//         </HStack>
//       </Box>
//     );
//   };
  
//   export default Navbar;



// Version 2 : Restaurant / Home Mode

// import {
//   Box,
//   HStack,
//   Text,
//   Avatar,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Button
// } from "@chakra-ui/react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <Box
//       bg="white"
//       px={6}
//       py={3}
//       boxShadow="sm"
//       position="sticky"
//       top={0}
//       zIndex={10}
//     >
//       <HStack justify="space-between">

//         {/* LEFT */}
//         <Text fontWeight="bold" fontSize="lg" color="brand.600">
//           Cotton Candy Health 💙
//         </Text>

//         {/* 🔥 MODE TOGGLE */}
//         <HStack
//           bg="gray.100"
//           borderRadius="xl"
//           p="3px"
//         >
//           <Button
//             size="sm"
//             borderRadius="lg"
//             bg={mode === "restaurant" ? "white" : "transparent"}
//             boxShadow={mode === "restaurant" ? "sm" : "none"}
//             onClick={() => setMode("restaurant")}
//           >
//             🍽 Restaurant
//           </Button>

//           <Button
//             size="sm"
//             borderRadius="lg"
//             bg={mode === "home" ? "white" : "transparent"}
//             boxShadow={mode === "home" ? "sm" : "none"}
//             onClick={() => setMode("home")}
//           >
//             🏠 Home
//           </Button>
//         </HStack>

//         {/* RIGHT */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name}
//               bg="brand.300"
//               color="gray.800"
//             />
//           </MenuButton>

//           <MenuList borderRadius="xl">
//             <MenuItem onClick={() => navigate("/home")}>🏠 Home</MenuItem>
//             <MenuItem onClick={() => navigate("/add-meal")}>🍔 Add Meal</MenuItem>
//             <MenuItem onClick={() => navigate("/goal-setup")}>🎯 My Goal</MenuItem>
//             <MenuItem onClick={() => navigate("/track-meal")}>📊 My Day</MenuItem>
//             <MenuItem color="red.500" onClick={handleLogout}>🚪 Logout</MenuItem>
//           </MenuList>
//         </Menu>

//       </HStack>
//     </Box>
//   );
// };

// export default Navbar;



// Version 3 : Design Enhancement to v2

// import {
//   Box,
//   HStack,
//   Text,
//   Avatar,
//   Button,
//   Flex,
//   Icon,
//   VStack,
//   useDisclosure,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerBody,
//   DrawerHeader,
//   DrawerCloseButton,
//   Divider
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiHome,
//   FiTarget,
//   FiLogOut,
//   FiPlusCircle,
//   FiActivity
// } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";

// const MotionBox = motion(Box);

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <>
//       <MotionBox
//         px={{ base: 4, md: 8 }}
//         py={3}
//         position="sticky"
//         top={0}
//         zIndex={100}
//         backdropFilter="blur(16px)"
//         bg="rgba(255,255,255,0.75)"
//         borderBottom="1px solid rgba(255,255,255,0.3)"
//         boxShadow="0 8px 32px rgba(0,0,0,0.06)"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <Flex align="center" justify="space-between">

//           {/* 🔥 BRAND */}
//           <HStack spacing={3} onClick={() => navigate("/home")} cursor="pointer">
//             <Box
//               w="38px"
//               h="38px"
//               borderRadius="full"
//               bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               fontWeight="bold"
//               color="white"
//               fontSize="lg"
//               boxShadow="lg"
//             >
//               N
//             </Box>

//             <VStack spacing={0} align="start">
//               <Text
//                 fontWeight="bold"
//                 fontSize="lg"
//                 bgGradient="linear(to-r, blue.400, cyan.400)"
//                 bgClip="text"
//               >
//                 NEKA
//               </Text>
//               <Text fontSize="xs" color="gray.500">
//                 Smart Nutrition
//               </Text>
//             </VStack>
//           </HStack>

//           {/* 🚀 MODE SWITCH */}
//           <HStack
//             bg="rgba(255,255,255,0.6)"
//             borderRadius="full"
//             p="4px"
//             boxShadow="inner"
//           >
//             <Button
//               size="sm"
//               borderRadius="full"
//               px={4}
//               bg={mode === "restaurant" ? "blue.400" : "transparent"}
//               color={mode === "restaurant" ? "white" : "gray.600"}
//               onClick={() => setMode("restaurant")}
//             >
//               🍽
//             </Button>

//             <Button
//               size="sm"
//               borderRadius="full"
//               px={4}
//               bg={mode === "home" ? "cyan.400" : "transparent"}
//               color={mode === "home" ? "white" : "gray.600"}
//               onClick={() => setMode("home")}
//             >
//               🏠
//             </Button>
//           </HStack>

//           {/* 👤 AVATAR */}
//           <Avatar
//             size="sm"
//             name={user?.name}
//             bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//             color="white"
//             cursor="pointer"
//             onClick={onOpen}
//           />
//         </Flex>
//       </MotionBox>

//       {/* 🔥 MOBILE-FIRST MENU (BOTTOM SHEET) */}
//       <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent borderTopRadius="2xl">

//           <DrawerCloseButton />

//           <DrawerHeader>
//             <HStack>
//               <Avatar size="sm" name={user?.name} />
//               <Text fontWeight="bold">{user?.name}</Text>
//             </HStack>
//           </DrawerHeader>

//           <DrawerBody pb={6}>
//             <VStack spacing={3} align="stretch">

//               <Button
//                 leftIcon={<Icon as={FiHome} />}
//                 justifyContent="flex-start"
//                 variant="ghost"
//                 onClick={() => {
//                   navigate("/home");
//                   onClose();
//                 }}
//               >
//                 Home
//               </Button>

//               <Button
//                 leftIcon={<Icon as={FiPlusCircle} />}
//                 justifyContent="flex-start"
//                 variant="ghost"
//                 onClick={() => {
//                   navigate("/add-meal");
//                   onClose();
//                 }}
//               >
//                 Add Meal
//               </Button>

//               <Button
//                 leftIcon={<Icon as={FiTarget} />}
//                 justifyContent="flex-start"
//                 variant="ghost"
//                 onClick={() => {
//                   navigate("/goal-setup");
//                   onClose();
//                 }}
//               >
//                 My Goal
//               </Button>

//               <Button
//                 leftIcon={<Icon as={FiActivity} />}
//                 justifyContent="flex-start"
//                 variant="ghost"
//                 onClick={() => {
//                   navigate("/track-meal");
//                   onClose();
//                 }}
//               >
//                 My Day
//               </Button>

//               <Divider />

//               <Button
//                 leftIcon={<Icon as={FiLogOut} />}
//                 justifyContent="flex-start"
//                 colorScheme="red"
//                 variant="ghost"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Button>

//             </VStack>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;


// version 4 : good ui design / working version

// import {
//   Box,
//   HStack,
//   Text,
//   Avatar,
//   Flex,
//   Button
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();

//   return (
//     <MotionBox
//       px={4}
//       py={3}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(16px)"
//       bg="rgba(255,255,255,0.75)"
//       boxShadow="0 8px 32px rgba(0,0,0,0.05)"
//       initial={{ y: -40, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <HStack spacing={3} onClick={() => navigate("/home")} cursor="pointer">
//           <Box
//             w="36px"
//             h="36px"
//             borderRadius="full"
//             bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             fontWeight="bold"
//             color="white"
//           >
//             N
//           </Box>

//           <Box>
//             <Text fontWeight="bold" fontSize="lg">NEKA</Text>
//             <Text fontSize="xs" color="gray.500">Smart Nutrition</Text>
//           </Box>
//         </HStack>

//         {/* 🚀 MODE */}
//         <HStack bg="gray.100" borderRadius="full" p="3px">
//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "restaurant" ? "blue.400" : "transparent"}
//             color={mode === "restaurant" ? "white" : "gray.600"}
//             onClick={() => setMode("restaurant")}
//           >
//             🍽
//           </Button>

//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "home" ? "cyan.400" : "transparent"}
//             color={mode === "home" ? "white" : "gray.600"}
//             onClick={() => setMode("home")}
//           >
//             🏠
//           </Button>
//         </HStack>

//         {/* 👤 PROFILE */}
//         <Avatar size="sm" name="User" cursor="pointer" />
//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;


// version 5 : Enhancement to v4

// import {
//   Box,
//   HStack,
//   Text,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Icon
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <MotionBox
//       px={4}
//       py={3}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(16px)"
//       bg="rgba(255,255,255,0.75)"
//       boxShadow="0 8px 32px rgba(0,0,0,0.05)"
//       initial={{ y: -40, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <HStack spacing={3} onClick={() => navigate("/home")} cursor="pointer">
//           {/* <Box
//             w="36px"
//             h="36px"
//             borderRadius="full"
//             bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             fontWeight="bold"
//             color="white"
//           >
//             N
//           </Box> */}

//         <Box
//           px={3}
//           py={1.5}
//           borderRadius="full"
//           bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//           color="white"
//           fontWeight="bold"
//           fontSize="sm"
//           boxShadow="0 6px 16px rgba(0,191,255,0.35)"
//         >
//           NEKA
//         </Box>

//           <Box>
//             <Text fontWeight="bold" fontSize="lg">NEKA</Text>
//             <Text fontSize="xs" color="gray.500">Smart Nutrition</Text>
//           </Box>
//         </HStack>

//         {/* 🚀 MODE */}
//         <HStack bg="gray.100" borderRadius="full" p="3px">
//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "restaurant" ? "blue.400" : "transparent"}
//             color={mode === "restaurant" ? "white" : "gray.600"}
//             onClick={() => setMode("restaurant")}
//           >
//             🍽
//           </Button>

//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "home" ? "cyan.400" : "transparent"}
//             color={mode === "home" ? "white" : "gray.600"}
//             onClick={() => setMode("home")}
//           >
//             🏠
//           </Button>
//         </HStack>

//         {/* 👤 PROFILE MENU */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//               color="white"
//             />
//           </MenuButton>

//           <MenuList
//             borderRadius="2xl"
//             p={2}
//             boxShadow="xl"
//             border="1px solid rgba(0,0,0,0.05)"
//             minW="180px"
//           >
//             <MenuItem
//               icon={<Icon as={FiUser} />}
//               borderRadius="lg"
//               onClick={() => navigate("/profile")}
//             >
//               Profile
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiTarget} />}
//               borderRadius="lg"
//               onClick={() => navigate("/goal-setup")}
//             >
//               My Goal
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiActivity} />}
//               borderRadius="lg"
//               onClick={() => navigate("/track-meal")}
//             >
//               My Day
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiLogOut} />}
//               borderRadius="lg"
//               color="red.500"
//               _hover={{ bg: "red.50" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;



// Version 6 : Logo Addition 

// import {
//   Box,
//   HStack,
//   Text,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Icon,
//   Image
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// import neka from "../assets/logo/neka.svg"

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <MotionBox
//       px={4}
//       py={3}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(18px)"
//       bg="rgba(255,255,255,0.6)"
//       borderBottom="1px solid rgba(0,0,0,0.04)"
//       boxShadow="0 6px 24px rgba(0,0,0,0.04)"
//       initial={{ y: -30, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <HStack
//           spacing={3}
//           onClick={() => navigate("/home")}
//           cursor="pointer"
//           _hover={{ transform: "scale(1.02)" }}
//           transition="all 0.2s ease"
//         >
//           {/* 🔥 SVG LOGO */}
//           <Box
//             w="40px"
//             h="40px"
//             borderRadius="full"
//             bg="white"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             boxShadow="0 4px 14px rgba(0,0,0,0.06)"
//           >
//             <Image
//               src={neka}
//               boxSize="28px"
//             />
//           </Box>

//           {/* 🔥 TEXT */}
//           <Box>
//             <Text
//               fontWeight="semibold"
//               fontSize="lg"
//               letterSpacing="0.5px"
//               color="gray.800"
//             >
//               NEKA
//             </Text>

//             <Text
//               fontSize="xs"
//               color="gray.500"
//               letterSpacing="0.8px"
//             >
//               Smart Nutrition AI
//             </Text>
//           </Box>
//         </HStack>

//         {/* 🚀 MODE SWITCH */}
//         <HStack
//           bg="rgba(0,0,0,0.04)"
//           borderRadius="full"
//           p="4px"
//           spacing={1}
//         >
//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "restaurant" ? "blue.400" : "transparent"}
//             color={mode === "restaurant" ? "white" : "gray.600"}
//             _hover={{ bg: mode === "restaurant" ? "blue.500" : "gray.200" }}
//             px={3}
//           >
//             🍽
//           </Button>

//           <Button
//             size="sm"
//             borderRadius="full"
//             bg={mode === "home" ? "cyan.400" : "transparent"}
//             color={mode === "home" ? "white" : "gray.600"}
//             _hover={{ bg: mode === "home" ? "cyan.500" : "gray.200" }}
//             px={3}
//           >
//             🏠
//           </Button>
//         </HStack>

//         {/* 👤 PROFILE */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
//               color="white"
//               boxShadow="0 4px 12px rgba(0,191,255,0.3)"
//               _hover={{ transform: "scale(1.05)" }}
//               transition="0.2s"
//             />
//           </MenuButton>

//           <MenuList
//             borderRadius="xl"
//             p={2}
//             boxShadow="0 12px 32px rgba(0,0,0,0.08)"
//             border="1px solid rgba(0,0,0,0.05)"
//             minW="190px"
//           >
//             <MenuItem
//               icon={<Icon as={FiUser} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/profile")}
//             >
//               Profile
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiTarget} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/goal-setup")}
//             >
//               My Goal
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiActivity} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/track-meal")}
//             >
//               My Day
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiLogOut} />}
//               borderRadius="lg"
//               color="red.500"
//               _hover={{ bg: "red.50" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;


// version 7 : enhancement of 5




// import {
//   Box,
//   HStack,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Icon,
//   Image
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// import neka from "../assets/logo/neka.svg";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <MotionBox
//       px={6}
//       py={4}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(24px)"
//       bg="rgba(255,255,255,0.7)"
//       borderBottom="1px solid rgba(0,0,0,0.03)"
//       boxShadow="0 12px 32px rgba(0,0,0,0.06)"
//       initial={{ y: -30, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <Box
//           onClick={() => navigate("/home")}
//           cursor="pointer"
//           _hover={{ transform: "scale(1.06)" }}
//           transition="all 0.25s ease"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Image
//             src={neka}
//             boxSize="48px"
//             filter="drop-shadow(0 6px 14px rgba(0,191,255,0.25))"
//           />
//         </Box>

//         {/* 🚀 PREMIUM TOGGLE */}
//         <Box
//           position="relative"
//           bg="rgba(0,0,0,0.05)"
//           p="4px"
//           borderRadius="full"
//           minW="120px"
//         >
//           <Flex position="relative">

//             {/* 🔥 SLIDER */}
//             <Box
//               position="absolute"
//               top="4px"
//               left={mode === "restaurant" ? "4px" : "50%"}
//               w="50%"
//               h="calc(100% - 8px)"
//               bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//               borderRadius="full"
//               transition="all 0.3s ease"
//               boxShadow="0 4px 12px rgba(0,191,255,0.3)"
//             />

//             <Button
//               zIndex={1}
//               size="sm"
//               flex={1}
//               bg="transparent"
//               color={mode === "restaurant" ? "white" : "gray.600"}
//               borderRadius="full"
//               onClick={() => setMode("restaurant")}
//               _hover={{ bg: "transparent" }}
//             >
//               🍽
//             </Button>

//             <Button
//               zIndex={1}
//               size="sm"
//               flex={1}
//               bg="transparent"
//               color={mode === "home" ? "white" : "gray.600"}
//               borderRadius="full"
//               onClick={() => setMode("home")}
//               _hover={{ bg: "transparent" }}
//             >
//               🏠
//             </Button>

//           </Flex>
//         </Box>

//         {/* 👤 PROFILE */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
//               color="white"
//               boxShadow="0 6px 18px rgba(0,191,255,0.4)"
//               _hover={{ transform: "scale(1.08)" }}
//               transition="0.25s"
//             />
//           </MenuButton>

//           <MenuList
//             borderRadius="xl"
//             p={2}
//             boxShadow="0 18px 45px rgba(0,0,0,0.1)"
//             border="1px solid rgba(0,0,0,0.05)"
//             minW="200px"
//           >
//             <MenuItem
//               icon={<Icon as={FiUser} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/profile")}
//             >
//               Profile
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiTarget} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/goal-setup")}
//             >
//               My Goal
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiActivity} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/track-meal")}
//             >
//               My Day
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiLogOut} />}
//               borderRadius="lg"
//               color="red.500"
//               _hover={{ bg: "red.50" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;

// version 8 : super working version



// import {
//   Box,
//   HStack,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Icon,
//   Image
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// import neka from "../assets/logo/neka.svg";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <MotionBox
//       px={6}
//       py={4}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(24px)"
//       bg="rgba(255,255,255,0.7)"
//       borderBottom="1px solid rgba(0,0,0,0.03)"
//       boxShadow="0 12px 32px rgba(0,0,0,0.06)"
//       initial={{ y: -30, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <Box
//           onClick={() => navigate("/home")}
//           cursor="pointer"
//           _hover={{ transform: "scale(1.06)" }}
//           transition="all 0.25s ease"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Image
//             src={neka}
//             boxSize="48px"
//             filter="drop-shadow(0 6px 14px rgba(0,191,255,0.25))"
//           />
//         </Box>

//         {/* 🚀 PREMIUM TOGGLE */}
//     {/* 🚀 PREMIUM SEGMENTED CONTROL */}
// <Box
//   position="relative"
//   bg="rgba(0, 191, 255, 0.08)"
//   p="4px"
//   borderRadius="full"
//   minW="200px"
//   backdropFilter="blur(10px)"
// >
//   <Flex position="relative" align="center">

//     {/* 🔥 SOFT ACTIVE SLIDER */}
//     {/* <Box
//       position="absolute"
//       top="4px"
//       left={mode === "restaurant" ? "4px" : "50%"}
//       w="50%"
//       h="calc(100% - 8px)"
//       bg="linear-gradient(135deg, #E6F7FF, #CFF2FF)"
//       borderRadius="full"
//       transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
//       boxShadow="0 2px 8px rgba(0,191,255,0.15)"
//     /> */}

//     <Box
//       position="absolute"
//       top="4px"
//       left={mode === "restaurant" ? "4px" : "50%"}
//       w="50%"
//       h="calc(100% - 8px)"
//       bg="linear-gradient(135deg, #E6F7FF, #CFF2FF)"
//       borderRadius="full"
//       // transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
//       transition="all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
//       boxShadow={
//         mode === "restaurant" || mode === "home"
//           ? "0 0 12px rgba(0,191,255,0.25)"
//           : "0 2px 8px rgba(0,191,255,0.15)"
//       }
//     />

//     {/* 🍽 RESTAURANT */}
//     <Button
//       zIndex={1}
//       flex={1}
//       size="sm"
//       borderRadius="full"
//       bg="transparent"
//       display="flex"
//       gap={1}
//       alignItems="center"
//       justifyContent="center"
//       fontWeight={mode === "restaurant" ? "600" : "500"}
//       color={mode === "restaurant" ? "blue.600" : "gray.600"}
//       onClick={() => setMode("restaurant")}
//       _hover={{ bg: "transparent" }}
//     >
//       🍽 <Box as="span" fontSize="xs">Restaurant</Box>
//     </Button>

//     {/* 🏠 HOME */}
//     <Button
//       zIndex={1}
//       flex={1}
//       size="sm"
//       borderRadius="full"
//       bg="transparent"
//       display="flex"
//       gap={1}
//       alignItems="center"
//       justifyContent="center"
//       fontWeight={mode === "home" ? "600" : "500"}
//       color={mode === "home" ? "blue.600" : "gray.600"}
//       onClick={() => setMode("home")}
//       _hover={{ bg: "transparent" }}
//     >
//       🏠 <Box as="span" fontSize="xs">Home</Box>
//     </Button>

//   </Flex>
// </Box>

//         {/* 👤 PROFILE */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
//               color="white"
//               boxShadow="0 6px 18px rgba(0,191,255,0.4)"
//               _hover={{ transform: "scale(1.08)" }}
//               transition="0.25s"
//             />
//           </MenuButton>

//           <MenuList
//             borderRadius="xl"
//             p={2}
//             boxShadow="0 18px 45px rgba(0,0,0,0.1)"
//             border="1px solid rgba(0,0,0,0.05)"
//             minW="200px"
//           >
//             <MenuItem
//               icon={<Icon as={FiUser} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/profile")}
//             >
//               Profile
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiTarget} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/goal-setup")}
//             >
//               My Goal
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiActivity} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/track-meal")}
//             >
//               My Day
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiLogOut} />}
//               borderRadius="lg"
//               color="red.500"
//               _hover={{ bg: "red.50" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;



// Version 9 

// import {
//   Box,
//   HStack,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Icon,
//   Image
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut
// } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// import neka from "../assets/logo/neka.svg";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ NEW
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const isHomePage = location.pathname === "/home"; // ✅ CHECK

//   return (
//     <MotionBox
//       px={6}
//       py={4}
//       position="sticky"
//       top={0}
//       zIndex={100}
//       backdropFilter="blur(24px)"
//       bg="rgba(255,255,255,0.7)"
//       borderBottom="1px solid rgba(0,0,0,0.03)"
//       boxShadow="0 12px 32px rgba(0,0,0,0.06)"
//       initial={{ y: -30, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <Flex align="center" justify="space-between">

//         {/* 🔥 BRAND */}
//         <Box
//           onClick={() => navigate("/home")}
//           cursor="pointer"
//           _hover={{ transform: "scale(1.06)" }}
//           transition="all 0.25s ease"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Image
//             src={neka}
//             boxSize="48px"
//             filter="drop-shadow(0 6px 14px rgba(0,191,255,0.25))"
//           />
//         </Box>

//         {/* 🚀 SHOW ONLY ON HOME */}
//         {isHomePage && (
//           <Box
//             position="relative"
//             bg="rgba(0, 191, 255, 0.08)"
//             p="4px"
//             borderRadius="full"
//             minW="200px"
//             backdropFilter="blur(10px)"
//           >
//             <Flex position="relative" align="center">

//               {/* 🔥 SLIDER */}
//               <Box
//                 position="absolute"
//                 top="4px"
//                 left={mode === "restaurant" ? "4px" : "50%"}
//                 w="50%"
//                 h="calc(100% - 8px)"
//                 bg="linear-gradient(135deg, #E6F7FF, #CFF2FF)"
//                 borderRadius="full"
//                 transition="all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
//                 boxShadow="0 0 12px rgba(0,191,255,0.25)"
//               />

//               {/* 🍽 RESTAURANT */}
//               <Button
//                 zIndex={1}
//                 flex={1}
//                 size="sm"
//                 borderRadius="full"
//                 bg="transparent"
//                 display="flex"
//                 gap={1}
//                 alignItems="center"
//                 justifyContent="center"
//                 fontWeight={mode === "restaurant" ? "600" : "500"}
//                 color={mode === "restaurant" ? "blue.600" : "gray.600"}
//                 onClick={() => setMode("restaurant")}
//                 _hover={{ bg: "transparent" }}
//               >
//                 🍽 <Box as="span" fontSize="xs">Restaurant</Box>
//               </Button>

//               {/* 🏠 HOME */}
//               <Button
//                 zIndex={1}
//                 flex={1}
//                 size="sm"
//                 borderRadius="full"
//                 bg="transparent"
//                 display="flex"
//                 gap={1}
//                 alignItems="center"
//                 justifyContent="center"
//                 fontWeight={mode === "home" ? "600" : "500"}
//                 color={mode === "home" ? "blue.600" : "gray.600"}
//                 onClick={() => setMode("home")}
//                 _hover={{ bg: "transparent" }}
//               >
//                 🏠 <Box as="span" fontSize="xs">Home</Box>
//               </Button>

//             </Flex>
//           </Box>
//         )}

//         {/* 👤 PROFILE */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
//               color="white"
//               boxShadow="0 6px 18px rgba(0,191,255,0.4)"
//               _hover={{ transform: "scale(1.08)" }}
//               transition="0.25s"
//             />
//           </MenuButton>

//           <MenuList
//             borderRadius="xl"
//             p={2}
//             boxShadow="0 18px 45px rgba(0,0,0,0.1)"
//             border="1px solid rgba(0,0,0,0.05)"
//             minW="200px"
//           >
//             <MenuItem
//               icon={<Icon as={FiUser} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/profile")}
//             >
//               Profile
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiTarget} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/goal-setup")}
//             >
//               My Goal
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiActivity} />}
//               borderRadius="lg"
//               _hover={{ bg: "blue.50" }}
//               onClick={() => navigate("/track-meal")}
//             >
//               My Day
//             </MenuItem>

//             <MenuItem
//               icon={<Icon as={FiLogOut} />}
//               borderRadius="lg"
//               color="red.500"
//               _hover={{ bg: "red.50" }}
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;


// Version 10 

import {
  Box,
  Avatar,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Image
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiTarget,
  FiActivity,
  FiLogOut
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppMode } from "../context/AppModeContext";
import { useAuth } from "../context/AuthContext";

import neka from "../assets/logo/neka.svg";

const MotionBox = motion(Box);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useAppMode();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isMealsPage = location.pathname === "/meals";

  // 🔥 PAGE TITLE LOGIC
  const getPageTitle = () => {
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/goal-setup") return "Your Goal";
    if (location.pathname === "/home") return "Dashboard";
    return "";
  };

  return (
    <MotionBox
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(24px)"
      bg="rgba(255,255,255,0.7)"
      borderBottom="1px solid rgba(0,0,0,0.03)"
      boxShadow="0 12px 32px rgba(0,0,0,0.06)"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Flex align="center" justify="space-between">

        {/* 🔥 BRAND */}
        <Box
          onClick={() => navigate("/home")}
          cursor="pointer"
          _hover={{ transform: "scale(1.06)" }}
          transition="all 0.25s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={neka}
            boxSize="48px"
            filter="drop-shadow(0 6px 14px rgba(0,191,255,0.25))"
          />
        </Box>

        {/* 🔥 CENTER AREA */}
        <Box flex={1} display="flex" justifyContent="center">

          {isMealsPage ? (
            // ✅ TOGGLE
            <Box
              position="relative"
              bg="rgba(0, 191, 255, 0.08)"
              p="4px"
              borderRadius="full"
              minW="200px"
              backdropFilter="blur(10px)"
            >
              <Flex position="relative" align="center">

                <Box
                  position="absolute"
                  top="4px"
                  left={mode === "restaurant" ? "4px" : "50%"}
                  w="50%"
                  h="calc(100% - 8px)"
                  bg="linear-gradient(135deg, #E6F7FF, #CFF2FF)"
                  borderRadius="full"
                  transition="all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  boxShadow="0 0 12px rgba(0,191,255,0.25)"
                />

                {/* Will Be uncommented while opening restaurant */}

                {/* <Button
                  zIndex={1}
                  flex={1}
                  size="sm"
                  bg="transparent"
                  fontWeight={mode === "restaurant" ? "600" : "500"}
                  color={mode === "restaurant" ? "blue.600" : "gray.600"}
                  onClick={() => setMode("restaurant")}
                  _hover={{ bg: "transparent" }}
                >
                  🍽 <Box as="span" fontSize="xs">Restaurant</Box>
                </Button> */}

                <Button
                  zIndex={1}
                  flex={1}
                  size="sm"
                  bg="transparent"
                  fontWeight={mode === "home" ? "600" : "500"}
                  color={mode === "home" ? "blue.600" : "gray.600"}
                  onClick={() => setMode("home")}
                  _hover={{ bg: "transparent" }}
                >
                  🏠 <Box as="span" fontSize="xs"> Home Kitchen</Box>
                </Button>

              </Flex>
            </Box>
          ) : (
            // 🔥 ANIMATED TITLE
            <AnimatePresence mode="wait">
              <MotionBox
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                fontSize="sm"
                fontWeight="600"
                color="gray.700"
                letterSpacing="0.5px"
              >
                {getPageTitle()}
              </MotionBox>
            </AnimatePresence>
          )}

        </Box>

        {/* 👤 PROFILE */}
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={user?.name || "User"}
              cursor="pointer"
              // bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
              // bgGradient="linear(to-br, #EAF6FF, #B9E2FD)"
              bgGradient="linear(to-br, #DFF4FF, #9FD8FB)"
              // bg="brand.400"
              color="white"
              boxShadow="0 6px 18px rgba(0,191,255,0.4)"
              _hover={{ transform: "scale(1.08)" }}
              transition="0.25s"
            />
          </MenuButton>

          <MenuList
            borderRadius="xl"
            p={2}
            boxShadow="0 18px 45px rgba(0,0,0,0.1)"
            border="1px solid rgba(0,0,0,0.05)"
            minW="200px"
          >
            <MenuItem icon={<Icon as={FiUser} />} onClick={() => navigate("/profile")}>
              Profile
            </MenuItem>

            <MenuItem icon={<Icon as={FiTarget} />} onClick={() => navigate("/goal-setup")}>
              My Goal
            </MenuItem>

            <MenuItem icon={<Icon as={FiActivity} />} onClick={() => navigate("/track-meal")}>
              My Day
            </MenuItem>

            <MenuItem
              icon={<Icon as={FiLogOut} />}
              color="red.500"
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>

      </Flex>
    </MotionBox>
  );
};

export default Navbar;