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
  bg="
  linear-gradient(
  135deg,
  #ecfdf5,
  #d1fae5
  )"
  p={5}
  borderRadius="3xl"
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