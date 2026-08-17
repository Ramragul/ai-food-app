// Version 1

// import {
//   Badge,
//   Box,
//   HStack,
//   Heading,
//   Text,
//   VStack,
//   SimpleGrid,
// } from "@chakra-ui/react";

// const NutritionHero = () => {
//   return (
//     <Box
//       position="relative"
//       overflow="hidden"
//       borderRadius="32px"
//       px={6}
//       py={7}
//       bg="linear-gradient(145deg, #E0F7FF 0%, #F7FCFF 55%, #FFFFFF 100%)"
//       border="1px solid"
//       borderColor="blue.100"
//       boxShadow="0 18px 45px rgba(56, 189, 248, 0.12)"
//     >

//       {/* Decorative background */}
//       <Box
//         position="absolute"
//         top="-70px"
//         right="-70px"
//         w="180px"
//         h="180px"
//         borderRadius="full"
//         bg="blue.100"
//         opacity={0.35}
//         filter="blur(2px)"
//       />

//       <Box
//         position="absolute"
//         bottom="-90px"
//         left="-70px"
//         w="170px"
//         h="170px"
//         borderRadius="full"
//         bg="cyan.50"
//         opacity={0.6}
//       />

//       <VStack
//         position="relative"
//         align="stretch"
//         spacing={5}
//       >

//         {/* Top label */}
//         <HStack
//           justify="space-between"
//           align="center"
//         >

//           <HStack spacing={2}>

//             <Box
//               w="42px"
//               h="42px"
//               borderRadius="14px"
//               bg="white"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               fontSize="2xl"
//               boxShadow="0 6px 18px rgba(0,0,0,0.06)"
//             >
//               🥗
//             </Box>

//             <Text
//               fontSize="sm"
//               fontWeight="700"
//               color="gray.600"
//             >
//               NEKA NUTRITION
//             </Text>

//           </HStack>

//           <Badge
//             colorScheme="blue"
//             borderRadius="full"
//             px={3}
//             py={1.5}
//             fontSize="xs"
//             textTransform="none"
//           >
//             Free to explore
//           </Badge>

//         </HStack>


//         {/* Main heading */}

//         <Box>

//           <Heading
//             fontSize={{
//               base: "2xl",
//               md: "3xl",
//             }}
//             lineHeight="1.15"
//             letterSpacing="-0.5px"
//             color="gray.800"
//           >
//             Know what’s in
//             <Box
//               as="span"
//               color="blue.500"
//             >
//               {" "}your food.
//             </Box>
//           </Heading>

//           <Text
//             mt={3}
//             fontSize="sm"
//             lineHeight="tall"
//             color="gray.600"
//             maxW="380px"
//           >
//             Search any food or ingredient and instantly
//             discover its calories, protein, carbs and fats.
//           </Text>

//         </Box>


//         {/* Nutrition preview */}

//         <SimpleGrid
//           columns={3}
//           spacing={2}
//         >

//           <Box
//             bg="whiteAlpha.800"
//             backdropFilter="blur(8px)"
//             borderRadius="18px"
//             px={3}
//             py={3}
//             border="1px solid"
//             borderColor="white"
//           >
//             <Text
//               fontSize="xs"
//               color="gray.500"
//             >
//               Calories
//             </Text>

//             <Text
//               mt={1}
//               fontSize="md"
//               fontWeight="800"
//               color="gray.800"
//             >
//               kcal
//             </Text>
//           </Box>


//           <Box
//             bg="whiteAlpha.800"
//             backdropFilter="blur(8px)"
//             borderRadius="18px"
//             px={3}
//             py={3}
//             border="1px solid"
//             borderColor="white"
//           >
//             <Text
//               fontSize="xs"
//               color="gray.500"
//             >
//               Protein
//             </Text>

//             <Text
//               mt={1}
//               fontSize="md"
//               fontWeight="800"
//               color="gray.800"
//             >
//               grams
//             </Text>
//           </Box>


//           <Box
//             bg="whiteAlpha.800"
//             backdropFilter="blur(8px)"
//             borderRadius="18px"
//             px={3}
//             py={3}
//             border="1px solid"
//             borderColor="white"
//           >
//             <Text
//               fontSize="xs"
//               color="gray.500"
//             >
//               Macros
//             </Text>

//             <Text
//               mt={1}
//               fontSize="md"
//               fontWeight="800"
//               color="gray.800"
//             >
//               Track
//             </Text>
//           </Box>

//         </SimpleGrid>


//         {/* Trust message */}

//         <HStack
//           spacing={2}
//           pt={1}
//         >

//           <Box
//             w="20px"
//             h="20px"
//             borderRadius="full"
//             bg="green.100"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             fontSize="xs"
//           >
//             ✓
//           </Box>

//           <Text
//             fontSize="xs"
//             color="gray.500"
//             fontWeight="500"
//           >
//             No account required to search
//           </Text>

//         </HStack>

//       </VStack>

//     </Box>
//   );
// };

// export default NutritionHero;


// Version 2 

// import {
//   Badge,
//   Box,
//   HStack,
//   Heading,
//   Text,
//   VStack,
//   SimpleGrid,
// } from "@chakra-ui/react";

// import {
//   Sparkles,
//   Flame,
//   Dumbbell,
//   Wheat,
//   Check,
//   ArrowDown
// } from "lucide-react";


// const NutritionHero = () => {

//   return (

//     <Box
//       position="relative"
//       overflow="hidden"

//       borderRadius="32px"

