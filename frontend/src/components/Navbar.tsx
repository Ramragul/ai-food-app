import {
    Box,
    HStack,
    Text,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
  } from "@chakra-ui/react";
  import { useAuth } from "../context/AuthContext";
  import { useNavigate } from "react-router-dom";
  
  const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
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
  
          {/* 🔥 LEFT */}
          <Text fontWeight="bold" fontSize="lg" color="brand.600">
            Cotton Candy Health 💙
          </Text>
  
          {/* 🔥 RIGHT */}
          <Menu>
            {/* <MenuButton>
              <Avatar size="sm" name={user?.name}/>
            </MenuButton> */}

            <MenuButton>
            <Avatar
              size="sm"
              name={user?.name}
              bg="brand.300"
              color="gray.800"
              fontWeight="bold"
            />
          </MenuButton>
  
            <MenuList borderRadius="xl">
  
              <MenuItem onClick={() => navigate("/home")}>
                🏠 Home
              </MenuItem>
  
              <MenuItem onClick={() => navigate("/goal-setup")}>
                🎯 My Goal
              </MenuItem>
  
              <MenuItem onClick={() => navigate("/track-meal")}>
                📊 My Day
              </MenuItem>
  
              <MenuItem color="red.500" onClick={handleLogout}>
                🚪 Logout
              </MenuItem>
  
            </MenuList>
          </Menu>
  
        </HStack>
      </Box>
    );
  };
  
  export default Navbar;