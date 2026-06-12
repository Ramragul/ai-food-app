import {
  Badge,
  Box,
  HStack,
  Text,
  Image
} from "@chakra-ui/react";

interface Props {
  guide: any;
}

const FitnessHero = ({
  guide
}: Props) => {

  if (!guide) {
    return null;
  }

  return (
    <Box
      position="relative"
      borderRadius="32px"
      overflow="hidden"
      h="320px"
    >

      <Image
        src={guide.image_url}
        w="100%"
        h="100%"
        objectFit="cover"
      />

      <Box
        position="absolute"
        inset={0}
        bg="
          linear-gradient(
            to top,
            rgba(0,0,0,0.75),
            rgba(0,0,0,0.2)
          )
        "
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={6}
        color="white"
      >

        <Badge
          colorScheme="green"
          borderRadius="full"
          px={3}
        >
          {guide.difficulty}
        </Badge>

        <Text
          mt={3}
          fontSize="3xl"
          fontWeight="900"
        >
          {guide.title}
        </Text>

        <HStack mt={3}>
          <Text>
            ⏱️ {guide.duration_minutes} mins
          </Text>

          <Text>
            🏠 {guide.equipment_required}
          </Text>
        </HStack>

      </Box>

    </Box>
  );
};

export default FitnessHero;