import { Badge, Box, Button, Center, Flex, Heading, HStack, Icon, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiCalendar, FiClock, FiZap } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getWorkoutSessionHistory } from "../../services/userWorkout.service";
import type { WorkoutSessionHistoryItem } from "../../types/workoutExecution.types";

const minutes = (seconds: number) => Math.max(1, Math.round(seconds / 60));

const WorkoutHistoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<WorkoutSessionHistoryItem[]>([]);

  useEffect(() => {
    getWorkoutSessionHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1100px" mx="auto">
        <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate("/workouts")} mb={5}>
          My Workouts
        </Button>
        <Heading size={{ base: "lg", md: "xl" }}>Workout History</Heading>
        <Text mt={2} color="gray.500">A simple record of the training you have completed.</Text>

        {loading ? (
          <Center minH="40vh"><Spinner size="xl" /></Center>
        ) : !history.length ? (
          <Box mt={8} bg="white" borderRadius="3xl" p={10} textAlign="center">
            <Text color="gray.500">No completed workouts yet.</Text>
          </Box>
        ) : (
          <SimpleGrid mt={8} columns={{ base: 1, lg: 2 }} spacing={5}>
            {history.map((item) => (
              <Box key={item.id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={6}>
                <Flex justify="space-between" gap={4}>
                  <Box>
                    <Heading size="sm">{item.workout_name || "Workout"}</Heading>
                    <Text fontSize="sm" color="gray.400" mt={1}>{item.organization_name || "NEKA"}</Text>
                  </Box>
                  <Badge colorScheme="green" borderRadius="full" px={3} py={1}>DONE</Badge>
                </Flex>
                <HStack mt={5} spacing={5} color="gray.500" fontSize="sm" flexWrap="wrap">
                  <HStack><Icon as={FiCalendar} /><Text>{new Date(item.finished_at || item.started_at).toLocaleDateString()}</Text></HStack>
                  <HStack><Icon as={FiClock} /><Text>{minutes(item.active_seconds)} min</Text></HStack>
                  <HStack><Icon as={FiZap} /><Text>{Math.round(item.calories_burned_active || 0)} kcal</Text></HStack>
                </HStack>
                <Text mt={4} fontSize="xs" color="gray.400">
                  {Math.round(item.completion_percent)}% complete • {item.completed_sets} sets
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default WorkoutHistoryPage;