//       px={{
//         base: 6,
//         sm: 7
//       }}

//       pt={6}

//       pb={7}

//       bg="
//         radial-gradient(
//           circle at 85% 10%,
//           rgba(125,211,252,.32),
//           transparent 30%
//         ),
//         radial-gradient(
//           circle at 10% 90%,
//           rgba(167,243,208,.28),
//           transparent 30%
//         ),
//         linear-gradient(
//           145deg,
//           #F4FBFF 0%,
//           #FFFFFF 50%,
//           #F5FFF9 100%
//         )
//       "

//       border="1px solid"

//       borderColor="blue.100"

//       boxShadow="
//         0 25px 70px
//         rgba(14, 165, 233, 0.12)
//       "
//     >


//       {/* ----------------------------------------
//           DECORATIVE BLOBS
//       ----------------------------------------- */}

//       <Box
//         position="absolute"
//         top="-100px"
//         right="-90px"

//         w="230px"
//         h="230px"

//         borderRadius="full"

//         bg="blue.200"

//         opacity={0.18}

//         filter="blur(12px)"
//       />


//       <Box
//         position="absolute"
//         bottom="-100px"
//         left="-100px"

//         w="230px"
//         h="230px"

//         borderRadius="full"

//         bg="green.200"

//         opacity={0.2}

//         filter="blur(15px)"
//       />


//       {/* ----------------------------------------
//           CONTENT
//       ----------------------------------------- */}

//       <VStack
//         position="relative"

//         align="stretch"

//         spacing={0}
//       >


//         {/* --------------------------------------
//             BRAND
//         --------------------------------------- */}

//         <HStack
//           justify="space-between"
//           align="center"
//         >

//           <HStack spacing={2.5}>

//             <Box
//               w="42px"
//               h="42px"

//               borderRadius="14px"

//               bg="white"

//               display="flex"

//               alignItems="center"

//               justifyContent="center"

//               boxShadow="
//                 0 8px 25px
//                 rgba(0,0,0,.07)
//               "
//             >

//               <Text
//                 fontSize="xl"
//               >
//                 🥗
//               </Text>

//             </Box>


//             <VStack
//               align="start"
//               spacing={0}
//             >

//               <Text
//                 fontSize="xs"
//                 fontWeight="800"
//                 letterSpacing="1.4px"
//                 color="gray.700"
//               >
//                 NEKA
//               </Text>

//               <Text
//                 fontSize="xs"
//                 fontWeight="600"
//                 letterSpacing=".5px"
//                 color="gray.400"
//               >
//                 NUTRITION
//               </Text>

//             </VStack>

//           </HStack>


//           <Badge

//             display="flex"

//             alignItems="center"

//             gap={1.5}

//             borderRadius="full"

//             px={3}

//             py={1.5}

//             fontSize="xs"

//             textTransform="none"

//             bg="white"

//             color="green.700"

//             border="1px solid"

//             borderColor="green.100"

//             boxShadow="
//               0 5px 15px
//               rgba(0,0,0,.04)
//             "
//           >

//             <Sparkles size={12} />

//             Free to explore

//           </Badge>

//         </HStack>


//         {/* --------------------------------------
//             HERO HEADLINE
//         --------------------------------------- */}

//         <Box
//           mt={7}
//         >

//           <Text
//             fontSize="xs"
//             fontWeight="800"
//             letterSpacing="1.5px"
//             textTransform="uppercase"
//             color="blue.500"
//             mb={3}
//           >

//             Nutrition intelligence

//           </Text>


//           <Heading

//             fontSize={{
//               base: "3xl",
//               sm: "4xl"
//             }}

//             lineHeight="1.02"

//             letterSpacing="-1.8px"

//             fontWeight="800"

//             color="gray.900"
//           >

//             Know your food.

//             <Box
//               as="span"

//               display="block"

//               bgGradient="
//                 linear(
//                   to-r,
//                   #0EA5E9,
//                   #38BDF8,
//                   #34D399
//                 )
//               "

//               bgClip="text"
//             >

//               Know yourself.

//             </Box>

//           </Heading>


//           <Text

//             mt={4}

//             fontSize={{
//               base: "sm",
//               sm: "md"
//             }}

//             lineHeight="1.7"

//             color="gray.600"

//             maxW="360px"
//           >

//             Discover calories, protein, carbs,
//             fats and more — for the food you
//             eat every day.

//           </Text>

//         </Box>


//         {/* --------------------------------------
//             NUTRITION VISUAL
//         --------------------------------------- */}

//         <Box

//           position="relative"

//           h="175px"

//           mt={5}

//         >


//           {/* Left food */}

//           <Box

//             position="absolute"

//             left="3%"

//             top="42px"

//             w="58px"

//             h="58px"

//             borderRadius="20px"

//             bg="white"

//             display="flex"

//             alignItems="center"

//             justifyContent="center"

//             fontSize="2xl"

//             boxShadow="
//               0 14px 35px
//               rgba(0,0,0,.08)
//             "

//             transform="rotate(-8deg)"

//           >

//             🥑

//           </Box>


//           {/* Right food */}

//           <Box

//             position="absolute"

//             right="3%"

//             top="28px"

//             w="58px"

//             h="58px"

//             borderRadius="20px"

//             bg="white"

//             display="flex"

//             alignItems="center"

//             justifyContent="center"

//             fontSize="2xl"

//             boxShadow="
//               0 14px 35px
//               rgba(0,0,0,.08)
//             "

//             transform="rotate(8deg)"

