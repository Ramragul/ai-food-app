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

import {
  Box,
  HStack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppMode } from "../context/AppModeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mode, setMode } = useAppMode();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      bg="white"
      px={6}
      py={3}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <HStack justify="space-between">

        {/* LEFT */}
        <Text fontWeight="bold" fontSize="lg" color="brand.600">
          Cotton Candy Health 💙
        </Text>

        {/* 🔥 MODE TOGGLE */}
        <HStack
          bg="gray.100"
          borderRadius="xl"
          p="3px"
        >
          <Button
            size="sm"
            borderRadius="lg"
            bg={mode === "restaurant" ? "white" : "transparent"}
            boxShadow={mode === "restaurant" ? "sm" : "none"}
            onClick={() => setMode("restaurant")}
          >
            🍽 Restaurant
          </Button>

          <Button
            size="sm"
            borderRadius="lg"
            bg={mode === "home" ? "white" : "transparent"}
            boxShadow={mode === "home" ? "sm" : "none"}
            onClick={() => setMode("home")}
          >
            🏠 Home
          </Button>
        </HStack>

        {/* RIGHT */}
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={user?.name}
              bg="brand.300"
              color="gray.800"
            />
          </MenuButton>

          <MenuList borderRadius="xl">
            <MenuItem onClick={() => navigate("/home")}>🏠 Home</MenuItem>
            <MenuItem onClick={() => navigate("/add-meal")}>🍔 Add Meal</MenuItem>
            <MenuItem onClick={() => navigate("/goal-setup")}>🎯 My Goal</MenuItem>
            <MenuItem onClick={() => navigate("/track-meal")}>📊 My Day</MenuItem>
            <MenuItem color="red.500" onClick={handleLogout}>🚪 Logout</MenuItem>
          </MenuList>
        </Menu>

      </HStack>
    </Box>
  );
};

export default Navbar;