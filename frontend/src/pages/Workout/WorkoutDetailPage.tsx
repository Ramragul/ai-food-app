import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock, FiPlay, FiRepeat } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getActiveWorkoutSession,
  getMyWorkoutAssignment,
} from "../../services/userWorkout.service";
import type {
  ClientWorkoutAssignmentDetail,
  WorkoutSession,
} from "../../types/workoutExecution.types";

const formatTarget = (exercise: ClientWorkoutAssignmentDetail["exercises"][number]) => {
  const tracking = String(exercise.tracking_type || "").toUpperCase();
  const sets = exercise.target_sets || 1;

  if (tracking === "DURATION") {
    return `${sets} × ${exercise.target_duration_seconds || 0}s`;
  }
  if (tracking === "DISTANCE") {
    return `${sets} × ${exercise.target_distance || 0}`;
  }
  if (tracking === "REPS_ONLY") {
    return `${sets} × ${exercise.target_reps || 0} reps`;
  }
  if (tracking === "REPS_DURATION") {
    return `${sets} × ${exercise.target_reps || 0} reps • ${exercise.target_duration_seconds || 0}s`;
  }
  return `${sets} × ${exercise.target_reps || 0} reps${exercise.target_weight ? ` • ${exercise.target_weight} kg` : ""}`;
};

const WorkoutDetailPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<ClientWorkoutAssignmentDetail | null>(null);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const id = Number(assignmentId);
        const [data, active] = await Promise.all([
          getMyWorkoutAssignment(id),
          getActiveWorkoutSession(),
        ]);
        setAssignment(data);
        if (active?.workout_assignment_id === id) setActiveSession(active);
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Unable to open workout",
          description: error?.response?.data?.error || error?.message || "Please try again.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [assignmentId, toast]);

  if (loading || !assignment) {
    return (
      <Box minH="70vh" bg="gray.50" px={{ base: 4, md: 8 }} py={8}>
        <Box maxW="1100px" mx="auto">
          <Skeleton height="42px" mb={5} borderRadius="xl" />
          <Skeleton height="160px" mb={5} borderRadius="3xl" />
          <Skeleton height="300px" borderRadius="3xl" />
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1100px" mx="auto">
        <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate("/workouts")} mb={5}>
          My Workouts
        </Button>

        <Box bg="white" borderRadius="3xl" border="1px solid" borderColor="gray.100" p={{ base: 6, md: 8 }} boxShadow="0 15px 45px rgba(15,23,42,0.06)">
          <Flex justify="space-between" gap={5} direction={{ base: "column", md: "row" }}>
            <Box>
              <HStack spacing={2} mb={3} flexWrap="wrap">
                <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>ACTIVE</Badge>
                {assignment.primary_muscle_group ? (
                  <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>{assignment.primary_muscle_group}</Badge>
                ) : null}
                {assignment.training_goal_name ? (
                  <Badge colorScheme="green" borderRadius="full" px={3} py={1}>{assignment.training_goal_name}</Badge>
                ) : null}
              </HStack>
              <Heading size={{ base: "lg", md: "xl" }}>{assignment.workout_name}</Heading>
              <Text color="gray.500" mt={2} lineHeight="1.7" maxW="720px">
                {assignment.workout_description || "Your assigned workout is ready. Complete each exercise in order and track every set."}
              </Text>

              <HStack mt={5} spacing={5} color="gray.500" fontSize="sm" flexWrap="wrap">
                <HStack><Icon as={FiRepeat} /><Text>{assignment.exercises.length} exercises</Text></HStack>
                <HStack><Icon as={FiClock} /><Text>~{assignment.estimated_duration_minutes || "--"} min</Text></HStack>
                <HStack><Text fontWeight="600" color="gray.600">Days</Text><Text>{assignment.scheduled_days?.join(" • ") || "Flexible"}</Text></HStack>
              </HStack>
            </Box>

            <Button
              colorScheme="blue"
              borderRadius="xl"
              size="lg"
              leftIcon={activeSession ? <FiPlay /> : <FiPlay />}
              alignSelf={{ base: "stretch", md: "flex-start" }}
              onClick={() => navigate(`/workouts/${assignment.id}/session`)}
            >
              {activeSession ? "Resume Workout" : "Start Workout"}
            </Button>
          </Flex>
        </Box>

        <Box mt={8}>
          <Heading size="sm" color="gray.700" mb={4}>Workout structure</Heading>
          <VStack align="stretch" spacing={3}>
            {assignment.exercises.map((exercise, index) => (
              <Box key={exercise.id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 4, md: 5 }}>
                <Flex gap={4} align="center">
                  <Flex w="40px" h="40px" borderRadius="xl" bg="blue.50" color="blue.500" align="center" justify="center" flexShrink={0} fontWeight="700">
                    {index + 1}
                  </Flex>
                  {exercise.image_url ? (
                    <Image src={exercise.image_url} alt={exercise.exercise_name} w="72px" h="72px" objectFit="cover" borderRadius="xl" flexShrink={0} />
                  ) : null}
                  <Box flex="1" minW={0}>
                    <Text fontWeight="700" color="gray.800">{exercise.exercise_name}</Text>
                    <Text mt={1} fontSize="sm" color="gray.500">{formatTarget(exercise)}</Text>
                    {exercise.primary_muscle_group ? <Text mt={1} fontSize="xs" color="gray.400">{exercise.primary_muscle_group}</Text> : null}
                  </Box>
                  <Icon as={FiCheckCircle} color="gray.200" boxSize={5} />
                </Flex>
                {exercise.notes ? (
                  <>
                    <Divider my={4} />
                    <Text fontSize="sm" color="gray.500">Coach note: {exercise.notes}</Text>
                  </>
                ) : null}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutDetailPage;
