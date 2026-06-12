// Version 1

// import {
//   Box,
//   Text,
//   VStack,
//   HStack,
//   Collapse
// } from "@chakra-ui/react";

// import { useState } from "react";

// interface Props {
//   meals: any[];
// }

// const MealTimeline = ({
//   meals
// }: Props) => {

//   const [expanded,
//     setExpanded] =
//     useState<string | null>(
//       null
//     );

//   if (!meals?.length) {
//     return null;
//   }

//   const getIcon = (
//     mealType: string
//   ) => {

//     switch (
//       mealType
//     ) {
//       case "BREAKFAST":
//         return "🍳";

//       case "LUNCH":
//         return "🍛";

//       case "DINNER":
//         return "🌙";

//       case "SNACK":
//         return "🍎";

//       default:
//         return "🥗";
//     }
//   };

//   return (
//     <Box mt={5}>

//       <Text
//         fontSize="lg"
//         fontWeight="700"
//         mb={4}
//       >
//         Today's Meals
//       </Text>

//       <VStack
//         spacing={3}
//         align="stretch"
//       >

//         {meals.map(
//           (meal) => (

//             <Box
//               key={
//                 meal.meal_type
//               }
//               bg="white"
//               borderRadius="2xl"
//               p={4}
//               boxShadow="sm"
//               cursor="pointer"
//               onClick={() =>
//                 setExpanded(
//                   expanded ===
//                   meal.meal_type
//                     ? null
//                     : meal.meal_type
//                 )
//               }
//             >

//               <HStack
//                 justify="space-between"
//               >

//                 <Text
//                   fontWeight="700"
//                 >
//                   {
//                     getIcon(
//                       meal.meal_type
//                     )
//                   }{" "}
//                   {
//                     meal.meal_type
//                   }
//                 </Text>

//                 <Text
//                   fontWeight="700"
//                   color="brand.500"
//                 >
//                   {Math.round(
//                     meal.calories
//                   )} kcal
//                 </Text>

//               </HStack>

//               <Collapse
//                 in={
//                   expanded ===
//                   meal.meal_type
//                 }
//               >

//                 <VStack
//                   align="stretch"
//                   mt={4}
//                   spacing={2}
//                 >

//                   {meal.foods?.map(
//                     (
//                       food: any,
//                       idx: number
//                     ) => (
//                       <Box
//                         key={idx}
//                         bg="gray.50"
//                         p={3}
//                         borderRadius="lg"
//                       >
//                         <Text
//                           fontWeight="600"
//                         >
//                           🍽️ {
//                             food.name
//                           }
//                         </Text>

//                         <Text
//                           fontSize="xs"
//                           color="gray.500"
//                         >
//                           {
//                             food.calories
//                           } kcal
//                         </Text>
//                       </Box>
//                     )
//                   )}

//                 </VStack>

//               </Collapse>

//             </Box>
//           )
//         )}

//       </VStack>

//     </Box>
//   );
// };

// export default MealTimeline;


// Version 2


import {
  Box,
  Text,
  VStack,
  HStack,
  Collapse
} from "@chakra-ui/react";

import { useState } from "react";

interface Props {
  meals: any[];
}