//           >

//             🍓

//           </Box>


//           {/* ----------------------------------
//               MAIN INSIGHT CARD
//           ----------------------------------- */}

//           <Box

//             position="absolute"

//             left="50%"

//             top="50%"

//             transform="translate(-50%, -50%)"

//             w={{
//               base: "220px",
//               sm: "240px"
//             }}

//             bg="rgba(255,255,255,.88)"

//             backdropFilter="blur(16px)"

//             borderRadius="24px"

//             p={4}

//             border="1px solid"

//             borderColor="white"

//             boxShadow="
//               0 20px 50px
//               rgba(14,165,233,.14)
//             "

//             zIndex={2}

//           >

//             <HStack
//               justify="space-between"
//               mb={3}
//             >

//               <Text
//                 fontSize="xs"
//                 fontWeight="800"
//                 color="gray.500"
//                 letterSpacing=".8px"
//               >

//                 NUTRITION INSIGHT

//               </Text>


//               <Box
//                 color="green.500"
//               >

//                 <Sparkles size={14} />

//               </Box>

//             </HStack>


//             <SimpleGrid
//               columns={3}
//               spacing={2}
//             >

//               <Insight
//                 value="kcal"
//                 label="Energy"
//                 icon={
//                   <Flame size={11} />
//                 }
//               />

//               <Insight
//                 value="Protein"
//                 label="Macro"
//                 icon={
//                   <Dumbbell size={11} />
//                 }
//               />

//               <Insight
//                 value="Macros"
//                 label="Balance"
//                 icon={
//                   <Wheat size={11} />
//                 }
//               />

//             </SimpleGrid>


//             <HStack
//               mt={3}
//               spacing={1.5}
//             >

//               <Box
//                 color="green.500"
//               >

//                 <Check size={12} />

//               </Box>

//               <Text
//                 fontSize="10px"
//                 color="gray.500"
//                 fontWeight="600"
//               >

//                 Understand what you eat

//               </Text>

//             </HStack>

//           </Box>


//           {/* Decorative connector */}

//           <Box

//             position="absolute"

//             left="20%"

//             right="20%"

//             top="50%"

//             h="1px"

//             bgGradient="
//               linear(
//                 to-r,
//                 transparent,
//                 blue.200,
//                 transparent
//               )
//             "

//           />

//         </Box>


//         {/* --------------------------------------
//             BENEFITS
//         --------------------------------------- */}

//         <SimpleGrid

//           columns={3}

//           spacing={2}

//           mt={1}

//         >

//           <Feature
//             icon={
//               <Flame size={13} />
//             }
//             text="Calories"
//           />

//           <Feature
//             icon={
//               <Dumbbell size={13} />
//             }
//             text="Protein"
//           />

//           <Feature
//             icon={
//               <Wheat size={13} />
//             }
//             text="Macros"
//           />

//         </SimpleGrid>


//         {/* --------------------------------------
//             CTA HINT
//         --------------------------------------- */}

//         <HStack

//           justify="center"

//           spacing={2}

//           mt={5}

//           color="gray.400"

//         >

//           <Text
//             fontSize="xs"
//             fontWeight="600"
//           >

//             Start with a food below

//           </Text>

//           <ArrowDown size={13} />

//         </HStack>


//         {/* --------------------------------------
//             TRUST
//         --------------------------------------- */}

//         <HStack

//           justify="center"

//           spacing={2}

//           mt={3}

//         >

//           <Box
//             w="19px"
//             h="19px"
//             borderRadius="full"
//             bg="green.100"

//             display="flex"

//             alignItems="center"

//             justifyContent="center"

//             color="green.600"
//           >

//             <Check size={11} />

//           </Box>


//           <Text

//             fontSize="xs"

//             color="gray.500"

//             fontWeight="500"

//           >

//             No account required

//           </Text>

//         </HStack>

//       </VStack>

//     </Box>

//   );
// };


// /* ============================================
//    INSIGHT
// ============================================ */

// interface InsightProps {

//   value: string;

//   label: string;

//   icon: React.ReactNode;

// }


// const Insight = ({
//   value,
//   label,
//   icon
// }: InsightProps) => {

//   return (

//     <VStack

//       spacing={1}

//       bg="gray.50"

//       borderRadius="12px"

//       py={2}

//     >

//       <HStack
//         spacing={1}
//       >

//         <Box
//           color="blue.500"
//         >
//           {icon}
//         </Box>

//         <Text
//           fontSize="10px"
//           fontWeight="800"
//           color="gray.700"
//         >

//           {value}

//         </Text>

//       </HStack>

//       <Text
//         fontSize="8px"
//         color="gray.400"
//       >

//         {label}

//       </Text>

//     </VStack>

//   );
// };


// /* ============================================
//    FEATURE
// ============================================ */

// interface FeatureProps {

//   icon: React.ReactNode;

//   text: string;

// }


// const Feature = ({
//   icon,
//   text
// }: FeatureProps) => {

//   return (

//     <HStack

//       justify="center"

//       spacing={1.5}

//       py={2.5}

//       borderRadius="14px"

//       bg="whiteAlpha.700"

//       border="1px solid"

//       borderColor="white"

//       backdropFilter="blur(8px)"

//     >

//       <Box
//         color="blue.500"
//       >

//         {icon}

//       </Box>


//       <Text

//         fontSize="xs"

//         fontWeight="700"

//         color="gray.600"

//       >

//         {text}

//       </Text>

//     </HStack>

//   );
// };


