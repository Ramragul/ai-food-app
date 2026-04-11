


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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

// 🔥 NEW: Goal presets (hybrid strategy)
const GOAL_PRESETS = [
  "Weight Loss",
  "Muscle Gain",
  "High Protein",
  "Low Carb",
  "Low Calorie",
  "Balanced Diet",
];

const MealInputForm = () => {
  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]); // ✅ NEW
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3004/api/ingredients/core"
        );
        setAllIngredients(res.data.data);
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      }
    };

    fetchIngredients();
  }, []);

  const toggleItem = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // ✅ NEW: toggle goal presets
  const toggleGoal = (item: string) => {
    if (selectedGoals.includes(item)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== item));
    } else {
      setSelectedGoals([...selectedGoals, item]);
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

      // 🔥 NEW: combine presets + text into SINGLE STRING
      const finalGoal = [...selectedGoals, goal.trim()]
        .filter(Boolean)
        .join(", ");

      const res = await axios.post(
        "http://localhost:3004/api/meals/generate",
        {
          goal: finalGoal,
          ingredients,
          foodType,
          page: 1,
        }
      );

      const meals = res.data.recommendations;

      navigate("/results", {
        state: {
          goal: finalGoal, // ✅ send combined goal
          ingredients,
          foodType,
          initialMeals: meals,
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
    const matchesType =
      filterType === "all" || item.type === filterType;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesType && matchesSearch;
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
          <Text fontWeight="bold" mb={2}>
            🎯 Goal
          </Text>

          {/* Free text */}
          <Input
            placeholder="e.g. high protein, low carb"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            mb={3}
          />

          {/* Preset chips */}
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
            🥗 Ingredients
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
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
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

        {/* Selected Ingredients */}
        <HStack spacing={2} flexWrap="wrap">
          {ingredients.map((item) => (
            <Tag key={item} colorScheme="brand">
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
            <Text mt={3} fontWeight="bold">
              Cooking your meals... 🍳
            </Text>
          </Box>
        )}

        {/* Submit */}
        <Button
          isLoading={loading}
          loadingText="Generating..."
          bg="brand.200"
          onClick={handleSubmit}
        >
          ✨ Generate Meals
        </Button>
      </VStack>
    </Box>
  );
};

export default MealInputForm;


