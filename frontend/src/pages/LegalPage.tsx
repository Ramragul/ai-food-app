import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";

const LegalPage: React.FC = () => {
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
          Terms, Privacy Policy & Disclaimer
        </Heading>

        <Text
          fontSize="sm"
          color="gray.500"
        >
          Last Updated: {new Date().toLocaleDateString()}
        </Text>

        <Text>
          By using this application, you agree to the
          terms outlined below. This page explains how
          information is collected, used, stored, and
          protected, as well as the limitations of the
          information and recommendations provided by
          the application.
        </Text>

        <Divider />

        <Heading size="md">
          Intended Use
        </Heading>

        <Text>
          This application is intended to provide
          general wellness, nutrition, fitness, and
          educational information. The application
          helps users estimate Body Mass Index (BMI),
          calorie requirements, macronutrient targets
          (protein, carbohydrates, and fats), and meal
          suggestions based on information provided by
          the user.
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
          Not Medical Advice
        </Heading>

        <Text>
          The information, calculations,
          recommendations, calorie targets,
          macronutrient targets, BMI calculations,
          meal suggestions, and other content
          available through this application are
          provided for informational and educational
          purposes only.
        </Text>

        <Text>
          This application does not provide medical
          advice, diagnosis, treatment, or prevention
          of any disease or medical condition.
        </Text>

        <Text>
          Users should consult a qualified physician,
          registered dietitian, or licensed healthcare
          professional before making significant
          changes to their diet, nutrition, exercise
          routine, or health-related decisions.
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
          AI-generated content may occasionally
          contain inaccuracies, omissions, or
          recommendations that may not be suitable for
          every individual.
        </Text>

        <Text>
          Users are responsible for reviewing all
          recommendations and determining whether they
          are appropriate for their personal
          circumstances, dietary restrictions,
          allergies, and health conditions.
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
          Accuracy of Information
        </Heading>

        <Text>
          While reasonable efforts are made to provide
          accurate calculations and recommendations,
          no guarantee is made regarding the accuracy,
          completeness, reliability, or suitability
          of any information provided by the
          application.
        </Text>

        <Text>
          Calorie requirements, nutritional needs, and
          macronutrient targets can vary significantly
          between individuals.
        </Text>

        <Divider />

        <Heading size="md">
          Medical Conditions
        </Heading>

        <Text>
          This application is not intended to manage,
          diagnose, monitor, or treat any medical
          condition.
        </Text>

        <Text>
          Individuals with diabetes, cardiovascular
          disease, kidney disease, food allergies,
          eating disorders, pregnancy, or any other
          medical condition should seek professional
          medical guidance before relying on
          information provided by this application.
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
          Limitation of Liability
        </Heading>

        <Text>
          To the maximum extent permitted by law, the
          application and its owners shall not be
          liable for any direct, indirect,
          incidental, consequential, special, or
          punitive damages arising from the use of the
          application or reliance on information
          provided by the application.
        </Text>

        <Divider />

        <Heading size="md">
          References & Sources
        </Heading>

        <Text>
          BMI classifications and healthy BMI ranges
          are based on guidance published by:
        </Text>

        <Link
          href="https://www.cdc.gov/bmi/about/index.html"
          isExternal
          color="blue.500"
        >
          Centers for Disease Control and Prevention
          (CDC) - BMI Information
        </Link>

        <Link
          href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
          isExternal
          color="blue.500"
        >
          World Health Organization (WHO) - Obesity
          and Overweight
        </Link>

        <Text pt={2}>
          General nutrition and dietary guidance
          references:
        </Text>

        <Link
          href="https://www.myplate.gov"
          isExternal
          color="blue.500"
        >
          United States Department of Agriculture
          (USDA) - MyPlate
        </Link>

        <Link
          href="https://www.nih.gov"
          isExternal
          color="blue.500"
        >
          National Institutes of Health (NIH)
        </Link>

        <Divider />

        <Heading size="md">
          Changes to This Policy
        </Heading>

        <Text>
          We may update this policy from time to time.
          Any changes will be reflected by updating
          the "Last Updated" date displayed on this
          page.
        </Text>

        <Divider />

        <Heading size="md">
          Acceptance of Terms
        </Heading>

        <Text>
          By using this application, you acknowledge
          that you have read, understood, and agreed
          to these Terms, Privacy Policy, and
          Disclaimer.
        </Text>

        <Divider />

        <Heading size="md">
          Contact Us
        </Heading>

        <Text>
          If you have any questions, concerns, or
          requests regarding this policy, please
          contact us at:
        </Text>

        <Text fontWeight="bold">
          iotprograms@gmail.com
        </Text>
      </VStack>
    </Box>
  );
};

export default LegalPage;