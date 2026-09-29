// Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Center,
//   Flex,
//   Heading,
//   HStack,
//   Icon,
//   SimpleGrid,
//   Spinner,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { FiArrowRight, FiCalendar, FiPlay, FiRefreshCw } from "react-icons/fi";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import WorkoutMeta from "../../components/Workout/WorkoutMeta";
// import {
//   getActiveWorkoutSession,
//   getMyWorkoutAssignments,
// } from "../../services/userWorkout.service";


// import type { ClientWorkoutAssignment } from "../../types/workoutExecution.types";

// const DAY_KEYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// const formatDate = (value?: string | null) => {
//   if (!value) return "";
//   return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// const isInDateRange = (assignment: ClientWorkoutAssignment) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const start = new Date(`${assignment.start_date}T00:00:00`);
//   const end = assignment.end_date
//     ? new Date(`${assignment.end_date}T23:59:59`)
//     : null;

//   return today >= start && (!end || today <= end);
// };

// const scheduledToday = (assignment: ClientWorkoutAssignment) => {
//   const days = Array.isArray(assignment.scheduled_days)
//     ? assignment.scheduled_days
//     : [];
//   return days.includes(DAY_KEYS[new Date().getDay()]);
// };

// const WorkoutCard = ({
//   assignment,
//   today,
//   activeSessionAssignmentId,
// }: {
//   assignment: ClientWorkoutAssignment;
//   today: boolean;
//   activeSessionAssignmentId: number | null;
// }) => {
//   const navigate = useNavigate();
//   const resume = activeSessionAssignmentId === Number(assignment.id);

//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor={today ? "blue.100" : "gray.100"}
//       borderRadius="3xl"
//       p={{ base: 5, md: 6 }}
//       boxShadow="0 12px 38px rgba(15,23,42,0.05)"
//       transition="all 0.2s ease"
//       _hover={{ transform: "translateY(-2px)", boxShadow: "0 18px 45px rgba(15,23,42,0.08)" }}
//     >
//       <Flex justify="space-between" align="flex-start" gap={4}>
//         <Box>
//           <HStack spacing={2} mb={2}>
//             <Badge colorScheme={today ? "blue" : "gray"} borderRadius="full" px={3} py={1}>
//               {today ? "TODAY" : "ASSIGNED"}
//             </Badge>
//             {assignment.primary_muscle_group ? (
//               <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
//                 {assignment.primary_muscle_group}
//               </Badge>
//             ) : null}
//           </HStack>
//           <Heading size="md" color="gray.800">
//             {assignment.workout_name}
//           </Heading>
//           {assignment.organization_name ? (
//             <Text fontSize="sm" color="gray.400" mt={1}>
//               {assignment.organization_name}
//               {assignment.trainer_name ? ` • ${assignment.trainer_name}` : ""}
//             </Text>
//           ) : null}
//         </Box>

//         <Icon as={FiArrowRight} color="gray.300" boxSize={5} />
//       </Flex>

//       {assignment.workout_description ? (
//         <Text color="gray.500" fontSize="sm" lineHeight="1.7" mt={4} noOfLines={2}>
//           {assignment.workout_description}
//         </Text>
//       ) : null}

//       <Box mt={5}>
//         <WorkoutMeta
//           duration={assignment.estimated_duration_minutes}
//           exerciseCount={assignment.exercise_count}
//           goal={assignment.training_goal_name || assignment.goal_type}
//         />
//       </Box>

//       <Flex mt={5} justify="space-between" align="center" gap={3} direction={{ base: "column", sm: "row" }}>
//         <HStack color="gray.500" spacing={2} fontSize="xs">
//           <Icon as={FiCalendar} />
//           <Text>
//             {formatDate(assignment.start_date)}
//             {assignment.end_date ? ` → ${formatDate(assignment.end_date)}` : ""}
//           </Text>
//         </HStack>

//         <Button
//           w={{ base: "100%", sm: "auto" }}
//           colorScheme="blue"
//           borderRadius="xl"
//           rightIcon={resume ? <FiPlay /> : <FiArrowRight />}
//           onClick={() => navigate(`/workouts/${assignment.id}`)}
//         >
//           {resume ? "Resume Workout" : "View Workout"}
//         </Button>
//       </Flex>
//     </Box>
//   );
// };

