import {
    Box,
    Heading,
    Text,
    VStack,
    Badge,
    Divider,
    List,
    ListItem,
    Button,
  } from "@chakra-ui/react";
  import { useLocation } from "react-router-dom";
  import type { Recommendation } from "../types/meal";
  
  const ChefOrders = () => {
    const { state } = useLocation();
    const data = state as Recommendation;
  
    const mainItem = data.items[0];
  
    return (
      <Box p={6} maxW="700px" mx="auto">
        <Heading mb={4}>👨‍🍳 Chef Order</Heading>
  
        <Box
          p={5}
          borderRadius="2xl"
          bg="white"
          boxShadow="md"
          border="1px solid"
          borderColor="brand.200"
        >
          <VStack align="start" spacing={4}>
            {/* Dish */}
            <Heading size="md">{mainItem.name}</Heading>
  
            <Text color="gray.600">{mainItem.description}</Text>
  
            {/* Nutrition */}
            <Badge bg="brand.200" color="black">
              💪 {data.totalNutrition.protein} | 🔥 {data.totalNutrition.calories}
            </Badge>
  
            <Divider />
  
            {/* Ingredients */}
            <Box>
              <Text fontWeight="bold">🥗 Ingredients</Text>
              {/* <List spacing={1} mt={2}>
                {mainItem.ingredients.map((ing, i) => (
                  <ListItem key={i}>• {ing}</ListItem>
                ))}
              </List> */}

            <List spacing={1} mt={2}>
              {mainItem.ingredients.map((ing, i) => (
                <ListItem key={i}>
                  •{" "}
                  {typeof ing === "string"
                    ? ing
                    : `${ing.name} (${ing.quantity ?? ""} ${ing.unit ?? ""})`}
                </ListItem>
              ))}
            </List>

            </Box>
  
            {/* Steps */}
            <Box>
              <Text fontWeight="bold">👨‍🍳 Cooking Steps</Text>
              <List spacing={2} mt={2}>
                {mainItem.steps.map((step, i) => (
                  <ListItem key={i}>
                    <Box
                      p={2}
                      bg="brand.50"
                      borderRadius="md"
                    >
                      {i + 1}. {step}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
  
            <Divider />
  
            {/* Info */}
            <Text>⏱ {mainItem.prepTime}</Text>
            <Text>🔥 {mainItem.difficulty}</Text>
  
            {/* Action Buttons */}
            <VStack w="100%" spacing={3}>
              <Button w="full" bg="green.400" _hover={{ bg: "green.500" }}>
                ✅ Accept Order
              </Button>
  
              <Button w="full" variant="outline" colorScheme="red">
                ❌ Reject
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  };
  
  export default ChefOrders;