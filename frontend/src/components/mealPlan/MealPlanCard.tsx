// Version 1

// import {
//   Box,
//   Image,
//   Text,
//   Badge,
//   VStack,
//   Button,
//   HStack
// } from "@chakra-ui/react";

// import { useNavigate } from "react-router-dom";

// const MealPlanCard = ({ meal }: any) => {

//   const navigate = useNavigate();

//   return (
//     <Box
//       bg="white"
//       borderRadius="2xl"
//       overflow="hidden"
//       boxShadow="lg"
//       transition="0.3s"
//       _hover={{
//         transform: "translateY(-4px)"
//       }}
//     >
//       <Image
//         src={
//           meal.imageUrl ||
//           "/meal-placeholder.jpg"
//         }
//         h="180px"
//         w="100%"
//         objectFit="cover"
//       />

//       <Box p={4}>
//         <VStack
//           align="start"
//           spacing={3}
//         >
//           <Text
//             fontWeight="bold"
//             fontSize="lg"
//           >
//             {meal.mealName}
//           </Text>

//           <Text
//             fontSize="sm"
//             color="gray.600"
//             noOfLines={2}
//           >
//             {meal.description}
//           </Text>

//           <HStack flexWrap="wrap">
//             <Badge colorScheme="red">
//               🔥 {meal.finalMacros.calories}
//             </Badge>

//             <Badge colorScheme="green">
//               💪 {meal.finalMacros.protein}g
//             </Badge>
//           </HStack>

//           <Button
//             w="full"
//             colorScheme="blue"
//             onClick={() =>
//               navigate(
//                 `/meal-plan/${meal.mealId}`,
//                 {
//                   state: meal
//                 }
//               )
//             }
//           >
//             View Recipe
//           </Button>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default MealPlanCard;



// Version 2 


import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const MealPlanCard = ({ meal }: any) => {

  const navigate = useNavigate();

  const getFoodTypeBadge = () => {

    switch (meal.foodType) {

      case "veg":
        return (
          <Badge colorScheme="green">
            🟢 Veg
          </Badge>
        );

      case "eggitarian":
        return (
          <Badge colorScheme="yellow">
            🟡 Eggitarian
          </Badge>
        );

      case "nonveg":
        return (
          <Badge colorScheme="red">
            🔴 Non-Veg
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      transition="0.3s"
      _hover={{
        transform: "translateY(-4px)",
      }}
    >
      <Image
        src={
          meal.imageUrl ||
          "/meal-placeholder.jpg"
        }
        h="180px"
        w="100%"
        objectFit="cover"
      />

      <Box p={4}>
        <VStack
          align="start"
          spacing={3}
        >
          <Text
            fontWeight="bold"
            fontSize="lg"
          >
            {meal.mealName}
          </Text>

          {getFoodTypeBadge()}

          <Text
            fontSize="sm"
            color="gray.600"
            noOfLines={2}
          >
            {meal.description}
          </Text>

          <HStack flexWrap="wrap">
            <Badge colorScheme="red">
              🔥 {meal.finalMacros.calories}
            </Badge>

            <Badge colorScheme="green">
              💪 {meal.finalMacros.protein}g
            </Badge>
          </HStack>

          <Button
            w="full"
            colorScheme="blue"
            borderRadius="full"
            onClick={() =>
              navigate(
                `/meal-plan/${meal.mealId}`,
                {
                  state: meal,
                }
              )
            }
          >
            View Recipe
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default MealPlanCard;