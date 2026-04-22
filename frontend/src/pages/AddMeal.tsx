// Version 1 

// import {
//     Box,
//     Input,
//     Button,
//     Select,
//     Text,
//     VStack,
//     Spinner
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import axios from "axios";
  
//   const AddMeal = () => {
//     const [mealType, setMealType] = useState("BREAKFAST");
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [preview, setPreview] = useState<any[]>([]);
  
//     const handleSubmit = async () => {
//       if (!input) {
//         alert("Please enter food");
//         return;
//       }
  
//       setLoading(true);
  
//       try {
//         const res = await axios.post(
//           "http://localhost:3004/api/nutrition/add-meal", // ✅ FIXED URL
//           {
//             userId: 2,
//             mealType,
//             input // ✅ SEND INPUT (AI WILL PARSE)
//           }
//         );
  
//         // 🔥 show parsed preview
//         setPreview(res.data.parsedItems || []);
  
//         alert("Meal Added 🍽️");
//         setInput("");
//       } catch (err) {
//         console.error(err);
//         alert("Error adding meal");
//       }
  
//       setLoading(false);
//     };
  
//     return (
//       <Box p={6} maxW="400px" mx="auto">
//         <Text fontSize="xl" mb={4}>Add Meal</Text>
  
//         <VStack spacing={4}>
//           <Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
//             <option value="BREAKFAST">Breakfast</option>
//             <option value="LUNCH">Lunch</option>
//             <option value="DINNER">Dinner</option>
//             <option value="SNACK">Snack</option>
//           </Select>
  
//           <Input
//             placeholder="e.g. 2 idly with sambar"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
  
//           <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
//             {loading ? <Spinner size="sm" /> : "Add Meal"}
//           </Button>
  
//           {/* 🔥 Preview parsed AI result */}
//           {preview.length > 0 && (
//             <Box mt={4} w="100%">
//               <Text fontWeight="bold">Detected:</Text>
//               {preview.map((item, i) => (
//                 <Text key={i}>
//                   {item.food} × {item.quantity}
//                 </Text>
//               ))}
//             </Box>
//           )}
//         </VStack>
//       </Box>
//     );
//   };
  
//   export default AddMeal;



// Version 2  - Working Version

// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   const handleParse = async () => {
//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:3004/api/nutrition/add-meal",
//       { userId: 2, mealType, input }
//     );

//     setPreview(res.data.parsedItems);
//     setTotal(res.data.total);
//     setLoading(false);
//   };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );

//     alert("Meal Saved ✅");
//     setPreview([]);
//     setInput("");
//   };

//   const updateQuantity = (index: number, value: number) => {
//     const updated = [...preview];
//     updated[index].quantity = value;
//     setPreview(updated);
//   };

//   return (
//     <Box p={6} maxW="400px" mx="auto">
//       <Text fontSize="xl" mb={4}>Add Meal</Text>

//       <VStack spacing={4}>
//         <Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
//           <option value="BREAKFAST">Breakfast</option>
//           <option value="LUNCH">Lunch</option>
//           <option value="DINNER">Dinner</option>
//           <option value="SNACK">Snack</option>
//         </Select>

//         <Input
//           placeholder="2 idly with sambar"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         <Button onClick={handleParse} isDisabled={loading}>
//           {loading ? <Spinner /> : "Analyze Meal"}
//         </Button>

//         {preview.map((item, i) => (
//           <Box key={i} w="100%" borderWidth="1px" p={3} rounded="md">
//             <HStack justify="space-between">
//               {/* <Text>{item.food}</Text> */}
//               <Text>
//                 {item.food} ({item.quantity.toFixed(2)} serving)
//               </Text>
//               <Input
//                 type="number"
//                 w="70px"
//                 value={item.quantity}
//                 onChange={(e) =>
//                   updateQuantity(i, Number(e.target.value))
//                 }
//               />
//             </HStack>

//             <Text fontSize="sm">
//               {item.calories} kcal | {item.protein}P | {item.carbs}C | {item.fats}F
//             </Text>

//             <Text fontSize="xs" color="gray.500">
//               {item.source} ({Math.round(item.confidence * 100)}%)
//             </Text>
//           </Box>
//         ))}

//         {preview.length > 0 && (
//           <Button colorScheme="green" onClick={handleConfirm}>
//             Confirm Meal ✅
//           </Button>
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default AddMeal;


// Version 3  : Working version 
 
// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Divider
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   /**
//    * 🔥 Parse Meal
//    */
//   const handleParse = async () => {
//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:3004/api/nutrition/add-meal",
//       { userId: 2, mealType, input }
//     );

//     // 🔥 store base values for recalculation
//     const enriched = res.data.parsedItems.map((item: any) => ({
//       ...item,
//       baseCalories: item.calories / item.quantity,
//       baseProtein: item.protein / item.quantity,
//       baseCarbs: item.carbs / item.quantity,
//       baseFats: item.fats / item.quantity
//     }));

//     setPreview(enriched);
//     setTotal(res.data.total);
//     setLoading(false);
//   };

//   /**
//    * 🔥 Confirm Meal
//    */
//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );

//     alert("Meal Saved ✅");
//     setPreview([]);
//     setInput("");
//     setTotal(null);
//   };

//   /**
//    * 🔥 Update Quantity + Recalculate macros
//    */
//   const updateQuantity = (index: number, value: number) => {
//     const updated = [...preview];

//     const item = updated[index];
//     item.quantity = value;

//     item.calories = item.baseCalories * value;
//     item.protein = item.baseProtein * value;
//     item.carbs = item.baseCarbs * value;
//     item.fats = item.baseFats * value;

//     setPreview(updated);

//     // 🔥 recalc total
//     const newTotal = updated.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//     setTotal(newTotal);
//   };

//   return (
//     <Box
//       minH="100vh"
//       bgGradient="linear(to-br, brand.50, white)"
//       p={6}
//     >
//       <Box
//         maxW="450px"
//         mx="auto"
//         bg="white"
//         p={6}
//         borderRadius="2xl"
//         boxShadow="xl"
//       >
//         <Heading size="md" mb={4} textAlign="center">
//           🍽 Add Your Meal
//         </Heading>

//         <VStack spacing={4}>
//           <Select
//             value={mealType}
//             onChange={(e) => setMealType(e.target.value)}
//             borderRadius="lg"
//           >
//             <option value="BREAKFAST">Breakfast</option>
//             <option value="LUNCH">Lunch</option>
//             <option value="DINNER">Dinner</option>
//             <option value="SNACK">Snack</option>
//           </Select>

//           <Input
//             placeholder="Eg: 2 idly with sambar"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             borderRadius="lg"
//             focusBorderColor="brand.300"
//           />

//           <Button
//             w="100%"
//             colorScheme="blue"
//             bg="brand.200"
//             _hover={{ bg: "brand.300" }}
//             onClick={handleParse}
//             isDisabled={loading}
//             borderRadius="lg"
//           >
//             {loading ? <Spinner /> : "✨ Analyze Meal"}
//           </Button>

//           {/* 🔥 Preview Cards */}
//           {preview.map((item, i) => (
//             <Box
//               key={i}
//               w="100%"
//               p={4}
//               borderRadius="xl"
//               bg="gray.50"
//               boxShadow="sm"
//             >
//               <HStack justify="space-between" mb={2}>
//                 <Text fontWeight="bold">
//                   {item.food}
//                 </Text>

//                 <Input
//                   type="number"
//                   w="80px"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateQuantity(i, Number(e.target.value))
//                   }
//                   size="sm"
//                   borderRadius="md"
//                 />
//               </HStack>

//               <Text fontSize="sm">
//                 🔥 {item.calories.toFixed(0)} kcal
//               </Text>

//               <Text fontSize="xs" color="gray.600">
//                 P: {item.protein.toFixed(1)}g | C: {item.carbs.toFixed(1)}g | F: {item.fats.toFixed(1)}g
//               </Text>

//               <Text fontSize="xs" color="gray.400">
//                 {item.source} ({Math.round(item.confidence * 100)}%)
//               </Text>
//             </Box>
//           ))}

//           {/* 🔥 TOTAL SECTION */}
//           {total && (
//             <Box
//               w="100%"
//               p={4}
//               borderRadius="xl"
//               bg="brand.50"
//               textAlign="center"
//             >
//               <Text fontWeight="bold">Total Intake</Text>
//               <Divider my={2} />

//               <Text>
//                 🔥 {total.calories.toFixed(0)} kcal
//               </Text>

//               <Text fontSize="sm">
//                 P: {total.protein.toFixed(1)}g | C: {total.carbs.toFixed(1)}g | F: {total.fats.toFixed(1)}g
//               </Text>
//             </Box>
//           )}

