import {
  Badge,
  Box,
  HStack,
  Text
} from "@chakra-ui/react";

interface Props {
  muscles: string[];
}

const FitnessMusclesCard = ({
  muscles
}: Props) => {

  if (!muscles?.length) {
    return null;
  }

  return (
    <Box
      bg="
      linear-gradient(
      135deg,
      #f5f3ff,
      #ede9fe
      )"
      borderRadius="3xl"
      p={5}
    >

      <Text
        fontWeight="800"
        mb={4}
      >
        💪 Target Muscles
      </Text>

      <HStack
        wrap="wrap"
        spacing={3}
      >

        {muscles.map(
          (muscle) => (

            <Badge
              key={muscle}
              colorScheme="purple"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="sm"
            >
              💪 {muscle}
            </Badge>

          )
        )}

      </HStack>

    </Box>
  );
};

export default FitnessMusclesCard;