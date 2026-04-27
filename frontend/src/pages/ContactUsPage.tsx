import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";

const ContactUsPage: React.FC = () => {
  return (
    <Box p={6} maxW="800px" mx="auto">
      <VStack align="start" spacing={4}>
        <Heading size="lg">Contact Us</Heading>

        <Text>
          Need help? Reach out to us anytime.
        </Text>

        <Text>
          Email:{" "}
          <Link color="blue.500" href="mailto:iotprograms@gmail.com">
            iotprograms@gmail.com
          </Link>
        </Text>

        <Text>
          We usually respond within 24-48 hours.
        </Text>
      </VStack>
    </Box>
  );
};

export default ContactUsPage;