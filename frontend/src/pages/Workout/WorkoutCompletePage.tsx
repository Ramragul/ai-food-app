import { Badge, Box, Button, Center, Flex, Heading, HStack, Spinner, Stat, StatLabel, StatNumber, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { FiArrowRight, FiClock, FiZap, FiRepeat } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getWorkoutSession } from "../../services/userWorkout.service";
import type { WorkoutSession } from "../../types/workoutExecution.types";

const formatMinutes = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`;

const WorkoutCompletePage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getWorkoutSession(Number(sessionId));
        setSession(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId]);

  if (loading) {
    return <Center minH="70vh"><Spinner size="xl" /></Center>;
  }

  if (!session) {
    return <Center minH="70vh"><Text color="gray.500">Workout summary unavailable.</Text></Center>;
  }

  return (
    <Box minH="100vh" bg="gray.50" px={4} py={{ base: 7, md: 10 }}>
      <Box maxW="760px" mx="auto">
        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="3xl" p={{ base: 7, md: 10 }} textAlign="center" boxShadow="0 18px 55px rgba(15,23,42,0.06)">
          <Box w="76px" h="76px" mx="auto" borderRadius="full" bg="blue.50" color="blue.500" display="flex" alignItems="center" justifyContent="center">
            <FiZap size={34} />
          </Box>
          <Badge mt={5} colorScheme="blue" borderRadius="full" px={3} py={1}>WORKOUT COMPLETE</Badge>
          <Heading mt={4} size={{ base: "lg", md: "xl" }}>{session.assignment.workout_name}</Heading>
          <Text color="gray.500" mt={2}>Good work. Your session has been saved.</Text>

          <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} mt={8}>
            <Stat bg="gray.50" borderRadius="2xl" p={5}>
              <HStack justify="center" color="gray.400"><FiZap /><StatLabel>Active burn</StatLabel></HStack>
              <StatNumber mt={2}>{Math.round(session.calories_burned_active || 0)} kcal</StatNumber>
              <Text fontSize="xs" color="gray.400" mt={1}>Estimated • {session.burn_confidence || "LOW"} confidence</Text>
            </Stat>
            <Stat bg="gray.50" borderRadius="2xl" p={5}>
              <HStack justify="center" color="gray.400"><FiClock /><StatLabel>Workout</StatLabel></HStack>
              <StatNumber mt={2}>{formatMinutes(session.current_elapsed_seconds || session.active_seconds)}</StatNumber>
              <Text fontSize="xs" color="gray.400" mt={1}>Active workout time</Text>
            </Stat>
            <Stat bg="gray.50" borderRadius="2xl" p={5}>
              <HStack justify="center" color="gray.400"><FiRepeat /><StatLabel>Completion</StatLabel></HStack>
              <StatNumber mt={2}>{Math.round(session.completion_percent)}%</StatNumber>
              <Text fontSize="xs" color="gray.400" mt={1}>{session.completed_sets} sets completed</Text>
            </Stat>
          </SimpleGrid>

          <Flex justify="center" mt={8} gap={3} direction={{ base: "column", sm: "row" }}>
            <Button colorScheme="blue" borderRadius="xl" rightIcon={<FiArrowRight />} onClick={() => navigate("/workouts")}>
              Back to My Workouts
            </Button>
            <Button variant="outline" borderRadius="xl" onClick={() => navigate("/workouts/history")}>
              View History
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutCompletePage;
