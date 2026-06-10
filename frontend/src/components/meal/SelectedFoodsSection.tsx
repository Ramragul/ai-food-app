// Version 1

// import {
//   Box,
//   Text,
//   VStack,
//   HStack,
//   IconButton
// } from "@chakra-ui/react";

// import {
//   CloseIcon
// } from "@chakra-ui/icons";

// interface Props {
//   foods: any[];
//   onRemove: (
//     foodId: number
//   ) => void;
// }

// const SelectedFoodsSection = ({
//   foods,
//   onRemove
// }: Props) => {

//   if (
//     foods.length === 0
//   ) {
//     return null;
//   }

//   return (
//     <Box mt={8}>

//       <Text
//         fontSize="lg"
//         fontWeight="700"
//         mb={4}
//       >
//         Selected Foods
//       </Text>

//       <VStack
//         spacing={4}
//         align="stretch"
//       >
//         {foods.map(
//           (food) => (

//             <Box
//               key={food.foodId}
//               bg="white"
//               borderRadius="2xl"
//               p={4}
//               boxShadow="sm"
//               border="1px solid"
//               borderColor="gray.100"
//             >

//               <HStack
//                 justify="space-between"
//                 align="start"
//               >

//                 <Box>

//                   <Text
//                     fontWeight="700"
//                     fontSize="md"
//                   >
//                     🥘 {food.name}
//                   </Text>

//                   <Text
//                     fontSize="xs"
//                     color="gray.500"
//                     mt={1}
//                   >
//                     {food.preparationStyle}
//                   </Text>

//                 </Box>

//                 <IconButton
//                   aria-label="remove"
//                   icon={
//                     <CloseIcon />
//                   }
//                   size="sm"
//                   variant="ghost"
//                   onClick={() =>
//                     onRemove(
//                       food.foodId
//                     )
//                   }
//                 />

//               </HStack>

//               <Text
//                 mt={3}
//                 fontSize="sm"
//                 color="gray.600"
//               >
//                 ⚖️ {food.grams} g
//               </Text>

//               <Text
//                 fontWeight="700"
//                 mt={2}
//               >
//                 🔥 {food.calories} kcal
//               </Text>

//               <HStack
//                 mt={3}
//                 spacing={3}
//               >

//                 <Box
//                   flex={1}
//                   bg="purple.50"
//                   p={2}
//                   borderRadius="lg"
//                   textAlign="center"
//                 >
//                   <Text
//                     fontSize="xs"
//                   >
//                     Protein
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {food.protein}
//                   </Text>
//                 </Box>

//                 <Box
//                   flex={1}
//                   bg="orange.50"
//                   p={2}
//                   borderRadius="lg"
//                   textAlign="center"
//                 >
//                   <Text
//                     fontSize="xs"
//                   >
//                     Carbs
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {food.carbs}
//                   </Text>
//                 </Box>

//                 <Box
//                   flex={1}
//                   bg="green.50"
//                   p={2}
//                   borderRadius="lg"
//                   textAlign="center"
//                 >
//                   <Text
//                     fontSize="xs"
//                   >
//                     Fat
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {food.fats}
//                   </Text>
//                 </Box>

//               </HStack>

//             </Box>
//           )
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default SelectedFoodsSection;


// Version 2

import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Button
} from "@chakra-ui/react";

import {
  CloseIcon
} from "@chakra-ui/icons";

interface Props {
  foods: any[];

  onRemove: (
    foodId: number
  ) => void;

  onQuantityUpdate: (
    foodId: number,
    change: number
  ) => void;
}

const SelectedFoodsSection = ({
  foods,
  onRemove,
  onQuantityUpdate
}: Props) => {

  if (
    foods.length === 0
  ) {
    return null;
  }

  return (
    <Box mt={8}>

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={4}
      >
        Selected Foods
      </Text>

      <VStack
        spacing={4}
        align="stretch"
      >
        {foods.map(
          (food) => (

            <Box
              key={food.foodId}
              bg="white"
              borderRadius="2xl"
              p={4}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >

              <HStack
                justify="space-between"
                align="start"
              >

                <Box>

                  <Text
                    fontWeight="700"
                    fontSize="md"
                  >
                    🥘 {food.name}
                  </Text>

                  <Text
                    fontSize="xs"
                    color="gray.500"
                    mt={1}
                  >
                    {food.serving?.serving_name}
                    {" • "}
                    {food.preparationStyle}
                  </Text>

                </Box>

                <IconButton
                  aria-label="remove"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    onRemove(
                      food.foodId
                    )
                  }
                />

              </HStack>

              <HStack
                mt={3}
                justify="space-between"
              >

                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  ⚖️ {food.grams} g
                </Text>

                <HStack>

                  <Button
                    size="xs"
                    onClick={() =>
                      onQuantityUpdate(
                        food.foodId,
                        -1
                      )
                    }
                  >
                    -
                  </Button>

                  <Text
                    fontWeight="700"
                    minW="20px"
                    textAlign="center"
                  >
                    {food.quantity}
                  </Text>

                  <Button
                    size="xs"
                    onClick={() =>
                      onQuantityUpdate(
                        food.foodId,
                        1
                      )
                    }
                  >
                    +
                  </Button>

                </HStack>

              </HStack>

              <Box
                mt={3}
                p={3}
                bg="gray.50"
                borderRadius="xl"
              >

                {/* <Text
                  fontWeight="700"
                  mb={2}
                >
                  🔥 {food.calories} kcal
                </Text> */}
                <Box
  bg="red.50"
  border="1px solid"
  borderColor="red.100"
  borderRadius="lg"
  p={3}
  mb={3}
>
  <Text
    fontSize="xs"
    color="gray.600"
  >
    Calories
  </Text>

  <Text
    fontWeight="800"
    fontSize="lg"
  >
    🔥 {food.calories} kcal
  </Text>
</Box>

                <HStack
                  spacing={2}
                >

                  <Box
                    flex={1}
                    textAlign="center"
                    bg="purple.50"
                    p={2}
                    borderColor="purple.100"
                    borderRadius="lg"
                  >
                    <Text
                      fontSize="xs"
                    >
                      Protein
                    </Text>

                    <Text
                      fontWeight="700"
                    >
                      {food.protein}g
                    </Text>
                  </Box>

                  <Box
                    flex={1}
                    textAlign="center"
                    bg="orange.50"
                    p={2}
                    borderColor="orange.100"
                    borderRadius="lg"
                  >
                    <Text
                      fontSize="xs"
                    >
                      Carbs
                    </Text>

                    <Text
                      fontWeight="700"
                    >
                      {food.carbs}g
                    </Text>
                  </Box>

                  <Box
                    flex={1}
                    textAlign="center"
                    bg="green.50"
                    p={2}
                    borderColor="green.100"
                    borderRadius="lg"
                  >
                    <Text
                      fontSize="xs"
                    >
                      Fat
                    </Text>

                    <Text
                      fontWeight="700"
                    >
                      {food.fats}g
                    </Text>
                  </Box>

                </HStack>

              </Box>

            </Box>
          )
        )}
      </VStack>

    </Box>
  );
};

export default SelectedFoodsSection;