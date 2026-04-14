import {
    Box,
    Input,
    Button,
    Select,
    Text,
    VStack,
    Spinner
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  
  const AddMeal = () => {
    const [mealType, setMealType] = useState("BREAKFAST");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<any[]>([]);
  
    const handleSubmit = async () => {
      if (!input) {
        alert("Please enter food");
        return;
      }
  
      setLoading(true);
  
      try {
        const res = await axios.post(
          "http://localhost:3004/api/nutrition/add-meal", // ✅ FIXED URL
          {
            userId: 2,
            mealType,
            input // ✅ SEND INPUT (AI WILL PARSE)
          }
        );
  
        // 🔥 show parsed preview
        setPreview(res.data.parsedItems || []);
  
        alert("Meal Added 🍽️");
        setInput("");
      } catch (err) {
        console.error(err);
        alert("Error adding meal");
      }
  
      setLoading(false);
    };
  
    return (
      <Box p={6} maxW="400px" mx="auto">
        <Text fontSize="xl" mb={4}>Add Meal</Text>
  
        <VStack spacing={4}>
          <Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="SNACK">Snack</option>
          </Select>
  
          <Input
            placeholder="e.g. 2 idly with sambar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
  
          <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : "Add Meal"}
          </Button>
  
          {/* 🔥 Preview parsed AI result */}
          {preview.length > 0 && (
            <Box mt={4} w="100%">
              <Text fontWeight="bold">Detected:</Text>
              {preview.map((item, i) => (
                <Text key={i}>
                  {item.food} × {item.quantity}
                </Text>
              ))}
            </Box>
          )}
        </VStack>
      </Box>
    );
  };
  
  export default AddMeal;