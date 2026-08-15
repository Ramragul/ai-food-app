import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Link,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const NutritionSignupCTA = () => {
  const navigate = useNavigate();

  return (
    <Box
      p={6}
      borderRadius="3xl"
      bg="linear-gradient(135deg, #E0F2FE, #F8FBFF)"
      border="1px solid"
      borderColor="blue.100"
      boxShadow="0 12px 35px rgba(0,0,0,.06)"
    >
      <VStack spacing={4} textAlign="center">

        <Text fontSize="2xl">
          🎯
        </Text>

        <Heading
          size="md"
          color="gray.800"
        >
          Your Food Is Just The Beginning
        </Heading>

        <Text
          fontSize="sm"
          color="gray.600"
          lineHeight="tall"
        >
          Create your free account to track your daily meals,
          set personalized nutrition goals, and get
          AI-powered meal recommendations tailored to you.
        </Text>

        <Button
          width="100%"
          colorScheme="blue"
          borderRadius="full"
          size="md"
          onClick={() => navigate("/")}
        >
          Create My Free Account
        </Button>

        <HStack
          width="100%"
          spacing={3}
          align="center"
        >
          <Divider />

          <Text
            fontSize="xs"
            color="gray.500"
            whiteSpace="nowrap"
          >
            Already have an account?
          </Text>

          <Divider />
        </HStack>

        <Link
          fontSize="sm"
          fontWeight="600"
          color="blue.500"
          onClick={() => navigate("/login")}
        >
          Login
        </Link>

        <Text
          fontSize="xs"
          color="gray.500"
        >
          Free to get started
        </Text>

      </VStack>
    </Box>
  );
};

export default NutritionSignupCTA;