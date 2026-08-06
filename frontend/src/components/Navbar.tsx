// Version 1 

// import {
//   Box,
//   Avatar,
//   Flex,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Image,
//   Text,
// } from "@chakra-ui/react";
// import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   FiUser,
// //   FiTarget,
// //   FiActivity,
// //   FiLogOut,
// //   FiTrash,
// //   FiTrendingUp,
// //   FiShield,
// //   FiFileText
// // } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAppMode } from "../context/AppModeContext";
// import { useAuth } from "../context/AuthContext";

// import neka from "../assets/logo/neka.svg";

// const MotionBox = motion(Box);

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { mode, setMode } = useAppMode();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const isMealsPage = location.pathname === "/meals";

//   // 🔥 PAGE TITLE LOGIC
//   const getPageTitle = () => {
//     if (location.pathname === "/profile") return "Profile";
//     if (location.pathname === "/goal-setup") return "Your Goal";
//     if (location.pathname === "/add-meal") return "Add what you ate today";
//     if (location.pathname === "/home") return "Your Intake Dashboard";
//     return "";
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

//       <Flex
//       align="center"
//       justify="space-between"
//       minH="56px"
//       >

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

//         {/* 🔥 CENTER AREA */}
//         <Box flex={1} display="flex" justifyContent="center">

//           {isMealsPage ? (
//             // ✅ TOGGLE
//             <Box
//               position="relative"
//               bg="rgba(0, 191, 255, 0.08)"
//               p="4px"
//               borderRadius="full"
//               minW="200px"
//               backdropFilter="blur(10px)"
//             >
//               <Flex position="relative" align="center">

//                 <Box
//                   position="absolute"
//                   top="4px"
//                   left={mode === "restaurant" ? "4px" : "50%"}
//                   w="50%"
//                   h="calc(100% - 8px)"
//                   bg="linear-gradient(135deg, #E6F7FF, #CFF2FF)"
//                   borderRadius="full"
//                   transition="all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
//                   boxShadow="0 0 12px rgba(0,191,255,0.25)"
//                 />

//                 {/* Will Be uncommented while opening restaurant */}

//                 {/* <Button
//                   zIndex={1}
//                   flex={1}
//                   size="sm"
//                   bg="transparent"
//                   fontWeight={mode === "restaurant" ? "600" : "500"}
//                   color={mode === "restaurant" ? "blue.600" : "gray.600"}
//                   onClick={() => setMode("restaurant")}
//                   _hover={{ bg: "transparent" }}
//                 >
//                   🍽 <Box as="span" fontSize="xs">Restaurant</Box>
//                 </Button> */}

//                 <Button
//                   zIndex={1}
//                   flex={1}
//                   size="sm"
//                   bg="transparent"
//                   fontWeight={mode === "home" ? "600" : "500"}
//                   color={mode === "home" ? "blue.600" : "gray.600"}
//                   onClick={() => setMode("home")}
//                   _hover={{ bg: "transparent" }}
//                 >
//                   🏠 <Box as="span" fontSize="xs"> Home Kitchen</Box>
//                 </Button>

//               </Flex>
//             </Box>
//           ) : (
//             // 🔥 ANIMATED TITLE
//             <AnimatePresence mode="wait">
//               <MotionBox
//                 key={location.pathname}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25 }}
//                 fontSize="sm"
//                 fontWeight="600"
//                 color="gray.700"
//                 letterSpacing="0.5px"
//               >
//                 {/* {getPageTitle()} */}
//                 <Text color="brand.900">
//                 {getPageTitle() ?? ""}
//               </Text>
//               </MotionBox>
//             </AnimatePresence>
//           )}

//         </Box>

//         {/* 👤 PROFILE */}
//         <Menu>
//           <MenuButton>
//             <Avatar
//               size="sm"
//               name={user?.name || "User"}
//               cursor="pointer"
//               // bgGradient="linear(to-br, #7FDBFF, #00BFFF)"
//               // bgGradient="linear(to-br, #EAF6FF, #B9E2FD)"
//               bgGradient="linear(to-br, #DFF4FF, #9FD8FB)"
//               // bg="brand.400"
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
//             <MenuItem icon={<Text fontSize="lg">🦸🏻</Text>} onClick={() => navigate("/profile")}>
//               Profile
//             </MenuItem>

//             <MenuItem icon={<Text fontSize="lg">🍳</Text>} onClick={() => navigate("/meals")}>
//              AI Kitchen
//             </MenuItem>

//             {/* <MenuItem icon={<Text fontSize="lg">🍱</Text>} onClick={() => navigate("/goal-setup")}>
//               My Goal
//             </MenuItem> */}

//             <MenuItem icon={<Text fontSize="lg">🌝</Text>} onClick={() => navigate("/track-meal")}>
//               My Day
//             </MenuItem>

