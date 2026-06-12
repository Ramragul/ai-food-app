import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

const FitnessBenefitsCard = ({
  benefits
}: any) => {

  if (!benefits) {
    return null;
  }

  return (

    <Box
      bg="green.50"
      borderRadius="3xl"
      p={5}
    >

      <Text
        fontWeight="800"
        mb={4}
      >
        ✅ Benefits
      </Text>

      <Text>
        {benefits}
      </Text>

    </Box>

  );
};

export default FitnessBenefitsCard;