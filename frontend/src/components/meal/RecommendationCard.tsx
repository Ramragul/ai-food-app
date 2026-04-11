import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Badge,
    Divider,
    Button,
  } from "@chakra-ui/react";
  import type { Recommendation } from "../../types/meal";
  import { useNavigate } from "react-router-dom";
  
  interface Props {
    data: Recommendation;
  }
  
  const RecommendationCard = ({ data }: Props) => {

    console.log(data);
    const mainItem = data.items[0];
    const navigate = useNavigate();
    return (
      <Box
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        _hover={{ transform: "scale(1.02)" }}
        transition="0.3s"
      >
        {/* Image */}
        <Image
          src={data.imageUrl }
          alt={mainItem.name}
          h="200px"
          w="100%"
          objectFit="cover"
        />
  
        <Box p={4}>
          <VStack align="start" spacing={3}>
            {/* Title */}
            <Text fontSize="lg" fontWeight="bold">
              {mainItem.name}
            </Text>
  
            {/* Description */}
            <Text fontSize="sm" color="gray.600">
              {mainItem.description}
            </Text>
  
            {/* Combo Items */}
            {data.type === "combo" && data.items.length > 1 && (
              <Box>
                <Text fontSize="sm" fontWeight="semibold">
                  Includes:
                </Text>
                {data.items.map((item, idx) => (
                  <Text key={idx} fontSize="sm" color="gray.500">
                    • {item.name}
                  </Text>
                ))}
              </Box>
            )}
  
            <Divider />
  
            {/* Nutrition */}
            <HStack spacing={3} wrap="wrap">
              <Badge colorScheme="pink">
                💪 {data.totalNutrition.protein}
              </Badge>
              <Badge colorScheme="orange">
                🔥 {data.totalNutrition.calories}
              </Badge>
              <Badge colorScheme="purple">
                🧈 {data.totalNutrition.fat}
              </Badge>
              <Badge colorScheme="blue">
                🍞 {data.totalNutrition.carbs}
              </Badge>
            </HStack>
  
            {/* Type Badge */}
            <Badge
              colorScheme={data.type === "combo" ? "green" : "gray"}
            >
              {data.type.toUpperCase()}
            </Badge>
          </VStack>
          <Button
          colorScheme="brand"
          size="sm"
          w="full"
          onClick={() => navigate("/recipe", { state: data })}
        >
          View Recipe →
        </Button>
        </Box>
      </Box>
    );
  };
  
  export default RecommendationCard;