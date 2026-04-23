import {
    Box,
    Button,
    Input,
    Select,
    Text,
    VStack,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

  const TrackMealPage = () => {
    const [mealType, setMealType] = useState("breakfast");
    const [foodText, setFoodText] = useState("");
    const [result, setResult] = useState<any>(null);
    const toast = useToast();

    const {user} = useAuth();
    const userId = user.id;
  
    const handleAnalyze = async () => {
      try {
        // const res = await axios.post("http://localhost:3004/api/track/meals", {
        //   userId: 1,
        //   mealType,
        //   input: foodText,
        // });
        const res = await api.post("/track/meals", {
          userId,
          mealType,
          input: foodText,
        });
  
        setResult(res.data);
      } catch (err) {
        toast({
          title: "Error analyzing meal",
          status: "error",
          duration: 2000,
        });
      }
    };
  
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, #b9e2fd, #eaf6ff)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="xl"
          w="100%"
          maxW="450px"
        >
          <VStack spacing={4} align="stretch">
            <Heading size="md" textAlign="center">
              🍽 Track Your Meal
            </Heading>
  
            <Select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </Select>
  
            <Input
              placeholder="e.g. 2 dosa with chutney"
              value={foodText}
              onChange={(e) => setFoodText(e.target.value)}
              size="lg"
            />
  
            <Button
              colorScheme="blue"
              bg="brand.200"
              _hover={{ bg: "brand.300" }}
              onClick={handleAnalyze}
            >
              Analyze Meal
            </Button>
  
            {result && (
              <Box bg="gray.50" p={4} borderRadius="lg">
                <Text fontWeight="bold">Calories: {result.calories}</Text>
                <Text>Protein: {result.protein} g</Text>
                <Text>Carbs: {result.carbs} g</Text>
                <Text>Fat: {result.fat} g</Text>
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    );
  };
  
  export default TrackMealPage;