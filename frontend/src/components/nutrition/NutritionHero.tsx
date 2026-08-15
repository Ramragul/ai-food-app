// import {
//   Box,
//   Heading,
//   Text,
//   HStack
// } from "@chakra-ui/react";

// const NutritionHero = () => {

//   return (

// <Box
// bg="linear-gradient(
// 135deg,
// #E0F2FE,
// #F8FBFF
// )"
// borderRadius="3xl"
// p={6}
// boxShadow="lg"
// >

// <HStack
// align="flex-start"
// spacing={4}
// >

// <Box
// fontSize="4xl"
// >
// 🥗
// </Box>

// <Box>

// {/* <Heading
// size="lg"
// color="gray.800"
// >

// Nutrition Search

// </Heading>

// <Text
// mt={2}
// color="gray.600"
// fontSize="sm"
// lineHeight="tall"
// >

// Discover calories,
// protein, carbs and healthy fats
// for any food or ingredient.

// </Text> */}


// <Heading size="lg" color="gray.800">
//   Know What’s In Your Food
// </Heading>

// <Text
//   mt={2}
//   color="gray.600"
//   fontSize="sm"
//   lineHeight="tall"
// >
//   Search any food or ingredient and instantly
//   discover its calories, protein, carbs and fats.
// </Text>

// </Box>

// </HStack>

// </Box>

//   );

// };

// export default NutritionHero;


// Version 2

// import {
//   Box,
//   Heading,
//   Text,
//   HStack,
// } from "@chakra-ui/react";


// const NutritionHero = () => {

//   return (

//     <Box
//       bg="linear-gradient(
//         135deg,
//         #E0F2FE,
//         #F8FBFF
//       )"
//       borderRadius="3xl"
//       p={6}
//       boxShadow="lg"
//     >

//       <HStack
//         align="flex-start"
//         spacing={4}
//       >

//         <Box fontSize="4xl">
//           🥗
//         </Box>

//         <Box>

//           <Heading
//             size="lg"
//             color="gray.800"
//           >
//             Know What’s In Your Food
//           </Heading>

//           <Text
//             mt={2}
//             color="gray.600"
//             fontSize="sm"
//             lineHeight="tall"
//           >
//             Search any food or ingredient to discover
//             its calories, protein, carbs and fats.
//           </Text>

//           <Text
//             mt={3}
//             fontSize="xs"
//             fontWeight="600"
//             color="blue.500"
//           >
//             No login required
//           </Text>

//         </Box>

//       </HStack>

//     </Box>

//   );
// };


// export default NutritionHero;


// Version 3

import {
  Badge,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

const NutritionHero = () => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="32px"
      px={6}
      py={7}
      bg="linear-gradient(145deg, #E0F7FF 0%, #F7FCFF 55%, #FFFFFF 100%)"
      border="1px solid"
      borderColor="blue.100"
      boxShadow="0 18px 45px rgba(56, 189, 248, 0.12)"
    >

      {/* Decorative background */}
      <Box
        position="absolute"
        top="-70px"
        right="-70px"
        w="180px"
        h="180px"
        borderRadius="full"
        bg="blue.100"
        opacity={0.35}
        filter="blur(2px)"
      />

      <Box
        position="absolute"
        bottom="-90px"
        left="-70px"
        w="170px"
        h="170px"
        borderRadius="full"
        bg="cyan.50"
        opacity={0.6}
      />

      <VStack
        position="relative"
        align="stretch"
        spacing={5}
      >

        {/* Top label */}
        <HStack
          justify="space-between"
          align="center"
        >

          <HStack spacing={2}>

            <Box
              w="42px"
              h="42px"
              borderRadius="14px"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              boxShadow="0 6px 18px rgba(0,0,0,0.06)"
            >
              🥗
            </Box>

            <Text
              fontSize="sm"
              fontWeight="700"
              color="gray.600"
            >
              NEKA NUTRITION
            </Text>

          </HStack>

          <Badge
            colorScheme="blue"
            borderRadius="full"
            px={3}
            py={1.5}
            fontSize="xs"
            textTransform="none"
          >
            Free to explore
          </Badge>

        </HStack>


        {/* Main heading */}

        <Box>

          <Heading
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            lineHeight="1.15"
            letterSpacing="-0.5px"
            color="gray.800"
          >
            Know what’s in
            <Box
              as="span"
              color="blue.500"
            >
              {" "}your food.
            </Box>
          </Heading>

          <Text
            mt={3}
            fontSize="sm"
            lineHeight="tall"
            color="gray.600"
            maxW="380px"
          >
            Search any food or ingredient and instantly
            discover its calories, protein, carbs and fats.
          </Text>

        </Box>


        {/* Nutrition preview */}

        <SimpleGrid
          columns={3}
          spacing={2}
        >

          <Box
            bg="whiteAlpha.800"
            backdropFilter="blur(8px)"
            borderRadius="18px"
            px={3}
            py={3}
            border="1px solid"
            borderColor="white"
          >
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Calories
            </Text>

            <Text
              mt={1}
              fontSize="md"
              fontWeight="800"
              color="gray.800"
            >
              kcal
            </Text>
          </Box>


          <Box
            bg="whiteAlpha.800"
            backdropFilter="blur(8px)"
            borderRadius="18px"
            px={3}
            py={3}
            border="1px solid"
            borderColor="white"
          >
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Protein
            </Text>

            <Text
              mt={1}
              fontSize="md"
              fontWeight="800"
              color="gray.800"
            >
              grams
            </Text>
          </Box>


          <Box
            bg="whiteAlpha.800"
            backdropFilter="blur(8px)"
            borderRadius="18px"
            px={3}
            py={3}
            border="1px solid"
            borderColor="white"
          >
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Macros
            </Text>

            <Text
              mt={1}
              fontSize="md"
              fontWeight="800"
              color="gray.800"
            >
              Track
            </Text>
          </Box>

        </SimpleGrid>


        {/* Trust message */}

        <HStack
          spacing={2}
          pt={1}
        >

          <Box
            w="20px"
            h="20px"
            borderRadius="full"
            bg="green.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
          >
            ✓
          </Box>

          <Text
            fontSize="xs"
            color="gray.500"
            fontWeight="500"
          >
            No account required to search
          </Text>

        </HStack>

      </VStack>

    </Box>
  );
};

export default NutritionHero;