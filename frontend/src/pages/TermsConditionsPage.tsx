import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Divider,
} from "@chakra-ui/react";

const TermsConditionsPage: React.FC = () => {
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
          Terms & Conditions
        </Heading>

        <Text color="gray.600">
          By using this application, you agree to the
          following terms and conditions.
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
          Some meal recommendations and nutrition
          suggestions may be generated using
          artificial intelligence technologies.
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
          Acceptance of Terms
        </Heading>

        <Text>
          By using this application, you acknowledge
          that you have read, understood, and agreed
          to these Terms & Conditions.
        </Text>
      </VStack>
    </Box>
  );
};

export default TermsConditionsPage;