// const MyWorkoutsPage = () => {
//   const toast = useToast();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [assignments, setAssignments] = useState<ClientWorkoutAssignment[]>([]);
//   const [activeSessionAssignmentId, setActiveSessionAssignmentId] = useState<number | null>(null);

//   const load = async () => {
//     try {
//       setLoading(true);
//       const [data, activeSession] = await Promise.all([
//         getMyWorkoutAssignments(),
//         getActiveWorkoutSession(),
//       ]);

//       setAssignments(data);
//       setActiveSessionAssignmentId(
//         activeSession?.workout_assignment_id
//           ? Number(activeSession.workout_assignment_id)
//           : null
//       );
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         title: "Unable to load your workouts",
//         description: error?.response?.data?.error || error?.message || "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // Initial page load only.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const activeAssignments = useMemo(
//     () => assignments.filter((item) => String(item.status).toUpperCase() === "ACTIVE" && isInDateRange(item)),
//     [assignments]
//   );

//   const todayAssignments = useMemo(
//     () => activeAssignments.filter(scheduledToday),
//     [activeAssignments]
//   );

//   const upcomingAssignments = useMemo(
//     () => activeAssignments.filter((item) => !scheduledToday(item)),
//     [activeAssignments]
//   );

//   if (loading) {
//     return (
//       <Center minH="70vh">
//         <VStack spacing={4}>
//           <Spinner size="xl" thickness="3px" color="blue.400" />
//           <Text color="gray.500">Loading your workouts…</Text>
//         </VStack>
//       </Center>
//     );
//   }

//   return (
//     <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 5, md: 8 }}>
//       <Box maxW="1200px" mx="auto">
//         <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4} mb={8} direction={{ base: "column", md: "row" }}>
//           <Box>
//             <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
//               MY WORKOUTS
//             </Badge>
//             <Heading mt={3} size={{ base: "lg", md: "xl" }} color="gray.800">
//               Train with a plan.
//             </Heading>
//             <Text mt={2} color="gray.500" maxW="650px" lineHeight="1.7">
//               Your assigned training, organized around the workouts your coach has prepared for you.
//             </Text>
//           </Box>

//           <HStack>
//             <Button variant="ghost" leftIcon={<FiRefreshCw />} onClick={load}>
//               Refresh
//             </Button>
//             <Button variant="outline" borderRadius="xl" onClick={() => navigate("/workouts/library")}>
//               Exercise Library
//             </Button>
//           </HStack>
//         </Flex>

//         {todayAssignments.length > 0 ? (
//           <Box mb={10}>
//             <Heading size="sm" color="gray.700" mb={4}>Today</Heading>
//             <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
//               {todayAssignments.map((assignment) => (
//                 <WorkoutCard
//                   key={assignment.id}
//                   assignment={assignment}
//                   today
//                   activeSessionAssignmentId={activeSessionAssignmentId}
//                 />
//               ))}
//             </SimpleGrid>
//           </Box>
//         ) : null}

//         {upcomingAssignments.length > 0 ? (
//           <Box mb={10}>
//             <Heading size="sm" color="gray.700" mb={4}>Your active plan</Heading>
//             <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
//               {upcomingAssignments.map((assignment) => (
//                 <WorkoutCard
//                   key={assignment.id}
//                   assignment={assignment}
//                   today={false}
//                   activeSessionAssignmentId={activeSessionAssignmentId}
//                 />
//               ))}
//             </SimpleGrid>
//           </Box>
//         ) : null}

//         {!activeAssignments.length ? (
//           <Box bg="white" borderRadius="3xl" border="1px solid" borderColor="gray.100" p={{ base: 7, md: 10 }} textAlign="center" boxShadow="0 12px 36px rgba(15,23,42,0.04)">
//             <Text fontSize="4xl" mb={3}>◎</Text>
//             <Heading size="md" color="gray.800">No active workouts yet</Heading>
//             <Text color="gray.500" mt={2} maxW="520px" mx="auto" lineHeight="1.7">
//               Explore the NEKA exercise library while your next training plan is being prepared.
//             </Text>
//             <Button mt={6} colorScheme="blue" borderRadius="xl" onClick={() => navigate("/workouts/library")}>
//               Explore Exercise Library
//             </Button>
//           </Box>
//         ) : null}
//       </Box>
//     </Box>
//   );
// };

