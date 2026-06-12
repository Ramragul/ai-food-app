import {
  Box,
  Image,
  Text
} from "@chakra-ui/react";

interface Props {
  title: string;
  image: string;
  onClick: () => void;
}

const FitnessCategoryCard = ({
  title,
  image,
  onClick
}: Props) => {

  return (
    <Box
      bg="white"
      borderRadius="3xl"
      overflow="hidden"
      cursor="pointer"
      boxShadow="
        0 12px 30px
        rgba(0,0,0,0.08)
      "
      onClick={onClick}
      transition=".25s"
      _hover={{
        transform:
          "translateY(-4px)"
      }}
    >

      <Image
        src={image}
        h="140px"
        w="100%"
        objectFit="cover"
      />

      <Box p={4}>
        <Text
          fontWeight="800"
          fontSize="lg"
        >
          {title}
        </Text>
      </Box>

    </Box>
  );
};

export default FitnessCategoryCard;