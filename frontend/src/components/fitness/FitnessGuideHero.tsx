import {
  Box,
  Image,
  Text,
  Badge,
  HStack
} from "@chakra-ui/react";

const FitnessGuideHero = ({
  guide
}: any) => {

  return (

    <Box
      bg="white"
      borderRadius="3xl"
      overflow="hidden"
      boxShadow="lg"
    >

      <Image
        src={guide.image_url}
        h="260px"
        w="100%"
        objectFit="cover"
      />

      <Box p={5}>

        <Badge
          colorScheme="green"
          borderRadius="full"
          px={3}
        >
          {guide.difficulty}
        </Badge>

        <Text
          mt={3}
          fontSize="2xl"
          fontWeight="900"
        >
          {guide.title}
        </Text>

        <HStack mt={4}>

          <Text>
            ⏱️ {guide.duration_minutes} mins
          </Text>

          <Text>
            🏠 {
              guide.equipment_required
            }
          </Text>

        </HStack>

      </Box>

    </Box>
  );
};

export default FitnessGuideHero;