// export default NutritionHero;



// Version 3

// import {
//   Badge,
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Text,
//   VStack,
// } from "@chakra-ui/react";

// const NutritionHero = () => {
//   return (
//     <Box
//       position="relative"
//       overflow="hidden"
//       borderRadius="32px"
//       bg="#F5F1E8"
//       minH={{
//         base: "480px",
//         md: "520px",
//       }}
//       px={{
//         base: 6,
//         md: 8,
//       }}
//       pt={{
//         base: 6,
//         md: 8,
//       }}
//       pb={6}
//       border="1px solid"
//       borderColor="#E8E1D4"
//     >

//       {/* -----------------------------------------
//           BACKGROUND SHAPES
//       ------------------------------------------ */}

//       <Box
//         position="absolute"
//         top="-120px"
//         right="-100px"
//         w="300px"
//         h="300px"
//         borderRadius="full"
//         bg="#D9E8B8"
//         opacity={0.7}
//       />

//       <Box
//         position="absolute"
//         bottom="-140px"
//         left="-100px"
//         w="280px"
//         h="280px"
//         borderRadius="full"
//         bg="#F4C98B"
//         opacity={0.35}
//       />

//       <Box
//         position="absolute"
//         top="40%"
//         right="-70px"
//         w="150px"
//         h="150px"
//         borderRadius="full"
//         bg="#E5B75B"
//         opacity={0.18}
//       />


//       {/* -----------------------------------------
//           CONTENT
//       ------------------------------------------ */}

//       <VStack
//         position="relative"
//         zIndex={2}
//         align="stretch"
//         spacing={0}
//         h="100%"
//       >

//         {/* ---------------------------------------
//             BRAND ROW
//         ---------------------------------------- */}

//         <Flex
//           align="center"
//           justify="space-between"
//         >

//           <HStack spacing={3}>

//             <Box
//               w="42px"
//               h="42px"
//               borderRadius="14px"
//               bg="#173F35"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               boxShadow="0 8px 20px rgba(23,63,53,.16)"
//             >

//               <Box
//                 w="20px"
//                 h="20px"
//                 borderRadius="full"
//                 bg="#D8F36A"
//                 position="relative"
//               >

//                 <Box
//                   position="absolute"
//                   top="-3px"
//                   right="-2px"
//                   w="9px"
//                   h="5px"
//                   borderRadius="100%"
//                   bg="#9BC85A"
//                   transform="rotate(-30deg)"
//                 />

//               </Box>

//             </Box>


//             <VStack
//               align="start"
//               spacing={0}
//             >

//               <Text
//                 fontSize="sm"
//                 fontWeight="800"
//                 letterSpacing="2px"
//                 color="#173F35"
//               >
//                 NEKA
//               </Text>

//               <Text
//                 fontSize="9px"
//                 fontWeight="700"
//                 letterSpacing="2px"
//                 color="#7C877E"
//               >
//                 NUTRITION
//               </Text>

//             </VStack>

//           </HStack>


//           <Badge
//             bg="#173F35"
//             color="#E5F39A"
//             borderRadius="full"
//             px={3.5}
//             py={2}
//             fontSize="10px"
//             fontWeight="700"
//             letterSpacing=".4px"
//             textTransform="none"
//           >
//             Free to explore
//           </Badge>

//         </Flex>


//         {/* ---------------------------------------
//             HEADLINE
//         ---------------------------------------- */}

//         <Box
//           mt={{
//             base: 8,
//             md: 10,
//           }}
//           maxW="390px"
//         >

//           <Text
//             fontSize="10px"
//             fontWeight="800"
//             letterSpacing="2.5px"
//             color="#78934A"
//             mb={3}
//           >
//             NUTRITION, SIMPLIFIED
//           </Text>


//           <Heading
//             fontSize={{
//               base: "4xl",
//               md: "5xl",
//             }}
//             lineHeight=".98"
//             letterSpacing="-1.8px"
//             fontWeight="800"
//             color="#17221D"
//           >

//             What's really
//             <br />

//             <Box
//               as="span"
//               color="#2D654E"
//             >
//               in your food?
//             </Box>

//           </Heading>


//           <Text
//             mt={5}
//             fontSize={{
//               base: "sm",
//               md: "md",
//             }}
//             lineHeight="1.7"
//             color="#657069"
//             maxW="350px"
//           >
//             Search any food or ingredient and discover
//             its calories, protein, carbs, fats and more —
//             instantly.
//           </Text>

//         </Box>


//         {/* ---------------------------------------
//             VISUAL NUTRITION AREA
//         ---------------------------------------- */}

//         <Box
//           position="relative"
//           mt={{
//             base: 7,
//             md: 8,
//           }}
//           h={{
//             base: "145px",
//             md: "165px",
//           }}
//         >

//           {/* Main plate */}

//           <Box
//             position="absolute"
//             left="50%"
//             top="50%"
//             transform="translate(-50%, -50%)"
//             w={{
//               base: "145px",
//               md: "165px",
//             }}
//             h={{
//               base: "145px",
//               md: "165px",
//             }}
//             borderRadius="full"
//             bg="#FFFDF8"
//             border="8px solid"
//             borderColor="#E7E0D2"
//             boxShadow="0 18px 40px rgba(50,60,45,.12)"
//           >

//             <VStack
//               h="100%"
//               justify="center"
//               spacing={0}
//             >

//               <Text
//                 fontSize="9px"
//                 fontWeight="800"
//                 letterSpacing="1.8px"
//                 color="#879084"
//               >
//                 NUTRITION
//               </Text>

