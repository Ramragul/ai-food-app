import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const TermsConditionsPage: React.FC = () => {
  return (
    <Box p={6} maxW="800px" mx="auto">
      <VStack align="start" spacing={4}>
        <Heading size="lg">Terms & Conditions</Heading>

        <Text>
          By using this app, you agree to follow our terms and conditions.
        </Text>

        <Heading size="md">Usage</Heading>
        <Text>
          This app is intended for personal use only. You agree not to misuse the
          app or its services.
        </Text>

        <Heading size="md">Content</Heading>
        <Text>
          All content provided is for informational purposes only.
        </Text>

        <Heading size="md">Limitation of Liability</Heading>
        <Text>
          We are not responsible for any damages resulting from the use of this
          app.
        </Text>
      </VStack>
    </Box>
  );
};

export default TermsConditionsPage;