//              <MenuItem icon={<Text fontSize="lg">⚖️</Text>} onClick={() => navigate("/bmi-calculator")}>
//               BMI Calculator
//             </MenuItem>
//             {/* <MenuItem icon={<Text fontSize="lg">📜</Text>} onClick={() => navigate("/tc")}>
//               Terms & Conditions
//             </MenuItem>
//             <MenuItem icon={<Text fontSize="lg">🔒</Text>} onClick={() => navigate("/privacy")}>
//               Privacy Policy
//             </MenuItem> */}
//             <MenuItem icon={<Text fontSize="lg">🔒</Text>} onClick={() => navigate("/legal")}>
//               Terms, Privacy & Disclaimer
//             </MenuItem>

//             <MenuItem
//               icon={<Text fontSize="lg">🚪</Text>}
//               color="red.500"
//               onClick={handleLogout}
//             >
//               Logout
//             </MenuItem>

//             <MenuItem icon={<Text fontSize="lg">🗑️</Text>} onClick={() => navigate("/delete-account")}>
//               Delete Account
//             </MenuItem>
//           </MenuList>
//         </Menu>

//       </Flex>
//     </MotionBox>
//   );
// };

// export default Navbar;



// Version 2

import {
  Box,
  Avatar,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiUser,
//   FiTarget,
//   FiActivity,
//   FiLogOut,
//   FiTrash,
//   FiTrendingUp,
//   FiShield,
//   FiFileText
// } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppMode } from "../context/AppModeContext";
import { useAuth } from "../context/AuthContext";

import {
    useEffect,
    useState
} from "react";

import {
    getMyOwnedOrganizations
} from "../services/workspace/myOrganization.service";

import neka from "../assets/logo/neka.svg";

const MotionBox = motion(Box);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useAppMode();
  const { user, logout } = useAuth();

  useEffect(() => {

    loadOrganizations();

}, []);

const loadOrganizations =
async () => {

    try {

        const organizations =
            await getMyOwnedOrganizations();

        setOwnedOrganizations(
            organizations
        );

    }

    catch (err) {

        console.error(err);

    }

};

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [

    ownedOrganizations,

    setOwnedOrganizations

] = useState([]);

  const isMealsPage = location.pathname === "/meals";

  // 🔥 PAGE TITLE LOGIC
  const getPageTitle = () => {
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/goal-setup") return "Your Goal";
    if (location.pathname === "/add-meal") return "Add what you ate today";
    if (location.pathname === "/home") return "Your Intake Dashboard";
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

      <Flex
      align="center"
      justify="space-between"
      minH="56px"
      >

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
                {/* {getPageTitle()} */}
                <Text color="brand.900">
                {getPageTitle() ?? ""}
              </Text>
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
            <MenuItem icon={<Text fontSize="lg">🦸🏻</Text>} onClick={() => navigate("/profile")}>
              Profile
            </MenuItem>

            <MenuItem icon={<Text fontSize="lg">🍳</Text>} onClick={() => navigate("/meals")}>
             AI Kitchen
            </MenuItem>

            {/* <MenuItem icon={<Text fontSize="lg">🍱</Text>} onClick={() => navigate("/goal-setup")}>
              My Goal
            </MenuItem> */}

            <MenuItem icon={<Text fontSize="lg">🌝</Text>} onClick={() => navigate("/track-meal")}>
              My Day
            </MenuItem>

            {

ownedOrganizations.length > 0 ?

(

<MenuItem

    icon={
        <Text fontSize="lg">
            🏢
        </Text>
    }

    onClick={() =>
        navigate("/workspace")
    }

>

    My Organizations

</MenuItem>

)

:

(

<MenuItem

    icon={
        <Text fontSize="lg">
            ➕
        </Text>
    }

    onClick={() =>
        navigate("/workspace/create")
    }

>

    Create Workspace

</MenuItem>

)

}

             <MenuItem icon={<Text fontSize="lg">⚖️</Text>} onClick={() => navigate("/bmi-calculator")}>
              BMI Calculator
            </MenuItem>
            {/* <MenuItem icon={<Text fontSize="lg">📜</Text>} onClick={() => navigate("/tc")}>
              Terms & Conditions
            </MenuItem>
            <MenuItem icon={<Text fontSize="lg">🔒</Text>} onClick={() => navigate("/privacy")}>
              Privacy Policy
            </MenuItem> */}
            <MenuItem icon={<Text fontSize="lg">🔒</Text>} onClick={() => navigate("/legal")}>
              Terms, Privacy & Disclaimer
            </MenuItem>

            <MenuItem
              icon={<Text fontSize="lg">🚪</Text>}
              color="red.500"
              onClick={handleLogout}
            >
              Logout
            </MenuItem>

            <MenuItem icon={<Text fontSize="lg">🗑️</Text>} onClick={() => navigate("/delete-account")}>
              Delete Account
            </MenuItem>
          </MenuList>
        </Menu>

      </Flex>
    </MotionBox>
  );
};

export default Navbar;