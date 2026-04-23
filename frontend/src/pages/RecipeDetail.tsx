// Version 1 : Working version , basic design

// import {
//     Box,
//     Text,
//     VStack,
//     Heading,
//     List,
//     ListItem,
//     Button,
//   } from "@chakra-ui/react";
//   import { useLocation } from "react-router-dom";
//   import type { Recommendation } from "../types/meal";

//   import { useNavigate } from "react-router-dom";


//   const RecipeDetail = () => {
//     const { state } = useLocation();
//     const data = state as Recommendation;

//     console.log("data in recipe details page :" +JSON.stringify(data));
  
//     const mainItem = data.items[0];

//     const navigate = useNavigate();

   
  
  
//     return (
        
//       <Box p={5}>
//        <Button
//             variant="ghost"
//             color="gray.600"
//             _hover={{ bg: "brand.100", color: "black" }}
//             onClick={() => navigate(-1)}
//             alignSelf="flex-start"
//             >
//             ← Back
//         </Button>
//         <VStack align="start" spacing={4}>
//           <Heading>{mainItem.name}</Heading>
  
//           <Text color="gray.600">{mainItem.description}</Text>
  
//           {/* Nutrition */}
//           <Text fontWeight="bold">
//             💪 {data.totalNutrition.protein} | 🔥 {data.totalNutrition.calories}
//           </Text>
  
//           {/* Ingredients */}
//           <Box>
//             <Heading size="md">Ingredients</Heading>
//             <List spacing={2}>
//               {mainItem.ingredients.map((ing, i) => (
//                 // <ListItem key={i}>• {ing}</ListItem>
//                 <ListItem key={i}>
//                 • {typeof ing === "string"
//                     ? ing
//                     : `${ing.quantity}${ing.unit} ${ing.name}`}
//               </ListItem>
//               ))}
//             </List>
//           </Box>
  
//           {/* Steps */}
//           <Box>
//             <Heading size="md">Steps</Heading>
//             <List spacing={2}>
//               {mainItem.steps.map((step, i) => (
//                 <ListItem key={i}>{i + 1}. {step}</ListItem>
//               ))}
//             </List>
//           </Box>
  
//           {/* Extra Info */}
//           <Text>⏱ {mainItem.prepTime}</Text>
//           <Text>🔥 {mainItem.difficulty}</Text>
  
//           {/* CTA */}
//           <Button
//             bg="brand.200"
//             _hover={{ bg: "brand.300" }}
//             // onClick={() => navigate("/chef/orders", { state: data })}
//             // onClick={async () => {
//             //   await fetch("http://localhost:3004/api/orders", {
//             //     method: "POST",
//             //     headers: { "Content-Type": "application/json" },
//             //     body: JSON.stringify({
//             //       userId: 1, // replace with actual user
//             //       recipe: mainItem,
//             //     }),
//             //   });
            
//             //   navigate("/orders");
//             // }}
//             onClick={async () => {
//               try {
//                 const res = await fetch("http://localhost:3004/api/orders", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({
//                     userId: 1,
//                     recipe: mainItem,
//                   }),
//                 });
            
//                 if (!res.ok) throw new Error("Failed to create order");
            
//                 const order = await res.json();
            
//                 navigate("/order-success", { state: order });
            
//               } catch (err) {
//                 console.error(err);
//                 alert("Something went wrong macha 😅");
//               }
//             }}
//             >
//             👨‍🍳 Cook Now
//             </Button>
//         </VStack>
//       </Box>
//     );
//   };
  
//   export default RecipeDetail;



// Version 2 : Enhanced UI

// import {
//   Box,
//   Text,
//   VStack,
//   Heading,
//   Button,
//   Flex,
//   Badge,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td
// } from "@chakra-ui/react";
// import { useLocation, useNavigate } from "react-router-dom";
// import type { Recommendation } from "../types/meal";

// const RecipeDetail = () => {
//   const { state } = useLocation();
//   const data = state as Recommendation;

//   const mainItem = data.items[0];
//   const navigate = useNavigate();

