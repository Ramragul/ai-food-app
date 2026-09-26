import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiArrowRight, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  getMyWorkoutAssignments,
  getWorkoutWorkspace,
} from "../../../services/workout.service";

import type { WorkoutAssignment } from "../../../types/workout.types";

interface MyClientWorkoutCardProps {
  memberId: number;
}

const DAYS = [
  { key: "MON", name: "Monday" },
  { key: "TUE", name: "Tuesday" },
  { key: "WED", name: "Wednesday" },
  { key: "THU", name: "Thursday" },
  { key: "FRI", name: "Friday" },
  { key: "SAT", name: "Saturday" },
  { key: "SUN", name: "Sunday" },
];

const getValue = (assignment: any, ...keys: string[]) => {
  for (const key of keys) {
    if (assignment?.[key] !== undefined) {
      return assignment[key];
    }
  }
  return null;
};

const formatDays = (value: any) => {
  const days = Array.isArray(value) ? value : [];

  return days
    .map((day: string) => DAYS.find((item) => item.key === day)?.name ?? day)
    .join(" • ");
};

const MyClientWorkoutCard = ({ memberId }: MyClientWorkoutCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [assignments, setAssignments] = useState<WorkoutAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const workspace = await getWorkoutWorkspace();
      const organizationId = Number(workspace?.organization?.id);

      if (!organizationId) {
        throw new Error("Active organization could not be resolved.");
      }

      const assignmentData = await getMyWorkoutAssignments(organizationId);
      setAssignments(Array.isArray(assignmentData) ? assignmentData : []);
    } catch (error: any) {
      console.error("Failed to load client workouts:", error);
      toast({
        title: "Unable to load workouts",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!memberId) return;
    load();
    // memberId is the intended dependency; load itself intentionally stays stable per render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const activeAssignments = useMemo(() => {
    return assignments.filter((assignment: any) => {
      return (
        Number(assignment.client_member_id ?? assignment.clientMemberId) ===
          Number(memberId) &&
        String(assignment.status ?? "ACTIVE").toUpperCase() === "ACTIVE"
      );
    });
  }, [assignments, memberId]);

  const openManager = () => {
    navigate(`/staff/workouts/assignments?clientId=${memberId}`);
  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="3xl"
      p={{ base: 5, md: 6 }}
      boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
    >
      <HStack justify="space-between" align="start" mb={5}>
        <HStack spacing={3} align="start">
          <Flex
            w="44px"
            h="44px"
            borderRadius="xl"
            bg="blue.50"
            color="blue.500"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Icon as={FiActivity} boxSize={5} />
          </Flex>

          <Box>
            <Text fontSize="xs" fontWeight="800" color="gray.500" letterSpacing="0.08em">
              WORKOUT PLAN
            </Text>
            <Text mt={1} fontSize="lg" fontWeight="900" color="gray.800">
              Client workouts
            </Text>
          </Box>
        </HStack>

        {!loading && (
          <Badge colorScheme={activeAssignments.length ? "blue" : "gray"} borderRadius="full" px={3} py={1}>
            {activeAssignments.length} active
          </Badge>
        )}
      </HStack>

      {loading ? (
        <Flex minH="130px" align="center" justify="center">
          <VStack spacing={3}>
            <Spinner size="md" color="blue.400" />
            <Text fontSize="sm" color="gray.500">
              Loading workout plan...
            </Text>
          </VStack>
        </Flex>
      ) : activeAssignments.length === 0 ? (
        <Box
          bg="gray.50"
          border="1px dashed"
          borderColor="gray.200"
          borderRadius="2xl"
          p={5}
        >
          <Text fontWeight="800" color="gray.800">
            No workouts assigned yet
          </Text>
          <Text mt={1} fontSize="sm" color="gray.500" lineHeight="1.6">
            Create a structured training plan for this client.
          </Text>
          <Button mt={4} size="sm" colorScheme="blue" borderRadius="xl" onClick={openManager}>
            Assign Workouts
          </Button>
        </Box>
      ) : (
        <VStack align="stretch" spacing={0} divider={<Divider />}>
          {activeAssignments.slice(0, 4).map((assignment: any) => {
            const templateName =
              assignment.workout_name ??
              assignment.template_name ??
              `Workout #${assignment.workout_template_id ?? assignment.workoutTemplateId}`;
            const scheduledDays = getValue(assignment, "scheduled_days", "scheduledDays");
            const startDate = getValue(assignment, "start_date", "startDate");
            const endDate = getValue(assignment, "end_date", "endDate");

            return (
              <Box key={assignment.id} py={4}>
                <Flex justify="space-between" align="start" gap={4}>
                  <Box minW={0}>
                    <Text fontWeight="800" color="gray.800" noOfLines={1}>
                      {templateName}
                    </Text>

                    <HStack mt={2} spacing={3} flexWrap="wrap" color="gray.500">
                      <HStack spacing={1}>
                        <Icon as={FiCalendar} boxSize={3.5} />
                        <Text fontSize="xs">{formatDays(scheduledDays) || "Days not set"}</Text>
                      </HStack>

                      {startDate && (
                        <Text fontSize="xs">
                          {startDate}{endDate ? ` → ${endDate}` : ""}
                        </Text>
                      )}
                    </HStack>
                  </Box>

                </Flex>
              </Box>
            );
          })}

          {activeAssignments.length > 4 && (
            <Text py={3} fontSize="xs" color="gray.500">
              +{activeAssignments.length - 4} more workouts
            </Text>
          )}
        </VStack>
      )}

      {!loading && activeAssignments.length > 0 && (
        <Button
          mt={5}
          variant="ghost"
          colorScheme="blue"
          rightIcon={<FiArrowRight />}
          onClick={openManager}
        >
          Manage Workouts
        </Button>
      )}
    </Box>
  );
};

export default MyClientWorkoutCard;