//           {preview.length > 0 && (
//             <Button
//               w="100%"
//               colorScheme="green"
//               borderRadius="lg"
//               onClick={handleConfirm}
//             >
//               ✅ Confirm Meal
//             </Button>
//           )}
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default AddMeal;



// Version 4 : design enhancements to v3 


// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex,
//   Badge
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   const isInputValid = input.trim().length > 0;

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:3004/api/nutrition/add-meal",
//       { userId: 2, mealType, input }
//     );

//     const enriched = res.data.parsedItems.map((item: any) => ({
//       ...item,
//       baseCalories: item.calories / item.quantity,
//       baseProtein: item.protein / item.quantity,
//       baseCarbs: item.carbs / item.quantity,
//       baseFats: item.fats / item.quantity
//     }));

//     setPreview(enriched);
//     setTotal(res.data.total);
//     setLoading(false);
//   };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );

//     alert("Meal Saved ✅");
//     setPreview([]);
//     setInput("");
//     setTotal(null);
//   };

//   const updateQuantity = (index: number, value: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     item.quantity = value;
//     item.calories = item.baseCalories * value;
//     item.protein = item.baseProtein * value;
//     item.carbs = item.baseCarbs * value;
//     item.fats = item.baseFats * value;

//     setPreview(updated);

//     const newTotal = updated.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//     setTotal(newTotal);
//   };

//   return (
//     <Box
//       minH="100vh"
//       bgGradient="linear(to-br, #eaf6ff, #ffffff)"
//       px={4}
//       py={6}
//     >
//       <Box maxW="440px" mx="auto">
//         {/* 🔥 HEADER */}
//         <Heading size="md" mb={5}>
//           🍽 Add Meal
//         </Heading>

//         {/* 🔥 GLASS INPUT CARD */}
//         <Box
//           p={4}
//           borderRadius="2xl"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(20px)"
//           border="1px solid rgba(185,226,253,0.6)"
//           boxShadow="0 8px 30px rgba(0,0,0,0.05)"
//           mb={4}
//         >
//           <VStack spacing={3}>
//             <Select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               borderRadius="full"
//               bg="white"
//             >
//               <option value="BREAKFAST">Breakfast</option>
//               <option value="LUNCH">Lunch</option>
//               <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//             </Select>

//             <Input
//               placeholder="Eg: 2 idly with sambar"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               borderRadius="full"
//               bg="white"
//               _focus={{
//                 boxShadow: "0 0 0 2px #b9e2fd"
//               }}
//             />

//             <Button
//               w="100%"
//               borderRadius="full"
//               bgGradient={
//                 isInputValid
//                   ? "linear(to-r, #667eea, #764ba2)"
//                   : "gray.300"
//               }
//               color={isInputValid ? "white" : "gray.500"}
//               cursor={isInputValid ? "pointer" : "not-allowed"}
//               _hover={
//                 isInputValid
//                   ? { transform: "scale(1.02)" }
//                   : {}
//               }
//               onClick={handleParse}
//               isDisabled={!isInputValid || loading}
//             >
//               {loading ? <Spinner /> : "Analyze Meal"}
//             </Button>
//           </VStack>
//         </Box>

//         {/* 🔥 GLASS FOOD CARDS */}
//         <VStack spacing={4}>
//           {preview.map((item, i) => (
//             <Box
//               key={i}
//               w="100%"
//               p={4}
//               borderRadius="2xl"
//               bg="rgba(255,255,255,0.7)"
//               backdropFilter="blur(15px)"
//               border="1px solid rgba(185,226,253,0.5)"
//               boxShadow="0 10px 25px rgba(0,0,0,0.05)"
//               transition="0.2s"
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 15px 30px rgba(0,0,0,0.08)"
//               }}
//             >
//               <Flex justify="space-between" align="center">
//                 <Text fontWeight="semibold">{item.food}</Text>

//                 <Input
//                   type="number"
//                   w="65px"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateQuantity(i, Number(e.target.value))
//                   }
//                   borderRadius="lg"
//                   textAlign="center"
//                   bg="white"
//                 />
//               </Flex>

//               <Text fontSize="sm" mt={2}>
//                 🔥 {item.calories.toFixed(0)} kcal
//               </Text>

//               <HStack mt={2}>
//                 <Badge colorScheme="purple">
//                   P {item.protein.toFixed(1)}
//                 </Badge>
//                 <Badge colorScheme="orange">
//                   C {item.carbs.toFixed(1)}
//                 </Badge>
//                 <Badge colorScheme="pink">
//                   F {item.fats.toFixed(1)}
//                 </Badge>
//               </HStack>

//               <Text fontSize="xs" color="gray.500" mt={1}>
//                 {item.source} • {Math.round(item.confidence * 100)}%
//               </Text>
//             </Box>
//           ))}
//         </VStack>

//         {/* 🔥 TOTAL GLASS CARD */}
//         {total && (
//           <Box
//             mt={5}
//             p={4}
//             borderRadius="2xl"
//             bg="rgba(185,226,253,0.3)"
//             backdropFilter="blur(20px)"
//             border="1px solid rgba(185,226,253,0.6)"
//             textAlign="center"
//           >
//             <Text fontWeight="bold">Total Intake</Text>

//             <Text fontSize="xl" mt={1}>
//               🔥 {total.calories.toFixed(0)} kcal
//             </Text>

//             <HStack justify="center" mt={2}>
//               <Badge colorScheme="purple">
//                 P {total.protein.toFixed(1)}
//               </Badge>
//               <Badge colorScheme="orange">
//                 C {total.carbs.toFixed(1)}
//               </Badge>
//               <Badge colorScheme="pink">
//                 F {total.fats.toFixed(1)}
//               </Badge>
//             </HStack>
//           </Box>
//         )}
//       </Box>

//       {/* 🔥 STICKY CTA */}
//       {preview.length > 0 && (
//         <Box
//           position="fixed"
//           bottom="20px"
//           left="0"
//           right="0"
//           px={4}
//         >
//           <Button
//             w="100%"
//             h="55px"
//             borderRadius="full"
//             bgGradient="linear(to-r, #00b09b, #96c93d)"
//             color="white"
//             fontWeight="bold"
//             _hover={{ transform: "scale(1.02)" }}
//             onClick={handleConfirm}
//           >
//             Confirm Meal ✅
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AddMeal;


// version 5 : apple like ui
// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   const isInputValid = input.trim().length > 0;

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:3004/api/nutrition/add-meal",
//       { userId: 2, mealType, input }
//     );

//     const enriched = res.data.parsedItems.map((item: any) => ({
//       ...item,
//       baseCalories: item.calories / item.quantity,
//       baseProtein: item.protein / item.quantity,
//       baseCarbs: item.carbs / item.quantity,
//       baseFats: item.fats / item.quantity
//     }));

//     setPreview(enriched);
//     setTotal(res.data.total);
//     setLoading(false);
//   };

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);

//     const newTotal = updated.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//     setTotal(newTotal);
//   };

//   return (
//     <Box minH="100vh" bg="#f5f7fb" px={4} py={6}>
//       <Box maxW="420px" mx="auto">

//         {/* 🔥 HEADER */}
//         <Heading size="md" mb={4}>
//           Add Meal
//         </Heading>

//         {/* 🔥 HERO CARD (MAIN FOCUS) */}
//         {total && (
//           <Box
//             p={5}
//             borderRadius="2xl"
//             bg="white"
//             boxShadow="0 10px 30px rgba(0,0,0,0.06)"
//             mb={5}
//           >
//             <Text fontSize="sm" color="gray.500">
//               Today's Intake
//             </Text>

//             <Text fontSize="3xl" fontWeight="bold">
//               {total.calories.toFixed(0)} kcal
//             </Text>

//             <Text fontSize="sm" color="gray.500">
//               Protein {total.protein.toFixed(1)}g • Carbs {total.carbs.toFixed(1)}g • Fats {total.fats.toFixed(1)}g
//             </Text>
//           </Box>
//         )}

//         {/* 🔥 INPUT */}
//         <Box
//           p={4}
//           borderRadius="2xl"
//           bg="white"
//           boxShadow="0 6px 20px rgba(0,0,0,0.04)"
//           mb={5}
//         >
//           <VStack spacing={3}>
//             <Select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               borderRadius="lg"
//             >
//               <option value="BREAKFAST">Breakfast</option>
//               <option value="LUNCH">Lunch</option>
//               <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//             </Select>

//             <Input
//               placeholder="Type your meal..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               borderRadius="lg"
//             />

//             <Button
//               w="100%"
//               borderRadius="lg"
//               bg="black"
//               color="white"
//               isDisabled={!isInputValid || loading}
//               onClick={handleParse}
//             >
//               {loading ? <Spinner /> : "Analyze"}
//             </Button>
//           </VStack>
//         </Box>

//         {/* 🔥 LIST */}
//         <VStack spacing={3}>
//           {preview.map((item, i) => (
//             <Flex
//               key={i}
//               w="100%"
//               p={4}
//               borderRadius="xl"
//               bg="white"
//               boxShadow="0 4px 12px rgba(0,0,0,0.03)"
//               justify="space-between"
//               align="center"
//             >
//               <Box>
//                 <Text fontWeight="medium">{item.food}</Text>
//                 <Text fontSize="sm" color="gray.500">
//                   {item.calories.toFixed(0)} kcal
//                 </Text>
//               </Box>

//               <HStack>
//                 <Button size="sm" onClick={() => updateQuantity(i, -1)}>
//                   -
//                 </Button>
//                 <Text>{item.quantity}</Text>
//                 <Button size="sm" onClick={() => updateQuantity(i, 1)}>
//                   +
//                 </Button>
//               </HStack>
//             </Flex>
//           ))}
//         </VStack>
//       </Box>

//       {/* 🔥 CTA */}
//       {preview.length > 0 && (
//         <Box position="fixed" bottom="20px" left="0" right="0" px={4}>
//           <Button
//             w="100%"
//             h="55px"
//             borderRadius="xl"
//             bg="black"
//             color="white"
//           >
//             Confirm Meal
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AddMeal;


// versoin 5 :

// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   const isInputValid = input.trim().length > 0;

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     const res = await axios.post(
//       "http://localhost:3004/api/nutrition/add-meal",
//       { userId: 2, mealType, input }
//     );

//     const enriched = res.data.parsedItems.map((item: any) => ({
//       ...item,
//       baseCalories: item.calories / item.quantity,
//       baseProtein: item.protein / item.quantity,
//       baseCarbs: item.carbs / item.quantity,
//       baseFats: item.fats / item.quantity
//     }));

//     setPreview(enriched);
//     setTotal(res.data.total);
//     setLoading(false);
//   };

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);

//     const newTotal = updated.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//     setTotal(newTotal);
//   };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );
  
//     alert("Meal Saved ✅");
//     setPreview([]);
//     setInput("");
//     setTotal(null);
//   };

//   return (
//     <Box
//       minH="100vh"
//       bg="#f5f7fb"
//       px={4}
//       py={6}
//       pb="120px" // 🔥 FIX: space for sticky CTA
//     >
//       <Box maxW="420px" mx="auto">

//         {/* HEADER */}
//         <Heading size="md" mb={4}>
//           Add Meal
//         </Heading>

//         {/* INPUT */}
//         <Box
//           p={4}
//           borderRadius="2xl"
//           bg="white"
//           boxShadow="0 6px 20px rgba(0,0,0,0.04)"
//           mb={5}
//         >
//           <VStack spacing={3}>
//             <Select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               borderRadius="lg"
//             >
//               <option value="BREAKFAST">Breakfast</option>
//               <option value="LUNCH">Lunch</option>
//               <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//             </Select>

//             <Input
//               placeholder="Type your meal..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               borderRadius="lg"
//             />

//             {/* 🔥 FIXED BUTTON */}
//             <Button
//               w="100%"
//               borderRadius="lg"
//               bg="black"
//               color="white"
//               isDisabled={!isInputValid || loading}
//               _disabled={{ opacity: 0.5 }}
//               onClick={handleParse}
//             >
//               {loading ? <Spinner color="white" /> : "Analyze"}
//             </Button>
//           </VStack>
//         </Box>

//         {/* FOOD LIST */}
//         <VStack spacing={3}>
//   {preview.map((item, i) => (
//     <Flex
//       key={i}
//       w="100%"
//       p={4}
//       borderRadius="xl"
//       bg="white"
//       boxShadow="0 4px 12px rgba(0,0,0,0.03)"
//       justify="space-between"
//       align="center"
//     >
//       <Box>
//         <Text fontWeight="medium">{item.food}</Text>

//         <Text fontSize="sm" color="gray.600">
//           🔥 {item.calories.toFixed(0)} kcal
//         </Text>

//         {/* 🔥 CLEAN MACRO PILLS */}
//         <HStack spacing={2} mt={2}>
//           <Box px={2} py={1} bg="purple.50" borderRadius="md">
//             <Text fontSize="xs" color="purple.600">
//               P {item.protein.toFixed(1)}
//             </Text>
//           </Box>

//           <Box px={2} py={1} bg="orange.50" borderRadius="md">
//             <Text fontSize="xs" color="orange.600">
//               C {item.carbs.toFixed(1)}
//             </Text>
//           </Box>

//           <Box px={2} py={1} bg="pink.50" borderRadius="md">
//             <Text fontSize="xs" color="pink.600">
//               F {item.fats.toFixed(1)}
//             </Text>
//           </Box>
//         </HStack>

//         <Text fontSize="xs" color="gray.400" mt={1}>
//           {item.source} • {Math.round(item.confidence * 100)}%
//         </Text>
//       </Box>

//       <HStack>
//         <Button size="sm" onClick={() => updateQuantity(i, -1)}>
//           -
//         </Button>

//         <Text>{item.quantity}</Text>

//         <Button size="sm" onClick={() => updateQuantity(i, 1)}>
//           +
//         </Button>
//       </HStack>
//     </Flex>
//   ))}
// </VStack>
//       </Box>

//       {/* 🔥 BOTTOM BAR (BEST UX) */}
//       {preview.length > 0 && total && (
//   <Box
//     position="fixed"
//     bottom="0"
//     left="0"
//     right="0"
//     bg="white"
//     borderTop="1px solid #eee"
//     px={4}
//     py={3}
//   >
//     <Box maxW="420px" mx="auto">

//       {/* 🔥 TOTAL DISPLAY */}
//       <Flex justify="space-between" align="center" mb={2}>
//         <Box>
//           <Text fontSize="xs" color="gray.500">
//             Total Intake
//           </Text>
//           <Text fontWeight="bold" fontSize="lg">
//             🔥 {total.calories.toFixed(0)} kcal
//           </Text>
//         </Box>

//         <Button
//           bg="black"
//           color="white"
//           borderRadius="lg"
//           px={6}
//           onClick={handleConfirm}
//         >
//           Confirm
//         </Button>
//       </Flex>

//       {/* 🔥 MACRO ROW (CLEAN + BALANCED) */}
//       <HStack spacing={2} justify="space-between">
//         <Box flex={1} bg="purple.50" p={2} borderRadius="md" textAlign="center">
//           <Text fontSize="xs" color="gray.500">Protein</Text>
//           <Text fontWeight="bold" color="purple.600">
//             {total.protein.toFixed(1)}g
//           </Text>
//         </Box>

//         <Box flex={1} bg="orange.50" p={2} borderRadius="md" textAlign="center">
//           <Text fontSize="xs" color="gray.500">Carbs</Text>
//           <Text fontWeight="bold" color="orange.600">
//             {total.carbs.toFixed(1)}g
//           </Text>
//         </Box>

//         <Box flex={1} bg="pink.50" p={2} borderRadius="md" textAlign="center">
//           <Text fontSize="xs" color="gray.500">Fats</Text>
//           <Text fontWeight="bold" color="pink.600">
//             {total.fats.toFixed(1)}g
//           </Text>
//         </Box>
//       </HStack>

//     </Box>
//   </Box>
// )}
//     </Box>
//   );
// };

// export default AddMeal;


// Version 6 : enhancement to v5


// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);

//   const isInputValid = input.trim().length > 0;

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/nutrition/add-meal",
//         { userId: 2, mealType, input }
//       );

//       const enriched = res.data.parsedItems.map((item: any) => ({
//         ...item,
//         baseCalories: item.calories / item.quantity,
//         baseProtein: item.protein / item.quantity,
//         baseCarbs: item.carbs / item.quantity,
//         baseFats: item.fats / item.quantity
//       }));

//       setPreview(enriched);
//       setTotal(res.data.total);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);

//     const newTotal = updated.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//     setTotal(newTotal);
//   };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );

//     alert("Meal Saved ✅");
//     setPreview([]);
//     setInput("");
//     setTotal(null);
//   };

//   return (
//     <Box minH="100vh" bg="#f7f8fb" px={4} py={6} pb="140px">

//       {/* 🔥 LOADING OVERLAY */}
//       {loading && (
//         <Box
//           position="fixed"
//           top="0"
//           left="0"
//           right="0"
//           bottom="0"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(5px)"
//           zIndex="999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Spinner size="xl" thickness="4px" color="black" />
//           <Text mt={3} fontWeight="medium">
//             Analyzing your meal...
//           </Text>
//         </Box>
//       )}

//       <Box maxW="420px" mx="auto">

//         <Heading size="md" mb={4}>
//           Add Meal
//         </Heading>

//         {/* INPUT */}
//         <Box
//           p={4}
//           borderRadius="2xl"
//           bg="white"
//           border="1px solid #eee"
//           boxShadow="0 6px 20px rgba(0,0,0,0.04)"
//           mb={5}
//         >
//           <VStack spacing={3}>
//             <Select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               bg="white"
//               border="1px solid #ddd"
//             >
//               <option value="BREAKFAST">Breakfast</option>
//               <option value="LUNCH">Lunch</option>
//               <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//             </Select>

//             <Input
//               placeholder="Eg: 2 idly with sambar"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />

//             <Button
//               w="100%"
//               bg="black"
//               color="white"
//               borderRadius="lg"
//               isDisabled={!isInputValid}
//               onClick={handleParse}
//             >
//               Analyze
//             </Button>
//           </VStack>
//         </Box>

//         {/* FOOD LIST */}
//         <VStack spacing={4}>
//           {preview.map((item, i) => (
//             <Box
//               key={i}
//               w="100%"
//               p={4}
//               borderRadius="2xl"
//               bg="white"
//               border="1px solid #eee"
//             >
//               <Flex justify="space-between" align="center">
//                 <Box>
//                   <Text fontWeight="semibold">{item.food}</Text>
//                   <Text fontSize="sm" color="gray.500">
//                     🔥 {item.calories.toFixed(0)} kcal
//                   </Text>
//                 </Box>

//                 <HStack bg="gray.100" borderRadius="full" px={2}>
//                   <Button size="xs" onClick={() => updateQuantity(i, -1)}>−</Button>
//                   <Text px={2}>{item.quantity}</Text>
//                   <Button size="xs" bg="black" color="white" onClick={() => updateQuantity(i, 1)}>+</Button>
//                 </HStack>
//               </Flex>

//               <HStack mt={3}>
//                 <Box bg="purple.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">P {item.protein.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="orange.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">C {item.carbs.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="pink.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">F {item.fats.toFixed(1)}</Text>
//                 </Box>
//               </HStack>
//             </Box>
//           ))}
//         </VStack>
//       </Box>

//       {/* 🔥 BOTTOM SECTION */}
//       {preview.length > 0 && total && (
//         <Box
//           position="fixed"
//           bottom="0"
//           left="0"
//           right="0"
//           bg="white"
//           borderTop="1px solid #eee"
//           px={4}
//           py={3}
//         >
//           <Box maxW="420px" mx="auto">

//             {/* TOTAL */}
//             <Text fontSize="sm" color="gray.500">
//               Total Intake
//             </Text>

//             <Text fontWeight="bold" fontSize="lg">
//               🔥 {total.calories.toFixed(0)} kcal
//             </Text>

//             <HStack mt={2}>
//               <Box flex={1} bg="purple.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Protein</Text>
//                 <Text fontWeight="bold">{total.protein.toFixed(1)}g</Text>
//               </Box>

//               <Box flex={1} bg="orange.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Carbs</Text>
//                 <Text fontWeight="bold">{total.carbs.toFixed(1)}g</Text>
//               </Box>

//               <Box flex={1} bg="pink.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Fats</Text>
//                 <Text fontWeight="bold">{total.fats.toFixed(1)}g</Text>
//               </Box>
//             </HStack>

//             {/* 🔥 FULL WIDTH CTA */}
//             <Button
//               mt={3}
//               w="100%"
//               bg="black"
//               color="white"
//               borderRadius="lg"
//               onClick={handleConfirm}
//             >
//               Confirm Meal
//             </Button>

//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AddMeal;



//version 7

// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex,
//   IconButton
// } from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";



// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();

//   const isInputValid = input.trim().length > 0;

//   const calculateTotal = (items: any[]) => {
//     return items.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );
//   };

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/nutrition/add-meal",
//         { userId: 2, mealType, input }
//       );

//       const enriched = res.data.parsedItems.map((item: any) => ({
//         ...item,
//         baseCalories: item.calories / item.quantity,
//         baseProtein: item.protein / item.quantity,
//         baseCarbs: item.carbs / item.quantity,
//         baseFats: item.fats / item.quantity
//       }));

//       setPreview(enriched);
//       setTotal(res.data.total);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   /**
//    * 🔥 NEW: REMOVE ITEM
//    */
//   const removeItem = (index: number) => {
//     const updated = preview.filter((_, i) => i !== index);
//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   // const handleConfirm = async () => {
//   //   await axios.post(
//   //     "http://localhost:3004/api/nutrition/confirm-meal",
//   //     { userId: 2, mealType, items: preview, total }
//   //   );

//   //   alert("Meal Saved ✅");
//   //   setPreview([]);
//   //   setInput("");
//   //   setTotal(null);
//   // };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );
  
//     setSuccess(true);
  
//     // 🔥 smooth redirect
//     setTimeout(() => {
//       navigate("/");
//     }, 1800);
//   };


  

//   return (

//     <>
//     {success && (
//   <Box
//     position="fixed"
//     inset="0"
//     bg="rgba(255,255,255,0.7)"
//     backdropFilter="blur(8px)"
//     zIndex="9999"
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     flexDirection="column"
//   >
//     <Box
//       w="90px"
//       h="90px"
//       borderRadius="full"
//       bg="green.500"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       animation="pop 0.4s ease"
//     >
//       <Text fontSize="40px" color="white">✓</Text>
//     </Box>

//     <Text mt={4} fontSize="lg" fontWeight="semibold">
//       Meal Saved Successfully
//     </Text>

//     <Text fontSize="sm" color="gray.500">
//       Updating your dashboard...
//     </Text>
//   </Box>
// )}
    
//     <Box minH="100vh" bg="#f7f8fb">

//       {/* 🔥 LOADING */}
//       {loading && (
//         <Box
//           position="fixed"
//           inset="0"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(5px)"
//           zIndex="999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Spinner size="xl" color="black" />
//           <Text mt={3}>Analyzing your meal...</Text>
//         </Box>
//       )}

//       {/* 🔥 SCROLLABLE CONTENT */}
//       <Box
//         px={4}
//         py={6}
//         pb="180px" // 🔥 important fix
//         maxW="420px"
//         mx="auto"
//       >
//         <Heading size="md" mb={4}>
//           Add Meal
//         </Heading>

//         {/* INPUT */}
//         <Box p={4} borderRadius="2xl" bg="white" border="1px solid #eee" mb={5}>
//           <VStack spacing={3}>
//             <Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
//               <option value="BREAKFAST">Breakfast</option>
//               <option value="LUNCH">Lunch</option>
//               <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//             </Select>

//             <Input
//               placeholder="Eg: 2 idly with sambar"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />

//             <Button
//               w="100%"
//               bg="black"
//               color="white"
//               isDisabled={!isInputValid}
//               onClick={handleParse}
//             >
//               Analyze
//             </Button>


//           </VStack>
//         </Box>

//         {/* FOOD LIST */}
//         <VStack spacing={4}>
//           {preview.map((item, i) => (
//             <Box
//               key={i}
//               w="100%"
//               p={4}
//               borderRadius="2xl"
//               bg="white"
//               border="1px solid #eee"
//               position="relative"
//             >
//               {/* 🔥 REMOVE BUTTON */}
//               {/* <IconButton
//                 icon={<CloseIcon />}
//                 size="xs"
//                 position="absolute"
//                 top="10px"
//                 right="10px"
//                 aria-label="remove"
//                 onClick={() => removeItem(i)}
//               /> */}

// <Box position="absolute" top="8px" right="8px">
//   <Box
//     as="button"
//     onClick={() => removeItem(i)}
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     w="22px"
//     h="22px"
//     borderRadius="full"
//     bg="rgba(0,0,0,0.05)"
//     backdropFilter="blur(6px)"
//     transition="all 0.15s ease"
//     _hover={{
//       bg: "red.50",
//       color: "red.500",
//       transform: "scale(1.08)"
//     }}
//     _active={{
//       bg: "red.100",
//       transform: "scale(0.95)"
//     }}
//   >
//     <Text fontSize="11px" fontWeight="bold">
//       ×
//     </Text>
//   </Box>
// </Box>

//               <Flex justify="space-between" align="center">
//                 <Box>
//                   <Text fontWeight="semibold">{item.food}</Text>
//                   <Text fontSize="sm" color="gray.500">
//                     🔥 {item.calories.toFixed(0)} kcal
//                   </Text>
//                 </Box>

//                 <HStack bg="gray.100" borderRadius="full" px={2}>
//                   <Button size="xs" onClick={() => updateQuantity(i, -1)}>−</Button>
//                   <Text px={2}>{item.quantity}</Text>
//                   <Button size="xs" bg="black" color="white" onClick={() => updateQuantity(i, 1)}>+</Button>
//                 </HStack>
//               </Flex>

//               <HStack mt={3}>
//                 <Box bg="purple.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">P {item.protein.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="orange.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">C {item.carbs.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="pink.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">F {item.fats.toFixed(1)}</Text>
//                 </Box>
//               </HStack>
//             </Box>
//           ))}
//         </VStack>
//       </Box>

//       {/* 🔥 FIXED BOTTOM */}
//       {preview.length > 0 && total && (
//         <Box
//           position="fixed"
//           bottom="0"
//           left="0"
//           right="0"
//           bg="white"
//           borderTop="1px solid #eee"
//           px={4}
//           py={3}
//         >
//           <Box maxW="420px" mx="auto">
//             <Text fontSize="sm">Total Intake</Text>
//             <Text fontWeight="bold">🔥 {total.calories.toFixed(0)} kcal</Text>

//             <HStack mt={2}>
//               <Box flex={1} bg="purple.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Protein</Text>
//                 <Text fontWeight="bold">{total.protein.toFixed(1)}g</Text>
//               </Box>
//               <Box flex={1} bg="orange.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Carbs</Text>
//                 <Text fontWeight="bold">{total.carbs.toFixed(1)}g</Text>
//               </Box>
//               <Box flex={1} bg="pink.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Fats</Text>
//                 <Text fontWeight="bold">{total.fats.toFixed(1)}g</Text>
//               </Box>
//             </HStack>

//             <Button mt={3} w="100%" bg="black" color="white" onClick={handleConfirm}>
//               Confirm Meal
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>

//     <style>
// {`
// @keyframes pop {
//   0% { transform: scale(0.6); opacity: 0; }
//   100% { transform: scale(1); opacity: 1; }
// }
// `}
// </style>
//     </>
//   );
// };

// export default AddMeal;



// Version 8 


// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex,
//   IconButton
// } from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";



// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();

//   const isInputValid = input.trim().length > 0;

//   const calculateTotal = (items: any[]) => {
//     return items.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );
//   };

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/nutrition/add-meal",
//         { userId: 2, mealType, input }
//       );

//       const enriched = res.data.parsedItems.map((item: any) => ({
//         ...item,
//         baseCalories: item.calories / item.quantity,
//         baseProtein: item.protein / item.quantity,
//         baseCarbs: item.carbs / item.quantity,
//         baseFats: item.fats / item.quantity
//       }));

//       setPreview(enriched);
//       setTotal(res.data.total);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   /**
//    * 🔥 NEW: REMOVE ITEM
//    */
//   const removeItem = (index: number) => {
//     const updated = preview.filter((_, i) => i !== index);
//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   // const handleConfirm = async () => {
//   //   await axios.post(
//   //     "http://localhost:3004/api/nutrition/confirm-meal",
//   //     { userId: 2, mealType, items: preview, total }
//   //   );

//   //   alert("Meal Saved ✅");
//   //   setPreview([]);
//   //   setInput("");
//   //   setTotal(null);
//   // };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: 2, mealType, items: preview, total }
//     );
  
//     setSuccess(true);
  
//     // 🔥 smooth redirect
//     setTimeout(() => {
//       navigate("/");
//     }, 1800);
//   };


  

//   return (

//     <>
//     {success && (
//   <Box
//     position="fixed"
//     inset="0"
//     bg="rgba(255,255,255,0.7)"
//     backdropFilter="blur(8px)"
//     zIndex="9999"
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     flexDirection="column"
//   >
//     <Box
//       w="90px"
//       h="90px"
//       borderRadius="full"
//       bg="green.500"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       animation="pop 0.4s ease"
//     >
//       <Text fontSize="40px" color="white">✓</Text>
//     </Box>

//     <Text mt={4} fontSize="lg" fontWeight="semibold">
//       Meal Saved Successfully
//     </Text>

//     <Text fontSize="sm" color="gray.500">
//       Updating your dashboard...
//     </Text>
//   </Box>
// )}
    
//     <Box minH="100vh" bg="#f7f8fb">

//       {/* 🔥 LOADING */}
//       {loading && (
//         <Box
//           position="fixed"
//           inset="0"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(5px)"
//           zIndex="999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Spinner size="xl" color="black" />
//           <Text mt={3}>Analyzing your meal...</Text>
//         </Box>
//       )}

//       {/* 🔥 SCROLLABLE CONTENT */}
//       <Box
//         px={4}
//         py={6}
//         pb="180px" // 🔥 important fix
//         maxW="420px"
//         mx="auto"
//       >
//         <Heading size="md" mb={4}>
//           Add Meal
//         </Heading>

//         {/* INPUT */}
//          {/* ONLY CHANGES APPLIED — CLEAN + PREMIUM */}

//  {/* 🔥 INPUT CARD */}
//  <Box
//   p={4}
//   borderRadius="2xl"
//   bg="white"
//   border="1.5px solid"
//   borderColor="brand.300"
//   boxShadow="0 6px 18px rgba(0,0,0,0.04)"
//   mb={5}
// >
//   <VStack spacing={3}>
//   <Select
//   value={mealType}
//   onChange={(e) => setMealType(e.target.value)}
//   border="1.5px solid"
//   borderColor="gray.300"
//   bg="white"
//   _focus={{
//     borderColor: "brand.500",
//     boxShadow: "0 0 0 2px rgba(99,189,244,0.25)"
//   }}
// >
// <option value="BREAKFAST">Breakfast</option>
//                <option value="LUNCH">Lunch</option>
//                <option value="DINNER">Dinner</option>
//               <option value="SNACK">Snack</option>
//              </Select>

//   <Input
//   placeholder="Eg: 2 idly with sambar"
//   value={input}
//   onChange={(e) => setInput(e.target.value)}
//   border="1.5px solid"
//   borderColor="gray.300"
//   _focus={{
//     borderColor: "brand.500",
//     // boxShadow: "0 0 0 2px rgba(99,189,244,0.25)"
//     boxShadow:"0 2px 6px rgba(0,0,0,0.04)"
//   }}
// />

//     <Button
//       w="100%"
//       bg="black"
//       color="white"
//       isDisabled={!isInputValid}
//       onClick={handleParse}
//     >
//       Analyze
//     </Button>
//   </VStack>
// </Box>

//         {/* FOOD LIST */}
//         <VStack spacing={4}>
//           {preview.map((item, i) => (
// // 🔥 FOOD CARD
// <Box
//   key={i}
//   w="100%"
//   p={4}
//   borderRadius="2xl"
//   bg="white"
//   border="1.5px solid"
//   borderColor="brand.100"
//   position="relative"
//   transition="all 0.2s ease"
//   _hover={{
//     borderColor: "brand.500",
//     boxShadow: "0 10px 28px rgba(99,189,244,0.18)",
//     transform: "translateY(-2px)"
//   }}
// >
//               {/* 🔥 REMOVE BUTTON */}
//               {/* <IconButton
//                 icon={<CloseIcon />}
//                 size="xs"
//                 position="absolute"
//                 top="10px"
//                 right="10px"
//                 aria-label="remove"
//                 onClick={() => removeItem(i)}
//               /> */}

// {/* <Box position="absolute" top="8px" right="8px">
//   <Box
//     as="button"
//     onClick={() => removeItem(i)}
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     w="22px"
//     h="22px"
//     borderRadius="full"
//     bg="rgba(0,0,0,0.05)"
//     backdropFilter="blur(6px)"
//     transition="all 0.15s ease"
//     _hover={{
//       bg: "red.50",
//       color: "red.500",
//       transform: "scale(1.08)"
//     }}
//     _active={{
//       bg: "red.100",
//       transform: "scale(0.95)"
//     }}
//   >
//     <Text fontSize="11px" fontWeight="bold">
//       ×
//     </Text>
//   </Box>
// </Box> */}

// <Box position="absolute" top="8px" right="8px">
//   <Box
//     as="button"
//     onClick={() => removeItem(i)}
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     w="24px"
//     h="24px"
//     borderRadius="full"
//     bg="white"
//     border="1px solid"
//     borderColor="gray.300"
//     boxShadow="0 2px 6px rgba(0,0,0,0.08)"
//     transition="all 0.15s ease"
//     _hover={{
//       borderColor: "red.400",
//       color: "red.500",
//       transform: "scale(1.1)"
//     }}
//   >
//     <Text fontSize="12px">×</Text>
//   </Box>
// </Box>

//               <Flex justify="space-between" align="center">
//                 <Box>
//                   <Text fontWeight="semibold">{item.food}</Text>
//                   <Text fontSize="sm" color="gray.500">
//                     🔥 {item.calories.toFixed(0)} kcal
//                   </Text>
//                 </Box>

//                 <HStack bg="gray.100" borderRadius="full" px={2} border="1px solid #eee">
//                   <Button size="xs" onClick={() => updateQuantity(i, -1)}>−</Button>
//                   <Text px={2}>{item.quantity}</Text>
//                   <Button size="xs" bg="black" color="white" onClick={() => updateQuantity(i, 1)}>+</Button>
//                 </HStack>
//               </Flex>

//               <HStack mt={3}>
//                 <Box bg="purple.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">P {item.protein.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="orange.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">C {item.carbs.toFixed(1)}</Text>
//                 </Box>
//                 <Box bg="pink.50" px={2} py={1} borderRadius="md">
//                   <Text fontSize="xs">F {item.fats.toFixed(1)}</Text>
//                 </Box>
//               </HStack>
//             </Box>
//           ))}
//         </VStack>
//       </Box>

//       {/* 🔥 FIXED BOTTOM */}
//       {preview.length > 0 && total && (
//         <Box
//   position="fixed"
//   bottom="0"
//   left="0"
//   right="0"
//   bg="white"
//   borderTop="1.5px solid"
//   borderTopColor="brand.200"
//   px={4}
//   py={3}
//   boxShadow="0 -6px 24px rgba(0,0,0,0.06)"
// >
//           <Box maxW="420px" mx="auto">
//             <Text fontSize="sm">Total Intake</Text>
//             <Text fontWeight="bold">🔥 {total.calories.toFixed(0)} kcal</Text>

//             {/* <HStack mt={2}>
//               <Box flex={1} bg="purple.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Protein</Text>
//                 <Text fontWeight="bold">{total.protein.toFixed(1)}g</Text>
//               </Box>
//               <Box flex={1} bg="orange.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Carbs</Text>
//                 <Text fontWeight="bold">{total.carbs.toFixed(1)}g</Text>
//               </Box>
//               <Box flex={1} bg="pink.50" p={2} borderRadius="md" textAlign="center">
//                 <Text fontSize="xs">Fats</Text>
//                 <Text fontWeight="bold">{total.fats.toFixed(1)}g</Text>
//               </Box>
//             </HStack> */}

//             <HStack mt={2}>
//               <Box flex={1} bg="purple.50" p={2} borderRadius="lg" textAlign="center">
//                 <Text fontSize="xs">Protein</Text>
//                 <Text fontWeight="bold">{total.protein.toFixed(1)}g</Text>
//               </Box>

//               <Box flex={1} bg="orange.50" p={2} borderRadius="lg" textAlign="center">
//                 <Text fontSize="xs">Carbs</Text>
//                 <Text fontWeight="bold">{total.carbs.toFixed(1)}g</Text>
//               </Box>

//               <Box flex={1} bg="pink.50" p={2} borderRadius="lg" textAlign="center">
//                 <Text fontSize="xs">Fats</Text>
//                 <Text fontWeight="bold">{total.fats.toFixed(1)}g</Text>
//               </Box>
//             </HStack>

//             {/* <Button mt={3} w="100%" bg="black" color="white" onClick={handleConfirm}>
//               Confirm Meal
//             </Button> */}
//             <Button
//   mt={3}
//   w="100%"
//   bg="black"
//   color="white"
//   borderRadius="xl"
//   transition="all 0.2s ease"
//   _hover={{
//     bg: "#111",
//     transform: "translateY(-1px)",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
//   }}
//   _active={{
//     transform: "scale(0.98)"
//   }}
//   onClick={handleConfirm}
// >
//   Confirm Meal
// </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>

//     <style>
// {`
// @keyframes pop {
//   0% { transform: scale(0.6); opacity: 0; }
//   100% { transform: scale(1); opacity: 1; }
// }
// `}
// </style>
//     </>
//   );
// };

// export default AddMeal;


// Version 9 

// import {
//   Box,
//   Input,
//   Button,
//   Select,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem
// } from "@chakra-ui/react";
// import { CheckIcon, ChevronDownIcon , CloseIcon } from "@chakra-ui/icons";

// const AddMeal = () => {
//   const [mealType, setMealType] = useState("BREAKFAST");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [total, setTotal] = useState<any>(null);
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();
//   const isInputValid = input.trim().length > 0;

//   const { user } = useAuth();
//   const userId = user.id;

//   const calculateTotal = (items: any[]) =>
//     items.reduce(
//       (acc, curr) => ({
//         calories: acc.calories + curr.calories,
//         protein: acc.protein + curr.protein,
//         carbs: acc.carbs + curr.carbs,
//         fats: acc.fats + curr.fats
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     );

//   const handleParse = async () => {
//     if (!isInputValid) return;

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/nutrition/add-meal",
//         { userId: userId, mealType, input }
//       );

//       const enriched = res.data.parsedItems.map((item: any) => ({
//         ...item,
//         baseCalories: item.calories / item.quantity,
//         baseProtein: item.protein / item.quantity,
//         baseCarbs: item.carbs / item.quantity,
//         baseFats: item.fats / item.quantity
//       }));

//       setPreview(enriched);
//       setTotal(res.data.total);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //const MotionBox = motion(Box);
//   const MotionMenuList = motion(MenuList);

//   const mealOptions = [
//     { label: "🌅 Breakfast", value: "BREAKFAST" },
//     { label: "🍛 Lunch", value: "LUNCH" },
//     { label: "🌙 Dinner", value: "DINNER" },
//     { label: "🍿 Snack", value: "SNACK" }
//   ];
  
//   const selected = mealOptions.find(m => m.value === mealType);

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...preview];
//     const item = updated[index];

//     const newQty = Math.max(0, item.quantity + delta);

//     item.quantity = newQty;
//     item.calories = item.baseCalories * newQty;
//     item.protein = item.baseProtein * newQty;
//     item.carbs = item.baseCarbs * newQty;
//     item.fats = item.baseFats * newQty;

//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   const removeItem = (index: number) => {
//     const updated = preview.filter((_, i) => i !== index);
//     setPreview(updated);
//     setTotal(calculateTotal(updated));
//   };

//   const handleConfirm = async () => {
//     await axios.post(
//       "http://localhost:3004/api/nutrition/confirm-meal",
//       { userId: userId, mealType, items: preview, total }
//     );

//     setSuccess(true);

//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   };



//   return (
//     <>
//       {/* SUCCESS */}
//       {success && (
//         <Box
//           position="fixed"
//           inset="0"
//           bg="rgba(255,255,255,0.7)"
//           backdropFilter="blur(10px)"
//           zIndex="9999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Box
//             w="90px"
//             h="90px"
//             borderRadius="full"
//             bg="green.500"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Text fontSize="40px" color="white">✓</Text>
//           </Box>

//           <Text mt={4} fontSize="lg" fontWeight="semibold">
//             Meal Saved Successfully
//           </Text>
//         </Box>
//       )}

//       {/* LOADING */}
//       {loading && (
//         <Box
//           position="fixed"
//           inset="0"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(6px)"
//           zIndex="999"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Spinner size="xl" color="black" />
//           <Text mt={3}>Analyzing your meal...</Text>
//         </Box>
//       )}

//       <Box minH="100vh" bg="#f7f8fb">
//         <Box px={4} py={6} pb="180px" maxW="420px" mx="auto">
//           <Heading size="md" mb={4}>Add Meal</Heading>

//           {/* INPUT CARD */}
//           <Box
//             p={4}
//             borderRadius="2xl"
//             bg="white"
//             border="1px solid"
//             borderColor="gray.200"
//             boxShadow="0 8px 24px rgba(0,0,0,0.05)"
//             mb={5}
//           >
//             <VStack spacing={3}>


// <Menu>
//   <MenuButton
//     as={Button}
//     rightIcon={<ChevronDownIcon />}
//     w="100%"
//     textAlign="left"
//     bg="white"
//     border="1px solid"
//     borderColor="gray.300"
//     borderRadius="xl"
//     px={4}
//     py={6}
//     fontWeight="medium"
//     boxShadow="0 4px 12px rgba(0,0,0,0.04)"
//     _hover={{ borderColor: "gray.400", bg: "white" }}
//     _active={{ bg: "white" }}
//   >
//     {selected?.label}
//   </MenuButton>

//   <MotionMenuList
//     initial={{ opacity: 0, y: -10, scale: 0.98 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     exit={{ opacity: 0, y: -10, scale: 0.98 }}
//     transition={{ duration: 0.18, ease: "easeOut" }}
//     borderRadius="xl"
//     border="1px solid"
//     borderColor="brand.100"
//     backdropFilter="blur(12px)"
//     bg="rgba(255,255,255,0.75)"
//     boxShadow="0 20px 40px rgba(0,0,0,0.15)"
//     p={2}
//   >
//     {mealOptions.map((item) => {
//       const isActive = item.value === mealType;

//       return (
//         <MenuItem
//           key={item.value}
//           borderRadius="lg"
//           px={3}
//           py={2}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           fontWeight="medium"
//           bg={isActive ? "brand.50" : "transparent"}
//           _hover={{
//             bg: "brand.100"
//           }}
//           onClick={() => setMealType(item.value)}
//         >
//           <Text>{item.label}</Text>

//           {isActive && (
//             <CheckIcon color="brand.500" boxSize={3} />
//           )}
//         </MenuItem>
//       );
//     })}
//   </MotionMenuList>
// </Menu>

//               <Input
//                 placeholder="Eg: 2 idly with sambar"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 border="1px solid"
//                 borderColor="gray.300"
//                 _focus={{
//                   borderColor: "brand.500",
//                   boxShadow: "0 0 0 2px rgba(99,189,244,0.2)"
//                 }}
//               />

//               <Button
//                 w="100%"
//                 bg="black"
//                 color="white"
//                 isDisabled={!isInputValid}
//                 onClick={handleParse}
//                 _hover={{ bg: "#111", transform: "translateY(-1px)" }}
//                 _active={{ transform: "scale(0.98)" }}
//               >
//                 Analyze
//               </Button>
//             </VStack>
//           </Box>

//           {/* FOOD LIST */}
//           <VStack spacing={4}>
//             {preview.map((item, i) => (


//               <Box
//   key={i}
//   w="100%"
//   p={4}
//   borderRadius="2xl"
//   bg="white"
//   border="1px solid"
//   borderColor="gray.200"
//   position="relative"
//   transition="all 0.2s"
//   _hover={{
//     transform: "translateY(-2px)",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
//   }}
// >
//   {/* ❌ REMOVE BUTTON */}
//   {/* <Box
//     position="absolute"
//     top="10px"
//     right="10px"
//     onClick={() => removeItem(i)}
//     cursor="pointer"
//     bg="rgba(0,0,0,0.05)"
//     borderRadius="full"
//     p="6px"
//     transition="all 0.2s"
//     _hover={{
//       bg: "rgba(0,0,0,0.12)",
//       transform: "scale(1.1)"
//     }}
//     _active={{
//       transform: "scale(0.9)"
//     }}
//   >
//     <CloseIcon boxSize={2.5} color="gray.600" />
//   </Box> */}

// <Box position="absolute" top="8px" right="8px">
//    <Box
//     as="button"
//     onClick={() => removeItem(i)}
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     w="22px"
//     h="22px"
//     borderRadius="full"
//     bg="rgba(0,0,0,0.05)"
//     backdropFilter="blur(6px)"
//     transition="all 0.15s ease"
//     _hover={{
//       bg: "red.50",
//       color: "red.500",
//       transform: "scale(1.08)"
//     }}
//     _active={{
//       bg: "red.100",
//       transform: "scale(0.95)"
//     }}
//   >
//     <Text fontSize="11px" fontWeight="bold">
//       ×
//     </Text>
//   </Box>
// </Box>

//   <Flex justify="space-between" align="center">
//     <Box>
//       <Text fontWeight="semibold">{item.food}</Text>
//       <Text fontSize="sm" color="gray.500">
//         🔥 {item.calories.toFixed(0)} kcal
//       </Text>
//     </Box>

//     <HStack bg="gray.100" borderRadius="full" px={2}>
//       <Button size="xs" onClick={() => updateQuantity(i, -1)}>−</Button>
//       <Text px={2}>{item.quantity}</Text>
//       <Button
//         size="xs"
//         bg="black"
//         color="white"
//         onClick={() => updateQuantity(i, 1)}
//       >
//         +
//       </Button>
//     </HStack>
//   </Flex>

//   <HStack mt={3}>
//     <Box bg="purple.50" px={2} py={1} borderRadius="md">
//       <Text fontSize="xs">P {item.protein.toFixed(1)}</Text>
//     </Box>
//     <Box bg="orange.50" px={2} py={1} borderRadius="md">
//       <Text fontSize="xs">C {item.carbs.toFixed(1)}</Text>
//     </Box>
//     <Box bg="pink.50" px={2} py={1} borderRadius="md">
//       <Text fontSize="xs">F {item.fats.toFixed(1)}</Text>
//     </Box>
//   </HStack>
// </Box>
//             ))}
//           </VStack>
//         </Box>

//         {/* TOTAL */}
//         {preview.length > 0 && total && (
//           <Box
//             position="fixed"
//             bottom="0"
//             left="0"
//             right="0"
//             bg="white"
//             borderTop="1px solid #eee"
//             px={4}
//             py={3}
//             boxShadow="0 -6px 20px rgba(0,0,0,0.06)"
//           >
//             <Box maxW="420px" mx="auto">
//               <Text fontSize="sm">Total Intake</Text>
//               <Text fontWeight="bold">🔥 {total.calories.toFixed(0)} kcal</Text>

//               <HStack mt={2}>
//                 <Box flex={1} bg="purple.50" p={2} borderRadius="lg" textAlign="center">
//                   <Text fontSize="xs">Protein</Text>
//                   <Text fontWeight="bold">{total.protein.toFixed(1)}g</Text>
//                 </Box>

//                 <Box flex={1} bg="orange.50" p={2} borderRadius="lg" textAlign="center">
//                   <Text fontSize="xs">Carbs</Text>
//                   <Text fontWeight="bold">{total.carbs.toFixed(1)}g</Text>
//                 </Box>

//                 <Box flex={1} bg="pink.50" p={2} borderRadius="lg" textAlign="center">
//                   <Text fontSize="xs">Fats</Text>
//                   <Text fontWeight="bold">{total.fats.toFixed(1)}g</Text>
//                 </Box>
//               </HStack>

//               <Button
//                 mt={3}
//                 w="100%"
//                 bg="black"
//                 color="white"
//                 borderRadius="xl"
//                 _hover={{ bg: "#111", transform: "translateY(-1px)" }}
//                 _active={{ transform: "scale(0.98)" }}
//                 onClick={handleConfirm}
//               >
//                 Confirm Meal
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </>
//   );
// };

// export default AddMeal;


// Version 10 
import {
  Box,
  Input,
  Button,
  Select,
  Text,
  VStack,
  Spinner,
  HStack,
  Heading,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon , CloseIcon } from "@chakra-ui/icons";

