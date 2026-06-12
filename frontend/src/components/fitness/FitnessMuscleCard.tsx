import {
  Box,
  Text
} from "@chakra-ui/react";

const FitnessMusclesCard = ({
  muscles
}: any) => {

  if (!muscles) {
    return null;
  }

  return (

    <Box
      bg="purple.50"
      borderRadius="3xl"
      p={5}
    >

      <Text
        fontWeight="800"
        mb={2}
      >
        💪 Target Muscles
      </Text>

      <Text>
        {muscles}
      </Text>

    </Box>

  );
};

export default FitnessMusclesCard;