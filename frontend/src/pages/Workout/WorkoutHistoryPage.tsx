//  Version 1

// import { Badge, Box, Button, Center, Flex, Heading, HStack, Icon, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
// import { FiArrowLeft, FiCalendar, FiClock, FiZap } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getWorkoutSessionHistory } from "../../services/userWorkout.service";
// import type { WorkoutSessionHistoryItem } from "../../types/workoutExecution.types";

// const minutes = (seconds: number) => Math.max(1, Math.round(seconds / 60));

// const WorkoutHistoryPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [history, setHistory] = useState<WorkoutSessionHistoryItem[]>([]);

//   useEffect(() => {
//     getWorkoutSessionHistory()
//       .then(setHistory)
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={{ base: 5, md: 8 }}>
//       <Box maxW="1100px" mx="auto">
//         <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate("/workouts")} mb={5}>
//           My Workouts
//         </Button>
//         <Heading size={{ base: "lg", md: "xl" }}>Workout History</Heading>
//         <Text mt={2} color="gray.500">A simple record of the training you have completed.</Text>

//         {loading ? (
//           <Center minH="40vh"><Spinner size="xl" /></Center>
//         ) : !history.length ? (
//           <Box mt={8} bg="white" borderRadius="3xl" p={10} textAlign="center">
//             <Text color="gray.500">No completed workouts yet.</Text>
//           </Box>
//         ) : (
//           <SimpleGrid mt={8} columns={{ base: 1, lg: 2 }} spacing={5}>
//             {history.map((item) => (
//               <Box key={item.id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={6}>
//                 <Flex justify="space-between" gap={4}>
//                   <Box>
//                     <Heading size="sm">{item.workout_name || "Workout"}</Heading>
//                     <Text fontSize="sm" color="gray.400" mt={1}>{item.organization_name || "NEKA"}</Text>
//                   </Box>
//                   <Badge colorScheme="green" borderRadius="full" px={3} py={1}>DONE</Badge>
//                 </Flex>
//                 <HStack mt={5} spacing={5} color="gray.500" fontSize="sm" flexWrap="wrap">
//                   <HStack><Icon as={FiCalendar} /><Text>{new Date(item.finished_at || item.started_at).toLocaleDateString()}</Text></HStack>
//                   <HStack><Icon as={FiClock} /><Text>{minutes(item.active_seconds)} min</Text></HStack>
//                   <HStack><Icon as={FiZap} /><Text>{Math.round(item.calories_burned_active || 0)} kcal</Text></HStack>
//                 </HStack>
//                 <Text mt={4} fontSize="xs" color="gray.400">
//                   {Math.round(item.completion_percent)}% complete • {item.completed_sets} sets
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default WorkoutHistoryPage;


// Version 2

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock, FiRepeat, FiZap } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getWorkoutSessionHistory } from "../../services/userWorkout.service";
import type { WorkoutSessionHistoryItem } from "../../types/workoutExecution.types";

const minutes = (seconds?: number | null) => {
  const value = Math.max(0, Number(seconds || 0));
  return value ? `${Math.max(1, Math.round(value / 60))} min` : "0 min";
};