const MealTimeline = ({
  meals
}: Props) => {

  const [expanded,
    setExpanded] =
    useState<string | null>(
      null
    );

  if (!meals?.length) {
    return null;
  }

  const getIcon = (
    mealType: string
  ) => {

    switch (
      mealType
    ) {
      case "BREAKFAST":
        return "🍳";

      case "LUNCH":
        return "🍛";

      case "DINNER":
        return "🌙";

      case "SNACK":
        return "🍎";

      default:
        return "🥗";
    }
  };

  return (
    <Box mt={5}>

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={4}
      >
        Today's Meals
      </Text>

      <VStack
        spacing={3}
        align="stretch"
      >

        {meals.map(
          (meal) => (

            <Box
              key={
                meal.meal_type
              }
              bg="white"
              borderRadius="2xl"
              p={4}
              boxShadow="sm"
              cursor="pointer"
              onClick={() =>
                setExpanded(
                  expanded ===
                  meal.meal_type
                    ? null
                    : meal.meal_type
                )
              }
            >

              <HStack
                justify="space-between"
              >

                <Text
                  fontWeight="700"
                >
                  {
                    getIcon(
                      meal.meal_type
                    )
                  }{" "}
                  {
                    meal.meal_type
                  }
                </Text>

                <Text
                  fontWeight="700"
                  color="brand.500"
                >
                  {Math.round(
                    meal.calories
                  )} kcal

                </Text>

              </HStack>

              <Collapse
                in={
                  expanded ===
                  meal.meal_type
                }
              >

                <VStack
                  align="stretch"
                  mt={4}
                  spacing={2}
                >

                  {/* {meal.foods?.map(
                    (
                      food: any,
                      idx: number
                    ) => (
                      <Box
                        key={idx}
                        bg="gray.50"
                        p={3}
                        borderRadius="lg"
                      >
                        <Text
                          fontWeight="600"
                        >
                          🍽️ {
                            food.name
                          }
                        </Text>

                        <Text
                          fontSize="xs"
                          color="gray.500"
                        >
                          {
                            food.calories
                          } kcal

                          
                        </Text>
                      </Box>
                    )
                  )} */}

                  {meal.foods?.map(
  (
    food: any,
    idx: number
  ) => (
<Box
  key={idx}
  bg="linear-gradient(
    135deg,
    #ffffff,
    #eff6ff
  )"
  borderRadius="2xl"
  p={4}
  border="1px solid"
  borderColor="blue.100"
  boxShadow="
    0 8px 24px
    rgba(59,130,246,0.08)
  "
>
      <HStack
        justify="space-between"
        align="start"
      >
        <Box flex={1}>

<Text
  fontWeight="800"
  fontSize="md"
  color="gray.800"
>
            🍽️ {food.name}
          </Text>

          {food.serving
            ?.serving_name && (
            <Text
              fontSize="xs"
              color="gray.500"
              mt={1}
            >
              ⚖️ {
                food.serving
                  .serving_name
              }
            </Text>
          )}
{/* 
          <Text
            fontSize="xs"
            color="gray.500"
            mt={1}
          >
            🔥 {
              Math.round(
                food.calories
              )
            } kcal
          </Text> */}
          <Box
  mt={2}
  display="inline-block"
  bg="orange.100"
  px={3}
  py={1}
  borderRadius="full"
>
  <Text
    fontSize="xs"
    fontWeight="700"
    color="orange.700"
  >
    🔥 {Math.round(food.calories)} kcal
  </Text>
</Box>

        </Box>

        {/* <Box
          textAlign="right"
        >
          <Text
            fontSize="xs"
            color="gray.500"
          >
            Quantity
          </Text>

          <Text
            fontWeight="700"
          >
            {food.quantity}x
          </Text>
        </Box> */}
        <Box
  bg="blue.50"
  px={3}
  py={2}
  borderRadius="xl"
>
  <Text
    fontSize="10px"
    color="blue.600"
  >
    Quantity
  </Text>

  <Text
    fontWeight="800"
    color="blue.700"
  >
    {food.quantity}x
  </Text>
</Box>

      </HStack>

      <HStack
        mt={3}
        spacing={2}
      >

        <Box
          flex={1}
         bg="linear-gradient(
            135deg,
            #f3e8ff,
            #e9d5ff
            )"
          borderRadius="lg"
          p={2}
          textAlign="center"
        >
          <Text
            fontSize="10px"
            color="gray.600"
          >
            🥩 Protein

          </Text>

          <Text
            fontWeight="700"
            fontSize="sm"
          >
            {Number(
              food.protein || 0
            ).toFixed(1)}g
          </Text>
        </Box>

        <Box
          flex={1}
          bg="linear-gradient(
                135deg,
                #ffedd5,
                #fed7aa
                )"
          borderRadius="lg"
          p={2}
          textAlign="center"
        >
          <Text
            fontSize="10px"
            color="gray.600"
          >
           🍚 Carbs

          </Text>

          <Text
            fontWeight="700"
            fontSize="sm"
          >
            {Number(
              food.carbs || 0
            ).toFixed(1)}g
          </Text>
        </Box>

        <Box
          flex={1}
          bg="linear-gradient(
                135deg,
                #dcfce7,
                #bbf7d0
                )"
          borderRadius="lg"
          p={2}
          textAlign="center"
        >
          <Text
            fontSize="10px"
            color="gray.600"
          >
            🥑 Fat
          </Text>

          <Text
            fontWeight="700"
            fontSize="sm"
          >
            {Number(
              food.fats || 0
            ).toFixed(1)}g
          </Text>
        </Box>

      </HStack>

    </Box>
  )
)}

                </VStack>

              </Collapse>

            </Box>
          )
        )}

      </VStack>

    </Box>
  );
};

export default MealTimeline;