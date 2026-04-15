import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { mobile, password });
    login(res.data);
  };

  return (
    <Box minH="100vh" bg="linear-gradient(135deg,#eaf6ff,#b9e2fd)" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} borderRadius="2xl" w="320px" boxShadow="lg">
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Welcome Back 👋</Text>
          <Input placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button bg="brand.500" color="white" w="100%" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;