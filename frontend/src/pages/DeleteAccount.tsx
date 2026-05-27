// import { Box, VStack, Text, Heading, Button, Input } from "@chakra-ui/react";
// import { useState } from "react";

// const DeleteAccount = () => {
//   const [email, setEmail] = useState("");

//   const handleRequest = () => {
//     // For now just mail redirect (simple + Play Store compliant)
//     window.location.href = `mailto:iotprograms@gmail.com?subject=Delete Account Request&body=Please delete my account associated with: ${email}`;
//   };

//   return (
//     <Box
//       minH="100vh"
//       bg="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       px={4}
//     >
//       <Box
//         bg="rgba(255,255,255,0.06)"
//         backdropFilter="blur(10px)"
//         border="1px solid rgba(255,255,255,0.2)"
//         p={8}
//         borderRadius="2xl"
//         maxW="500px"
//         w="100%"
//         color="white"
//         boxShadow="0 20px 60px rgba(0,0,0,0.6)"
//       >
//         <VStack spacing={5} align="start">
//           <Heading size="lg">Delete Your NEKA Account</Heading>

//           <Text fontSize="sm" color="gray.200">
//             We’re sorry to see you go. You can request deletion of your account
//             and associated data using the steps below.
//           </Text>

//           <Text fontSize="sm" color="gray.300">
//             • Your personal data (name, email, mobile) will be deleted  
//             • Your food logs and fitness data will be removed  
//             • Some data may be retained temporarily for legal/security purposes  
//           </Text>

//           <Text fontSize="sm" color="gray.300">
//             Enter your registered email or mobile number below to proceed:
//           </Text>

//           <Input
//             placeholder="Email or Mobile"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             bg="rgba(255,255,255,0.2)"
//             _placeholder={{ color: "gray.300" }}
//           />

//           <Button
//             w="100%"
//             bg="red.500"
//             _hover={{ bg: "red.600" }}
//             onClick={handleRequest}
//             isDisabled={!email}
//           >
//             Request Account Deletion
//           </Button>

//           <Text fontSize="xs" color="gray.400">
//             You can also request deletion by emailing us at
//             iotprograms@gmail.com. Requests are processed within 7 days.
//           </Text>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default DeleteAccount;


import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const onClose = () => setIsOpen(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      await api.delete("/user/delete-account");

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // logout user
      logout();

      // navigate to login page
      navigate("/login");

    } catch (err) {
      console.error(err);

      toast({
        title: "Deletion Failed",
        description: "Something went wrong while deleting account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg,#fff1f2,#ffe4e6)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="3xl"
        boxShadow="2xl"
        maxW="420px"
        w="100%"
      >
        <VStack spacing={6}>
          <Heading
            size="lg"
            textAlign="center"
            color="red.500"
          >
            Delete Account
          </Heading>

          <Text
            textAlign="center"
            color="gray.600"
            fontSize="md"
          >
            Are you sure you want to permanently delete your account?
            This action cannot be undone.
          </Text>

          <Button
            colorScheme="red"
            size="lg"
            w="100%"
            borderRadius="xl"
            onClick={() => setIsOpen(true)}
          >
            Delete My Account
          </Button>
        </VStack>
      </Box>

      {/* Confirmation Dialog */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>

            <AlertDialogBody>
              Your account and associated data will be permanently deleted.
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                borderRadius="lg"
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                ml={3}
                borderRadius="lg"
                onClick={handleDeleteAccount}
                isLoading={loading}
                loadingText="Deleting"
              >
                Delete Account
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeleteAccount;