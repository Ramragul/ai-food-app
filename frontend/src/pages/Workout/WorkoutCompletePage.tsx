//  Version 1

// import { Badge, Box, Button, Center, Flex, Heading, HStack, Spinner, Stat, StatLabel, StatNumber, Text, SimpleGrid, VStack } from "@chakra-ui/react";
// import { FiArrowRight, FiClock, FiZap, FiRepeat } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { getWorkoutSession } from "../../services/userWorkout.service";
// import type { WorkoutSession } from "../../types/workoutExecution.types";

// const formatMinutes = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`;

// const WorkoutCompletePage = () => {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState<WorkoutSession | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getWorkoutSession(Number(sessionId));
//         setSession(data);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [sessionId]);

//   if (loading) {
//     return <Center minH="70vh"><Spinner size="xl" /></Center>;
//   }

//   if (!session) {
//     return <Center minH="70vh"><Text color="gray.500">Workout summary unavailable.</Text></Center>;
//   }

//   return (
//     <Box minH="100vh" bg="gray.50" px={4} py={{ base: 7, md: 10 }}>
//       <Box maxW="760px" mx="auto">
//         <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="3xl" p={{ base: 7, md: 10 }} textAlign="center" boxShadow="0 18px 55px rgba(15,23,42,0.06)">
//           <Box w="76px" h="76px" mx="auto" borderRadius="full" bg="blue.50" color="blue.500" display="flex" alignItems="center" justifyContent="center">
//             <FiZap size={34} />
//           </Box>
//           <Badge mt={5} colorScheme="blue" borderRadius="full" px={3} py={1}>WORKOUT COMPLETE</Badge>
//           <Heading mt={4} size={{ base: "lg", md: "xl" }}>{session.assignment.workout_name}</Heading>
//           <Text color="gray.500" mt={2}>Good work. Your session has been saved.</Text>

//           <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} mt={8}>
//             <Stat bg="gray.50" borderRadius="2xl" p={5}>
//               <HStack justify="center" color="gray.400"><FiZap /><StatLabel>Active burn</StatLabel></HStack>
//               <StatNumber mt={2}>{Math.round(session.calories_burned_active || 0)} kcal</StatNumber>
//               <Text fontSize="xs" color="gray.400" mt={1}>Estimated • {session.burn_confidence || "LOW"} confidence</Text>
//             </Stat>
//             <Stat bg="gray.50" borderRadius="2xl" p={5}>
//               <HStack justify="center" color="gray.400"><FiClock /><StatLabel>Workout</StatLabel></HStack>
//               <StatNumber mt={2}>{formatMinutes(session.current_elapsed_seconds || session.active_seconds)}</StatNumber>
//               <Text fontSize="xs" color="gray.400" mt={1}>Active workout time</Text>
//             </Stat>
//             <Stat bg="gray.50" borderRadius="2xl" p={5}>
//               <HStack justify="center" color="gray.400"><FiRepeat /><StatLabel>Completion</StatLabel></HStack>
//               <StatNumber mt={2}>{Math.round(session.completion_percent)}%</StatNumber>
//               <Text fontSize="xs" color="gray.400" mt={1}>{session.completed_sets} sets completed</Text>
//             </Stat>
//           </SimpleGrid>

//           <Flex justify="center" mt={8} gap={3} direction={{ base: "column", sm: "row" }}>
//             <Button colorScheme="blue" borderRadius="xl" rightIcon={<FiArrowRight />} onClick={() => navigate("/workouts")}>
//               Back to My Workouts
//             </Button>
//             <Button variant="outline" borderRadius="xl" onClick={() => navigate("/workouts/history")}>
//               View History
//             </Button>
//           </Flex>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default WorkoutCompletePage;


// Version 2

import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCoffee,
  FiRepeat,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getWorkoutSession } from "../../services/userWorkout.service";
import type { WorkoutSession } from "../../types/workoutExecution.types";

const minutes = (seconds?: number | null) => {
  const value = Math.max(0, Number(seconds || 0));

  if (!value) return "0 min";

  const rounded = Math.max(1, Math.round(value / 60));
  return `${rounded} min`;
};

const formatConfidence = (value?: string | null) => {
  const normalized = String(value || "LOW").toUpperCase();

  if (normalized === "HIGH") return "High confidence";
  if (normalized === "MEDIUM") return "Medium confidence";
  return "Low confidence";
};