//               <Text
//                 fontSize={{
//                   base: "3xl",
//                   md: "4xl",
//                 }}
//                 fontWeight="800"
//                 lineHeight="1"
//                 color="#173F35"
//               >
//                 165
//               </Text>

//               <Text
//                 fontSize="9px"
//                 color="#9A9F99"
//                 mt={1}
//               >
//                 kcal / 100g
//               </Text>

//             </VStack>

//           </Box>


//           {/* Avocado visual */}

//           <Box
//             position="absolute"
//             left={{
//               base: "5%",
//               md: "15%",
//             }}
//             top="8px"
//             w="52px"
//             h="52px"
//             borderRadius="18px"
//             bg="#DCEB9A"
//             transform="rotate(-15deg)"
//             boxShadow="0 10px 25px rgba(70,90,50,.12)"
//           >

//             <Box
//               position="absolute"
//               w="20px"
//               h="20px"
//               borderRadius="full"
//               bg="#A36B35"
//               left="16px"
//               top="17px"
//             />

//           </Box>


//           {/* Tomato visual */}

//           <Box
//             position="absolute"
//             right={{
//               base: "5%",
//               md: "15%",
//             }}
//             top="15px"
//             w="50px"
//             h="50px"
//             borderRadius="full"
//             bg="#E77B50"
//             boxShadow="0 10px 25px rgba(160,70,40,.15)"
//           >

//             <Box
//               position="absolute"
//               top="-3px"
//               left="20px"
//               w="12px"
//               h="7px"
//               borderRadius="100%"
//               bg="#5E8B45"
//               transform="rotate(-20deg)"
//             />

//           </Box>


//           {/* Small ingredient */}

//           <Box
//             position="absolute"
//             left={{
//               base: "22%",
//               md: "28%",
//             }}
//             bottom="2px"
//             w="38px"
//             h="38px"
//             borderRadius="14px"
//             bg="#F2D48C"
//             transform="rotate(12deg)"
//           />

//         </Box>


//         {/* ---------------------------------------
//             NUTRITION LABELS
//         ---------------------------------------- */}

//         <Flex
//           gap={2}
//           justify="center"
//           mt={1}
//         >

//           <NutritionPill
//             label="Calories"
//             value="Energy"
//           />

//           <NutritionPill
//             label="Protein"
//             value="Macro"
//           />

//           <NutritionPill
//             label="Macros"
//             value="Balance"
//           />

//         </Flex>


//         {/* ---------------------------------------
//             BOTTOM MESSAGE
//         ---------------------------------------- */}

//         <HStack
//           justify="center"
//           spacing={2}
//           mt={5}
//         >

//           <Box
//             w="20px"
//             h="20px"
//             borderRadius="full"
//             bg="#D8F36A"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >

//             <Text
//               fontSize="11px"
//               fontWeight="900"
//               color="#173F35"
//             >
//               ✓
//             </Text>

//           </Box>

//           <Text
//             fontSize="xs"
//             fontWeight="600"
//             color="#78827B"
//           >
//             No account required
//           </Text>

//         </HStack>

//       </VStack>

//     </Box>
//   );
// };


// /* ---------------------------------------------
//    SMALL NUTRITION PILL
// ---------------------------------------------- */

// interface NutritionPillProps {
//   label: string;
//   value: string;
// }

// const NutritionPill = ({
//   label,
//   value
// }: NutritionPillProps) => {

//   return (

//     <Box
//       flex="1"
//       maxW="105px"
//       bg="rgba(255,255,255,.72)"
//       border="1px solid"
//       borderColor="rgba(255,255,255,.95)"
//       borderRadius="14px"
//       px={3}
//       py={2}
//       backdropFilter="blur(10px)"
//     >

//       <Text
//         fontSize="9px"
//         fontWeight="700"
//         color="#63716A"
//       >
//         {label}
//       </Text>

//       <Text
//         fontSize="9px"
//         color="#A0A79F"
//         mt={0.5}
//       >
//         {value}
//       </Text>

//     </Box>

//   );
// };


// export default NutritionHero;


// Version 4

// import {
//   Badge,
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Image,
//   Text,
//   VStack,
// } from "@chakra-ui/react";

// import heroFood from "../../assets/nutrition/neka-nutrition-hero.png";

// const NutritionHero = () => {
//   return (
//     <Box
//       position="relative"
//       overflow="hidden"
//       borderRadius="32px"
//       bg="#F5F1E8"
//       border="1px solid"
//       borderColor="#E7DFD0"
//       boxShadow="0 20px 55px rgba(35, 55, 42, 0.08)"
//     >

//       {/* ----------------------------------------
//           SOFT BACKGROUND ACCENTS
//       ----------------------------------------- */}

//       <Box
//         position="absolute"
//         top="-100px"
//         right="-100px"
//         w="260px"
//         h="260px"
//         borderRadius="full"
//         bg="#DCECA5"
//         opacity={0.55}
//       />

//       <Box
//         position="absolute"
//         bottom="-120px"
//         left="-100px"
//         w="260px"
//         h="260px"
//         borderRadius="full"
//         bg="#F2C98A"
//         opacity={0.3}
//       />


//       {/* ----------------------------------------
//           CONTENT
//       ----------------------------------------- */}

//       <VStack
//         position="relative"
//         zIndex={2}
//         align="stretch"
//         spacing={0}
//         px={{
//           base: 6,
//           md: 8,
//         }}
//         pt={{
//           base: 6,
//           md: 8,
//         }}
//         pb={6}
//       >

