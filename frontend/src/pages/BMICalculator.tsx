// Version 1

// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Input,
//   Text,
//   VStack,
//   useToast,
//   ScaleFade,
//   Icon,
// } from "@chakra-ui/react";

// import { useState } from "react";
// import { FaWeight, FaRulerVertical, FaHeartbeat } from "react-icons/fa";

// const BMICalculator = () => {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [bmi, setBmi] = useState<number | null>(null);
//   const [category, setCategory] = useState("");

//   const toast = useToast();

//   const calculateBMI = () => {
//     if (!height || !weight) {
//       toast({
//         title: "Missing Fields",
//         description: "Please enter height and weight",
//         status: "warning",
//         duration: 2500,
//         isClosable: true,
//       });

//       return;
//     }

//     const heightInMeters = Number(height) / 100;

//     const bmiValue =
//       Number(weight) / (heightInMeters * heightInMeters);

//     const roundedBMI = Number(bmiValue.toFixed(1));

//     setBmi(roundedBMI);

//     if (roundedBMI < 18.5) {
//       setCategory("Underweight");
//     } else if (roundedBMI < 25) {
//       setCategory("Normal Weight");
//     } else if (roundedBMI < 30) {
//       setCategory("Overweight");
//     } else {
//       setCategory("Obese");
//     }
//   };

//   const getCategoryColor = () => {
//     switch (category) {
//       case "Normal Weight":
//         return "green.400";

//       case "Underweight":
//         return "orange.400";

//       case "Overweight":
//         return "yellow.400";

//       case "Obese":
//         return "red.400";

//       default:
//         return "brand.500";
//     }
//   };

//   return (
//     <Box
//       minH="100vh"
//       bg="linear-gradient(135deg,#eaf6ff,#ffffff)"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       px={4}
//       py={10}
//     >
//       <Box
//         w="100%"
//         maxW="430px"
//         bg="white"
//         borderRadius="3xl"
//         p={8}
//         boxShadow="2xl"
//         animation="fadeSlide 0.4s ease"
//       >
//         <VStack spacing={6}>
//           {/* Header */}

//           <Flex
//             direction="column"
//             align="center"
//             justify="center"
//           >
//             <Box
//               bg="brand.100"
//               p={4}
//               borderRadius="full"
//               mb={3}
//             >
//               <Icon
//                 as={FaHeartbeat}
//                 boxSize={8}
//                 color="brand.600"
//               />
//             </Box>

//             <Heading
//               size="lg"
//               color="brand.700"
//               textAlign="center"
//             >
//               BMI Calculator
//             </Heading>

//             <Text
//               color="gray.500"
//               fontSize="sm"
//               mt={2}
//               textAlign="center"
//             >
//               Check your Body Mass Index instantly
//             </Text>
//           </Flex>

//           {/* Height Input */}

//           <Box w="100%">
//             <Text
//               mb={2}
//               fontWeight="600"
//               color="gray.700"
//             >
//               Height (cm)
//             </Text>

//             <Flex
//               align="center"
//               bg="brand.50"
//               borderRadius="xl"
//               px={4}
//             >
//               <Icon
//                 as={FaRulerVertical}
//                 color="brand.500"
//                 mr={3}
//               />

//               <Input
//                 type="number"
//                 placeholder="Enter your height"
//                 border="none"
//                 focusBorderColor="transparent"
//                 value={height}
//                 onChange={(e) =>
//                   setHeight(e.target.value)
//                 }
//               />
//             </Flex>
//           </Box>

//           {/* Weight Input */}

//           <Box w="100%">
//             <Text
//               mb={2}
//               fontWeight="600"
//               color="gray.700"
//             >
//               Weight (kg)
//             </Text>

//             <Flex
//               align="center"
//               bg="brand.50"
//               borderRadius="xl"
//               px={4}
//             >
//               <Icon
//                 as={FaWeight}
//                 color="brand.500"
//                 mr={3}
//               />

//               <Input
//                 type="number"
//                 placeholder="Enter your weight"
//                 border="none"
//                 focusBorderColor="transparent"
//                 value={weight}
//                 onChange={(e) =>
//                   setWeight(e.target.value)
//                 }
//               />
//             </Flex>
//           </Box>

//           {/* Button */}

//           <Button
//             w="100%"
//             size="lg"
//             bg="brand.500"
//             color="white"
//             borderRadius="xl"
//             _hover={{
//               bg: "brand.600",
//               transform: "translateY(-2px)",
//             }}
//             transition="0.2s"
//             onClick={calculateBMI}
//           >
//             Calculate BMI
//           </Button>

