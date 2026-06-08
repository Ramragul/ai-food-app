// Version 1

// import {
//   Box,
//   Input,
//   Button,
//   Text,
//   VStack,
//   Spinner,
//   HStack,
//   Heading,
//   Flex
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import api from "../utils/api";

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem
// } from "@chakra-ui/react";
// import { CheckIcon, ChevronDownIcon  } from "@chakra-ui/icons";

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
//       // const res = await axios.post(
//       //   "http://localhost:3004/api/nutrition/add-meal",
//       //   { userId: userId, mealType, input }
//       // );

//       const res = await api.post("/nutrition/add-meal", {
//         userId,
//         mealType,
//         input
//       });

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
//     // await axios.post(
//     //   "http://localhost:3004/api/nutrition/confirm-meal",
//     //   { userId: userId, mealType, items: preview, total }
//     // );

//     await api.post(
//       "/nutrition/confirm-meal",
//       { userId: userId, mealType, items: preview, total }
//     );

//     setSuccess(true);

//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   };


//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);



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
//         {/* <Box px={4} py={6} pb="180px" maxW="420px" mx="auto"> */}
//         {/* <Box px={4} py={6} pb="240px" maxW="420px" mx="auto"> */}
//         <Box px={4} py={6} pb="260px" maxW="420px" mx="auto">
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
// {/* TOTAL */}
// {preview.length > 0 && (
//   <Box
//     position="fixed"
//     bottom="70px" // above navbar
//     left="0"
//     right="0"
//     zIndex="999"
//     px={4}
//   >
//     <Box maxW="420px" mx="auto">

//       {/* 🔥 TOTAL CARD */}
//       <Box
//         borderRadius="2xl"
//         bg="white"
//         p={4}
//         mb={3}
//         boxShadow="0 10px 30px rgba(0,0,0,0.1)"
//       >
//         <Text fontSize="xs" color="gray.500">
//           Total Intake
//         </Text>

//         <Text fontWeight="bold" fontSize="lg">
//           🔥 {(total?.calories ?? 0).toFixed(0)} kcal
//         </Text>

//         <HStack mt={3}>
//           <Box flex={1} bg="purple.50" p={2} borderRadius="lg" textAlign="center">
//             <Text fontSize="xs">P</Text>
//             <Text fontWeight="bold">{(total?.protein ?? 0).toFixed(1)}</Text>
//           </Box>

//           <Box flex={1} bg="orange.50" p={2} borderRadius="lg" textAlign="center">
//             <Text fontSize="xs">C</Text>
//             <Text fontWeight="bold">{(total?.carbs ?? 0).toFixed(1)}</Text>
//           </Box>

//           <Box flex={1} bg="pink.50" p={2} borderRadius="lg" textAlign="center">
//             <Text fontSize="xs">F</Text>
//             <Text fontWeight="bold">{(total?.fats ?? 0).toFixed(1)}</Text>
//           </Box>
//         </HStack>
//       </Box>

//       {/* 🔥 FULL WIDTH BUTTON */}
//       <Button
//         w="100%"
//         h="55px"
//         bg="black"
//         color="white"
//         borderRadius="full"
//         fontSize="md"
//         fontWeight="semibold"
//         boxShadow="0 8px 20px rgba(0,0,0,0.25)"
//         _hover={{ bg: "#111" }}
//         _active={{ transform: "scale(0.97)" }}
//         onClick={handleConfirm}
//       >
//         Confirm Meal 🚀
//       </Button>

//     </Box>
//   </Box>
// )}
//       </Box>
//     </>
//   );
// };

// export default AddMeal;



// Version 2 

import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Spinner,
  HStack,
  Heading,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import FoodSearchInput from "../components/meal/FoodSearchInput";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon  } from "@chakra-ui/icons";

const AddMeal = () => {
  const [mealType, setMealType] = useState("BREAKFAST");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [selectedFoods,setSelectedFoods] = useState<string[]>([]);

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


const handleFoodSelect = (
  food: string
) => {
  setSelectedFoods(
    (prev) => {
      if (
        prev.includes(food)
      ) {
        return prev;
      }

      return [
        ...prev,
        food,
      ];
    }
  );
};

  const handleParse = async () => {
    if (!isInputValid) return;

    setLoading(true);
    try {
      // const res = await axios.post(
      //   "http://localhost:3004/api/nutrition/add-meal",
      //   { userId: userId, mealType, input }
      // );

      const res = await api.post("/nutrition/add-meal", {
        userId,
        mealType,
        input
      });

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
    // await axios.post(
    //   "http://localhost:3004/api/nutrition/confirm-meal",
    //   { userId: userId, mealType, items: preview, total }
    // );

    await api.post(
      "/nutrition/confirm-meal",
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
          <VStack
  align="start"
  spacing={1}
  mb={4}
>
  <Text
    fontSize="sm"
    color="gray.500"
  >
    Track Nutrition
  </Text>

  <Heading size="lg">
    What did you eat today?
  </Heading>
</VStack>

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

<Box
  p={4}
  mb={4}
  bg="white"
  borderRadius="2xl"
  border="1px solid"
  borderColor="gray.200"
  boxShadow="0 8px 24px rgba(0,0,0,0.05)"
>
  <Text
    mb={3}
    fontWeight="700"
  >
    🔍 Search Food
  </Text>

  <FoodSearchInput
    onSelectFood={
      handleFoodSelect
    }
  />
</Box>

{selectedFoods.length >
  0 && (
  <Box
    mb={4}
    p={4}
    bg="white"
    borderRadius="2xl"
    border="1px solid"
    borderColor="gray.200"
  >
    <Text
      mb={3}
      fontWeight="700"
    >
      Selected Foods
    </Text>

    <VStack
      spacing={2}
      align="stretch"
    >
      {selectedFoods.map(
        (food) => (
          <Box
            key={food}
            bg="brand.50"
            p={3}
            borderRadius="lg"
          >
            {food}
          </Box>
        )
      )}
    </VStack>
  </Box>
)}
<Text
  fontWeight="700"
>
  🤖 Describe Meal
</Text>
              <Input
                placeholder="
2 idli with sambar

250g chicken breast

1 glass milk
"
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