//         {/* --------------------------------------
//             BRAND
//         --------------------------------------- */}

//         <Flex
//           align="center"
//           justify="space-between"
//         >

//           <HStack spacing={3}>

//             <Box
//               w="42px"
//               h="42px"
//               borderRadius="14px"
//               bg="#123F34"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               boxShadow="0 8px 20px rgba(18,63,52,.18)"
//             >

//               <Text
//                 fontSize="21px"
//                 lineHeight="1"
//               >
//                 🌿
//               </Text>

//             </Box>

//             <VStack
//               align="start"
//               spacing={0}
//             >

//               <Text
//                 fontSize="sm"
//                 fontWeight="900"
//                 letterSpacing="2px"
//                 color="#123F34"
//               >
//                 NEKA
//               </Text>

//               <Text
//                 fontSize="9px"
//                 fontWeight="700"
//                 letterSpacing="2px"
//                 color="#829087"
//               >
//                 NUTRITION
//               </Text>

//             </VStack>

//           </HStack>


//           <Badge
//             bg="#123c3f"
//             color="#E3F59A"
//             borderRadius="full"
//             px={3.5}
//             py={2}
//             fontSize="10px"
//             fontWeight="700"
//             textTransform="none"
//           >
//             ✦ Free to explore
//           </Badge>

//         </Flex>


//         {/* --------------------------------------
//             HEADLINE
//         --------------------------------------- */}

//         <Box
//           mt={{
//             base: 8,
//             md: 10,
//           }}
//           maxW="380px"
//         >

//           <Text
//             fontSize="10px"
//             fontWeight="800"
//             letterSpacing="2.5px"
//             color="#779342"
//             mb={3}
//           >
//             NUTRITION, SIMPLIFIED
//           </Text>


//           <Heading
//             fontSize={{
//               base: "3xl",
//               md: "4xl",
//             }}
//             lineHeight="1"
//             letterSpacing="-1.5px"
//             fontWeight="800"
//             color="#17211D"
//           >

//             What's really

//             <Box
//               as="span"
//               display="block"
//               color="#28614D"
//             >
//               in your food?
//             </Box>

//           </Heading>


//           <Text
//             mt={4}
//             fontSize="sm"
//             lineHeight="1.7"
//             color="#657069"
//             maxW="340px"
//           >
//             Search any food or ingredient and discover
//             its calories, protein, carbs, fats and more —
//             instantly.
//           </Text>

//         </Box>


//         {/* --------------------------------------
//             FOOD VISUAL
//         --------------------------------------- */}

//         <Box
//           position="relative"
//           mt={{
//             base: 6,
//             md: 8,
//           }}
//           mx={{
//             base: -2,
//             md: 0,
//           }}
//           borderRadius="26px"
//           overflow="hidden"
//           minH={{
//             base: "265px",
//             md: "320px",
//           }}
//         >

//           <Image
//             src={heroFood}
//             alt="Healthy nutritious meal"
//             position="absolute"
//             inset={0}
//             w="100%"
//             h="100%"
//             objectFit="cover"
//             objectPosition="center"
//             borderRadius="26px"
//           />


//           {/* Image readability gradient */}

//           <Box
//             position="absolute"
//             inset={0}
//             bg="linear-gradient(
//               180deg,
//               rgba(18,63,52,0.02) 0%,
//               rgba(18,63,52,0.02) 45%,
//               rgba(18,63,52,0.35) 100%
//             )"
//           />


//           {/* ----------------------------------
//               FLOATING NUTRITION INSIGHT
//           ----------------------------------- */}

//           <Box
//             position="absolute"
//             left={{
//               base: 3,
//               md: 5,
//             }}
//             bottom={{
//               base: 3,
//               md: 5,
//             }}
//             w={{
//               base: "190px",
//               md: "220px",
//             }}
//             bg="rgba(255,255,255,0.94)"
//             backdropFilter="blur(16px)"
//             borderRadius="20px"
//             p={4}
//             boxShadow="0 15px 40px rgba(0,0,0,.16)"
//           >

//             <Text
//               fontSize="10px"
//               fontWeight="800"
//               letterSpacing="1.2px"
//               color="#123F34"
//               mb={3}
//             >
//               NUTRITION INSIGHT
//             </Text>


//             <HStack
//               justify="space-between"
//               mb={2}
//             >

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >
//                 Calories
//               </Text>

//               <Text
//                 fontSize="sm"
//                 fontWeight="800"
//                 color="#17211D"
//               >
//                 165 kcal
//               </Text>

//             </HStack>


//             <HStack
//               justify="space-between"
//               mb={2}
//             >

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >
//                 Protein
//               </Text>

//               <Text
//                 fontSize="sm"
//                 fontWeight="800"
//                 color="#28614D"
//               >
//                 31 g
//               </Text>

//             </HStack>


//             <HStack
//               justify="space-between"
//             >

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >
//                 Carbs
//               </Text>

//               <Text
//                 fontSize="sm"
//                 fontWeight="800"
//                 color="#17211D"
//               >
//                 12 g
//               </Text>

//             </HStack>

//           </Box>

//         </Box>


//         {/* --------------------------------------
//             FEATURE STRIP
//         --------------------------------------- */}

//         <Flex
//           mt={4}
//           gap={2}
//         >

//           <NutritionFeature
//             label="Calories"
//             sub="Energy"
//           />

