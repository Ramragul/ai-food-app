


// Version 1:


// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// interface Props {
//   onSubmit: (data: {
//     goal: string;
//     ingredients: string[];
//     foodType: string[];
//   }) => void;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// const MealInputForm = ({ onSubmit }: Props) => {
//   const [goal, setGoal] = useState("");
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3004/api/ingredients/core"
//         );
//         setAllIngredients(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, []);

//   const toggleItem = (item: string, list: string[], setList: any) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   const handleSubmit = () => {
//     if (!goal || ingredients.length === 0 || foodType.length === 0) {
//       alert("Please fill all fields");
//       return;
//     }

//     onSubmit({ goal, ingredients, foodType });
//   };

//   // 🔥 Filter logic (type + search)
//   const filteredIngredients = allIngredients.filter((item) => {
//     const matchesType =
//       filterType === "all" || item.type === filterType;

//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return matchesType && matchesSearch;
//   });

//   return (
//     <Box
//       p={6}
//       borderRadius="2xl"
//       boxShadow="lg"
//       bg="white"
//       maxW="900px"
//       mx="auto"
//       border="1px solid"
//       borderColor="brand"
//     >
//       <VStack spacing={5} align="stretch">
//         {/* Goal */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🎯 Goal
//           </Text>
//           <Input
//             placeholder="e.g. 50g protein, 300 kcal, lean bulk"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//           />
//         </Box>

//         {/* Ingredients */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🥗 Ingredients
//           </Text>

//           {/* Search */}
//           <Input
//             placeholder="Search ingredients (e.g. chicken, paneer...)"
//             mb={3}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* Filter */}
//           <HStack mb={3}>
//             {["all", "veg", "non-veg"].map((type) => (
//               <Button
//                 key={type}
//                 size="sm"
//                 variant={filterType === type ? "solid" : "outline"}
//                 colorScheme="brand"
//                 onClick={() => setFilterType(type)}
//               >
//                 {type.toUpperCase()}
//               </Button>
//             ))}
//           </HStack>

//           {/* 🔥 GRID FIX (mobile perfect) */}
//           <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
//             {filteredIngredients.map((item) => {
//               const isSelected = ingredients.includes(item.name);

//               return (
//                 <Box
//                   key={item.id}
//                   borderRadius="xl"
//                   overflow="hidden"
//                   border="2px solid"
//                   borderColor={isSelected ? "brand.400" : "gray.200"}
//                   bg={isSelected ? "brand.50" : "white"}
//                   cursor="pointer"
//                   onClick={() =>
//                     toggleItem(item.name, ingredients, setIngredients)
//                   }
//                   transition="0.2s"
//                   _hover={{ transform: "scale(1.05)" }}
//                 >
//                   {/* Image */}
//                   <Box h="80px" bg="gray.100">
//                     <img
//                       src={item.image_url}
//                       alt={item.name}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Box>

//                   {/* Info */}
//                   <Box p={2}>
//                     <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
//                       {item.name}
//                     </Text>

//                     <Text
//                       fontSize="xs"
//                       color={
//                         item.type === "veg" ? "green.500" : "red.500"
//                       }
//                     >
//                       {item.type}
//                     </Text>

//                     <Text fontSize="xs" color="gray.500">
//                       {item.protein}g protein
//                     </Text>

//                     <Text fontSize="xs" color="gray.400">
//                       {item.calories} kcal
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </SimpleGrid>
//         </Box>

//         {/* Food Types */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🍽️ Food Type
//           </Text>

//           <HStack flexWrap="wrap">
//             {ALL_FOOD_TYPES.map((item) => (
//               <Tag
//                 key={item}
//                 size="lg"
//                 variant="subtle"
//                 bg={foodType.includes(item) ? "brand.200" : "transparent"}
//                 color="black"
//                 border="1px solid"
//                 borderColor="brand.200"
//                 cursor="pointer"
//                 _hover={{ bg: "brand.100" }}
//                 transition="0.2s"
//                 onClick={() => toggleItem(item, foodType, setFoodType)}
//               >
//                 <TagLabel>{item}</TagLabel>
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* Selected */}
//         <Box>
//           <Text fontSize="sm" color="gray.500">
//             Selected Ingredients:
//           </Text>

//           <HStack spacing={2} flexWrap="wrap">
//             {ingredients.map((item) => (
//               <Tag key={item} colorScheme="brand">
//                 <TagLabel>{item}</TagLabel>
//                 <TagCloseButton
//                   onClick={() =>
//                     setIngredients(
//                       ingredients.filter((i) => i !== item)
//                     )
//                   }
//                 />
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* Submit */}
//         <Button
//           bg="brand.200"
//           color="black"
//           _hover={{ bg: "brand.300" }}
//           size="lg"
//           onClick={handleSubmit}
//         >
//           ✨ Generate Meals
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;





// Version 2 : clone of version 1 

// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
//   Spinner,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// const MealInputForm = () => {
//   const navigate = useNavigate();

//   const [goal, setGoal] = useState("");
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3004/api/ingredients/core"
//         );
//         setAllIngredients(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, []);

//   const toggleItem = (item: string, list: string[], setList: any) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!goal || ingredients.length === 0 || foodType.length === 0) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:3004/api/meals/generate",
//         {
//           goal,
//           ingredients,
//           foodType,
//           page: 1,
//         }
//       );

//       const meals = res.data.recommendations;

//       navigate("/results", {
//         state: {
//           goal,
//           ingredients,
//           foodType,
//           initialMeals: meals,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredIngredients = allIngredients.filter((item) => {
//     const matchesType =
//       filterType === "all" || item.type === filterType;

//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return matchesType && matchesSearch;
//   });

//   return (
//     <Box
//       p={6}
//       borderRadius="2xl"
//       boxShadow="lg"
//       bg="white"
//       maxW="900px"
//       mx="auto"
//       border="1px solid"
//       borderColor="brand"
//     >
//       <VStack spacing={5} align="stretch">
//         {/* Goal */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🎯 Goal
//           </Text>
//           <Input
//             placeholder="e.g. 50g protein, 300 kcal, lean bulk"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//           />
//         </Box>

//         {/* Ingredients */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🥗 Ingredients
//           </Text>

//           <Input
//             placeholder="Search ingredients"
//             mb={3}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <HStack mb={3}>
//             {["all", "veg", "non-veg"].map((type) => (
//               <Button
//                 key={type}
//                 size="sm"
//                 variant={filterType === type ? "solid" : "outline"}
//                 colorScheme="brand"
//                 onClick={() => setFilterType(type)}
//               >
//                 {type.toUpperCase()}
//               </Button>
//             ))}
//           </HStack>

