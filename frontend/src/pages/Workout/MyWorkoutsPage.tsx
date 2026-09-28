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
  useToast,
} from "@chakra-ui/react";
import { FiArrowRight, FiCalendar, FiPlay, FiRefreshCw } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import WorkoutMeta from "../../components/Workout/WorkoutMeta";
import {
  getActiveWorkoutSession,
  getMyWorkoutAssignments,
} from "../../services/userWorkout.service";


import type { ClientWorkoutAssignment } from "../../types/workoutExecution.types";

const DAY_KEYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const formatDate = (value?: string | null) => {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isInDateRange = (assignment: ClientWorkoutAssignment) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(`${assignment.start_date}T00:00:00`);
  const end = assignment.end_date
    ? new Date(`${assignment.end_date}T23:59:59`)
    : null;

  return today >= start && (!end || today <= end);
};

const scheduledToday = (assignment: ClientWorkoutAssignment) => {
  const days = Array.isArray(assignment.scheduled_days)
    ? assignment.scheduled_days
    : [];
  return days.includes(DAY_KEYS[new Date().getDay()]);
};

const WorkoutCard = ({
  assignment,
  today,
  activeSessionAssignmentId,
}: {
  assignment: ClientWorkoutAssignment;
  today: boolean;
  activeSessionAssignmentId: number | null;
}) => {
  const navigate = useNavigate();
  const resume = activeSessionAssignmentId === Number(assignment.id);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={today ? "blue.100" : "gray.100"}
      borderRadius="3xl"
      p={{ base: 5, md: 6 }}
      boxShadow="0 12px 38px rgba(15,23,42,0.05)"
      transition="all 0.2s ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "0 18px 45px rgba(15,23,42,0.08)" }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <Box>
          <HStack spacing={2} mb={2}>
            <Badge colorScheme={today ? "blue" : "gray"} borderRadius="full" px={3} py={1}>
              {today ? "TODAY" : "ASSIGNED"}
            </Badge>
            {assignment.primary_muscle_group ? (
              <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
                {assignment.primary_muscle_group}
              </Badge>
            ) : null}
          </HStack>
          <Heading size="md" color="gray.800">
            {assignment.workout_name}
          </Heading>
          {assignment.organization_name ? (
            <Text fontSize="sm" color="gray.400" mt={1}>
              {assignment.organization_name}
              {assignment.trainer_name ? ` • ${assignment.trainer_name}` : ""}
            </Text>
          ) : null}
        </Box>

        <Icon as={FiArrowRight} color="gray.300" boxSize={5} />
      </Flex>

      {assignment.workout_description ? (
        <Text color="gray.500" fontSize="sm" lineHeight="1.7" mt={4} noOfLines={2}>
          {assignment.workout_description}
        </Text>
      ) : null}

      <Box mt={5}>
        <WorkoutMeta
          duration={assignment.estimated_duration_minutes}
          exerciseCount={assignment.exercise_count}
          goal={assignment.training_goal_name || assignment.goal_type}
        />
      </Box>

      <Flex mt={5} justify="space-between" align="center" gap={3} direction={{ base: "column", sm: "row" }}>
        <HStack color="gray.500" spacing={2} fontSize="xs">
          <Icon as={FiCalendar} />
          <Text>
            {formatDate(assignment.start_date)}
            {assignment.end_date ? ` → ${formatDate(assignment.end_date)}` : ""}
          </Text>
        </HStack>

        <Button
          w={{ base: "100%", sm: "auto" }}
          colorScheme="blue"
          borderRadius="xl"
          rightIcon={resume ? <FiPlay /> : <FiArrowRight />}
          onClick={() => navigate(`/workouts/${assignment.id}`)}
        >
          {resume ? "Resume Workout" : "View Workout"}
        </Button>
      </Flex>
    </Box>
  );
};

const MyWorkoutsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<ClientWorkoutAssignment[]>([]);
  const [activeSessionAssignmentId, setActiveSessionAssignmentId] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const [data, activeSession] = await Promise.all([
        getMyWorkoutAssignments(),
        getActiveWorkoutSession(),
      ]);

      setAssignments(data);
      setActiveSessionAssignmentId(
        activeSession?.workout_assignment_id
          ? Number(activeSession.workout_assignment_id)
          : null
      );
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Unable to load your workouts",
        description: error?.response?.data?.error || error?.message || "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Initial page load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeAssignments = useMemo(
    () => assignments.filter((item) => String(item.status).toUpperCase() === "ACTIVE" && isInDateRange(item)),
    [assignments]
  );

  const todayAssignments = useMemo(
    () => activeAssignments.filter(scheduledToday),
    [activeAssignments]
  );

  const upcomingAssignments = useMemo(
    () => activeAssignments.filter((item) => !scheduledToday(item)),
    [activeAssignments]
  );

  if (loading) {
    return (
      <Center minH="70vh">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="3px" color="blue.400" />
          <Text color="gray.500">Loading your workouts…</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1200px" mx="auto">
        <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4} mb={8} direction={{ base: "column", md: "row" }}>
          <Box>
            <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
              MY WORKOUTS
            </Badge>
            <Heading mt={3} size={{ base: "lg", md: "xl" }} color="gray.800">
              Train with a plan.
            </Heading>
            <Text mt={2} color="gray.500" maxW="650px" lineHeight="1.7">
              Your assigned training, organized around the workouts your coach has prepared for you.
            </Text>
          </Box>

          <HStack>
            <Button variant="ghost" leftIcon={<FiRefreshCw />} onClick={load}>
              Refresh
            </Button>
            <Button variant="outline" borderRadius="xl" onClick={() => navigate("/workouts/library")}>
              Exercise Library
            </Button>
          </HStack>
        </Flex>

        {todayAssignments.length > 0 ? (
          <Box mb={10}>
            <Heading size="sm" color="gray.700" mb={4}>Today</Heading>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
              {todayAssignments.map((assignment) => (
                <WorkoutCard
                  key={assignment.id}
                  assignment={assignment}
                  today
                  activeSessionAssignmentId={activeSessionAssignmentId}
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}

        {upcomingAssignments.length > 0 ? (
          <Box mb={10}>
            <Heading size="sm" color="gray.700" mb={4}>Your active plan</Heading>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
              {upcomingAssignments.map((assignment) => (
                <WorkoutCard
                  key={assignment.id}
                  assignment={assignment}
                  today={false}
                  activeSessionAssignmentId={activeSessionAssignmentId}
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}

        {!activeAssignments.length ? (
          <Box bg="white" borderRadius="3xl" border="1px solid" borderColor="gray.100" p={{ base: 7, md: 10 }} textAlign="center" boxShadow="0 12px 36px rgba(15,23,42,0.04)">
            <Text fontSize="4xl" mb={3}>◎</Text>
            <Heading size="md" color="gray.800">No active workouts yet</Heading>
            <Text color="gray.500" mt={2} maxW="520px" mx="auto" lineHeight="1.7">
              Explore the NEKA exercise library while your next training plan is being prepared.
            </Text>
            <Button mt={6} colorScheme="blue" borderRadius="xl" onClick={() => navigate("/workouts/library")}>
              Explore Exercise Library
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default MyWorkoutsPage;