//           <NutritionFeature
//             label="Protein"
//             sub="Muscle"
//           />

//           <NutritionFeature
//             label="Carbs"
//             sub="Fuel"
//           />

//           <NutritionFeature
//             label="Fats"
//             sub="Balance"
//           />

//         </Flex>


//         {/* --------------------------------------
//             TRUST MESSAGE
//         --------------------------------------- */}

//         <HStack
//           justify="center"
//           spacing={2}
//           mt={5}
//         >

//           <Box
//             w="20px"
//             h="20px"
//             borderRadius="full"
//             bg="#DDF29A"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >

//             <Text
//               fontSize="11px"
//               fontWeight="900"
//               color="#123F34"
//             >
//               ✓
//             </Text>

//           </Box>

//           <Text
//             fontSize="xs"
//             fontWeight="600"
//             color="#78827B"
//           >
//             No account required
//             <Box
//               as="span"
//               mx={1}
//             >
//               ·
//             </Box>
//             Start exploring
//           </Text>

//         </HStack>

//       </VStack>

//     </Box>
//   );
// };


// /* ============================================
//    FEATURE ITEM
// ============================================ */

// interface NutritionFeatureProps {
//   label: string;
//   sub: string;
// }

// const NutritionFeature = ({
//   label,
//   sub
// }: NutritionFeatureProps) => {

//   return (

//     <Box
//       flex="1"
//       bg="rgba(255,255,255,0.72)"
//       border="1px solid"
//       borderColor="rgba(255,255,255,0.95)"
//       borderRadius="14px"
//       px={{
//         base: 2,
//         md: 3,
//       }}
//       py={2.5}
//       textAlign="center"
//       backdropFilter="blur(8px)"
//     >

//       <Text
//         fontSize={{
//           base: "9px",
//           md: "10px",
//         }}
//         fontWeight="800"
//         color="#365044"
//       >
//         {label}
//       </Text>

//       <Text
//         fontSize="8px"
//         color="#9AA39D"
//         mt={0.5}
//       >
//         {sub}
//       </Text>

//     </Box>

//   );
// };


// export default NutritionHero;


// Version 5

import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import heroFood
  from "../../assets/nutrition/neka-nutrition-hero.png";


