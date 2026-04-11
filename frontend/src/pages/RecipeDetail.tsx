import {
    Box,
    Text,
    VStack,
    Heading,
    List,
    ListItem,
    Button,
  } from "@chakra-ui/react";
  import { useLocation } from "react-router-dom";
  import type { Recommendation } from "../types/meal";

  import { useNavigate } from "react-router-dom";


  const RecipeDetail = () => {
    const { state } = useLocation();
    const data = state as Recommendation;

    console.log("data in recipe details page :" +JSON.stringify(data));
  
    const mainItem = data.items[0];

    const navigate = useNavigate();

   
  
  
    return (
        
      <Box p={5}>
       <Button
            variant="ghost"
            color="gray.600"
            _hover={{ bg: "brand.100", color: "black" }}
            onClick={() => navigate(-1)}
            alignSelf="flex-start"
            >
            ← Back
        </Button>
        <VStack align="start" spacing={4}>
          <Heading>{mainItem.name}</Heading>
  
          <Text color="gray.600">{mainItem.description}</Text>
  
          {/* Nutrition */}
          <Text fontWeight="bold">
            💪 {data.totalNutrition.protein} | 🔥 {data.totalNutrition.calories}
          </Text>
  
          {/* Ingredients */}
          <Box>
            <Heading size="md">Ingredients</Heading>
            <List spacing={2}>
              {mainItem.ingredients.map((ing, i) => (
                // <ListItem key={i}>• {ing}</ListItem>
                <ListItem key={i}>
                • {typeof ing === "string"
                    ? ing
                    : `${ing.quantity}${ing.unit} ${ing.name}`}
              </ListItem>
              ))}
            </List>
          </Box>
  
          {/* Steps */}
          <Box>
            <Heading size="md">Steps</Heading>
            <List spacing={2}>
              {mainItem.steps.map((step, i) => (
                <ListItem key={i}>{i + 1}. {step}</ListItem>
              ))}
            </List>
          </Box>
  
          {/* Extra Info */}
          <Text>⏱ {mainItem.prepTime}</Text>
          <Text>🔥 {mainItem.difficulty}</Text>
  
          {/* CTA */}
          <Button
            bg="brand.200"
            _hover={{ bg: "brand.300" }}
            // onClick={() => navigate("/chef/orders", { state: data })}
            // onClick={async () => {
            //   await fetch("http://localhost:3004/api/orders", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //       userId: 1, // replace with actual user
            //       recipe: mainItem,
            //     }),
            //   });
            
            //   navigate("/orders");
            // }}
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:3004/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: 1,
                    recipe: mainItem,
                  }),
                });
            
                if (!res.ok) throw new Error("Failed to create order");
            
                const order = await res.json();
            
                navigate("/order-success", { state: order });
            
              } catch (err) {
                console.error(err);
                alert("Something went wrong macha 😅");
              }
            }}
            >
            👨‍🍳 Cook Now
            </Button>
        </VStack>
      </Box>
    );
  };
  
  export default RecipeDetail;