const AddMeal = () => {
  const [mealType, setMealType] = useState("BREAKFAST");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const isInputValid = input.trim().length > 0;

  const { user } = useAuth();
  const userId = user.id;

  const calculateTotal = (items: any[]) =>
    items.reduce(
      (acc, curr) => ({
        calories: acc.calories + curr.calories,
        protein: acc.protein + curr.protein,
        carbs: acc.carbs + curr.carbs,
        fats: acc.fats + curr.fats
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

  const handleParse = async () => {
    if (!isInputValid) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3004/api/nutrition/add-meal",
        { userId: userId, mealType, input }
      );

      const enriched = res.data.parsedItems.map((item: any) => ({
        ...item,
        baseCalories: item.calories / item.quantity,
        baseProtein: item.protein / item.quantity,
        baseCarbs: item.carbs / item.quantity,
        baseFats: item.fats / item.quantity
      }));

      setPreview(enriched);
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  };

  //const MotionBox = motion(Box);
  const MotionMenuList = motion(MenuList);

  const mealOptions = [
    { label: "🌅 Breakfast", value: "BREAKFAST" },
    { label: "🍛 Lunch", value: "LUNCH" },
    { label: "🌙 Dinner", value: "DINNER" },
    { label: "🍿 Snack", value: "SNACK" }
  ];
  
  const selected = mealOptions.find(m => m.value === mealType);

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...preview];
    const item = updated[index];

    const newQty = Math.max(0, item.quantity + delta);

    item.quantity = newQty;
    item.calories = item.baseCalories * newQty;
    item.protein = item.baseProtein * newQty;
    item.carbs = item.baseCarbs * newQty;
    item.fats = item.baseFats * newQty;

    setPreview(updated);
    setTotal(calculateTotal(updated));
  };

  const removeItem = (index: number) => {
    const updated = preview.filter((_, i) => i !== index);
    setPreview(updated);
    setTotal(calculateTotal(updated));
  };

  const handleConfirm = async () => {
    await axios.post(
      "http://localhost:3004/api/nutrition/confirm-meal",
      { userId: userId, mealType, items: preview, total }
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      {/* SUCCESS */}
      {success && (
        <Box
          position="fixed"
          inset="0"
          bg="rgba(255,255,255,0.7)"
          backdropFilter="blur(10px)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            w="90px"
            h="90px"
            borderRadius="full"
            bg="green.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="40px" color="white">✓</Text>
          </Box>

          <Text mt={4} fontSize="lg" fontWeight="semibold">
            Meal Saved Successfully
          </Text>
        </Box>
      )}

      {/* LOADING */}
      {loading && (
        <Box
          position="fixed"
          inset="0"
          bg="rgba(255,255,255,0.6)"
          backdropFilter="blur(6px)"
          zIndex="999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Spinner size="xl" color="black" />
          <Text mt={3}>Analyzing your meal...</Text>
        </Box>
      )}

      <Box minH="100vh" bg="#f7f8fb">
        {/* <Box px={4} py={6} pb="180px" maxW="420px" mx="auto"> */}
        {/* <Box px={4} py={6} pb="240px" maxW="420px" mx="auto"> */}
        <Box px={4} py={6} pb="260px" maxW="420px" mx="auto">
          <Heading size="md" mb={4}>Add Meal</Heading>

          {/* INPUT CARD */}
          <Box
            p={4}
            borderRadius="2xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="0 8px 24px rgba(0,0,0,0.05)"
            mb={5}
          >
            <VStack spacing={3}>


<Menu>
  <MenuButton
    as={Button}
    rightIcon={<ChevronDownIcon />}
    w="100%"
    textAlign="left"
    bg="white"
    border="1px solid"
    borderColor="gray.300"
    borderRadius="xl"
    px={4}
    py={6}
    fontWeight="medium"
    boxShadow="0 4px 12px rgba(0,0,0,0.04)"
    _hover={{ borderColor: "gray.400", bg: "white" }}
    _active={{ bg: "white" }}
  >
    {selected?.label}
  </MenuButton>

  <MotionMenuList
    initial={{ opacity: 0, y: -10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.98 }}
    transition={{ duration: 0.18, ease: "easeOut" }}
    borderRadius="xl"
    border="1px solid"
    borderColor="brand.100"
    backdropFilter="blur(12px)"
    bg="rgba(255,255,255,0.75)"
    boxShadow="0 20px 40px rgba(0,0,0,0.15)"
    p={2}
  >
    {mealOptions.map((item) => {
      const isActive = item.value === mealType;

      return (
        <MenuItem
          key={item.value}
          borderRadius="lg"
          px={3}
          py={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="medium"
          bg={isActive ? "brand.50" : "transparent"}
          _hover={{
            bg: "brand.100"
          }}
          onClick={() => setMealType(item.value)}
        >
          <Text>{item.label}</Text>

          {isActive && (
            <CheckIcon color="brand.500" boxSize={3} />
          )}
        </MenuItem>
      );
    })}
  </MotionMenuList>
</Menu>

              <Input
                placeholder="Eg: 2 idly with sambar"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                border="1px solid"
                borderColor="gray.300"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 2px rgba(99,189,244,0.2)"
                }}
              />

              <Button
                w="100%"
                bg="black"
                color="white"
                isDisabled={!isInputValid}
                onClick={handleParse}
                _hover={{ bg: "#111", transform: "translateY(-1px)" }}
                _active={{ transform: "scale(0.98)" }}
              >
                Analyze
              </Button>
            </VStack>
          </Box>

          {/* FOOD LIST */}
          <VStack spacing={4}>
            {preview.map((item, i) => (


              <Box
  key={i}
  w="100%"
  p={4}
  borderRadius="2xl"
  bg="white"
  border="1px solid"
  borderColor="gray.200"
  position="relative"
  transition="all 0.2s"
  _hover={{
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  }}
>
  {/* ❌ REMOVE BUTTON */}
  {/* <Box
    position="absolute"
    top="10px"
    right="10px"
    onClick={() => removeItem(i)}
    cursor="pointer"
    bg="rgba(0,0,0,0.05)"
    borderRadius="full"
    p="6px"
    transition="all 0.2s"
    _hover={{
      bg: "rgba(0,0,0,0.12)",
      transform: "scale(1.1)"
    }}
    _active={{
      transform: "scale(0.9)"
    }}
  >
    <CloseIcon boxSize={2.5} color="gray.600" />
  </Box> */}

<Box position="absolute" top="8px" right="8px">
   <Box
    as="button"
    onClick={() => removeItem(i)}
    display="flex"
    alignItems="center"
    justifyContent="center"
    w="22px"
    h="22px"
    borderRadius="full"
    bg="rgba(0,0,0,0.05)"
    backdropFilter="blur(6px)"
    transition="all 0.15s ease"
    _hover={{
      bg: "red.50",
      color: "red.500",
      transform: "scale(1.08)"
    }}
    _active={{
      bg: "red.100",
      transform: "scale(0.95)"
    }}
  >
    <Text fontSize="11px" fontWeight="bold">
      ×
    </Text>
  </Box>
</Box>

  <Flex justify="space-between" align="center">
    <Box>
      <Text fontWeight="semibold">{item.food}</Text>
      <Text fontSize="sm" color="gray.500">
        🔥 {item.calories.toFixed(0)} kcal
      </Text>
    </Box>

    <HStack bg="gray.100" borderRadius="full" px={2}>
      <Button size="xs" onClick={() => updateQuantity(i, -1)}>−</Button>
      <Text px={2}>{item.quantity}</Text>
      <Button
        size="xs"
        bg="black"
        color="white"
        onClick={() => updateQuantity(i, 1)}
      >
        +
      </Button>
    </HStack>
  </Flex>

  <HStack mt={3}>
    <Box bg="purple.50" px={2} py={1} borderRadius="md">
      <Text fontSize="xs">P {item.protein.toFixed(1)}</Text>
    </Box>
    <Box bg="orange.50" px={2} py={1} borderRadius="md">
      <Text fontSize="xs">C {item.carbs.toFixed(1)}</Text>
    </Box>
    <Box bg="pink.50" px={2} py={1} borderRadius="md">
      <Text fontSize="xs">F {item.fats.toFixed(1)}</Text>
    </Box>
  </HStack>
</Box>
            ))}
          </VStack>
        </Box>

        {/* TOTAL */}
{/* TOTAL */}
{preview.length > 0 && (
  <Box
    position="fixed"
    bottom="70px" // above navbar
    left="0"
    right="0"
    zIndex="999"
    px={4}
  >
    <Box maxW="420px" mx="auto">

      {/* 🔥 TOTAL CARD */}
      <Box
        borderRadius="2xl"
        bg="white"
        p={4}
        mb={3}
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
      >
        <Text fontSize="xs" color="gray.500">
          Total Intake
        </Text>

        <Text fontWeight="bold" fontSize="lg">
          🔥 {(total?.calories ?? 0).toFixed(0)} kcal
        </Text>

        <HStack mt={3}>
          <Box flex={1} bg="purple.50" p={2} borderRadius="lg" textAlign="center">
            <Text fontSize="xs">P</Text>
            <Text fontWeight="bold">{(total?.protein ?? 0).toFixed(1)}</Text>
          </Box>

          <Box flex={1} bg="orange.50" p={2} borderRadius="lg" textAlign="center">
            <Text fontSize="xs">C</Text>
            <Text fontWeight="bold">{(total?.carbs ?? 0).toFixed(1)}</Text>
          </Box>

          <Box flex={1} bg="pink.50" p={2} borderRadius="lg" textAlign="center">
            <Text fontSize="xs">F</Text>
            <Text fontWeight="bold">{(total?.fats ?? 0).toFixed(1)}</Text>
          </Box>
        </HStack>
      </Box>

      {/* 🔥 FULL WIDTH BUTTON */}
      <Button
        w="100%"
        h="55px"
        bg="black"
        color="white"
        borderRadius="full"
        fontSize="md"
        fontWeight="semibold"
        boxShadow="0 8px 20px rgba(0,0,0,0.25)"
        _hover={{ bg: "#111" }}
        _active={{ transform: "scale(0.97)" }}
        onClick={handleConfirm}
      >
        Confirm Meal 🚀
      </Button>

    </Box>
  </Box>
)}
      </Box>
    </>
  );
};

export default AddMeal;