//           {/* Result */}

//           <ScaleFade initialScale={0.9} in={bmi !== null}>
//             {bmi !== null && (
//               <Box
//                 mt={4}
//                 bg="linear-gradient(135deg,#d6efff,#ffffff)"
//                 borderRadius="2xl"
//                 p={6}
//                 textAlign="center"
//                 w="100%"
//                 border="1px solid"
//                 borderColor="brand.100"
//               >
//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                   mb={2}
//                 >
//                   Your BMI
//                 </Text>

//                 <Heading
//                   size="2xl"
//                   color="brand.700"
//                 >
//                   {bmi}
//                 </Heading>

//                 <Text
//                   mt={3}
//                   fontWeight="bold"
//                   fontSize="lg"
//                   color={getCategoryColor()}
//                 >
//                   {category}
//                 </Text>

//                 <Text
//                   mt={3}
//                   color="gray.600"
//                   fontSize="sm"
//                 >
//                   A healthy BMI range is between
//                   18.5 and 24.9
//                 </Text>
//               </Box>
//             )}
//           </ScaleFade>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default BMICalculator;



// Version 2 

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  ScaleFade,
  Icon,
  Select,
  HStack,
  Divider,
} from "@chakra-ui/react";

import { useState } from "react";

import {
  FaWeight,
  FaRulerVertical,
  FaHeartbeat,
} from "react-icons/fa";