// export default MyWorkoutsPage;


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
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiHeart,
  FiLayers,
  FiRefreshCw,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import WorkoutMeta from "../../components/Workout/WorkoutMeta";

import {
  getActiveWorkoutSession,
  getMyWorkoutAssignments,
} from "../../services/userWorkout.service";

import type { ClientWorkoutAssignment } from "../../types/workoutExecution.types";

/* =========================================================
   CONSTANTS
========================================================= */

const DAY_KEYS = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

const EXERCISE_CATEGORIES = [
  {
    name: "Chest",
    icon: FiHeart,
    description: "Push, press and build chest strength.",
  },
  {
    name: "Shoulders",
    icon: FiTarget,
    description: "Build stronger and broader shoulders.",
  },
  {
    name: "Back",
    icon: FiLayers,
    description: "Pull, row and strengthen your back.",
  },
  {
    name: "Biceps",
    icon: FiTrendingUp,
    description: "Focused arm strength and control.",
  },
  {
    name: "Triceps",
    icon: FiZap,
    description: "Build pressing power and arm strength.",
  },
  {
    name: "Legs",
    icon: FiActivity,
    description: "Train your quads, hamstrings and glutes.",
  },
  {
    name: "Core",
    icon: FiShield,
    description: "Build stability, control and balance.",
  },
  {
    name: "Cardio",
    icon: FiActivity,
    description: "Improve endurance and cardiovascular fitness.",
  },
];

/* =========================================================
   DATE HELPERS
========================================================= */

/**
 * Backend returns values such as:
 * 2026-09-28T00:00:00.000Z
 *
 * The old implementation appended T00:00:00 again,
 * which created an invalid date.
 */
const toDateOnly = (value?: string | null) => {
  if (!value) return null;

  const datePart = String(value).slice(0, 10);

  const [year, month, day] = datePart
    .split("-")
    .map(Number);

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const formatDate = (value?: string | null) => {
  const date = toDateOnly(value);

  if (!date) return "";

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isInDateRange = (
  assignment: ClientWorkoutAssignment
) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const start = toDateOnly(
    assignment.start_date
  );

  const end = toDateOnly(
    assignment.end_date
  );

  if (!start) {
    return false;
  }

  if (end) {
    end.setHours(
      23,
      59,
      59,
      999
    );
  }

  return (
    today >= start &&
    (!end || today <= end)
  );
};

const scheduledToday = (
  assignment: ClientWorkoutAssignment
) => {
  const days = Array.isArray(
    assignment.scheduled_days
  )
    ? assignment.scheduled_days
    : [];

  return days.includes(
    DAY_KEYS[new Date().getDay()]
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const ExerciseCategoryCard = ({
  name,
  description,
  icon,
  onClick,
}: {
  name: string;
  description: string;
  icon: any;
  onClick: () => void;
}) => {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onClick();
        }
      }}
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={5}
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-3px)",
        borderColor: "blue.100",
        boxShadow:
          "0 14px 36px rgba(15,23,42,0.07)",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "blue.300",
        outlineOffset: "2px",
      }}
    >
      <Flex
        w="46px"
        h="46px"
        align="center"
        justify="center"
        borderRadius="xl"
        bg="blue.50"
        color="blue.500"
      >
        <Icon as={icon} boxSize={5} />
      </Flex>

      <Flex
        mt={4}
        align="center"
        justify="space-between"
        gap={3}
      >
        <Box>
          <Text
            fontWeight="700"
            fontSize="md"
            color="gray.800"
          >
            {name}
          </Text>

          <Text
            mt={1}
            fontSize="xs"
            color="gray.500"
            lineHeight="1.6"
          >
            {description}
          </Text>
        </Box>

        <Icon
          as={FiArrowRight}
          color="gray.300"
          flexShrink={0}
        />
      </Flex>
    </Box>
  );
};