//           <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
//             {filteredIngredients.map((item) => {
//               const isSelected = ingredients.includes(item.name);

//               return (
//                 <Box
//                   key={item.id}
//                   borderRadius="xl"
//                   overflow="hidden"
//                   border="2px solid"
//                   borderColor={isSelected ? "brand.400" : "gray.200"}
//                   bg={isSelected ? "brand.50" : "white"}
//                   cursor="pointer"
//                   onClick={() =>
//                     toggleItem(item.name, ingredients, setIngredients)
//                   }
//                   _hover={{ transform: "scale(1.05)" }}
//                 >
//                   <Box h="80px">
//                     <img
//                       src={item.image_url}
//                       alt={item.name}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Box>

//                   <Box p={2}>
//                     <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <Text fontSize="xs" color="gray.500">
//                       {item.protein}g protein
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </SimpleGrid>
//         </Box>

//         {/* Food Types */}
//         <HStack flexWrap="wrap">
//           {ALL_FOOD_TYPES.map((item) => (
//             <Tag
//               key={item}
//               size="lg"
//               bg={foodType.includes(item) ? "brand.200" : "transparent"}
//               border="1px solid"
//               borderColor="brand.200"
//               cursor="pointer"
//               onClick={() => toggleItem(item, foodType, setFoodType)}
//             >
//               <TagLabel>{item}</TagLabel>
//             </Tag>
//           ))}
//         </HStack>

//         {/* Selected */}
//         <HStack spacing={2} flexWrap="wrap">
//           {ingredients.map((item) => (
//             <Tag key={item} colorScheme="brand">
//               <TagLabel>{item}</TagLabel>
//               <TagCloseButton
//                 onClick={() =>
//                   setIngredients(ingredients.filter((i) => i !== item))
//                 }
//               />
//             </Tag>
//           ))}
//         </HStack>

//         {/* Loading UI */}
//         {loading && (
//           <Box textAlign="center">
//             <Spinner size="xl" />
//             <Text mt={3} fontWeight="bold">
//               Cooking your meals... 🍳
//             </Text>
//           </Box>
//         )}

//         {/* Submit */}
//         <Button
//           isLoading={loading}
//           loadingText="Generating..."
//           bg="brand.200"
//           onClick={handleSubmit}
//         >
//           ✨ Generate Meals
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;



// Version 3 : enhancement to version 1

// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
//   Spinner,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// // 🔥 NEW: Goal presets (hybrid strategy)
// const GOAL_PRESETS = [
//   "Weight Loss",
//   "Muscle Gain",
//   "High Protein",
//   "Low Carb",
//   "Low Calorie",
//   "Balanced Diet",
// ];

// const MealInputForm = () => {
//   const navigate = useNavigate();

//   const [goal, setGoal] = useState("");
//   const [selectedGoals, setSelectedGoals] = useState<string[]>([]); // ✅ NEW
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3004/api/ingredients/core"
//         );
//         setAllIngredients(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, []);

//   const toggleItem = (item: string, list: string[], setList: any) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   // ✅ NEW: toggle goal presets
//   const toggleGoal = (item: string) => {
//     if (selectedGoals.includes(item)) {
//       setSelectedGoals(selectedGoals.filter((g) => g !== item));
//     } else {
//       setSelectedGoals([...selectedGoals, item]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       (!goal && selectedGoals.length === 0) ||
//       ingredients.length === 0 ||
//       foodType.length === 0
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔥 NEW: combine presets + text into SINGLE STRING
//       const finalGoal = [...selectedGoals, goal.trim()]
//         .filter(Boolean)
//         .join(", ");

//       const res = await axios.post(
//         "http://localhost:3004/api/meals/generate",
//         {
//           goal: finalGoal,
//           ingredients,
//           foodType,
//           page: 1,
//         }
//       );

//       const meals = res.data.recommendations;

//       navigate("/results", {
//         state: {
//           goal: finalGoal, // ✅ send combined goal
//           ingredients,
//           foodType,
//           initialMeals: meals,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredIngredients = allIngredients.filter((item) => {
//     const matchesType =
//       filterType === "all" || item.type === filterType;

//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return matchesType && matchesSearch;
//   });

//   return (
//     <Box
//       p={6}
//       borderRadius="2xl"
//       boxShadow="lg"
//       bg="white"
//       maxW="900px"
//       mx="auto"
//       border="1px solid"
//       borderColor="brand"
//     >
//       <VStack spacing={5} align="stretch">
//         {/* 🎯 Goal */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🎯 Goal
//           </Text>

//           {/* Free text */}
//           <Input
//             placeholder="e.g. high protein, low carb"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             mb={3}
//           />

//           {/* Preset chips */}
//           <HStack flexWrap="wrap">
//             {GOAL_PRESETS.map((item) => (
//               <Tag
//                 key={item}
//                 size="lg"
//                 bg={selectedGoals.includes(item) ? "brand.200" : "transparent"}
//                 border="1px solid"
//                 borderColor="brand.200"
//                 cursor="pointer"
//                 onClick={() => toggleGoal(item)}
//               >
//                 <TagLabel>{item}</TagLabel>
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* 🥗 Ingredients */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🥗 Ingredients
//           </Text>

//           <Input
//             placeholder="Search ingredients"
//             mb={3}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <HStack mb={3}>
//             {["all", "veg", "non-veg"].map((type) => (
//               <Button
//                 key={type}
//                 size="sm"
//                 variant={filterType === type ? "solid" : "outline"}
//                 colorScheme="brand"
//                 onClick={() => setFilterType(type)}
//               >
//                 {type.toUpperCase()}
//               </Button>
//             ))}
//           </HStack>

//           <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
//             {filteredIngredients.map((item) => {
//               const isSelected = ingredients.includes(item.name);

//               return (
//                 <Box
//                   key={item.id}
//                   borderRadius="xl"
//                   overflow="hidden"
//                   border="2px solid"
//                   borderColor={isSelected ? "brand.400" : "gray.200"}
//                   bg={isSelected ? "brand.50" : "white"}
//                   cursor="pointer"
//                   onClick={() =>
//                     toggleItem(item.name, ingredients, setIngredients)
//                   }
//                   _hover={{ transform: "scale(1.05)" }}
//                 >
//                   <Box h="80px">
//                     <img
//                       src={item.image_url}
//                       alt={item.name}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Box>

//                   <Box p={2}>
//                     <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <Text fontSize="xs" color="gray.500">
//                       {item.protein}g protein
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </SimpleGrid>
//         </Box>

//         {/* 🍱 Food Types */}
//         <HStack flexWrap="wrap">
//           {ALL_FOOD_TYPES.map((item) => (
//             <Tag
//               key={item}
//               size="lg"
//               bg={foodType.includes(item) ? "brand.200" : "transparent"}
//               border="1px solid"
//               borderColor="brand.200"
//               cursor="pointer"
//               onClick={() => toggleItem(item, foodType, setFoodType)}
//             >
//               <TagLabel>{item}</TagLabel>
//             </Tag>
//           ))}
//         </HStack>

//         {/* Selected Ingredients */}
//         <HStack spacing={2} flexWrap="wrap">
//           {ingredients.map((item) => (
//             <Tag key={item} colorScheme="brand">
//               <TagLabel>{item}</TagLabel>
//               <TagCloseButton
//                 onClick={() =>
//                   setIngredients(ingredients.filter((i) => i !== item))
//                 }
//               />
//             </Tag>
//           ))}
//         </HStack>

//         {/* Loading */}
//         {loading && (
//           <Box textAlign="center">
//             <Spinner size="xl" />
//             <Text mt={3} fontWeight="bold">
//               Cooking your meals... 🍳
//             </Text>
//           </Box>
//         )}

//         {/* Submit */}
//         <Button
//           isLoading={loading}
//           loadingText="Generating..."
//           bg="brand.200"
//           onClick={handleSubmit}
//         >
//           ✨ Generate Meals
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;


// Version 4 : Enhancement to Version 3 with home / restaurant changes

// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
//   Spinner,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../../context/AppModeContext";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// const GOAL_PRESETS = [
//   "Weight Loss",
//   "Muscle Gain",
//   "High Protein",
//   "Low Carb",
//   "Low Calorie",
//   "Balanced Diet",
// ];

// const MealInputForm = () => {
//   const navigate = useNavigate();
//   const { mode } = useAppMode(); // 🔥 MODE

//   const [goal, setGoal] = useState("");
//   const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔥 NEW STATES
//   const [customIngredient, setCustomIngredient] = useState("");
//   const [previewIngredient, setPreviewIngredient] = useState<any>(null);

//   // 🔥 FETCH BASED ON MODE
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3004/api/ingredients/core?mode=${mode}`
//         );
//         setAllIngredients(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, [mode]);

//   const toggleItem = (item: string, list: string[], setList: any) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   const toggleGoal = (item: string) => {
//     if (selectedGoals.includes(item)) {
//       setSelectedGoals(selectedGoals.filter((g) => g !== item));
//     } else {
//       setSelectedGoals([...selectedGoals, item]);
//     }
//   };

//   // 🔥 ADD CUSTOM INGREDIENT
//   const handleAddCustom = async () => {
//     if (!customIngredient) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/ingredients/create-from-ai",
//         { name: customIngredient }
//       );

//       if (res.data.exists) {
//         setIngredients([...ingredients, res.data.data.name]);
//       } else {
//         setPreviewIngredient(res.data.preview);
//       }

//       setCustomIngredient("");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 CONFIRM INGREDIENT
//   const handleConfirmIngredient = async () => {
//     try {
//       await axios.post(
//         "http://localhost:3004/api/ingredients/confirm",
//         previewIngredient
//       );

//       setIngredients([...ingredients, previewIngredient.name]);
//       setPreviewIngredient(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       (!goal && selectedGoals.length === 0) ||
//       ingredients.length === 0 ||
//       foodType.length === 0
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const finalGoal = [...selectedGoals, goal.trim()]
//         .filter(Boolean)
//         .join(", ");

//       const res = await axios.post(
//         "http://localhost:3004/api/meals/generate",
//         {
//           goal: finalGoal,
//           ingredients,
//           foodType,
//           page: 1,
//         }
//       );

//       navigate("/results", {
//         state: {
//           goal: finalGoal,
//           ingredients,
//           foodType,
//           initialMeals: res.data.recommendations,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredIngredients = allIngredients.filter((item) => {
//     const matchesType =
//       filterType === "all" || item.type === filterType;

//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return matchesType && matchesSearch;
//   });

//   return (
//     <Box
//       p={6}
//       borderRadius="2xl"
//       boxShadow="lg"
//       bg="white"
//       maxW="900px"
//       mx="auto"
//       border="1px solid"
//       borderColor="gray.200"
//     >
//       <VStack spacing={5} align="stretch">

//         {/* 🎯 Goal */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>🎯 Goal</Text>

//           <Input
//             placeholder="e.g. high protein, low carb"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             mb={3}
//           />

//           <HStack flexWrap="wrap">
//             {GOAL_PRESETS.map((item) => (
//               <Tag
//                 key={item}
//                 size="lg"
//                 bg={selectedGoals.includes(item) ? "brand.200" : "transparent"}
//                 border="1px solid"
//                 borderColor="brand.200"
//                 cursor="pointer"
//                 onClick={() => toggleGoal(item)}
//               >
//                 <TagLabel>{item}</TagLabel>
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* 🥗 Ingredients */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🥗 Ingredients ({mode.toUpperCase()})
//           </Text>

//           <Input
//             placeholder="Search ingredients"
//             mb={3}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* 🔥 ADD CUSTOM (HOME ONLY) */}
//           {mode === "home" && (
//             <HStack mb={3}>
//               <Input
//                 placeholder="Add ingredient (e.g. quinoa)"
//                 value={customIngredient}
//                 onChange={(e) => setCustomIngredient(e.target.value)}
//               />
//               <Button onClick={handleAddCustom}>Add</Button>
//             </HStack>
//           )}

//           <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
//             {filteredIngredients.map((item) => {
//               const isSelected = ingredients.includes(item.name);

//               return (
//                 <Box
//                   key={item.id}
//                   borderRadius="xl"
//                   overflow="hidden"
//                   border="2px solid"
//                   borderColor={isSelected ? "brand.400" : "gray.200"}
//                   bg={isSelected ? "brand.50" : "white"}
//                   cursor="pointer"
//                   onClick={() =>
//                     toggleItem(item.name, ingredients, setIngredients)
//                   }
//                   _hover={{ transform: "scale(1.05)" }}
//                 >
//                   <Box h="80px">
//                     <img
//                       src={item.image_url}
//                       alt={item.name}
//                       style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                     />
//                   </Box>

//                   <Box p={2}>
//                     <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <Text fontSize="xs" color="gray.500">
//                       {item.protein}g protein
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </SimpleGrid>
//         </Box>

//         {/* 🔥 PREVIEW MODAL */}
//         {previewIngredient && (
//           <Box p={4} borderRadius="xl" bg="gray.50">
//             <Text fontWeight="bold">{previewIngredient.name}</Text>
//             <Text>🔥 {previewIngredient.calories} kcal</Text>

//             <HStack mt={3}>
//               <Button onClick={handleConfirmIngredient}>Confirm</Button>
//               <Button onClick={() => setPreviewIngredient(null)}>Cancel</Button>
//             </HStack>
//           </Box>
//         )}

//         {/* 🍱 Food Types */}
//         <HStack flexWrap="wrap">
//           {ALL_FOOD_TYPES.map((item) => (
//             <Tag
//               key={item}
//               size="lg"
//               bg={foodType.includes(item) ? "brand.200" : "transparent"}
//               border="1px solid"
//               borderColor="brand.200"
//               cursor="pointer"
//               onClick={() => toggleItem(item, foodType, setFoodType)}
//             >
//               <TagLabel>{item}</TagLabel>
//             </Tag>
//           ))}
//         </HStack>

//         {/* Selected Ingredients */}
//         <HStack spacing={2} flexWrap="wrap">
//           {ingredients.map((item) => (
//             <Tag key={item} colorScheme="brand">
//               <TagLabel>{item}</TagLabel>
//               <TagCloseButton
//                 onClick={() =>
//                   setIngredients(ingredients.filter((i) => i !== item))
//                 }
//               />
//             </Tag>
//           ))}
//         </HStack>

//         {loading && (
//           <Box textAlign="center">
//             <Spinner size="xl" />
//             <Text mt={3}>Cooking your meals... 🍳</Text>
//           </Box>
//         )}

//         <Button
//           isLoading={loading}
//           bg="brand.200"
//           onClick={handleSubmit}
//         >
//           ✨ Generate Meals
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;



// version 8  Enhancement to v3

// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
//   Spinner,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../../context/AppModeContext";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// const GOAL_PRESETS = [
//   "Weight Loss",
//   "Muscle Gain",
//   "High Protein",
//   "Low Carb",
//   "Low Calorie",
//   "Balanced Diet",
// ];

// const MealInputForm = () => {
//   const navigate = useNavigate();
//   const { mode } = useAppMode();

//   const [goal, setGoal] = useState("");
//   const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [customIngredient, setCustomIngredient] = useState("");
//   const [previewIngredient, setPreviewIngredient] = useState<any>(null);

//   // 🔥 FETCH FIXED
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3004/api/ingredients/core?mode=${mode}`
//         );
//         setAllIngredients(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, [mode]);

//   const toggleItem = (item: string) => {
//     if (ingredients.includes(item)) {
//       setIngredients(ingredients.filter((i) => i !== item));
//     } else {
//       setIngredients([...ingredients, item]);
//     }
//   };

//   const toggleGoal = (item: string) => {
//     if (selectedGoals.includes(item)) {
//       setSelectedGoals(selectedGoals.filter((g) => g !== item));
//     } else {
//       setSelectedGoals([...selectedGoals, item]);
//     }
//   };

//   // 🔥 ADD INGREDIENT
//   const handleAddCustom = async () => {
//     if (!customIngredient) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/ingredients/create-from-ai",
//         { name: customIngredient }
//       );

//       if (res.data.exists) {
//         setIngredients([...ingredients, res.data.data.name]);
//       } else {
//         setPreviewIngredient(res.data.preview);
//       }

//       setCustomIngredient("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmIngredient = async () => {
//     await axios.post(
//       "http://localhost:3004/api/ingredients/confirm",
//       previewIngredient
//     );

//     setIngredients([...ingredients, previewIngredient.name]);
//     setPreviewIngredient(null);
//   };

//   const filteredIngredients = allIngredients.filter((item) => {
//     return (
//       (filterType === "all" || item.type === filterType) &&
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   return (
//     <Box p={6} maxW="900px" mx="auto">
//       <VStack spacing={6} align="stretch">

//         {/* GOAL */}
//         <Box>
//           <Text fontWeight="bold">🎯 Goal</Text>
//           <Input value={goal} onChange={(e) => setGoal(e.target.value)} />

//           <HStack mt={2} wrap="wrap">
//             {GOAL_PRESETS.map((g) => (
//               <Tag
//                 key={g}
//                 cursor="pointer"
//                 bg={selectedGoals.includes(g) ? "brand.200" : "gray.100"}
//                 onClick={() => toggleGoal(g)}
//               >
//                 <TagLabel>{g}</TagLabel>
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* INGREDIENTS */}
//         <Box>
//           <Text fontWeight="bold">
//             🥗 Ingredients ({mode.toUpperCase()})
//           </Text>

//           <Input
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             mt={2}
//           />

//           <HStack mt={2}>
//             {["all", "veg", "non-veg"].map((t) => (
//               <Button
//                 key={t}
//                 size="sm"
//                 bg={filterType === t ? "black" : "white"}
//                 color={filterType === t ? "white" : "gray.600"}
//                 onClick={() => setFilterType(t)}
//               >
//                 {t}
//               </Button>
//             ))}
//           </HStack>

//           {/* 🔥 PREMIUM ADD BOX */}
//           {mode === "home" && (
//             <Box
//               mt={4}
//               p={4}
//               borderRadius="xl"
//               border="1px dashed"
//               borderColor="brand.200"
//               bg="brand.50"
//             >
//               <Text fontSize="sm">Add your ingredient</Text>

//               <HStack mt={2}>
//                 <Input
//                   value={customIngredient}
//                   onChange={(e) => setCustomIngredient(e.target.value)}
//                 />
//                 <Button bg="black" color="white" onClick={handleAddCustom}>
//                   Add
//                 </Button>
//               </HStack>
//             </Box>
//           )}

//           {/* GRID */}
//           <SimpleGrid columns={[2, 3, 4]} spacing={4} mt={4}>
//             {filteredIngredients.map((item) => (
//               <Box
//                 key={item.id}
//                 border="1px solid"
//                 borderColor={
//                   ingredients.includes(item.name)
//                     ? "brand.400"
//                     : "gray.200"
//                 }
//                 borderRadius="xl"
//                 p={2}
//                 cursor="pointer"
//                 onClick={() => toggleItem(item.name)}
//               >
//                 <Text>{item.name}</Text>
//                 <Text fontSize="xs">{item.protein}g protein</Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Box>