//   return (
//     <Box
//       minH="100vh"
//       bg="linear-gradient(to bottom, #eaf6ff, #ffffff)"
//       p={4}
//     >
//       {/* 🔙 PREMIUM BACK */}
//       <Flex mb={4}>
//         <Box
//           onClick={() => navigate(-1)}
//           cursor="pointer"
//           px={4}
//           py={2}
//           borderRadius="full"
//           bg="white"
//           boxShadow="md"
//           _hover={{ transform: "scale(1.05)" }}
//         >
//           ← Back
//         </Box>
//       </Flex>

//       <VStack align="start" spacing={6}>

//         {/* 🍽 TITLE */}
//         <Box>
//           <Heading size="lg">{mainItem.name}</Heading>
//           <Text color="gray.600">{mainItem.description}</Text>
//         </Box>

//         {/* 💪 NUTRITION */}
//         <Flex gap={3}>
//           <Badge colorScheme="blue" p={2} borderRadius="md">
//             💪 Protein: {data.totalNutrition.protein}
//           </Badge>
//           <Badge colorScheme="red" p={2} borderRadius="md">
//             🔥 Calories: {data.totalNutrition.calories}
//           </Badge>
//         </Flex>

//         {/* 📊 INGREDIENT TABLE */}
//         <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
//           <Heading size="md" mb={3}>Ingredients</Heading>

//           <Table variant="simple">
//             <Thead>
//               <Tr>
//                 <Th>Item</Th>
//                 <Th>Quantity</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {mainItem.ingredients.map((ing, i) => {
//                 const item =
//                   typeof ing === "string"
//                     ? { name: ing, quantity: "-" }
//                     : {
//                         name: ing.name,
//                         quantity: `${ing.quantity} ${ing.unit}`
//                       };

//                 return (
//                   <Tr key={i}>
//                     <Td>{item.name}</Td>
//                     <Td>{item.quantity}</Td>
//                   </Tr>
//                 );
//               })}
//             </Tbody>
//           </Table>
//         </Box>

//         {/* 🪄 STEPS TIMELINE */}
//         <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
//           <Heading size="md" mb={3}>Steps</Heading>

//           <VStack align="start" spacing={4}>
//             {mainItem.steps.map((step, i) => (
//               <Flex key={i} align="start">
//                 <Box
//                   bg="brand.400"
//                   color="white"
//                   borderRadius="full"
//                   w="30px"
//                   h="30px"
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                   fontSize="sm"
//                   mr={3}
//                 >
//                   {i + 1}
//                 </Box>

//                 <Text color="gray.700">{step}</Text>
//               </Flex>
//             ))}
//           </VStack>
//         </Box>

//         {/* ⏱ EXTRA INFO */}
//         <Flex gap={4}>
//           <Badge colorScheme="green">⏱ {mainItem.prepTime}</Badge>
//           <Badge colorScheme="purple">🔥 {mainItem.difficulty}</Badge>
//         </Flex>

//         {/* 🍳 CTA */}
//         <Button
//           w="100%"
//           size="lg"
//           bg="brand.500"
//           color="white"
//           borderRadius="full"
//           _hover={{ bg: "brand.600", transform: "scale(1.02)" }}
//           onClick={async () => {
//             try {
//               const res = await fetch("http://localhost:3004/api/orders", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   userId: 1,
//                   recipe: mainItem,
//                 }),
//               });

//               if (!res.ok) throw new Error("Failed");

//               const order = await res.json();

//               navigate("/order-success", { state: order });

//             } catch (err) {
//               alert("Something went wrong macha 😅");
//             }
//           }}
//         >
//           👨‍🍳 Cook Now
//         </Button>

//       </VStack>
//     </Box>
//   );
// };

// export default RecipeDetail;



// Version 3 : Enhancement to v2

// import {
//   Box,
//   Text,
//   VStack,
//   Heading,
//   Button,
//   Flex,
//   Badge,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Image
// } from "@chakra-ui/react";
// import { useLocation, useNavigate } from "react-router-dom";
// import type { Recommendation } from "../types/meal";
// import { useEffect } from "react";

// const RecipeDetail = () => {
//   const { state } = useLocation();
//   const data = state as Recommendation;

//   const mainItem = data.items[0];
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <Box minH="100vh" bg="#f7fbff" pb={6}>

//       {/* 🔥 HERO IMAGE */}
//       <Box position="relative">
//         <Image
//           src={data.imageUrl}
//           h="220px"
//           w="100%"
//           objectFit="cover"
//         />

