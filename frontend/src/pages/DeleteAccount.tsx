import { Box, VStack, Text, Heading, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");

  const handleRequest = () => {
    // For now just mail redirect (simple + Play Store compliant)
    window.location.href = `mailto:support@nekaapp.com?subject=Delete Account Request&body=Please delete my account associated with: ${email}`;
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="rgba(255,255,255,0.06)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255,255,255,0.2)"
        p={8}
        borderRadius="2xl"
        maxW="500px"
        w="100%"
        color="white"
        boxShadow="0 20px 60px rgba(0,0,0,0.6)"
      >
        <VStack spacing={5} align="start">
          <Heading size="lg">Delete Your NEKA Account</Heading>

          <Text fontSize="sm" color="gray.200">
            We’re sorry to see you go. You can request deletion of your account
            and associated data using the steps below.
          </Text>

          <Text fontSize="sm" color="gray.300">
            • Your personal data (name, email, mobile) will be deleted  
            • Your food logs and fitness data will be removed  
            • Some data may be retained temporarily for legal/security purposes  
          </Text>

          <Text fontSize="sm" color="gray.300">
            Enter your registered email or mobile number below to proceed:
          </Text>

          <Input
            placeholder="Email or Mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="rgba(255,255,255,0.2)"
            _placeholder={{ color: "gray.300" }}
          />

          <Button
            w="100%"
            bg="red.500"
            _hover={{ bg: "red.600" }}
            onClick={handleRequest}
            isDisabled={!email}
          >
            Request Account Deletion
          </Button>

          <Text fontSize="xs" color="gray.400">
            You can  request deletion by emailing us at
            iotprograms@gmail.com. Requests are processed within 7 days.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default DeleteAccount;