const NutritionHero = () => {

  return (

    <Box

      position="relative"

      overflow="hidden"

      borderRadius="32px"

      bg="#F3FAFF"

      border="1px solid"

      borderColor="#D7EEFC"

      boxShadow="
        0 20px 55px
        rgba(56, 189, 248, 0.10)
      "

    >

      {/* ----------------------------------------
          SOFT SKY BLUE BACKGROUND ACCENTS
      ----------------------------------------- */}

      <Box

        position="absolute"

        top="-100px"

        right="-100px"

        w="260px"

        h="260px"

        borderRadius="full"

        bg="#BDE7FA"

        opacity={0.55}

      />


      <Box

        position="absolute"

        bottom="-120px"

        left="-100px"

        w="260px"

        h="260px"

        borderRadius="full"

        bg="#DDF4FF"

        opacity={0.8}

      />


      {/* ----------------------------------------
          CONTENT
      ----------------------------------------- */}

      <VStack

        position="relative"

        zIndex={2}

        align="stretch"

        spacing={0}

        px={{
          base: 6,
          md: 8,
        }}

        pt={{
          base: 6,
          md: 8,
        }}

        pb={6}

      >

        {/* --------------------------------------
            BRAND
        --------------------------------------- */}

        <Flex

          align="center"

          justify="space-between"

        >

          <HStack spacing={3}>

            <Box

              w="42px"

              h="42px"

              borderRadius="14px"

              bg="#E6F6FF"

              border="1px solid"

              borderColor="#CBEAFB"

              display="flex"

              alignItems="center"

              justifyContent="center"

              boxShadow="
                0 8px 20px
                rgba(56,189,248,.12)
              "

            >

              <Text

                fontSize="21px"

                lineHeight="1"

              >

                🥗

              </Text>

            </Box>


            <VStack

              align="start"

              spacing={0}

            >

              <Text

                fontSize="sm"

                fontWeight="900"

                letterSpacing="2px"

                color="#16324F"

              >

                NEKA

              </Text>


              <Text

                fontSize="9px"

                fontWeight="700"

                letterSpacing="2px"

                color="#7B9AB2"

              >

                NUTRITION

              </Text>

            </VStack>

          </HStack>


          <Badge

            bg="#E0F3FF"

            color="#1687C7"

            border="1px solid"

            borderColor="#BFE5FA"

            borderRadius="full"

            px={3.5}

            py={2}

            fontSize="10px"

            fontWeight="700"

            textTransform="none"

          >

            ✦ Free to explore

          </Badge>

        </Flex>


        {/* --------------------------------------
            HEADLINE
        --------------------------------------- */}

        <Box

          mt={{
            base: 8,
            md: 10,
          }}

          maxW="380px"

        >

          <Text

            fontSize="10px"

            fontWeight="800"

            letterSpacing="2.5px"

            color="#329ED5"

            mb={3}

          >

            NUTRITION, SIMPLIFIED

          </Text>


          <Heading

            fontSize={{
              base: "3xl",
              md: "4xl",
            }}

            lineHeight="1"

            letterSpacing="-1.5px"

            fontWeight="800"

            color="#172B3D"

          >

            What's really


            <Box

              as="span"

              display="block"

              color="#2196D2"

            >

              in your food?

            </Box>

          </Heading>


          <Text

            mt={4}

            fontSize="sm"

            lineHeight="1.7"

            color="#60788B"

            maxW="340px"

          >

            Search any food or ingredient and discover
            its calories, protein, carbs, fats and more —
            instantly.

          </Text>

        </Box>


        {/* --------------------------------------
            FOOD VISUAL WRAPPER
        --------------------------------------- */}

        <Box

          position="relative"

          mt={{
            base: 6,
            md: 8,
          }}

          mx={{
            base: -2,
            md: 0,
          }}

          borderRadius="26px"

          overflow="hidden"

          minH={{
            base: "265px",
            md: "320px",
          }}

          bg="#EAF7FF"

          border="1px solid"

          borderColor="#CDECFB"

          boxShadow="
            0 14px 35px
            rgba(56,189,248,.10)
          "

        >

          {/* ----------------------------------
              FOOD IMAGE
          ----------------------------------- */}

          <Image

            src={heroFood}

            alt="Healthy nutritious meal"

            position="absolute"

            inset={0}

            w="100%"

            h="100%"

            objectFit="cover"

            objectPosition="center"

          />


          {/* ----------------------------------
              VERY SUBTLE SKY-BLUE OVERLAY

              No green.
              No dark tint.
          ----------------------------------- */}

          <Box

            position="absolute"

            inset={0}

            bg="
              linear-gradient(
                180deg,
                rgba(230,247,255,0.02) 0%,
                rgba(230,247,255,0.00) 55%,
                rgba(190,231,250,0.10) 100%
              )
            "

            pointerEvents="none"

          />


          {/* ----------------------------------
              FLOATING NUTRITION INSIGHT
          ----------------------------------- */}

          <Box

            position="absolute"

            left={{
              base: 3,
              md: 5,
            }}

            bottom={{
              base: 3,
              md: 5,
            }}

            w={{
              base: "190px",
              md: "220px",
            }}

            bg="rgba(255,255,255,0.96)"

            backdropFilter="blur(18px)"

            borderRadius="20px"

            p={4}

            border="1px solid"

            borderColor="rgba(255,255,255,0.9)"

            boxShadow="
              0 15px 40px
              rgba(20,80,110,.14)
            "

          >

            <Text

              fontSize="10px"

              fontWeight="800"

              letterSpacing="1.2px"

              color="#218BC2"

              mb={3}

            >

              NUTRITION INSIGHT

            </Text>


            <HStack

              justify="space-between"

              mb={2}

            >

              <Text

                fontSize="xs"

                color="gray.500"

              >

                Calories

              </Text>


              <Text

                fontSize="sm"

                fontWeight="800"

                color="#172B3D"

              >

                165 kcal

              </Text>

            </HStack>


            <HStack

              justify="space-between"

              mb={2}

            >

              <Text

                fontSize="xs"

                color="gray.500"

              >

                Protein

              </Text>


              <Text

                fontSize="sm"

                fontWeight="800"

                color="#1687C7"

              >

                31 g

              </Text>

            </HStack>


            <HStack

              justify="space-between"

            >

              <Text

                fontSize="xs"

                color="gray.500"

              >

                Carbs

              </Text>


              <Text

                fontSize="sm"

                fontWeight="800"

                color="#172B3D"

              >

                12 g

              </Text>

            </HStack>

          </Box>

        </Box>


        {/* --------------------------------------
            FEATURE STRIP
        --------------------------------------- */}

        <Flex

          mt={4}

          gap={2}

        >

          <NutritionFeature

            label="Calories"

            sub="Energy"

          />


          <NutritionFeature

            label="Protein"

            sub="Muscle"

          />


          <NutritionFeature

            label="Carbs"

            sub="Fuel"

          />


          <NutritionFeature

            label="Fats"

            sub="Balance"

          />

        </Flex>


        {/* --------------------------------------
            TRUST MESSAGE
        --------------------------------------- */}

        <HStack

          justify="center"

          spacing={2}

          mt={5}

        >

          <Box

            w="20px"

            h="20px"

            borderRadius="full"

            bg="#DDF3FF"

            border="1px solid"

            borderColor="#B9E5FA"

            display="flex"

            alignItems="center"

            justifyContent="center"

          >

            <Text

              fontSize="11px"

              fontWeight="900"

              color="#1687C7"

            >

              ✓

            </Text>

          </Box>


          <Text

            fontSize="xs"

            fontWeight="600"

            color="#71899B"

          >

            No account required


            <Box

              as="span"

              mx={1}

            >

              ·

            </Box>


            Start exploring

          </Text>

        </HStack>

      </VStack>

    </Box>

  );

};


/* ============================================
   FEATURE ITEM
============================================ */

interface NutritionFeatureProps {

  label: string;

  sub: string;

}


const NutritionFeature = ({

  label,

  sub

}: NutritionFeatureProps) => {

  return (

    <Box

      flex="1"

      bg="rgba(255,255,255,0.78)"

      border="1px solid"

      borderColor="rgba(255,255,255,0.95)"

      borderRadius="14px"

      px={{
        base: 2,
        md: 3,
      }}

      py={2.5}

      textAlign="center"

      backdropFilter="blur(8px)"

    >

      <Text

        fontSize={{
          base: "9px",
          md: "10px",
        }}

        fontWeight="800"

        color="#31546B"

      >

        {label}

      </Text>


      <Text

        fontSize="8px"

        color="#93A8B7"

        mt={0.5}

      >

        {sub}

      </Text>

    </Box>

  );

};


export default NutritionHero;