//         {/* 🔙 BACK BUTTON ON IMAGE */}
//         <Box
//           position="absolute"
//           top="10px"
//           left="10px"
//           px={3}
//           py={1}
//           bg="whiteAlpha.800"
//           borderRadius="full"
//           cursor="pointer"
//           onClick={() => navigate(-1)}
//         >
//           ←
//         </Box>
//       </Box>

//       <Box p={4}>

//         <VStack align="start" spacing={5}>

//           {/* 🍽 TITLE */}
//           <Box>
//             <Heading size="lg">{mainItem.name}</Heading>
//             <Text color="gray.600">{mainItem.description}</Text>
//           </Box>

//           {/* 💪 NUTRITION */}
//           <Flex gap={3}>
//             <Badge colorScheme="blue" p={2} borderRadius="md">
//               💪 {data.totalNutrition.protein}
//             </Badge>
//             <Badge colorScheme="red" p={2} borderRadius="md">
//               🔥 {data.totalNutrition.calories}
//             </Badge>
//           </Flex>

//           {/* 📊 INGREDIENTS TABLE */}
//           <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
//             <Heading size="md" mb={3}>Ingredients</Heading>

//             <Table variant="simple">
//               <Thead>
//                 <Tr>
//                   <Th>Item</Th>
//                   <Th>Qty</Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {mainItem.ingredients.map((ing, i) => {
//                   const item =
//                     typeof ing === "string"
//                       ? { name: ing, quantity: "-" }
//                       : {
//                           name: ing.name,
//                           quantity: `${ing.quantity} ${ing.unit}`
//                         };

//                   return (
//                     <Tr key={i}>
//                       <Td>{item.name}</Td>
//                       <Td>{item.quantity}</Td>
//                     </Tr>
//                   );
//                 })}
//               </Tbody>
//             </Table>
//           </Box>

//           {/* 🪄 STEPS */}
//           <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
//             <Heading size="md" mb={3}>Steps</Heading>

//             <VStack align="start" spacing={4}>
//               {mainItem.steps.map((step, i) => (
//                 <Flex key={i} align="start">

//                   {/* 🔥 PERFECT CIRCLE */}
//                   <Flex
//                     minW="32px"
//                     h="32px"
//                     borderRadius="50%"
//                     bg="brand.400"
//                     color="white"
//                     align="center"
//                     justify="center"
//                     fontSize="sm"
//                     fontWeight="bold"
//                     mr={3}
//                   >
//                     {i + 1}
//                   </Flex>

//                   <Text color="gray.700">{step}</Text>
//                 </Flex>
//               ))}
//             </VStack>
//           </Box>

//           {/* ⏱ EXTRA */}
//           <Flex gap={3}>
//             <Badge colorScheme="green">⏱ {mainItem.prepTime}</Badge>
//             <Badge colorScheme="purple">🔥 {mainItem.difficulty}</Badge>
//           </Flex>

//           {/* 🍳 CTA */}
//           <Button
//             w="100%"
//             size="lg"
//             bg="brand.500"
//             color="white"
//             borderRadius="full"
//             _hover={{ bg: "brand.600", transform: "scale(1.02)" }}
//             onClick={async () => {
//               try {
//                 const res = await fetch("http://localhost:3004/api/orders", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({
//                     userId: 1,
//                     recipe: mainItem,
//                   }),
//                 });

//                 if (!res.ok) throw new Error("Failed");

//                 const order = await res.json();

//                 navigate("/order-success", { state: order });

//               } catch (err) {
//                 alert("Something went wrong macha 😅");
//               }
//             }}
//           >
//             👨‍🍳 Cook Now
//           </Button>

//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default RecipeDetail;


// Version 4 : clone of v3

