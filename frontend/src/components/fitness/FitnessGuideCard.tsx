import {
  Box,
  Image,
  Text,
  Badge,
  HStack
} from "@chakra-ui/react";

const FitnessGuideCard = ({
  guide,
  onClick
}: any) => {

  return (

    <Box
      bg="white"
      borderRadius="3xl"
      overflow="hidden"
      cursor="pointer"
      boxShadow="
      0 15px 35px
      rgba(0,0,0,0.08)
      "
      onClick={onClick}
    >

      <Image
        src={
          guide.image_url
        }
        h="200px"
        w="100%"
        objectFit="cover"
      />

      <Box p={4}>

        <Badge
          colorScheme="green"
        >
          {
            guide.difficulty
          }
        </Badge>

        <Text
          mt={2}
          fontWeight="800"
          fontSize="lg"
        >
          {guide.title}
        </Text>

        <HStack mt={3}>

          <Text>
            ⏱️ {
              guide.duration_minutes
            } mins
          </Text>

        </HStack>

      </Box>

    </Box>

  );
};

export default FitnessGuideCard;