//         {/* 🔥 PREVIEW MODAL */}
//         {previewIngredient && (
//           <Box
//             p={5}
//             borderRadius="2xl"
//             bg="white"
//             boxShadow="xl"
//             border="1px solid"
//           >
//             <Text fontWeight="bold">{previewIngredient.name}</Text>

//             <HStack mt={3}>
//               <Text>🔥 {previewIngredient.calories}</Text>
//               <Text>💪 {previewIngredient.protein}</Text>
//               <Text>🍞 {previewIngredient.carbs}</Text>
//               <Text>🧈 {previewIngredient.fat}</Text>
//             </HStack>

//             <Text mt={2}>Type: {previewIngredient.type}</Text>

//             <HStack mt={3}>
//               <Button bg="black" color="white" onClick={handleConfirmIngredient}>
//                 Confirm
//               </Button>
//               <Button onClick={() => setPreviewIngredient(null)}>
//                 Cancel
//               </Button>
//             </HStack>
//           </Box>
//         )}

//         {/* SELECTED */}
//         <HStack wrap="wrap">
//           {ingredients.map((i) => (
//             <Tag key={i}>
//               <TagLabel>{i}</TagLabel>
//               <TagCloseButton
//                 onClick={() =>
//                   setIngredients(ingredients.filter((x) => x !== i))
//                 }
//               />
//             </Tag>
//           ))}
//         </HStack>

//         {loading && <Spinner />}

//         <Button bg="black" color="white">
//           Generate Meals
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;



// Version 9 : Enhancement to V3

// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   SimpleGrid,
//   Spinner,
//   Image,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAppMode } from "../../context/AppModeContext";

// // ADD THIS IMPORT
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@chakra-ui/react";

// interface Ingredient {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   image_url: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   fibre: number;
// }

// const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

// const GOAL_PRESETS = [
//   "Weight Loss",
//   "Muscle Gain",
//   "High Protein",
//   "Low Carb",
//   "Low Calorie",
//   "Balanced Diet",
// ];

// // ✅ fallback image
// const FALLBACK_IMG =
//   "https://cdn-icons-png.flaticon.com/512/1046/1046857.png";

// const MealInputForm = () => {
//   const navigate = useNavigate();
//   const { mode } = useAppMode(); // 🔥 home / restaurant

//   const [goal, setGoal] = useState("");
//   const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
//   const [ingredients, setIngredients] = useState<string[]>([]);
//   const [foodType, setFoodType] = useState<string[]>([]);
//   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
//   const [filterType, setFilterType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [previewIngredient, setPreviewIngredient] = useState<any>(null);
// const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   const [customIngredient, setCustomIngredient] = useState("");

//   // 🔥 FETCH BASED ON MODE
//   // useEffect(() => {
//   //   const fetchIngredients = async () => {
//   //     try {
//   //       let url = "http://localhost:3004/api/ingredients/core";

//   //       console.log("Mode value is " +mode)

//   //       // 👉 restaurant → only restaurant
//   //       // 👉 home → ALL (backend should handle this OR we override)
//   //       if (mode === "restaurant") {
//   //         console.log("Inside Restaurant")
//   //         url += "?mode=restaurant";
//   //       }

//   //       const res = await axios.get(url);

//   //       setAllIngredients(res.data.data || []);
//   //     } catch (err) {
//   //       console.error("Failed to fetch ingredients", err);
//   //     }
//   //   };

//   //   fetchIngredients();
//   // }, [mode]);

//     useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3004/api/ingredients/core?mode=${mode}`
//         );
//         setAllIngredients(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch ingredients", err);
//       }
//     };

//     fetchIngredients();
//   }, [mode]);

//   const toggleItem = (item: string, list: string[], setList: any) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   const toggleGoal = (item: string) => {
//     if (selectedGoals.includes(item)) {
//       setSelectedGoals(selectedGoals.filter((g) => g !== item));
//     } else {
//       setSelectedGoals([...selectedGoals, item]);
//     }
//   };

//   // 🔥 ADD INGREDIENT (clean inline UI)
//   // const handleAddCustom = async () => {
//   //   if (!customIngredient) return;

//   //   try {
//   //     setLoading(true);

//   //     const res = await axios.post(
//   //       "http://localhost:3004/api/ingredients/create-from-ai",
//   //       { name: customIngredient }
//   //     );

//   //     const newItem = res.data.data || res.data.preview;

//   //     if (newItem) {
//   //       setAllIngredients((prev) => [newItem, ...prev]);
//   //       setIngredients((prev) => [...prev, newItem.name]);
//   //     }