const WorkoutCompletePage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const load = async () => {
      try {
        setError("");

        const id = Number(sessionId);

        if (!Number.isInteger(id) || id <= 0) {
          throw new Error("Invalid workout session.");
        }

        const data = await getWorkoutSession(id);
        setSession(data);
      } catch (requestError: any) {
        setError(
          requestError?.response?.data?.error ??
            requestError?.message ??
            "Workout summary unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [sessionId]);

  if (loading) {
    return (
      <Center minH="100vh" bg="#f5f8fb" px={5}>
        <VStack spacing={4}>
          <Flex
            w="58px"
            h="58px"
            align="center"
            justify="center"
            borderRadius="full"
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            boxShadow="0 12px 32px rgba(15,23,42,0.08)"
          >
            <Spinner size="md" thickness="3px" color="brand.500" />
          </Flex>

          <Text color="gray.500" fontSize="sm">
            Preparing your workout summary…
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!session) {
    return (
      <Center minH="100vh" bg="#f5f8fb" px={5}>
        <VStack spacing={5} textAlign="center">
          <Flex
            w="64px"
            h="64px"
            align="center"
            justify="center"
            borderRadius="2xl"
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            boxShadow="0 14px 36px rgba(15,23,42,0.08)"
          >
            <Icon as={FiRepeat} color="gray.400" boxSize={7} />
          </Flex>

          <Box>
            <Heading
              size="md"
              color="gray.900"
              letterSpacing="-0.025em"
            >
              Workout summary unavailable
            </Heading>

            <Text
              color="gray.500"
              maxW="440px"
              mt={2}
              fontSize="sm"
              lineHeight="1.7"
            >
              {error || "We couldn't load this completed session."}
            </Text>
          </Box>

          <Button
            bg="brand.500" color="white" _hover={{ bg: "brand.600" }} _active={{ bg: "brand.700" }}
            borderRadius="xl"
            px={6}
            onClick={() => navigate("/workouts")}
          >
            Back to My Workouts
          </Button>
        </VStack>
      </Center>
    );
  }

  const completion = Math.max(
    0,
    Math.min(100, Math.round(Number(session.completion_percent || 0)))
  );

  const calories = Math.max(
    0,
    Math.round(Number(session.calories_burned_active || 0))
  );

  const completedSets = Math.max(
    0,
    Number(session.completed_sets || 0)
  );

  const totalSets = Math.max(
    completedSets,
    Number(session.total_sets || 0)
  );

  const skippedSets = Math.max(
    0,
    Number(session.skipped_sets || 0)
  );

  const totalExercises = Math.max(
    0,
    Number(session.assignment?.exercises?.length || 0)
  );

  const completedExercises = Math.max(
    0,
    Number(session.completed_exercises || 0)
  );

  const confidence = formatConfidence(session.burn_confidence);

  return (
    <Box
      minH="100vh"
      bg="#f5f8fb"
      px={{ base: 4, md: 7 }}
      py={{ base: 5, md: 9 }}
    >
      <Box maxW="940px" mx="auto">
        {/* TOP NAV */}
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          mb={{ base: 5, md: 7 }}
        >
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            color="gray.600"
            borderRadius="xl"
            px={3}
            onClick={() => navigate("/workouts")}
          >
            My Workouts
          </Button>

          <Badge
            bg="brand.50"
            color="brand.700"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="full"
            px={3}
            py={1.5}
            fontSize="10px"
            letterSpacing="0.08em"
            boxShadow="0 6px 18px rgba(15,23,42,0.05)"
          >
            SESSION SUMMARY
          </Badge>
        </Flex>

        {/* HERO */}
        <Box
          position="relative"
          overflow="hidden"
          bg="white"
          border="1px solid"
          borderColor="rgba(148,163,184,0.16)"
          borderRadius={{ base: "3xl", md: "4xl" }}
          px={{ base: 6, md: 11 }}
          py={{ base: 7, md: 10 }}
          boxShadow="0 24px 70px rgba(15,23,42,0.08)"
        >
          {/* soft brand glow */}
          <Box
            position="absolute"
            top="-170px"
            left="50%"
            transform="translateX(-50%)"
            w="430px"
            h="430px"
            borderRadius="full"
            bg="brand.100"
            opacity={0.6}
            filter="blur(85px)"
          />

          <Box
            position="absolute"
            bottom="-180px"
            right="-100px"
            w="340px"
            h="340px"
            borderRadius="full"
            bg="brand.50"
            opacity={0.8}
            filter="blur(80px)"
          />

          <Box position="relative" zIndex={1}>
            <Flex
              align="center"
              justify="center"
              direction="column"
              textAlign="center"
            >
              <Flex
                w={{ base: "72px", md: "82px" }}
                h={{ base: "72px", md: "82px" }}
                align="center"
                justify="center"
                borderRadius="2xl"
                bg="brand.50"
                color="brand.500"
                border="1px solid"
                borderColor="brand.100"
                boxShadow="0 16px 34px rgba(66,153,225,0.14)"
              >
                <Icon as={FiCheck} boxSize={{ base: 8, md: 9 }} />
              </Flex>

              <Badge
                mt={5}
                bg="brand.50"
                color="brand.700"
                borderRadius="full"
                px={3.5}
                py={1.5}
                fontSize="10px"
                letterSpacing="0.09em"
              >
                WORKOUT COMPLETE
              </Badge>

              <Heading
                mt={4}
                color="gray.900"
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="-0.045em"
                lineHeight="1.08"
              >
                {session.assignment?.workout_name || "Workout"}
              </Heading>

              <Text
                mt={2}
                color="gray.500"
                fontSize="sm"
                maxW="520px"
                lineHeight="1.7"
              >
                Session saved successfully. Here is a clear look at what
                you accomplished.
              </Text>
            </Flex>

            <Divider my={{ base: 7, md: 8 }} borderColor="gray.100" />

            {/* CALORIES */}
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "center", md: "flex-end" }}
              justify="space-between"
              gap={7}
            >
              <Box textAlign={{ base: "center", md: "left" }}>
                <HStack
                  justify={{ base: "center", md: "flex-start" }}
                  spacing={2}
                >
                  <Icon as={FiZap} color="brand.500" boxSize={4} />
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                  >
                    Active calories
                  </Text>
                </HStack>

                <HStack
                  mt={2}
                  align="baseline"
                  justify={{ base: "center", md: "flex-start" }}
                  spacing={2}
                >
                  <Text
                    color="gray.900"
                    fontSize={{ base: "5xl", md: "6xl" }}
                    fontWeight="750"
                    letterSpacing="-0.065em"
                    lineHeight="0.95"
                  >
                    {calories}
                  </Text>

                  <Text
                    color="gray.400"
                    fontSize="sm"
                    fontWeight="600"
                  >
                    kcal
                  </Text>
                </HStack>

                <Text mt={2} color="gray.400" fontSize="xs">
                  Estimated from completed exercise work
                </Text>
              </Box>

              <Box
                minW={{ base: "100%", md: "220px" }}
                bg="gray.50"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="2xl"
                px={5}
                py={4}
              >
                <Flex justify="space-between" align="center" gap={4}>
                  <Text fontSize="xs" color="gray.400">
                    Burn estimate
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="gray.700"
                  >
                    {confidence}
                  </Text>
                </Flex>

                <Progress
                  mt={3}
                  value={
                    String(session.burn_confidence || "").toUpperCase() === "HIGH"
                      ? 100
                      : String(session.burn_confidence || "").toUpperCase() === "MEDIUM"
                        ? 65
                        : 35
                  }
                  size="xs"
                  borderRadius="full"
                  bg="brand.100"
                  colorScheme="brand"
                />
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* QUICK STATS */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={4}
          mt={5}
        >
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="0 8px 26px rgba(15,23,42,0.04)"
          >
            <Flex align="center" justify="space-between">
              <HStack spacing={2} color="gray.400">
                <Icon as={FiClock} boxSize={4} />
                <Text fontSize="xs" fontWeight="600">
                  Active time
                </Text>
              </HStack>

              <Flex
                w="30px"
                h="30px"
                align="center"
                justify="center"
                borderRadius="lg"
                bg="gray.50"
              >
                <Icon as={FiClock} color="gray.500" boxSize={4} />
              </Flex>
            </Flex>

            <Text
              mt={4}
              color="gray.900"
              fontWeight="750"
              fontSize="2xl"
              letterSpacing="-0.035em"
            >
              {minutes(session.active_seconds)}
            </Text>

            <Text mt={1} fontSize="xs" color="gray.400">
              Exercise work time
            </Text>
          </Box>

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="0 8px 26px rgba(15,23,42,0.04)"
          >
            <Flex align="center" justify="space-between">
              <HStack spacing={2} color="gray.400">
                <Icon as={FiCoffee} boxSize={4} />
                <Text fontSize="xs" fontWeight="600">
                  Rest
                </Text>
              </HStack>

              <Flex
                w="30px"
                h="30px"
                align="center"
                justify="center"
                borderRadius="lg"
                bg="gray.50"
              >
                <Icon as={FiCoffee} color="gray.500" boxSize={4} />
              </Flex>
            </Flex>

            <Text
              mt={4}
              color="gray.900"
              fontWeight="750"
              fontSize="2xl"
              letterSpacing="-0.035em"
            >
              {minutes(session.rest_seconds)}
            </Text>

            <Text mt={1} fontSize="xs" color="gray.400">
              Tracked recovery
            </Text>
          </Box>

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="0 8px 26px rgba(15,23,42,0.04)"
          >
            <Flex align="center" justify="space-between">
              <HStack spacing={2} color="gray.400">
                <Icon as={FiRepeat} boxSize={4} />
                <Text fontSize="xs" fontWeight="600">
                  Sets
                </Text>
              </HStack>

              <Flex
                w="30px"
                h="30px"
                align="center"
                justify="center"
                borderRadius="lg"
                bg="gray.50"
              >
                <Icon as={FiRepeat} color="gray.500" boxSize={4} />
              </Flex>
            </Flex>

            <Text
              mt={4}
              color="gray.900"
              fontWeight="750"
              fontSize="2xl"
              letterSpacing="-0.035em"
            >
              {completedSets}
              <Text
                as="span"
                color="gray.300"
                fontSize="md"
                fontWeight="600"
              >
                {" "}
                / {totalSets}
              </Text>
            </Text>

            <Text mt={1} fontSize="xs" color="gray.400">
              Completed sets
            </Text>
          </Box>

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="0 8px 26px rgba(15,23,42,0.04)"
          >
            <Flex align="center" justify="space-between">
              <HStack spacing={2} color="gray.400">
                <Icon as={FiTrendingUp} boxSize={4} />
                <Text fontSize="xs" fontWeight="600">
                  Completion
                </Text>
              </HStack>

              <Flex
                w="30px"
                h="30px"
                align="center"
                justify="center"
                borderRadius="lg"
                bg="gray.50"
              >
                <Icon as={FiTrendingUp} color="gray.500" boxSize={4} />
              </Flex>
            </Flex>

            <Text
              mt={4}
              color="gray.900"
              fontWeight="750"
              fontSize="2xl"
              letterSpacing="-0.035em"
            >
              {completion}%
            </Text>

            <Text mt={1} fontSize="xs" color="gray.400">
              Workout completion
            </Text>
          </Box>
        </SimpleGrid>

        {/* PROGRESS / DETAILS */}
        <Box
          mt={5}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          p={{ base: 5, md: 6 }}
          boxShadow="0 8px 26px rgba(15,23,42,0.04)"
        >
          <Flex
            justify="space-between"
            align={{ base: "flex-start", sm: "center" }}
            direction={{ base: "column", sm: "row" }}
            gap={2}
          >
            <Box>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="gray.700"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                Session progress
              </Text>
              <Text mt={1} color="gray.400" fontSize="xs">
                {completedExercises} of {totalExercises} exercises completed
                {skippedSets > 0 ? ` • ${skippedSets} skipped sets` : ""}
              </Text>
            </Box>

            <Text
              fontSize="sm"
              fontWeight="750"
              color="gray.800"
            >
              {completion}%
            </Text>
          </Flex>

          <Progress
            mt={4}
            value={completion}
            size="sm"
            borderRadius="full"
            bg="brand.100"
            colorScheme="brand"
          />
        </Box>

        {/* FOOTER */}
        <Box
          mt={6}
          textAlign="center"
          px={{ base: 2, md: 8 }}
        >
          <Text
            fontSize="xs"
            color="gray.400"
            maxW="620px"
            mx="auto"
            lineHeight="1.8"
          >
            Calories are an estimate based on your completed exercise work,
            movement intensity and profile weight. They are not a medical
            measurement.
          </Text>

          <Flex
            justify="center"
            mt={6}
            gap={3}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              bg="brand.500" color="white" _hover={{ bg: "brand.600" }} _active={{ bg: "brand.700" }}
              borderRadius="xl"
              size="lg"
              // rightIcon={<FiArrowRight />}
              px={7}
              onClick={() => navigate("/workouts")}
            >
              Back to My Workouts
            </Button>

            <Button
              variant="outline"
              bg="white"
              borderColor="gray.200"
              color="gray.700"
              borderRadius="xl"
              size="lg"
              px={7}
              _hover={{ bg: "gray.50" }}
              onClick={() => navigate("/workouts/history")}
            >
              View History
            </Button>
          </Flex>

          <Text
            mt={7}
            fontSize="10px"
            color="gray.300"
          >
            Session ID · {session.id}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutCompletePage;





