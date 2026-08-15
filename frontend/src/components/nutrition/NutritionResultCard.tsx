// Version 1

// import {
//   Badge,
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Image,
//   Text,
//   VStack,
//   Circle
// } from "@chakra-ui/react";

// import MacroGrid from "./MacroGrid";

// interface Props {
//   result: any;
// }

// const NutritionResultCard = ({
//   result
// }: Props) => {

//   const data =
//     result.data;

//   const image =
//     data.imageUrl ||
//     "";

//   return (

// <Box
// bg="white"
// borderRadius="3xl"
// boxShadow="
// 0 12px 35px
// rgba(0,0,0,.08)
// "
// overflow="hidden"
// >

// <Box
// h="220px"
// bg="gray.100"
// display="flex"
// justifyContent="center"
// alignItems="center"
// >

// {

// image ?

// <Image
// src={image}
// w="100%"
// h="100%"
// objectFit="cover"
// />

// :

// <Circle
// size="120px"
// bg="blue.50"
// >

// <Text
// fontSize="5xl"
// >

// 🍽️

// </Text>

// </Circle>

// }

// </Box>

// <Box p={6}>

// <VStack
// align="stretch"
// spacing={5}
// >

// <HStack
// justify="space-between"
// align="flex-start"
// >

// <Box>

// <Heading
// size="lg"
// >

// {data.name}

// </Heading>

// <HStack
// mt={2}
// spacing={2}
// >

// <Badge
// colorScheme={
// result.entityType ===
// "FOOD"

// ?

// "purple"

// :

// "green"
// }
// borderRadius="full"
// px={3}
// py={1}
// >

// {

// result.entityType ===
// "FOOD"

// ?

// "🍛 Food"

// :

// "🥬 Ingredient"

// }

// </Badge>

// {

// result.generated && (

// <Badge
// colorScheme="blue"
// borderRadius="full"
// px={3}
// py={1}
// >

// ✨ Learned by AI

// </Badge>

// )

// }

// </HStack>

// </Box>

// <Box
// textAlign="right"
// >

// <Text
// fontSize="3xl"
// fontWeight="800"
// color="brand.500"
// >

// {data.calories}

// </Text>

// <Text
// fontSize="sm"
// color="gray.500"
// >

// kcal/{data.unit}

// </Text>

// </Box>

// </HStack>

// <MacroGrid
// data={data}
// />

// <Box
// bg="blue.50"
// borderRadius="2xl"
// p={4}
// >

// <Flex
// justify="space-between"
// >

// <Text
// fontWeight="600"
// >

// Serving Type

// </Text>

// <Text>

// {

// data.foodType
// .replaceAll(
// "_",
// " "
// )

// }

// </Text>

// </Flex>

// <Flex
// justify="space-between"
// mt={3}
// >

// <Text
// fontWeight="600"
// >

// Typical Serving

// </Text>

// <Text>

// {

// data.typicalServingWeight

// }

// {

// data.referenceUnit

// }

// </Text>

// </Flex>

// </Box>

// </VStack>

// </Box>

// </Box>

//   );

// };

// export default NutritionResultCard;


// Version 2

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Circle
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import MacroGrid from "./MacroGrid";

interface Props {
  result: any;
  isAuthenticated?: boolean;
}

const NutritionResultCard = ({
  result,
  isAuthenticated = false
}: Props) => {

  const navigate = useNavigate();

  const data = result.data;

  const image =
    data.imageUrl ||
    "";

  return (
    <Box
      bg="white"
      borderRadius="3xl"
      boxShadow="
        0 12px 35px
        rgba(0,0,0,.08)
      "
      overflow="hidden"
    >

      <Box
        h="220px"
        bg="gray.100"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

        {image ? (

          <Image
            src={image}
            w="100%"
            h="100%"
            objectFit="cover"
          />

        ) : (

          <Circle
            size="120px"
            bg="blue.50"
          >
            <Text fontSize="5xl">
              🍽️
            </Text>
          </Circle>

        )}

      </Box>

      <Box p={6}>

        <VStack
          align="stretch"
          spacing={5}
        >

          {/* FOOD HEADER */}

          <HStack
            justify="space-between"
            align="flex-start"
          >

            <Box>

              <Heading size="lg">
                {data.name}
              </Heading>

              <HStack
                mt={2}
                spacing={2}
              >

                <Badge
                  colorScheme={
                    result.entityType === "FOOD"
                      ? "purple"
                      : "green"
                  }
                  borderRadius="full"
                  px={3}
                  py={1}
                >

                  {result.entityType === "FOOD"
                    ? "🍛 Food"
                    : "🥬 Ingredient"}

                </Badge>

                {result.generated && (

                  <Badge
                    colorScheme="blue"
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    ✨ Learned by AI
                  </Badge>

                )}

              </HStack>

            </Box>

            <Box textAlign="right">

              <Text
                fontSize="3xl"
                fontWeight="800"
                color="brand.500"
              >
                {data.calories}
              </Text>

              <Text
                fontSize="sm"
                color="gray.500"
              >
                kcal/{data.unit}
              </Text>

            </Box>

          </HStack>


          {/* MACROS */}

          <MacroGrid
            data={data}
          />


          {/* SERVING INFO */}

          <Box
            bg="blue.50"
            borderRadius="2xl"
            p={4}
          >

            <Flex
              justify="space-between"
            >

              <Text fontWeight="600">
                Serving Type
              </Text>

              <Text>
                {data.foodType.replaceAll("_", " ")}
              </Text>

            </Flex>

            <Flex
              justify="space-between"
              mt={3}
            >

              <Text fontWeight="600">
                Typical Serving
              </Text>

              <Text>
                {data.typicalServingWeight}
                {data.referenceUnit}
              </Text>

            </Flex>

          </Box>


          {/* 🔥 CONTEXTUAL ACTION */}

          <Box
            pt={2}
            borderTop="1px solid"
            borderColor="gray.100"
          >

            {isAuthenticated ? (

              <VStack
                spacing={3}
                align="stretch"
              >

                <Box>

                  <Text
                    fontWeight="700"
                    fontSize="md"
                  >
                    Add this to your nutrition
                  </Text>

                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={1}
                  >
                    Keep your daily nutrition tracking up to date.
                  </Text>

                </Box>

                <Button
                  colorScheme="blue"
                  borderRadius="full"
                  width="100%"
                >
                  + Add to Today's Intake
                </Button>

              </VStack>

            ) : (

              <VStack
                spacing={3}
                align="stretch"
              >

                <Box>

                  <Text
                    fontWeight="700"
                    fontSize="md"
                  >
                    Want to track this?
                  </Text>

                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={1}
                    lineHeight="tall"
                  >
                    Create a free account to track your meals,
                    set nutrition goals and get personalized
                    AI-powered recommendations.
                  </Text>

                </Box>

                <Button
                  colorScheme="blue"
                  borderRadius="full"
                  width="100%"
                  onClick={() => navigate("/")}
                >
                  Create Free Account →
                </Button>

              </VStack>

            )}

          </Box>

        </VStack>

      </Box>

    </Box>
  );
};

export default NutritionResultCard;