//   //     setCustomIngredient("");
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleAddCustom = async () => {
//     if (!customIngredient) return;
  
//     try {
//       setLoading(true);
  
//       const res = await axios.post(
//         "http://localhost:3004/api/ingredients/create-from-ai",
//         { name: customIngredient }
//       );
  
//       // ✅ Already exists
//       if (res.data.exists) {
//         const existing = res.data.data;
  
//         setIngredients((prev) => [...prev, existing.name]);
//         setCustomIngredient("");
//         return;
//       }
  
//       // ✅ NEW → show preview modal
//       setPreviewIngredient(res.data.preview);
//       setIsPreviewOpen(true);
//       setCustomIngredient("");
  
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmIngredient = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3004/api/ingredients/confirm",
//         previewIngredient
//       );
  
//       const saved = res.data.data || previewIngredient;
  
//       // ✅ update UI
//       setAllIngredients((prev) => [saved, ...prev]);
//       setIngredients((prev) => [...prev, saved.name]);
  
//       setIsPreviewOpen(false);
//       setPreviewIngredient(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       (!goal && selectedGoals.length === 0) ||
//       ingredients.length === 0 ||
//       foodType.length === 0
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const finalGoal = [...selectedGoals, goal.trim()]
//         .filter(Boolean)
//         .join(", ");

//       const res = await axios.post(
//         "http://localhost:3004/api/meals/generate",
//         {
//           goal: finalGoal,
//           ingredients,
//           foodType,
//           page: 1,
//         }
//       );

//       navigate("/results", {
//         state: {
//           goal: finalGoal,
//           ingredients,
//           foodType,
//           initialMeals: res.data.recommendations,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredIngredients = allIngredients.filter((item) => {
//     return (
//       (filterType === "all" || item.type === filterType) &&
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   return (
//     <Box
//       p={6}
//       borderRadius="2xl"
//       boxShadow="lg"
//       bg="white"
//       maxW="900px"
//       mx="auto"
//       border="1px solid"
//       borderColor="brand"
//     >
//       <VStack spacing={5} align="stretch">

//         {/* 🎯 Goal */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>🎯 Goal</Text>

//           <Input
//             placeholder="e.g. high protein"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             mb={3}
//           />

//           <HStack flexWrap="wrap">
//             {GOAL_PRESETS.map((item) => (
//               <Tag
//                 key={item}
//                 size="lg"
//                 bg={selectedGoals.includes(item) ? "brand.200" : "transparent"}
//                 border="1px solid"
//                 borderColor="brand.200"
//                 cursor="pointer"
//                 onClick={() => toggleGoal(item)}
//               >
//                 <TagLabel>{item}</TagLabel>
//               </Tag>
//             ))}
//           </HStack>
//         </Box>

//         {/* 🥗 Ingredients */}
//         <Box>
//           <Text fontWeight="bold" mb={2}>
//             🥗 Ingredients ({mode.toUpperCase()})
//           </Text>

//           <Input
//             placeholder="Search ingredients"
//             mb={3}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <HStack mb={3}>
//             {["all", "veg", "non-veg"].map((type) => (
//               <Button
//                 key={type}
//                 size="sm"
//                 variant={filterType === type ? "solid" : "outline"}
//                 colorScheme="brand"
//                 onClick={() => setFilterType(type)}
//               >
//                 {type.toUpperCase()}
//               </Button>
//             ))}
//           </HStack>

//           {/* 🔥 ADD INGREDIENT (ONLY HOME) */}
//           {mode === "home" && (
//             <HStack mb={3}>
//               <Input
//                 placeholder="Add ingredient..."
//                 value={customIngredient}
//                 onChange={(e) => setCustomIngredient(e.target.value)}
//               />
//               <Button onClick={handleAddCustom} colorScheme="brand">
//                 Add
//               </Button>
//             </HStack>
//           )}

//           {/* 🔥 GRID (OLD UI RESTORED) */}
//           <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
//             {filteredIngredients.map((item) => {
//               const isSelected = ingredients.includes(item.name);

//               return (
//                 <Box
//                   key={item.id}
//                   borderRadius="xl"
//                   overflow="hidden"
//                   border="2px solid"
//                   borderColor={isSelected ? "brand.400" : "gray.200"}
//                   bg={isSelected ? "brand.50" : "white"}
//                   cursor="pointer"
//                   onClick={() =>
//                     toggleItem(item.name, ingredients, setIngredients)
//                   }
//                   _hover={{ transform: "scale(1.05)" }}
//                 >
//                   <Box h="80px">
//                     <Image
//                       src={item.image_url || FALLBACK_IMG}
//                       fallbackSrc={FALLBACK_IMG}
//                       alt={item.name}
//                       w="100%"
//                       h="100%"
//                       objectFit="cover"
//                     />
//                   </Box>

//                   <Box p={2}>
//                     <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
//                       {item.name}
//                     </Text>
//                     <Text fontSize="xs" color="gray.500">
//                       {item.protein}g protein
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </SimpleGrid>
//         </Box>

//         {/* 🍱 Food Types */}
//         <HStack flexWrap="wrap">
//           {ALL_FOOD_TYPES.map((item) => (
//             <Tag
//               key={item}
//               size="lg"
//               bg={foodType.includes(item) ? "brand.200" : "transparent"}
//               border="1px solid"
//               borderColor="brand.200"
//               cursor="pointer"
//               onClick={() => toggleItem(item, foodType, setFoodType)}
//             >
//               <TagLabel>{item}</TagLabel>
//             </Tag>
//           ))}
//         </HStack>

//         {/* Selected */}
//         <HStack flexWrap="wrap">
//           {ingredients.map((item) => (
//             <Tag key={item} colorScheme="brand">
//               <TagLabel>{item}</TagLabel>
//               <TagCloseButton
//                 onClick={() =>
//                   setIngredients(ingredients.filter((i) => i !== item))
//                 }
//               />
//             </Tag>
//           ))}
//         </HStack>

//         {/* Loading */}
//         {loading && (
//           <Box textAlign="center">
//             <Spinner size="xl" />
//             <Text mt={3}>Cooking your meals... 🍳</Text>
//           </Box>
//         )}

//         {/* Submit */}
//         <Button
//           isLoading={loading}
//           bg="brand.200"
//           onClick={handleSubmit}
//         >
//           ✨ Generate Meals
//         </Button>

//         <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} isCentered>
//   <ModalOverlay />
//   <ModalContent borderRadius="2xl">

//     <ModalHeader>
//       ✨ Confirm Ingredient
//     </ModalHeader>

//     <ModalBody>
//       {previewIngredient && (
//         <VStack align="start" spacing={3}>

//           <Text fontWeight="bold" fontSize="lg">
//             {previewIngredient.name}
//           </Text>

//           <HStack>
//             <Tag colorScheme="red">🔥 {previewIngredient.calories} kcal</Tag>
//             <Tag colorScheme="green">💪 {previewIngredient.protein}g</Tag>
//             <Tag colorScheme="yellow">🍞 {previewIngredient.carbs}g</Tag>
//             <Tag colorScheme="purple">🧈 {previewIngredient.fat}g</Tag>
//           </HStack>

//           <Text fontSize="sm" color="gray.500">
//             Type: {previewIngredient.type}
//           </Text>

//         </VStack>
//       )}
//     </ModalBody>

//     <ModalFooter>
//       <Button mr={3} onClick={() => setIsPreviewOpen(false)}>
//         Cancel
//       </Button>
//       <Button colorScheme="brand" onClick={handleConfirmIngredient}>
//         Confirm & Add
//       </Button>
//     </ModalFooter>

//   </ModalContent>
// </Modal>
//       </VStack>
//     </Box>
//   );
// };

// export default MealInputForm;


// version 10: clone of 9


import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid,
  Spinner,
  Image,
  useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppMode } from "../../context/AppModeContext";


// ADD THIS IMPORT
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import api from "../../utils/api";

interface Ingredient {
  id: number;
  name: string;
  type: string;
  category: string;
  image_url: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
}

const ALL_FOOD_TYPES = ["Sandwich", "Wrap", "RiceBowl"];

const GOAL_PRESETS = [
  "Weight Loss",
  "Muscle Gain",
  "High Protein",
  "Low Carb",
  "Low Calorie",
  "Balanced Diet",
];

// ✅ fallback image
const FALLBACK_IMG =
  "https://cdn-icons-png.flaticon.com/512/1046/1046857.png";

const MealInputForm = () => {
  const navigate = useNavigate();
  const { mode } = useAppMode(); // 🔥 home / restaurant
  const toast = useToast();

  const [goal, setGoal] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [existsMessage, setExistsMessage] = useState("");

  const [previewIngredient, setPreviewIngredient] = useState<any>(null);
const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [customIngredient, setCustomIngredient] = useState("");

  // 🔥 FETCH BASED ON MODE
  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     try {
  //       let url = "http://localhost:3004/api/ingredients/core";

  //       console.log("Mode value is " +mode)

  //       // 👉 restaurant → only restaurant
  //       // 👉 home → ALL (backend should handle this OR we override)
  //       if (mode === "restaurant") {
  //         console.log("Inside Restaurant")
  //         url += "?mode=restaurant";
  //       }

  //       const res = await axios.get(url);

  //       setAllIngredients(res.data.data || []);
  //     } catch (err) {
  //       console.error("Failed to fetch ingredients", err);
  //     }
  //   };

  //   fetchIngredients();
  // }, [mode]);

    useEffect(() => {
    const fetchIngredients = async () => {
      try {
        // const res = await axios.get(
        //   `http://localhost:3004/api/ingredients/core?mode=${mode}`
        // );
        const res = await api.get(
          `/ingredients/core?mode=${mode}`
        );
        setAllIngredients(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      }
    };

    fetchIngredients();
  }, [mode]);

  const toggleItem = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const toggleGoal = (item: string) => {
    if (selectedGoals.includes(item)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== item));
    } else {
      setSelectedGoals([...selectedGoals, item]);
    }
  };

  // 🔥 ADD INGREDIENT (clean inline UI)
  // const handleAddCustom = async () => {
  //   if (!customIngredient) return;

  //   try {
  //     setLoading(true);

  //     const res = await axios.post(
  //       "http://localhost:3004/api/ingredients/create-from-ai",
  //       { name: customIngredient }
  //     );

  //     const newItem = res.data.data || res.data.preview;

  //     if (newItem) {
  //       setAllIngredients((prev) => [newItem, ...prev]);
  //       setIngredients((prev) => [...prev, newItem.name]);
  //     }

  //     setCustomIngredient("");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddCustom = async () => {
    if (!customIngredient) return;
  
    try {
      setLoading(true);
  
      // const res = await axios.post(
      //   "http://localhost:3004/api/ingredients/create-from-ai",
      //   { name: customIngredient }
      // );
      const res = await api.post(
        "/ingredients/create-from-ai",
        { name: customIngredient }
      );
  
      // ✅ EXISTS → SHOW MESSAGE + ADD
      if (res.data.exists) {
        const existing = res.data.data;
  
        // setIngredients((prev) => [...prev, existing.name]);

        const normalizedName = existing.name.trim().toLowerCase();

        setIngredients((prev) => {
          const normalizedList = prev.map((i) => i.trim().toLowerCase());
        
          if (normalizedList.includes(normalizedName)) {
            return prev;
          }
        
          return [...prev, existing.name.trim()];
        });
  
        setExistsMessage(`"${existing.name}" "is already available — added to your selection" ✅`);
  
        setTimeout(() => setExistsMessage(""), 2500);
  
        setCustomIngredient("");
        return;
      }

      // if (res.data.exists) {
      //   const existing = res.data.data;
      
      //   setIngredients((prev) => [...prev, existing.name]);
      
      //   toast({
      //     title: `${existing.name} already exists`,
      //     description: "Added to your ingredients",
      //     status: "success",
      //     duration: 2000,
      //     isClosable: true,
      //     position: "top",
      //   });
      
      //   setCustomIngredient("");
      //   return;
      // }
  
      // ✅ NEW → SHOW PREVIEW
      setPreviewIngredient(res.data.preview);
      setIsPreviewOpen(true);
      setCustomIngredient("");
  
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmIngredient = async () => {
    try {
      // const res = await axios.post(
      //   "http://localhost:3004/api/ingredients/confirm",
      //   previewIngredient
      // );
      const res = await api.post(
        "/ingredients/confirm",
        previewIngredient
      );
  
      const saved = res.data.data || previewIngredient;
  
      // ✅ update UI
      setAllIngredients((prev) => [saved, ...prev]);
      setIngredients((prev) => [...prev, saved.name]);
  
      setIsPreviewOpen(false);
      setPreviewIngredient(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (
      (!goal && selectedGoals.length === 0) ||
      ingredients.length === 0 ||
      foodType.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const finalGoal = [...selectedGoals, goal.trim()]
        .filter(Boolean)
        .join(", ");

      // const res = await axios.post(
      //   "http://localhost:3004/api/meals/generate",
      //   {
      //     goal: finalGoal,
      //     ingredients,
      //     foodType,
      //     page: 1,
      //   }
      // );
      const res = await api.post(
        "/meals/generate",
        {
          goal: finalGoal,
          ingredients,
          foodType,
          page: 1,
        }
      );

      navigate("/results", {
        state: {
          goal: finalGoal,
          ingredients,
          foodType,
          initialMeals: res.data.recommendations,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate meals");
    } finally {
      setLoading(false);
    }
  };

  const filteredIngredients = allIngredients.filter((item) => {
    return (
      (filterType === "all" || item.type === filterType) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Box
      p={6}
      borderRadius="2xl"
      boxShadow="lg"
      bg="white"
      maxW="900px"
      mx="auto"
      border="1px solid"
      borderColor="brand"
    >
      <VStack spacing={5} align="stretch">

        {/* 🎯 Goal */}
        <Box>
          <Text fontWeight="bold" mb={2}>🎯 Goal</Text>

          <Input
            placeholder="e.g. high protein"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            mb={3}
          />

          <HStack flexWrap="wrap">
            {GOAL_PRESETS.map((item) => (
              <Tag
                key={item}
                size="lg"
                bg={selectedGoals.includes(item) ? "brand.200" : "transparent"}
                border="1px solid"
                borderColor="brand.200"
                cursor="pointer"
                onClick={() => toggleGoal(item)}
              >
                <TagLabel>{item}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>

        {/* 🥗 Ingredients */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            🥗 Ingredients ({mode.toUpperCase()})
          </Text>

          <Input
            placeholder="Search ingredients"
            mb={3}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <HStack mb={3}>
            {["all", "veg", "non-veg"].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={filterType === type ? "solid" : "outline"}
                colorScheme="brand"
                onClick={() => setFilterType(type)}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </HStack>

          {/* 🔥 ADD INGREDIENT (ONLY HOME) */}
          {mode === "home" && (
            <HStack mb={3}>
              <Input
                placeholder="Add ingredient..."
                value={customIngredient}
                onChange={(e) => setCustomIngredient(e.target.value)}
              />
              <Button onClick={handleAddCustom} colorScheme="brand">
                Add
              </Button>
            </HStack>
          )}




{/* {existsMessage && (
  <HStack
    px={4}
    py={2}
    borderRadius="full"
    bg="brand.50"
    border="1px solid"
    borderColor="brand.200"
    w="fit-content"
    spacing={2}
    mb={2}
    transition="all 0.2s ease"
    _hover={{ transform: "scale(1.02)" }}
  >
    <Box
      bg="brand.200"
      color="white"
      borderRadius="full"
      px={2}
      fontSize="xs"
      fontWeight="bold"
    >
      ✓
    </Box>

    <Text fontSize="sm" color="brand.700" fontWeight="medium">
      {existsMessage}
    </Text>
  </HStack>
)} */}

{existsMessage && (
  <HStack
  px={4}
  py={2}
  borderRadius="full"
  bg="linear-gradient(135deg, #eaf6ff, #f5fbff)"
  border="1px solid"
  borderColor="brand.200"
  w="fit-content"
  spacing={3}
  mb={3}

  animation="fadeSlide 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
  boxShadow="0 4px 12px rgba(99, 189, 244, 0.25)"

  // 🔥 REAL SMOOTH FADE
  opacity={existsMessage ? 1 : 0}
  transition="opacity 0.4s ease"
  pointerEvents="none"
>
  <Box
    bg="brand.300"
    color="white"
    borderRadius="full"
    px={2}
    py={0.5}
    fontSize="xs"
    fontWeight="bold"
  >
    ✓
  </Box>

  <Text fontSize="sm" color="gray.700" fontWeight="medium">
    {existsMessage}
  </Text>
</HStack>
)}

          {/* 🔥 GRID (OLD UI RESTORED) */}
          <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
            {filteredIngredients.map((item) => {
              const isSelected = ingredients.includes(item.name);

              return (
                <Box
                  key={item.id}
                  borderRadius="xl"
                  overflow="hidden"
                  border="2px solid"
                  borderColor={isSelected ? "brand.400" : "gray.200"}
                  bg={isSelected ? "brand.50" : "white"}
                  cursor="pointer"
                  onClick={() =>
                    toggleItem(item.name, ingredients, setIngredients)
                  }
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Box h="80px">
                    <Image
                      src={item.image_url || FALLBACK_IMG}
                      fallbackSrc={FALLBACK_IMG}
                      alt={item.name}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>

                  <Box p={2}>
                    <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                      {item.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {item.protein}g protein
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>

        {/* 🍱 Food Types */}
        <HStack flexWrap="wrap">
          {ALL_FOOD_TYPES.map((item) => (
            <Tag
              key={item}
              size="lg"
              bg={foodType.includes(item) ? "brand.200" : "transparent"}
              border="1px solid"
              borderColor="brand.200"
              cursor="pointer"
              onClick={() => toggleItem(item, foodType, setFoodType)}
            >
              <TagLabel>{item}</TagLabel>
            </Tag>
          ))}
        </HStack>

        {/* Selected */}
        <HStack flexWrap="wrap">
          {/* {ingredients.map((item) => (
            <Tag key={item} colorScheme="brand"> */}
              {ingredients.map((item, index) => (
              <Tag key={`${item}-${index}`} colorScheme="brand">
              <TagLabel>{item}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setIngredients(ingredients.filter((i) => i !== item))
                }
              />
            </Tag>
          ))}
        </HStack>

        {/* Loading */}
        {loading && (
          <Box textAlign="center">
            <Spinner size="xl" />
            <Text mt={3}>Cooking your meals... 🍳</Text>
          </Box>
        )}

        {/* Submit */}
        <Button
          isLoading={loading}
          bg="brand.200"
          onClick={handleSubmit}
        >
          ✨ Generate Meals
        </Button>

        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} isCentered>
  <ModalOverlay />
  <ModalContent borderRadius="2xl" p={2}>

    <ModalHeader fontSize="lg" fontWeight="bold">
      Add New Ingredient
    </ModalHeader>

    <ModalBody>
      {previewIngredient && (
        <VStack spacing={4} align="stretch">

          {/* NAME + TYPE */}
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {previewIngredient.name}
            </Text>

            <HStack mt={1}>
              <Tag
                colorScheme={previewIngredient.type === "veg" ? "green" : "red"}
              >
                {previewIngredient.type.toUpperCase()}
              </Tag>

              <Tag colorScheme="purple">
                {previewIngredient.category}
              </Tag>
            </HStack>
          </Box>

          {/* MACROS GRID */}
          <SimpleGrid columns={2} spacing={3}>
            <Box bg="gray.50" p={3} borderRadius="lg">
              <Text fontSize="xs" color="gray.500">Calories</Text>
              <Text fontWeight="bold">{previewIngredient.calories} kcal</Text>
            </Box>

            <Box bg="gray.50" p={3} borderRadius="lg">
              <Text fontSize="xs" color="gray.500">Protein</Text>
              <Text fontWeight="bold">{previewIngredient.protein} g</Text>
            </Box>

            <Box bg="gray.50" p={3} borderRadius="lg">
              <Text fontSize="xs" color="gray.500">Carbs</Text>
              <Text fontWeight="bold">{previewIngredient.carbs} g</Text>
            </Box>

            <Box bg="gray.50" p={3} borderRadius="lg">
              <Text fontSize="xs" color="gray.500">Fat</Text>
              <Text fontWeight="bold">{previewIngredient.fat} g</Text>
            </Box>
          </SimpleGrid>

          <Text fontSize="sm" color="gray.500">
            This ingredient is AI-generated. Please confirm before adding.
          </Text>

        </VStack>
      )}
    </ModalBody>

    <ModalFooter>
      <Button mr={3} variant="outline" onClick={() => setIsPreviewOpen(false)}>
        Cancel
      </Button>

      <Button colorScheme="brand" onClick={handleConfirmIngredient}>
        Confirm & Add
      </Button>
    </ModalFooter>

  </ModalContent>
</Modal>
      </VStack>
    </Box>
  );
};

export default MealInputForm;