const BMICalculator = () => {
  const toast = useToast();

  // Height units
  const [heightUnit, setHeightUnit] = useState("cm");

  // Weight units
  const [weightUnit, setWeightUnit] = useState("kg");

  // Height states
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Weight state
  const [weight, setWeight] = useState("");

  // Result
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [healthTip, setHealthTip] = useState("");

  const calculateBMI = () => {
    if (!weight) {
      toast({
        title: "Missing Fields",
        description: "Please enter your weight",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });

      return;
    }

    let heightInMeters = 0;

    // Height conversion

    if (heightUnit === "cm") {
      if (!heightCm) {
        toast({
          title: "Missing Height",
          description: "Please enter your height",
          status: "warning",
          duration: 2500,
          isClosable: true,
        });

        return;
      }

      heightInMeters = Number(heightCm) / 100;
    } else {
      if (!feet) {
        toast({
          title: "Missing Height",
          description: "Please enter feet value",
          status: "warning",
          duration: 2500,
          isClosable: true,
        });

        return;
      }

      const totalInches =
        Number(feet) * 12 + Number(inches || 0);

      heightInMeters = totalInches * 0.0254;
    }

    // Weight conversion

    let weightInKg = Number(weight);

    if (weightUnit === "lbs") {
      weightInKg = Number(weight) * 0.453592;
    }

    // BMI Calculation

    const bmiValue =
      weightInKg / (heightInMeters * heightInMeters);

    const roundedBMI = Number(bmiValue.toFixed(1));

    setBmi(roundedBMI);

    // Category

    if (roundedBMI < 18.5) {
      setCategory("Underweight");
      setHealthTip(
        "Consider increasing nutritious calorie intake and strength training."
      );
    } else if (roundedBMI < 25) {
      setCategory("Normal Weight");
      setHealthTip(
        "Great job! Maintain a balanced diet and regular exercise."
      );
    } else if (roundedBMI < 30) {
      setCategory("Overweight");
      setHealthTip(
        "Try increasing physical activity and improving food quality."
      );
    } else {
      setCategory("Obese");
      setHealthTip(
        "Consider a structured fitness and nutrition plan for healthier progress."
      );
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Normal Weight":
        return "green.400";

      case "Underweight":
        return "orange.400";

      case "Overweight":
        return "yellow.400";

      case "Obese":
        return "red.400";

      default:
        return "brand.500";
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg,#eaf6ff,#ffffff)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={10}
    >
      <Box
        w="100%"
        maxW="460px"
        bg="white"
        borderRadius="3xl"
        p={8}
        boxShadow="2xl"
        animation="fadeSlide 0.4s ease"
      >
        <VStack spacing={6}>
          {/* Header */}

          <Flex direction="column" align="center">
            <Box
              bg="brand.100"
              p={4}
              borderRadius="full"
              mb={3}
            >
              <Icon
                as={FaHeartbeat}
                boxSize={8}
                color="brand.600"
              />
            </Box>

            <Heading
              size="lg"
              color="brand.700"
              textAlign="center"
            >
              BMI Calculator
            </Heading>

            <Text
              color="gray.500"
              mt={2}
              fontSize="sm"
              textAlign="center"
            >
              Check your Body Mass Index instantly
            </Text>
          </Flex>

          {/* Height Section */}

          <Box w="100%">
            <Flex
              justify="space-between"
              align="center"
              mb={2}
            >
              <Text fontWeight="600" color="gray.700">
                Height
              </Text>

              <Select
                w="120px"
                size="sm"
                borderRadius="lg"
                value={heightUnit}
                onChange={(e) =>
                  setHeightUnit(e.target.value)
                }
              >
                <option value="cm">CM</option>
                <option value="ft">Feet/Inch</option>
              </Select>
            </Flex>

            {heightUnit === "cm" ? (
              <Flex
                align="center"
                bg="brand.50"
                borderRadius="xl"
                px={4}
              >
                <Icon
                  as={FaRulerVertical}
                  color="brand.500"
                  mr={3}
                />

                <Input
                  type="number"
                  placeholder="Enter height in cm"
                  border="none"
                  value={heightCm}
                  onChange={(e) =>
                    setHeightCm(e.target.value)
                  }
                />
              </Flex>
            ) : (
              <HStack spacing={3}>
                <Input
                  type="number"
                  placeholder="Feet"
                  bg="brand.50"
                  borderRadius="xl"
                  value={feet}
                  onChange={(e) =>
                    setFeet(e.target.value)
                  }
                />

                <Input
                  type="number"
                  placeholder="Inches"
                  bg="brand.50"
                  borderRadius="xl"
                  value={inches}
                  onChange={(e) =>
                    setInches(e.target.value)
                  }
                />
              </HStack>
            )}
          </Box>

          {/* Weight Section */}

          <Box w="100%">
            <Flex
              justify="space-between"
              align="center"
              mb={2}
            >
              <Text fontWeight="600" color="gray.700">
                Weight
              </Text>

              <Select
                w="120px"
                size="sm"
                borderRadius="lg"
                value={weightUnit}
                onChange={(e) =>
                  setWeightUnit(e.target.value)
                }
              >
                <option value="kg">KG</option>
                <option value="lbs">LBS</option>
              </Select>
            </Flex>

            <Flex
              align="center"
              bg="brand.50"
              borderRadius="xl"
              px={4}
            >
              <Icon
                as={FaWeight}
                color="brand.500"
                mr={3}
              />

              <Input
                type="number"
                placeholder={`Enter weight in ${weightUnit}`}
                border="none"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value)
                }
              />
            </Flex>
          </Box>

          {/* Button */}

          <Button
            w="100%"
            size="lg"
            bg="brand.500"
            color="white"
            borderRadius="xl"
            _hover={{
              bg: "brand.600",
              transform: "translateY(-2px)",
            }}
            transition="0.2s"
            onClick={calculateBMI}
          >
            Calculate BMI
          </Button>

          {/* Result */}

          <ScaleFade initialScale={0.9} in={bmi !== null}>
            {bmi !== null && (
              <Box
                w="100%"
                mt={2}
                bg="linear-gradient(135deg,#d6efff,#ffffff)"
                borderRadius="2xl"
                p={6}
                border="1px solid"
                borderColor="brand.100"
              >
                <VStack spacing={4}>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    Your BMI
                  </Text>

                  <Heading
                    size="2xl"
                    color="brand.700"
                  >
                    {bmi}
                  </Heading>

                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color={getCategoryColor()}
                  >
                    {category}
                  </Text>

                  <Divider />

                  <Text
                    textAlign="center"
                    color="gray.600"
                    fontSize="sm"
                  >
                    {healthTip}
                  </Text>

                  <Box
                    bg="white"
                    p={3}
                    borderRadius="xl"
                    w="100%"
                  >
                    <Text
                      textAlign="center"
                      fontSize="xs"
                      color="gray.500"
                    >
                      Healthy BMI Range:
                    </Text>

                    <Text
                      textAlign="center"
                      fontWeight="bold"
                      color="brand.700"
                    >
                      18.5 - 24.9
                    </Text>
                  </Box>
                </VStack>
              </Box>
            )}
          </ScaleFade>
        </VStack>
      </Box>
    </Box>
  );
};

export default BMICalculator;