const formatDate = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const WorkoutHistoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<WorkoutSessionHistoryItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const data = await getWorkoutSessionHistory();
        setHistory(Array.isArray(data) ? data : []);
      } catch (requestError: any) {
        setError(
          requestError?.response?.data?.error ??
            requestError?.message ??
            "Unable to load workout history."
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <Box minH="100vh" bg="#f7f8fa" px={{ base: 4, md: 7 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1100px" mx="auto">
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          color="gray.600"
          borderRadius="xl"
          onClick={() => navigate("/workouts")}
          mb={6}
        >
          My Workouts
        </Button>

        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={5}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Text fontSize="10px" fontWeight="800" letterSpacing="0.13em" color="gray.400">
              HISTORY
            </Text>
            <Heading mt={2} size={{ base: "xl", md: "2xl" }} letterSpacing="-0.045em" color="gray.900">
              Your training, over time.
            </Heading>
            <Text mt={3} color="gray.500" maxW="650px" lineHeight="1.8" fontSize="sm">
              A clean record of completed sessions, active work and estimated energy burn.
            </Text>
          </Box>

          <Button
            variant="outline"
            borderRadius="xl"
            onClick={() => navigate("/workouts/library")}
          >
            Explore Exercises
          </Button>
        </Flex>

        {loading ? (
          <Center minH="45vh">
            <VStack spacing={4}>
              <Spinner size="xl" thickness="3px" color="blue.400" />
              <Text fontSize="sm" color="gray.500">Loading history…</Text>
            </VStack>
          </Center>
        ) : error ? (
          <Box mt={8} bg="white" border="1px solid" borderColor="red.100" borderRadius="2xl" p={8} textAlign="center">
            <Text color="gray.500">{error}</Text>
            <Button mt={5} colorScheme="blue" borderRadius="xl" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Box>
        ) : !history.length ? (
          <Box mt={9} bg="gray.900" color="white" borderRadius="3xl" p={{ base: 7, md: 10 }} textAlign="center">
            <Flex mx="auto" w="58px" h="58px" align="center" justify="center" borderRadius="full" bg="whiteAlpha.100">
              <Icon as={FiRepeat} boxSize={6} />
            </Flex>
            <Heading mt={5} size="md">Your first session is still ahead.</Heading>
            <Text mt={2} color="whiteAlpha.600" maxW="500px" mx="auto" fontSize="sm" lineHeight="1.8">
              Complete a workout and your progress will appear here automatically.
            </Text>
            <Button mt={6} colorScheme="blue" borderRadius="xl" rightIcon={<FiArrowRight />} onClick={() => navigate("/workouts")}>
              View My Workouts
            </Button>
          </Box>
        ) : (
          <Box mt={9}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
              {history.map((item) => {
                const completion = Math.round(Number(item.completion_percent || 0));

                return (
                  <Box
                    key={item.id}
                    as="button"
                    type="button"
                    textAlign="left"
                    w="100%"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="2xl"
                    p={{ base: 5, md: 6 }}
                    transition="all 180ms ease"
                    cursor="pointer"
                    _hover={{
                      transform: "translateY(-2px)",
                      borderColor: "blue.100",
                      boxShadow: "0 18px 45px rgba(15,23,42,0.07)",
                    }}
                    onClick={() => navigate(`/workouts/complete/${item.id}`)}
                  >
                    <Flex justify="space-between" gap={4} align="flex-start">
                      <Box minW={0}>
                        <Text fontSize="10px" fontWeight="800" letterSpacing="0.10em" color="gray.400">
                          COMPLETED
                        </Text>
                        <Heading mt={2} size="md" color="gray.900" noOfLines={2}>
                          {item.workout_name || "Workout"}
                        </Heading>
                        <Text mt={1.5} fontSize="sm" color="gray.400">
                          {item.organization_name || "NEKA"}
                        </Text>
                      </Box>

                      <Badge
                        bg="gray.100"
                        color="gray.700"
                        borderRadius="full"
                        px={3}
                        py={1.5}
                        fontSize="10px"
                      >
                        {completion}%
                      </Badge>
                    </Flex>

                    <HStack mt={6} spacing={5} color="gray.500" fontSize="sm" flexWrap="wrap">
                      <HStack>
                        <Icon as={FiCalendar} />
                        <Text>{formatDate(item.finished_at || item.started_at)}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiClock} />
                        <Text>{minutes(item.active_seconds)} active</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiZap} />
                        <Text>{Math.round(item.calories_burned_active || 0)} kcal</Text>
                      </HStack>
                    </HStack>

                    <Flex mt={5} justify="space-between" align="center">
                      <Text fontSize="xs" color="gray.400">
                        {item.completed_sets || 0} sets completed
                      </Text>
                      <HStack spacing={1} color="gray.400" fontSize="xs">
                        <Text>View summary</Text>
                        <Icon as={FiArrowRight} />
                      </HStack>
                    </Flex>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WorkoutHistoryPage;

