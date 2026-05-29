import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box
      p={6}
      maxW="900px"
      mx="auto"
      pb={20}
    >
      <VStack
        align="start"
        spacing={5}
      >
        <Heading size="lg">
          Privacy Policy
        </Heading>

        <Text
          fontSize="sm"
          color="gray.500"
        >
          Last Updated: {new Date().toLocaleDateString()}
        </Text>

        <Text>
          We value your privacy and are committed to
          protecting your personal information. This
          Privacy Policy explains what information we
          collect, how we use it, and how we safeguard
          it when you use our application.
        </Text>

        <Divider />

        <Heading size="md">
          Information We Collect
        </Heading>

        <Text>
          Depending on how you use the application, we
          may collect the following information:
        </Text>

        <Text>
          • Personal information such as your name and
          email address.
        </Text>

        <Text>
          • Profile information including age, gender,
          height, weight, activity level, fitness
          goals, and nutrition preferences.
        </Text>

        <Text>
          • Dietary preferences, allergies, and meal
          preferences provided by you.
        </Text>

        <Text>
          • Information related to your use of the
          application, including interactions with
          features and recommendations.
        </Text>

        <Divider />

        <Heading size="md">
          How We Use Your Information
        </Heading>

        <Text>
          We use collected information to:
        </Text>

        <Text>
          • Create and manage your account.
        </Text>

        <Text>
          • Generate personalized meal
          recommendations.
        </Text>

        <Text>
          • Calculate BMI, calorie requirements, and
          macronutrient targets.
        </Text>

        <Text>
          • Improve application performance and user
          experience.
        </Text>

        <Text>
          • Respond to support requests and user
          inquiries.
        </Text>

        <Divider />

        <Heading size="md">
          AI-Generated Recommendations
        </Heading>

        <Text>
          Some meal plans, nutrition suggestions, and
          recommendations may be generated using
          artificial intelligence technologies.
        </Text>

        <Text>
          Information provided by users may be
          processed to generate personalized nutrition
          and meal recommendations.
        </Text>

        <Text>
          AI-generated recommendations may not always
          be accurate or suitable for every
          individual. Users should review all
          recommendations carefully before relying on
          them.
        </Text>

        <Divider />

        <Heading size="md">
          Data Storage & Security
        </Heading>

        <Text>
          We implement reasonable administrative,
          technical, and organizational measures to
          help protect user information from
          unauthorized access, disclosure,
          modification, or destruction.
        </Text>

        <Text>
          While we strive to protect your data, no
          internet transmission or electronic storage
          method can be guaranteed to be completely
          secure.
        </Text>

        <Divider />

        <Heading size="md">
          Data Sharing
        </Heading>

        <Text>
          We do not sell, rent, or trade your personal
          information to third parties.
        </Text>

        <Text>
          Information may be shared only when required
          by law, to protect legal rights, or with
          trusted service providers necessary to
          operate and maintain the application.
        </Text>

        <Divider />

        <Heading size="md">
          Account Deletion & Data Removal
        </Heading>

        <Text>
          Users may delete their account directly
          through the application where such
          functionality is available.
        </Text>

        <Text>
          Upon account deletion, personal information
          associated with the account will be removed
          or anonymized, except where retention is
          required by applicable law or legitimate
          operational requirements.
        </Text>

        <Text>
          If you experience any issues deleting your
          account, you may contact us using the email
          address provided below.
        </Text>

        <Divider />

        <Heading size="md">
          Children's Privacy
        </Heading>

        <Text>
          This application is not intended for
          children under the age of 13. We do not
          knowingly collect personal information from
          children.
        </Text>

        <Divider />

        <Heading size="md">
          Your Rights
        </Heading>

        <Text>
          You may request access to, correction of, or
          deletion of your personal information at any
          time.
        </Text>

        <Text>
          You may also contact us regarding questions
          about how your information is collected,
          stored, or used.
        </Text>

        <Divider />

        <Heading size="md">
          Changes to This Privacy Policy
        </Heading>

        <Text>
          We may update this Privacy Policy from time
          to time. Any changes will be reflected by
          updating the "Last Updated" date displayed
          on this page.
        </Text>

        <Divider />

        <Heading size="md">
          Contact Us
        </Heading>

        <Text>
          If you have any questions, concerns, or
          requests regarding this Privacy Policy,
          please contact us at:
        </Text>

        <Text fontWeight="bold">
          iotprograms@gmail.com
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicyPage;