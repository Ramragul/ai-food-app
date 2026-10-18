
//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Divider,
//   Flex,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   SimpleGrid,
//   Skeleton,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";

// import {
//   FiArrowLeft,
//   FiArrowRight,
//   FiCalendar,
//   FiCheckCircle,
//   FiClock,
//   FiPlay,
//   FiRepeat,
// } from "react-icons/fi";

// import { useEffect, useState } from "react";
// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import {
//   getActiveWorkoutSession,
//   getMyWorkoutAssignment,
// } from "../../services/userWorkout.service";

// import type {
//   ClientWorkoutAssignmentDetail,
//   WorkoutSession,
// } from "../../types/workoutExecution.types";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const formatTarget = (
//   exercise: ClientWorkoutAssignmentDetail["exercises"][number]
// ) => {
//   const tracking = String(
//     exercise.tracking_type || ""
//   ).toUpperCase();

//   const sets =
//     exercise.target_sets || 1;

//   if (tracking === "DURATION") {
//     return `${sets} × ${
//       exercise.target_duration_seconds || 0
//     }s`;
//   }

//   if (tracking === "DISTANCE") {
//     return `${sets} × ${
//       exercise.target_distance || 0
//     }`;
//   }

//   if (tracking === "REPS_ONLY") {
//     return `${sets} × ${
//       exercise.target_reps || 0
//     } reps`;
//   }

//   if (tracking === "REPS_DURATION") {
//     return `${sets} × ${
//       exercise.target_reps || 0
//     } reps • ${
//       exercise.target_duration_seconds || 0
//     }s`;
//   }

//   return `${sets} × ${
//     exercise.target_reps || 0
//   } reps${
//     exercise.target_weight
//       ? ` • ${exercise.target_weight} kg`
//       : ""
//   }`;
// };

// const formatDate = (
//   value?: string | null
// ) => {
//   if (!value) return "";

//   const datePart = String(
//     value
//   ).slice(0, 10);

//   const [year, month, day] =
//     datePart.split("-").map(Number);

//   if (
//     !year ||
//     !month ||
//     !day
//   ) {
//     return "";
//   }

//   return new Date(
//     year,
//     month - 1,
//     day
//   ).toLocaleDateString(undefined, {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// /* =========================================================
//    EXERCISE ROW
// ========================================================= */

// const ExerciseRow = ({
//   exercise,
//   index,
// }: {
//   exercise: ClientWorkoutAssignmentDetail["exercises"][number];
//   index: number;
// }) => {
//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={{
//         base: 4,
//         md: 5,
//       }}
//       transition="all 0.2s ease"
//       _hover={{
//         borderColor: "blue.100",
//         boxShadow:
//           "0 10px 28px rgba(15,23,42,0.05)",
//       }}
//     >
//       <Flex
//         gap={4}
//         align="center"
//       >
//         {/* INDEX */}

//         <Flex
//           w="42px"
//           h="42px"
//           borderRadius="xl"
//           bg="blue.50"
//           color="blue.500"
//           align="center"
//           justify="center"
//           flexShrink={0}
//           fontWeight="700"
//           fontSize="sm"
//         >
//           {String(index + 1).padStart(
//             2,
//             "0"
//           )}
//         </Flex>

//         {/* IMAGE */}

//         {exercise.image_url ? (
//           <Image
//             src={
//               exercise.image_url
//             }
//             alt={
//               exercise.exercise_name
//             }
//             w="72px"
//             h="72px"
//             objectFit="cover"
//             borderRadius="xl"
//             flexShrink={0}
//           />
//         ) : (
//           <Flex
//             w="72px"
//             h="72px"
//             borderRadius="xl"
//             bg="gray.50"
//             align="center"
//             justify="center"
//             color="gray.300"
//             flexShrink={0}
//           >
//             <Icon
//               as={FiRepeat}
//               boxSize={6}
//             />
//           </Flex>
//         )}

//         {/* CONTENT */}

//         <Box
//           flex="1"
//           minW={0}
//         >
//           <Text
//             fontWeight="700"
//             color="gray.800"
//             noOfLines={2}
//           >
//             {
//               exercise.exercise_name
//             }
//           </Text>

//           <Text
//             mt={1}
//             fontSize="sm"
//             color="gray.500"
//           >
//             {formatTarget(
//               exercise
//             )}
//           </Text>

//           <HStack
//             mt={2}
//             spacing={2}
//             flexWrap="wrap"
//           >
//             {exercise.primary_muscle_group ? (
//               <Badge
//                 colorScheme="purple"
//                 variant="subtle"
//                 borderRadius="full"
//                 fontSize="10px"
//               >
//                 {
//                   exercise.primary_muscle_group
//                 }
//               </Badge>
//             ) : null}

//             {exercise.tracking_type ? (
//               <Badge
//                 colorScheme="blue"
//                 variant="subtle"
//                 borderRadius="full"
//                 fontSize="10px"
//               >
//                 {String(
//                   exercise.tracking_type
//                 ).replaceAll(
//                   "_",
//                   " "
//                 )}
//               </Badge>
//             ) : null}
//           </HStack>
//         </Box>

//         <Icon
//           as={FiCheckCircle}
//           color="gray.200"
//           boxSize={5}
//           flexShrink={0}
//         />
//       </Flex>

//       {exercise.notes ? (
//         <>
//           <Divider my={4} />

//           <Text
//             fontSize="sm"
//             color="gray.500"
//             lineHeight="1.7"
//           >
//             <Text
//               as="span"
//               fontWeight="600"
//               color="gray.700"
//             >
//               Coach note:
//             </Text>{" "}
//             {exercise.notes}
//           </Text>
//         </>
//       ) : null}
//     </Box>
//   );
// };

// /* =========================================================
//    PAGE
// ========================================================= */

// const WorkoutDetailPage = () => {
//   const {
//     assignmentId,
//   } =
//     useParams<{
//       assignmentId: string;
//     }>();

//   const navigate =
//     useNavigate();

//   const toast =
//     useToast();

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     assignment,
//     setAssignment,
//   ] =
//     useState<ClientWorkoutAssignmentDetail | null>(
//       null
//     );

//   const [
//     activeSession,
//     setActiveSession,
//   ] =
//     useState<WorkoutSession | null>(
//       null
//     );

//   /* -------------------------------------------------------
//      LOAD
//   ------------------------------------------------------- */

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const id =
//           Number(assignmentId);

//         if (
//           !Number.isInteger(id) ||
//           id <= 0
//         ) {
//           throw new Error(
//             "Invalid workout assignment."
//           );
//         }

//         const [
//           data,
//           active,
//         ] = await Promise.all([
//           getMyWorkoutAssignment(id),
//           getActiveWorkoutSession(),
//         ]);

//         setAssignment(data);

//         if (
//           active &&
//           Number(
//             active.workout_assignment_id
//           ) === id
//         ) {
//           setActiveSession(
//             active
//           );
//         } else {
//           setActiveSession(
//             null
//           );
//         }
//       } catch (error: any) {
//         console.error(error);

//         toast({
//           title:
//             "Unable to open workout",
//           description:
//             error?.response?.data
//               ?.error ||
//             error?.message ||
//             "Please try again.",
//           status: "error",
//           duration: 3500,
//           isClosable: true,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [
//     assignmentId,
//     toast,
//   ]);

//   /* -------------------------------------------------------
//      LOADING
//   ------------------------------------------------------- */

//   if (loading) {
//     return (
//       <Box
//         minH="100vh"
//         bg="gray.50"
//         px={{
//           base: 4,
//           md: 8,
//         }}
//         py={8}
//       >
//         <Box
//           maxW="1100px"
//           mx="auto"
//         >
//           <Skeleton
//             height="42px"
//             mb={5}
//             borderRadius="xl"
//           />

//           <Skeleton
//             height="260px"
//             mb={5}
//             borderRadius="3xl"
//           />

//           <Skeleton
//             height="420px"
//             borderRadius="3xl"
//           />
//         </Box>
//       </Box>
//     );
//   }

//   /* -------------------------------------------------------
//      NOT FOUND
//   ------------------------------------------------------- */

//   if (!assignment) {
//     return (
//       <Center
//         minH="70vh"
//         bg="gray.50"
//         px={6}
//       >
//         <VStack
//           spacing={5}
//           textAlign="center"
//         >
//           <Heading
//             size="md"
//             color="gray.800"
//           >
//             Workout not found
//           </Heading>

//           <Text
//             color="gray.500"
//             maxW="420px"
//           >
//             This workout may have been
//             removed or is no longer
//             available.
//           </Text>

//           <Button
//             colorScheme="blue"
//             borderRadius="xl"
//             onClick={() =>
//               navigate(
//                 "/workouts"
//               )
//             }
//           >
//             Back to My Workouts
//           </Button>
//         </VStack>
//       </Center>
//     );
//   }

//   /* -------------------------------------------------------
//      RENDER
//   ------------------------------------------------------- */

//   return (
//     <Box
//       minH="100vh"
//       bg="gray.50"
//       px={{
//         base: 4,
//         md: 8,
//       }}
//       py={{
//         base: 5,
//         md: 8,
//       }}
//     >
//       <Box
//         maxW="1100px"
//         mx="auto"
//       >
//         {/* =================================================
//             BACK
//         ================================================= */}

//         <Button
//           variant="ghost"
//           leftIcon={
//             <FiArrowLeft />
//           }
//           color="gray.600"
//           mb={5}
//           onClick={() =>
//             navigate(
//               "/workouts"
//             )
//           }
//         >
//           My Workouts
//         </Button>

//         {/* =================================================
//             HERO
//         ================================================= */}

//         <Box
//           bg="white"
//           borderRadius="3xl"
//           border="1px solid"
//           borderColor="gray.100"
//           p={{
//             base: 6,
//             md: 8,
//           }}
//           boxShadow="0 15px 45px rgba(15,23,42,0.06)"
//         >
//           <Flex
//             justify="space-between"
//             gap={8}
//             direction={{
//               base: "column",
//               md: "row",
//             }}
//           >
//             <Box
//               flex="1"
//               minW={0}
//             >
//               {/* BADGES */}

//               <HStack
//                 spacing={2}
//                 mb={4}
//                 flexWrap="wrap"
//               >
//                 <Badge
//                   colorScheme="blue"
//                   borderRadius="full"
//                   px={3}
//                   py={1}
//                   fontSize="10px"
//                   letterSpacing="0.04em"
//                 >
//                   ACTIVE
//                 </Badge>

//                 {assignment.primary_muscle_group ? (
//                   <Badge
//                     colorScheme="purple"
//                     borderRadius="full"
//                     px={3}
//                     py={1}
//                     fontSize="10px"
//                   >
//                     {
//                       assignment.primary_muscle_group
//                     }
//                   </Badge>
//                 ) : null}

//                 {assignment.training_goal_name ? (
//                   <Badge
//                     colorScheme="green"
//                     borderRadius="full"
//                     px={3}
//                     py={1}
//                     fontSize="10px"
//                   >
//                     {
//                       assignment.training_goal_name
//                     }
//                   </Badge>
//                 ) : null}
//               </HStack>

//               {/* TITLE */}

//               <Heading
//                 size={{
//                   base: "lg",
//                   md: "xl",
//                 }}
//                 color="gray.800"
//                 letterSpacing="-0.025em"
//               >
//                 {
//                   assignment.workout_name
//                 }
//               </Heading>

//               <Text
//                 color="gray.500"
//                 mt={3}
//                 lineHeight="1.8"
//                 maxW="720px"
//                 fontSize="sm"
//               >
//                 {assignment.workout_description ||
//                   "Your assigned workout is ready. Complete each exercise in order and track every set."}
//               </Text>

//               {/* COACH / ORGANIZATION */}

//               {assignment.organization_name ||
//               assignment.trainer_name ? (
//                 <Text
//                   mt={4}
//                   fontSize="sm"
//                   color="gray.400"
//                 >
//                   {assignment.organization_name ||
//                     "NEKA Training"}

//                   {assignment.trainer_name
//                     ? ` • ${
//                         assignment.trainer_name
//                       }`
//                     : ""}
//                 </Text>
//               ) : null}

//               {/* STATS */}

//               <SimpleGrid
//                 columns={{
//                   base: 1,
//                   sm: 3,
//                 }}
//                 spacing={4}
//                 mt={7}
//                 maxW="720px"
//               >
//                 <Box
//                   bg="gray.50"
//                   borderRadius="xl"
//                   p={4}
//                 >
//                   <HStack
//                     spacing={2}
//                     color="gray.500"
//                     fontSize="xs"
//                   >
//                     <Icon
//                       as={FiRepeat}
//                     />
//                     <Text>
//                       Exercises
//                     </Text>
//                   </HStack>

//                   <Text
//                     mt={2}
//                     fontWeight="700"
//                     color="gray.800"
//                     fontSize="lg"
//                   >
//                     {
//                       assignment
//                         .exercises
//                         .length
//                     }
//                   </Text>
//                 </Box>

//                 <Box
//                   bg="gray.50"
//                   borderRadius="xl"
//                   p={4}
//                 >
//                   <HStack
//                     spacing={2}
//                     color="gray.500"
//                     fontSize="xs"
//                   >
//                     <Icon
//                       as={FiClock}
//                     />
//                     <Text>
//                       Duration
//                     </Text>
//                   </HStack>

//                   <Text
//                     mt={2}
//                     fontWeight="700"
//                     color="gray.800"
//                     fontSize="lg"
//                   >
//                     {assignment.estimated_duration_minutes
//                       ? `~${assignment.estimated_duration_minutes} min`
//                       : "--"}
//                   </Text>
//                 </Box>

//                 <Box
//                   bg="gray.50"
//                   borderRadius="xl"
//                   p={4}
//                 >
//                   <HStack
//                     spacing={2}
//                     color="gray.500"
//                     fontSize="xs"
//                   >
//                     <Icon
//                       as={FiCalendar}
//                     />
//                     <Text>
//                       Schedule
//                     </Text>
//                   </HStack>

//                   <Text
//                     mt={2}
//                     fontWeight="700"
//                     color="gray.800"
//                     fontSize="sm"
//                   >
//                     {assignment
//                       .scheduled_days
//                       ?.length
//                       ? assignment.scheduled_days.join(
//                           " • "
//                         )
//                       : "Flexible"}
//                   </Text>
//                 </Box>
//               </SimpleGrid>
//             </Box>

//             {/* ACTION AREA */}

//             <VStack
//               align={{
//                 base: "stretch",
//                 md: "flex-end",
//               }}
//               spacing={3}
//               minW={{
//                 base: "100%",
//                 md: "190px",
//               }}
//             >
//               <Button
//                 colorScheme="blue"
//                 borderRadius="xl"
//                 size="lg"
//                 width="100%"
//                 leftIcon={
//                   <FiPlay />
//                 }
//                 onClick={() =>
//                   navigate(
//                     `/workouts/${assignment.id}/session`
//                   )
//                 }
//               >
//                 {activeSession
//                   ? "Resume Workout"
//                   : "Start Workout"}
//               </Button>

//               <Button
//                 variant="outline"
//                 borderRadius="xl"
//                 width="100%"
//                 onClick={() =>
//                   navigate(
//                     "/workouts/library"
//                   )
//                 }
//               >
//                 Exercise Library
//               </Button>
//             </VStack>
//           </Flex>
//         </Box>

//         {/* =================================================
//             PLAN PERIOD
//         ================================================= */}

//         <Flex
//           mt={5}
//           px={2}
//           align={{
//             base: "flex-start",
//             md: "center",
//           }}
//           justify="space-between"
//           gap={3}
//           direction={{
//             base: "column",
//             md: "row",
//           }}
//         >
//           <Text
//             fontSize="xs"
//             color="gray.400"
//           >
//             Training period
//           </Text>

//           <Text
//             fontSize="sm"
//             fontWeight="600"
//             color="gray.600"
//           >
//             {formatDate(
//               assignment.start_date
//             )}

//             {assignment.end_date
//               ? ` → ${formatDate(
//                   assignment.end_date
//                 )}`
//               : ""}
//           </Text>
//         </Flex>

//         {/* =================================================
//             WORKOUT STRUCTURE
//         ================================================= */}

//         <Box mt={10}>
//           <Flex
//             align={{
//               base: "flex-start",
//               md: "center",
//             }}
//             justify="space-between"
//             gap={4}
//             mb={5}
//             direction={{
//               base: "column",
//               md: "row",
//             }}
//           >
//             <Box>
//               <Heading
//                 size="md"
//                 color="gray.800"
//               >
//                 Workout structure
//               </Heading>

//               <Text
//                 mt={1}
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 Your coach's planned
//                 exercises and targets.
//               </Text>
//             </Box>

//             <Text
//               fontSize="sm"
//               fontWeight="600"
//               color="gray.400"
//             >
//               {
//                 assignment.exercises
//                   .length
//               }{" "}
//               exercises
//             </Text>
//           </Flex>

//           <VStack
//             align="stretch"
//             spacing={3}
//           >
//             {assignment.exercises.map(
//               (
//                 exercise,
//                 index
//               ) => (
//                 <ExerciseRow
//                   key={
//                     exercise.id
//                   }
//                   exercise={
//                     exercise
//                   }
//                   index={index}
//                 />
//               )
//             )}
//           </VStack>
//         </Box>

//         {/* =================================================
//             BOTTOM CTA
//         ================================================= */}

//         {assignment.exercises
//           .length > 0 ? (
//           <Box
//             mt={10}
//             bg="gray.900"
//             borderRadius="3xl"
//             p={{
//               base: 6,
//               md: 8,
//             }}
//           >
//             <Flex
//               align={{
//                 base: "flex-start",
//                 md: "center",
//               }}
//               justify="space-between"
//               gap={6}
//               direction={{
//                 base: "column",
//                 md: "row",
//               }}
//             >
//               <Box>
//                 <Text
//                   fontSize="xs"
//                   fontWeight="700"
//                   color="whiteAlpha.600"
//                   letterSpacing="0.08em"
//                 >
//                   READY WHEN YOU ARE
//                 </Text>

//                 <Heading
//                   mt={2}
//                   size="md"
//                   color="white"
//                 >
//                   Let's get this workout
//                   done.
//                 </Heading>

//                 <Text
//                   mt={2}
//                   color="whiteAlpha.700"
//                   fontSize="sm"
//                 >
//                   Track every set and
//                   keep your progress
//                   consistent.
//                 </Text>
//               </Box>

//               <Button
//                 colorScheme="blue"
//                 borderRadius="xl"
//                 size="lg"
//                 rightIcon={
//                   <FiArrowRight />
//                 }
//                 onClick={() =>
//                   navigate(
//                     `/workouts/${assignment.id}/session`
//                   )
//                 }
//               >
//                 {activeSession
//                   ? "Resume Workout"
//                   : "Start Workout"}
//               </Button>
//             </Flex>
//           </Box>
//         ) : null}
//       </Box>
//     </Box>
//   );
// };

// export default WorkoutDetailPage;


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
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiPlay,
  FiRepeat,
  FiUser,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ExerciseDetailSheet from "../../components/Workout/ExerciseDetailSheet";

import {
  getActiveWorkoutSession,
  getMyWorkoutAssignment,
} from "../../services/userWorkout.service";

import type {
  ClientWorkoutAssignmentDetail,
  WorkoutSession,
} from "../../types/workoutExecution.types";

/* =========================================================
   HELPERS
========================================================= */

const formatTarget = (
  exercise: ClientWorkoutAssignmentDetail["exercises"][number]
) => {
  const tracking = String(
    exercise.tracking_type || ""
  ).toUpperCase();

  const sets =
    exercise.target_sets || 1;

  if (tracking === "DURATION") {
    return `${sets} × ${
      exercise.target_duration_seconds || 0
    }s`;
  }

  if (tracking === "DISTANCE") {
    return `${sets} × ${
      exercise.target_distance || 0
    }`;
  }

  if (tracking === "REPS_ONLY") {
    return `${sets} × ${
      exercise.target_reps || 0
    } reps`;
  }

  if (tracking === "REPS_DURATION") {
    return `${sets} × ${
      exercise.target_reps || 0
    } reps • ${
      exercise.target_duration_seconds || 0
    }s`;
  }

  return `${sets} × ${
    exercise.target_reps || 0
  } reps${
    exercise.target_weight
      ? ` • ${exercise.target_weight} kg`
      : ""
  }`;
};

const formatDate = (
  value?: string | null
) => {
  if (!value) return "";

  const [
    year,
    month,
    day,
  ] = String(value)
    .slice(0, 10)
    .split("-")
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return "";
  }

  return new Date(
    year,
    month - 1,
    day
  ).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

/* =========================================================
   PAGE
========================================================= */

const WorkoutDetailPage = () => {
  const {
    assignmentId,
  } =
    useParams<{
      assignmentId: string;
    }>();

  const navigate =
    useNavigate();

  const toast =
    useToast();

  const exerciseSheet =
    useDisclosure();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    assignment,
    setAssignment,
  ] =
    useState<ClientWorkoutAssignmentDetail | null>(
      null
    );

  const [
    activeSession,
    setActiveSession,
  ] =
    useState<WorkoutSession | null>(
      null
    );

  const [
    selectedExercise,
    setSelectedExercise,
  ] =
    useState<
      ClientWorkoutAssignmentDetail["exercises"][number] | null
    >(null);

  /* =======================================================
     NORMALIZED ROUTE ID
  ======================================================= */

  const numericAssignmentId =
    Number(assignmentId);

  const isValidAssignmentId =
    Number.isInteger(
      numericAssignmentId
    ) &&
    numericAssignmentId > 0;

  /* =======================================================
     LOAD ASSIGNMENT
  ======================================================= */

  useEffect(() => {
    const load = async () => {
      try {
        const id =
          Number(assignmentId);

        if (
          !Number.isInteger(id) ||
          id <= 0
        ) {
          throw new Error(
            "Invalid workout assignment."
          );
        }

        const [
          data,
          active,
        ] = await Promise.all([
          getMyWorkoutAssignment(id),
          getActiveWorkoutSession(),
        ]);

        setAssignment(data);

        setActiveSession(
          active &&
          Number(
            active.workout_assignment_id
          ) === id
            ? active
            : null
        );
      } catch (
        error: any
      ) {
        console.error(error);

        toast({
          title:
            "Unable to open workout",
          description:
            error?.response?.data
              ?.error ??
            error?.message ??
            "Please try again.",
          status:
            "error",
          duration:
            3500,
          isClosable:
            true,
        });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [
    assignmentId,
    toast,
  ]);

  /* =======================================================
     OPEN EXERCISE
  ======================================================= */

  const openExercise = (
    exercise: ClientWorkoutAssignmentDetail["exercises"][number]
  ) => {
    setSelectedExercise(
      exercise
    );

    exerciseSheet.onOpen();
  };

  /* =======================================================
     START / RESUME WORKOUT
  ======================================================= */

  const handleStartWorkout =
    () => {
      if (
        !isValidAssignmentId
      ) {
        toast({
          title:
            "Invalid workout",
          description:
            "Unable to identify this workout assignment.",
          status:
            "error",
          duration:
            3000,
          isClosable:
            true,
        });

        return;
      }

      navigate(
        `/workouts/${numericAssignmentId}/session`
      );
    };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="#f7f8fa"
        px={{
          base: 4,
          md: 8,
        }}
        py={8}
      >
        <Box
          maxW="1100px"
          mx="auto"
        >
          <Skeleton
            height="42px"
            mb={5}
            borderRadius="xl"
          />

          <Skeleton
            height="290px"
            mb={5}
            borderRadius="3xl"
          />

          <Skeleton
            height="420px"
            borderRadius="3xl"
          />
        </Box>
      </Box>
    );
  }

  /* =======================================================
     EMPTY / NOT FOUND
  ======================================================= */

  if (!assignment) {
    return (
      <Center
        minH="70vh"
        bg="#f7f8fa"
        px={6}
      >
        <VStack
          spacing={5}
          textAlign="center"
        >
          <Flex
            w="56px"
            h="56px"
            align="center"
            justify="center"
            borderRadius="full"
            bg="gray.100"
          >
            <Icon
              as={FiRepeat}
              color="gray.500"
              boxSize={6}
            />
          </Flex>

          <Heading
            size="md"
            color="gray.900"
          >
            Workout unavailable
          </Heading>

          <Text
            color="gray.500"
            maxW="420px"
          >
            This assigned workout
            could not be loaded or
            is no longer available.
          </Text>

          <Button
            colorScheme="blue"
            borderRadius="xl"
            onClick={() =>
              navigate(
                "/workouts"
              )
            }
          >
            Back to My Workouts
          </Button>
        </VStack>
      </Center>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <Box
      minH="100vh"
      bg="#f7f8fa"
      px={{
        base: 4,
        md: 8,
      }}
      py={{
        base: 5,
        md: 8,
      }}
    >
      <Box
        maxW="1100px"
        mx="auto"
      >
        {/* =================================================
            BACK
        ================================================= */}

        <Button
          variant="ghost"
          leftIcon={
            <FiArrowLeft />
          }
          color="gray.600"
          borderRadius="xl"
          mb={5}
          onClick={() =>
            navigate(
              "/workouts"
            )
          }
        >
          My Workouts
        </Button>

        {/* =================================================
            HERO
        ================================================= */}

        <Box
          bg="gray.900"
          color="white"
          borderRadius="3xl"
          p={{
            base: 6,
            md: 9,
          }}
          overflow="hidden"
          position="relative"
          boxShadow="0 24px 80px rgba(15,23,42,0.16)"
        >
          {/* Ambient glow */}

          <Box
            position="absolute"
            w="360px"
            h="360px"
            borderRadius="full"
            right="-140px"
            top="-180px"
            bg="blue.500"
            opacity={0.18}
            filter="blur(70px)"
          />

          <Box
            position="relative"
            zIndex={1}
          >
            <Flex
              justify="space-between"
              align={{
                base: "flex-start",
                md: "center",
              }}
              gap={8}
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <Box
                flex="1"
                minW={0}
              >
                {/* -----------------------------------------
                    LABELS
                ------------------------------------------ */}

                <HStack
                  spacing={2}
                  flexWrap="wrap"
                >
                  <Badge
                    bg="whiteAlpha.120"
                    color="whiteAlpha.850"
                    borderRadius="full"
                    px={3}
                    py={1.5}
                    fontSize="10px"
                    letterSpacing="0.08em"
                  >
                    ASSIGNED WORKOUT
                  </Badge>

                  {assignment.primary_muscle_group ? (
                    <Badge
                      bg="whiteAlpha.120"
                      color="whiteAlpha.850"
                      borderRadius="full"
                      px={3}
                      py={1.5}
                      fontSize="10px"
                    >
                      {
                        assignment.primary_muscle_group
                      }
                    </Badge>
                  ) : null}
                </HStack>

                {/* -----------------------------------------
                    TITLE
                ------------------------------------------ */}

                <Heading
                  mt={5}
                  fontSize={{
                    base: "3xl",
                    md: "5xl",
                  }}
                  letterSpacing="-0.055em"
                  lineHeight="0.98"
                >
                  {
                    assignment.workout_name
                  }
                </Heading>

                {/* -----------------------------------------
                    DESCRIPTION
                ------------------------------------------ */}

                <Text
                  mt={4}
                  maxW="700px"
                  color="whiteAlpha.700"
                  lineHeight="1.8"
                  fontSize="sm"
                >
                  {assignment.workout_description ||
                    "A structured training session prepared for your current goal."}
                </Text>

                {/* -----------------------------------------
                    STATS
                ------------------------------------------ */}

                <HStack
                  mt={6}
                  spacing={5}
                  flexWrap="wrap"
                  color="whiteAlpha.700"
                  fontSize="xs"
                >
                  <HStack>
                    <Icon
                      as={
                        FiRepeat
                      }
                    />

                    <Text>
                      {
                        assignment
                          .exercises
                          .length
                      }{" "}
                      exercises
                    </Text>
                  </HStack>

                  <HStack>
                    <Icon
                      as={
                        FiClock
                      }
                    />

                    <Text>
                      ~
                      {assignment.estimated_duration_minutes ||
                        "--"}{" "}
                      min
                    </Text>
                  </HStack>

                  <HStack>
                    <Icon
                      as={
                        FiCalendar
                      }
                    />

                    <Text>
                      {assignment.scheduled_days?.join(
                        " · "
                      ) ||
                        "Flexible"}
                    </Text>
                  </HStack>
                </HStack>
              </Box>

              {/* -----------------------------------------
                  ACTIONS
              ------------------------------------------ */}

              <VStack
                align={{
                  base: "stretch",
                  md: "flex-end",
                }}
                spacing={3}
                minW={{
                  base: "100%",
                  md: "210px",
                }}
              >
                <Button
                  colorScheme="blue"
                  borderRadius="xl"
                  size="lg"
                  w="100%"
                  leftIcon={
                    <FiPlay />
                  }
                  onClick={
                    handleStartWorkout
                  }
                >
                  {activeSession
                    ? "Resume Workout"
                    : "Start Workout"}
                </Button>

                <Button
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  borderRadius="xl"
                  w="100%"
                  onClick={() =>
                    navigate(
                      "/workouts/library"
                    )
                  }
                >
                  Exercise Library
                </Button>
              </VStack>
            </Flex>

            <Divider
              mt={8}
              borderColor="whiteAlpha.100"
            />

            {/* -----------------------------------------
                TRAINER
            ------------------------------------------ */}

            <HStack
              mt={5}
              spacing={3}
              color="whiteAlpha.650"
              fontSize="xs"
            >
              <Icon
                as={FiUser}
              />

              <Text>
                {assignment.trainer_name
                  ? `Prepared by ${assignment.trainer_name}`
                  : "Prepared for your NEKA plan"}

                {assignment.organization_name
                  ? ` · ${assignment.organization_name}`
                  : ""}
              </Text>
            </HStack>
          </Box>
        </Box>

        {/* =================================================
            TRAINING PERIOD
        ================================================= */}

        <Flex
          mt={5}
          px={2}
          justify="space-between"
          align={{
            base: "flex-start",
            md: "center",
          }}
          gap={3}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Text
            fontSize="xs"
            color="gray.400"
          >
            Training period
          </Text>

          <Text
            fontSize="sm"
            fontWeight="650"
            color="gray.600"
          >
            {formatDate(
              assignment.start_date
            )}

            {assignment.end_date
              ? ` → ${formatDate(
                  assignment.end_date
                )}`
              : ""}
          </Text>
        </Flex>

        {/* =================================================
            EXERCISES
        ================================================= */}

        <Box mt={11}>
          <Flex
            justify="space-between"
            align="flex-end"
            gap={4}
            mb={5}
          >
            <Box>
              <Text
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.12em"
                color="gray.400"
              >
                THE SESSION
              </Text>

              <Heading
                mt={1.5}
                size="md"
                color="gray.900"
              >
                Exercises in this workout
              </Heading>

              <Text
                mt={1.5}
                color="gray.500"
                fontSize="sm"
              >
                Tap any exercise to see
                the movement profile,
                cues and training
                details.
              </Text>
            </Box>

            <Text
              fontSize="xs"
              color="gray.400"
            >
              {
                assignment.exercises
                  .length
              }{" "}
              movements
            </Text>
          </Flex>

          <VStack
            align="stretch"
            spacing={3}
          >
            {assignment.exercises.map(
              (
                exercise,
                index
              ) => (
                <Box
                  key={
                    exercise.id
                  }
                  as="button"
                  type="button"
                  textAlign="left"
                  w="100%"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="2xl"
                  p={{
                    base: 4,
                    md: 5,
                  }}
                  cursor="pointer"
                  transition="all 180ms ease"
                  _hover={{
                    transform:
                      "translateY(-2px)",
                    borderColor:
                      "blue.100",
                    boxShadow:
                      "0 14px 34px rgba(15,23,42,0.06)",
                  }}
                  _focusVisible={{
                    outline:
                      "2px solid",
                    outlineColor:
                      "blue.300",
                    outlineOffset:
                      "2px",
                  }}
                  onClick={() =>
                    openExercise(
                      exercise
                    )
                  }
                >
                  <Flex
                    gap={4}
                    align="center"
                  >
                    {/* NUMBER */}

                    <Flex
                      w="42px"
                      h="42px"
                      borderRadius="xl"
                      bg="gray.50"
                      color="gray.600"
                      align="center"
                      justify="center"
                      flexShrink={0}
                      fontSize="xs"
                      fontWeight="800"
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </Flex>

                    {/* IMAGE */}

                    {exercise.image_url ? (
                      <Image
                        src={
                          exercise.image_url
                        }
                        alt={
                          exercise.exercise_name
                        }
                        w="72px"
                        h="72px"
                        objectFit="cover"
                        borderRadius="xl"
                        flexShrink={0}
                      />
                    ) : (
                      <Flex
                        w="72px"
                        h="72px"
                        borderRadius="xl"
                        flexShrink={0}
                        bg="gray.50"
                        align="center"
                        justify="center"
                      >
                        <Icon
                          as={
                            FiActivity
                          }
                          boxSize={6}
                          color="gray.300"
                        />
                      </Flex>
                    )}

                    {/* CONTENT */}

                    <Box
                      flex="1"
                      minW={0}
                    >
                      <HStack
                        spacing={2}
                        flexWrap="wrap"
                      >
                        <Text
                          fontWeight="750"
                          color="gray.900"
                          noOfLines={2}
                        >
                          {
                            exercise.exercise_name
                          }
                        </Text>

                        {exercise.primary_muscle_group ? (
                          <Badge
                            bg="gray.100"
                            color="gray.600"
                            borderRadius="full"
                            fontSize="9px"
                          >
                            {
                              exercise.primary_muscle_group
                            }
                          </Badge>
                        ) : null}
                      </HStack>

                      <Text
                        mt={1.5}
                        fontSize="sm"
                        color="gray.500"
                      >
                        {formatTarget(
                          exercise
                        )}
                      </Text>

                      {exercise.notes ? (
                        <Text
                          mt={1.5}
                          fontSize="xs"
                          color="gray.400"
                          noOfLines={1}
                        >
                          {
                            exercise.notes
                          }
                        </Text>
                      ) : null}
                    </Box>

                    {/* CHEVRON */}

                    <Icon
                      as={
                        FiArrowRight
                      }
                      color="gray.300"
                      flexShrink={0}
                    />
                  </Flex>
                </Box>
              )
            )}
          </VStack>
        </Box>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <Box
          mt={10}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="3xl"
          p={{
            base: 6,
            md: 8,
          }}
          boxShadow="0 10px 36px rgba(15,23,42,0.04)"
        >
          <Flex
            align={{
              base: "flex-start",
              md: "center",
            }}
            justify="space-between"
            gap={5}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <Box>
              <Text
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.12em"
                color="gray.400"
              >
                READY WHEN YOU ARE
              </Text>

              <Heading
                mt={2}
                size="md"
                color="gray.900"
              >
                Make the next session count.
              </Heading>

              <Text
                mt={2}
                color="gray.500"
                fontSize="sm"
              >
                Your workout will save
                progress set by set.
              </Text>
            </Box>

            <Button
              colorScheme="blue"
              borderRadius="xl"
              size="lg"
              rightIcon={
                <FiArrowRight />
              }
              onClick={
                handleStartWorkout
              }
            >
              {activeSession
                ? "Resume Workout"
                : "Start Workout"}
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* ===================================================
          EXERCISE DETAIL SHEET
      =================================================== */}

      <ExerciseDetailSheet
        exercise={
          selectedExercise as any
        }
        isOpen={
          exerciseSheet.isOpen
        }
        onClose={
          exerciseSheet.onClose
        }
        targetText={
          selectedExercise
            ? formatTarget(
                selectedExercise
              )
            : undefined
        }
      />
    </Box>
  );
};

export default WorkoutDetailPage;