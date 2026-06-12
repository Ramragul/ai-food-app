import {
  Box,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react";

const FitnessStepsCard = ({
  steps
}: any) => {

  const parsed =
    typeof steps === "string"
      ? JSON.parse(steps)
      : steps;

  return (

    <Box
      bg="white"
      borderRadius="3xl"
      p={5}
      boxShadow="sm"
    >

      <Text
        fontWeight="800"
        mb={5}
      >
        🏃 How To Perform
      </Text>

      <VStack
        spacing={4}
        align="stretch"
      >

        {parsed?.map(
          (
            step: string,
            index: number
          ) => (

            <HStack
              key={index}
              align="start"
            >

              <Box
                minW="34px"
                h="34px"
                bg="brand.500"
                color="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
              >
                {index + 1}
              </Box>

              <Text>
                {step}
              </Text>

            </HStack>

          )
        )}

      </VStack>

    </Box>

  );
};

export default FitnessStepsCard;