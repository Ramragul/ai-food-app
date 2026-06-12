import {
  Box,
  Text
} from "@chakra-ui/react";

const FitnessTipsCard = ({
  tips
}: any) => {

  if (!tips) {
    return null;
  }

  return (

    <Box
      bg="
      linear-gradient(
      135deg,
      #dbeafe,
      #bfdbfe
      )"
      borderRadius="3xl"
      p={5}
    >

      <Text
        fontWeight="800"
        mb={3}
      >
        💡 NEKA Tips
      </Text>

      <Text>
        {tips}
      </Text>

    </Box>

  );
};

export default FitnessTipsCard;