/* =========================================================
   WORKOUT CARD
========================================================= */

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

  const resume =
    activeSessionAssignmentId ===
    Number(assignment.id);

  return (
    <Box
      position="relative"
      bg="white"
      border="1px solid"
      borderColor={
        today
          ? "blue.100"
          : "gray.100"
      }
      borderRadius="3xl"
      p={{ base: 5, md: 6 }}
      boxShadow="0 12px 38px rgba(15,23,42,0.05)"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow:
          "0 18px 45px rgba(15,23,42,0.08)",
      }}
    >
      {/* TOP */}

      <Flex
        justify="space-between"
        align="flex-start"
        gap={4}
      >
        <Box minW={0}>
          <HStack
            spacing={2}
            mb={3}
            flexWrap="wrap"
          >
            <Badge
              colorScheme={
                today
                  ? "blue"
                  : "gray"
              }
              borderRadius="full"
              px={3}
              py={1}
              fontSize="10px"
              letterSpacing="0.04em"
            >
              {today
                ? "TODAY"
                : "ACTIVE PLAN"}
            </Badge>

            {assignment.primary_muscle_group ? (
              <Badge
                colorScheme="purple"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="10px"
              >
                {assignment.primary_muscle_group}
              </Badge>
            ) : null}
          </HStack>

          <Heading
            size={{ base: "md", md: "lg" }}
            color="gray.800"
            lineHeight="1.2"
          >
            {assignment.workout_name}
          </Heading>

          {assignment.organization_name ? (
            <Text
              mt={2}
              fontSize="sm"
              color="gray.400"
            >
              {assignment.organization_name}

              {assignment.trainer_name
                ? ` • ${assignment.trainer_name}`
                : ""}
            </Text>
          ) : null}
        </Box>

        <Flex
          w="38px"
          h="38px"
          align="center"
          justify="center"
          borderRadius="full"
          bg={
            today
              ? "blue.50"
              : "gray.50"
          }
          color={
            today
              ? "blue.500"
              : "gray.400"
          }
          flexShrink={0}
        >
          <Icon
            as={
              resume
                ? FiActivity
                : FiArrowRight
            }
            boxSize={4}
          />
        </Flex>
      </Flex>

      {/* DESCRIPTION */}

      {assignment.workout_description ? (
        <Text
          color="gray.500"
          fontSize="sm"
          lineHeight="1.7"
          mt={4}
          noOfLines={2}
        >
          {assignment.workout_description}
        </Text>
      ) : null}

      {/* META */}

      <Box mt={5}>
        <WorkoutMeta
          duration={
            assignment.estimated_duration_minutes
          }
          exerciseCount={
            assignment.exercise_count
          }
          goal={
            assignment.training_goal_name ||
            assignment.goal_type
          }
        />
      </Box>

      <Divider my={5} />

      {/* DATE + DAYS */}

      <VStack
        align="stretch"
        spacing={3}
      >
        <HStack
          color="gray.500"
          spacing={2}
          fontSize="xs"
        >
          <Icon as={FiCalendar} />

          <Text>
            {formatDate(
              assignment.start_date
            )}

            {assignment.end_date
              ? ` → ${formatDate(
                  assignment.end_date
                )}`
              : ""}
          </Text>
        </HStack>

        <HStack
          color="gray.500"
          spacing={2}
          fontSize="xs"
        >
          <Icon as={FiClock} />

          <Text>
            {assignment.scheduled_days?.length
              ? assignment.scheduled_days.join(
                  " • "
                )
              : "Flexible schedule"}
          </Text>
        </HStack>
      </VStack>

      {/* ACTION */}

      <Button
        mt={5}
        w="100%"
        colorScheme="blue"
        borderRadius="xl"
        size="md"
        onClick={() =>
          navigate(
            `/workouts/${assignment.id}`
          )
        }
      >
        {resume
          ? "Resume Workout"
          : today
            ? "View Today's Workout"
            : "View Workout"}
      </Button>
    </Box>
  );
};

/* =========================================================
   PAGE
========================================================= */

const MyWorkoutsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [
    assignments,
    setAssignments,
  ] = useState<
    ClientWorkoutAssignment[]
  >([]);

  const [
    activeSessionAssignmentId,
    setActiveSessionAssignmentId,
  ] = useState<number | null>(null);

  /* -------------------------------------------------------
     LOAD
  ------------------------------------------------------- */

  const load = async () => {
    try {
      setLoading(true);

      const [
        data,
        activeSession,
      ] = await Promise.all([
        getMyWorkoutAssignments(),
        getActiveWorkoutSession(),
      ]);

      setAssignments(
        Array.isArray(data)
          ? data
          : []
      );

      setActiveSessionAssignmentId(
        activeSession
          ?.workout_assignment_id
          ? Number(
              activeSession.workout_assignment_id
            )
          : null
      );
    } catch (error: any) {
      console.error(error);

      toast({
        title:
          "Unable to load your workouts",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
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

  /* -------------------------------------------------------
     ACTIVE ASSIGNMENTS
  ------------------------------------------------------- */

  const activeAssignments =
    useMemo(() => {
      return assignments.filter(
        (item) =>
          String(
            item.status
          ).toUpperCase() ===
            "ACTIVE" &&
          isInDateRange(item)
      );
    }, [assignments]);

  const todayAssignments =
    useMemo(() => {
      return activeAssignments.filter(
        scheduledToday
      );
    }, [activeAssignments]);

  const upcomingAssignments =
    useMemo(() => {
      return activeAssignments.filter(
        (item) =>
          !scheduledToday(item)
      );
    }, [activeAssignments]);

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <Center
        minH="70vh"
        bg="gray.50"
      >
        <VStack spacing={4}>
          <Spinner
            size="xl"
            thickness="3px"
            color="blue.400"
          />

          <Text
            color="gray.500"
            fontSize="sm"
          >
            Loading your workouts…
          </Text>
        </VStack>
      </Center>
    );
  }

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      px={{
        base: 4,
        md: 6,
        lg: 8,
      }}
      py={{
        base: 5,
        md: 8,
      }}
    >
      <Box
        maxW="1180px"
        mx="auto"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <Flex
          justify="space-between"
          align={{
            base: "flex-start",
            md: "center",
          }}
          gap={5}
          mb={8}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Box>
            <Badge
              colorScheme="blue"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="10px"
              letterSpacing="0.05em"
            >
              MY WORKOUTS
            </Badge>

            <Heading
              mt={3}
              size={{
                base: "lg",
                md: "xl",
              }}
              color="gray.800"
              letterSpacing="-0.025em"
            >
              Train with a plan.
            </Heading>

            <Text
              mt={2}
              color="gray.500"
              maxW="650px"
              lineHeight="1.7"
              fontSize="sm"
            >
              Your training, organized
              around the workouts your
              coach has prepared for you.
            </Text>
          </Box>

          <HStack>
            <Button
              variant="ghost"
              leftIcon={
                <FiRefreshCw />
              }
              onClick={load}
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              borderRadius="xl"
              onClick={() =>
                navigate(
                  "/workouts/library"
                )
              }
            >
              Exercise Library
            </Button>
          </HStack>
        </Flex>

        {/* =================================================
            ACTIVE SESSION
        ================================================= */}

        {activeSessionAssignmentId ? (
          <Box
            mb={8}
            p={5}
            bg="blue.50"
            border="1px solid"
            borderColor="blue.100"
            borderRadius="2xl"
          >
            <Flex
              align={{
                base: "flex-start",
                md: "center",
              }}
              justify="space-between"
              gap={4}
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <Box>
                <Text
                  fontWeight="700"
                  color="blue.800"
                >
                  You have a workout
                  in progress
                </Text>

                <Text
                  mt={1}
                  fontSize="sm"
                  color="blue.700"
                >
                  Continue exactly where
                  you left off.
                </Text>
              </Box>

              <Button
                colorScheme="blue"
                borderRadius="xl"
                onClick={() =>
                  navigate(
                    `/workouts/${activeSessionAssignmentId}`
                  )
                }
              >
                Resume Workout
              </Button>
            </Flex>
          </Box>
        ) : null}

        {/* =================================================
            ASSIGNMENTS
        ================================================= */}

        {activeAssignments.length > 0 ? (
          <>
            {/* TODAY */}

            {todayAssignments.length > 0 ? (
              <Box mb={10}>
                <Flex
                  align="center"
                  justify="space-between"
                  mb={4}
                >
                  <Box>
                    <Heading
                      size="sm"
                      color="gray.700"
                    >
                      Today
                    </Heading>

                    <Text
                      mt={1}
                      fontSize="xs"
                      color="gray.400"
                    >
                      Your scheduled training
                    </Text>
                  </Box>
                </Flex>

                <SimpleGrid
                  columns={{
                    base: 1,
                    lg: 2,
                  }}
                  spacing={5}
                >
                  {todayAssignments.map(
                    (assignment) => (
                      <WorkoutCard
                        key={
                          assignment.id
                        }
                        assignment={
                          assignment
                        }
                        today
                        activeSessionAssignmentId={
                          activeSessionAssignmentId
                        }
                      />
                    )
                  )}
                </SimpleGrid>
              </Box>
            ) : null}

            {/* OTHER ACTIVE ASSIGNMENTS */}

            {upcomingAssignments.length >
            0 ? (
              <Box mb={10}>
                <Heading
                  size="sm"
                  color="gray.700"
                  mb={4}
                >
                  Your active plan
                </Heading>

                <SimpleGrid
                  columns={{
                    base: 1,
                    lg: 2,
                  }}
                  spacing={5}
                >
                  {upcomingAssignments.map(
                    (assignment) => (
                      <WorkoutCard
                        key={
                          assignment.id
                        }
                        assignment={
                          assignment
                        }
                        today={false}
                        activeSessionAssignmentId={
                          activeSessionAssignmentId
                        }
                      />
                    )
                  )}
                </SimpleGrid>
              </Box>
            ) : null}

            {/* LIBRARY */}

            <Box mt={12}>
              <Flex
                align={{
                  base: "flex-start",
                  md: "center",
                }}
                justify="space-between"
                gap={4}
                mb={5}
                direction={{
                  base: "column",
                  md: "row",
                }}
              >
                <Box>
                  <Heading
                    size="md"
                    color="gray.800"
                  >
                    Explore exercises
                  </Heading>

                  <Text
                    mt={1}
                    color="gray.500"
                    fontSize="sm"
                  >
                    Learn movements and
                    discover exercises outside
                    your assigned plan.
                  </Text>
                </Box>

                <Button
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={
                    <FiArrowRight />
                  }
                  onClick={() =>
                    navigate(
                      "/workouts/library"
                    )
                  }
                >
                  View all
                </Button>
              </Flex>

              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 2,
                  lg: 4,
                }}
                spacing={4}
              >
                {EXERCISE_CATEGORIES.slice(
                  0,
                  4
                ).map((category) => (
                  <ExerciseCategoryCard
                    key={category.name}
                    {...category}
                    onClick={() =>
                      navigate(
                        "/workouts/library"
                      )
                    }
                  />
                ))}
              </SimpleGrid>
            </Box>
          </>
        ) : (
          /* =================================================
             NO ASSIGNMENTS
          ================================================= */

          <Box>
            <Box
              bg="white"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.100"
              px={{
                base: 6,
                md: 10,
              }}
              py={{
                base: 10,
                md: 14,
              }}
              textAlign="center"
              boxShadow="0 12px 36px rgba(15,23,42,0.04)"
            >
              <Flex
                mx="auto"
                w="64px"
                h="64px"
                align="center"
                justify="center"
                borderRadius="2xl"
                bg="blue.50"
                color="blue.500"
              >
                <Icon
                  as={FiActivity}
                  boxSize={7}
                />
              </Flex>

              <Heading
                mt={6}
                size={{
                  base: "md",
                  md: "lg",
                }}
                color="gray.800"
              >
                Your training starts here.
              </Heading>

              <Text
                mt={3}
                maxW="580px"
                mx="auto"
                color="gray.500"
                lineHeight="1.8"
                fontSize="sm"
              >
                You don't have an active
                assigned workout right now.
                Explore the NEKA exercise
                library and discover movements
                you can learn and practice.
              </Text>

              <Button
                mt={6}
                colorScheme="blue"
                borderRadius="xl"
                size="md"
                rightIcon={
                  <FiArrowRight />
                }
                onClick={() =>
                  navigate(
                    "/workouts/library"
                  )
                }
              >
                Explore Exercise Library
              </Button>
            </Box>

            {/* CATEGORY DISCOVERY */}

            <Box mt={10}>
              <Heading
                size="md"
                color="gray.800"
                mb={2}
              >
                Browse by focus
              </Heading>

              <Text
                color="gray.500"
                fontSize="sm"
                mb={5}
              >
                Choose a muscle group or
                training focus to start
                exploring.
              </Text>

              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                }}
                spacing={4}
              >
                {EXERCISE_CATEGORIES.map(
                  (category) => (
                    <ExerciseCategoryCard
                      key={category.name}
                      {...category}
                      onClick={() =>
                        navigate(
                          "/workouts/library"
                        )
                      }
                    />
                  )
                )}
              </SimpleGrid>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyWorkoutsPage;