import {
  Box,
  Text,
  VStack,
  Heading,
  Button,
  Flex,
  Badge,
  Image
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Recommendation } from "../types/meal";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const RecipeDetail = () => {
  const { state } = useLocation();
  const data = state as Recommendation;

  const mainItem = data.items[0];
  const navigate = useNavigate();

  const {user} = useAuth();

  const userId = user.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box minH="100vh" bg="#f7fbff" pb={6}>

      {/* 🔥 HERO IMAGE */}
      <Box position="relative">
        <Image
          src={data.imageUrl}
          h="220px"
          w="100%"
          objectFit="cover"
        />

        <Box
          position="absolute"
          top="10px"
          left="10px"
          px={3}
          py={1}
          bg="whiteAlpha.800"
          borderRadius="full"
          cursor="pointer"
          onClick={() => navigate(-1)}
        >
          ←
        </Box>
      </Box>

      <Box p={4}>
        <VStack align="start" spacing={5}>

          {/* 🍽 TITLE */}
          <Box>
            <Heading size="lg">{mainItem.name}</Heading>
            <Text color="gray.600">{mainItem.description}</Text>
          </Box>

          {/* 💪 NUTRITION */}
          <Flex gap={3}>
            <Badge colorScheme="blue" p={2} borderRadius="md">
              💪 {data.totalNutrition.protein}
            </Badge>
            <Badge colorScheme="red" p={2} borderRadius="md">
              🔥 {data.totalNutrition.calories}
            </Badge>
          </Flex>



<Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
  <Heading size="md" mb={3}>Ingredients</Heading>

  <VStack spacing={3} align="stretch">
    {mainItem.ingredients.map((ing, i) => {
      const item =
        typeof ing === "string"
          ? { name: ing, quantity: "-" }
          : {
              name: ing.name,
              quantity: `${ing.quantity} ${ing.unit}`
            };

      return (
        <Flex
          key={i}
          justify="space-between"
          align="center"
          px={3}
          py={3}
          borderRadius="lg"
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 2px 8px rgba(0,0,0,0.04)"
          _hover={{
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)"
          }}
          transition="all 0.2s"
          position="relative"
        >
          {/* 🔥 subtle brand accent */}
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            w="3px"
            bg="brand.400"
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
          />

          <Text fontWeight="medium" ml={2}>
            {item.name}
          </Text>

          <Text fontSize="sm" color="gray.500" fontWeight="semibold">
            {item.quantity}
          </Text>
        </Flex>
      );
    })}
  </VStack>
</Box>

          {/* 🪄 STEPS */}
          <Box w="100%" bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <Heading size="md" mb={3}>Steps</Heading>

            <VStack align="start" spacing={4}>
              {mainItem.steps.map((step, i) => (
                <Flex key={i} align="start">
                  <Flex
                    minW="32px"
                    h="32px"
                    borderRadius="50%"
                    bg="brand.400"
                    color="white"
                    align="center"
                    justify="center"
                    fontSize="sm"
                    fontWeight="bold"
                    mr={3}
                  >
                    {i + 1}
                  </Flex>

                  <Text color="gray.700">{step}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* ⏱ EXTRA */}
          <Flex gap={3}>
            <Badge colorScheme="green">⏱ {mainItem.prepTime}</Badge>
            <Badge colorScheme="purple">🔥 {mainItem.difficulty}</Badge>
          </Flex>

          {/* 🍳 CTA */}
          <Button
            w="100%"
            size="lg"
            bg="brand.500"
            color="white"
            borderRadius="full"
            _hover={{ bg: "brand.600", transform: "scale(1.02)" }}
            // onClick={async () => {
            //   try {
            //     // const res = await fetch("http://localhost:3004/api/orders", {
            //     //   method: "POST",
            //     //   headers: {
            //     //     "Content-Type": "application/json",
            //     //   },
            //     //   body: JSON.stringify({
            //     //     userId: 1,
            //     //     recipe: mainItem,
            //     //   }),
            //     // });

            //     const res = await api.post("/api/orders", {
            //       userId,
            //       recipe: mainItem,
            //     });

            //     if (!res.ok) throw new Error("Failed");

            //     const order = await res.json();
            //     navigate("/order-success", { state: order });

            //   } catch (err) {
            //     alert("Something went wrong macha 😅");
            //   }
            // }}

            onClick={async () => {
              try {
                const res = await api.post("/api/orders", {
                  userId,
                  recipe: mainItem,
                });
            
                const order = res.data;
            
                navigate("/order-success", { state: order });
            
              } catch (err) {
                alert("Something went wrong macha 😅");
              }
            }}
          >
            👨‍🍳 Cook Now
          </Button>

        </VStack>
      </Box>
    </Box>
  );
};

export default RecipeDetail;