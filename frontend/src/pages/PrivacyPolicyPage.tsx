import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box p={6} maxW="800px" mx="auto">
      <VStack align="start" spacing={4}>
        <Heading size="lg">Privacy Policy</Heading>

        <Text fontSize="sm" color="gray.500">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <Text>
          We value your privacy. This app collects only necessary data to improve
          your experience.
        </Text>

        <Heading size="md">Information We Collect</Heading>
        <Text>
          We may collect information such as your meals, preferences, and usage
          data to provide better recommendations.
        </Text>

        <Heading size="md">How We Use Data</Heading>
        <Text>
          Your data is used to improve app functionality and personalize your
          experience.
        </Text>

        <Heading size="md">Data Security</Heading>
        <Text>
          We take appropriate measures to protect your data and ensure it is not
          misused.
        </Text>

        <Heading size="md">Contact Us</Heading>
        <Text>
          If you have any questions, contact us at: iotprograms@gmail.com
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicyPage;