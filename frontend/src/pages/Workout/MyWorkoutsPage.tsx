//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Center,
//   Divider,
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

// import {
//   FiActivity,
//   FiArrowRight,
//   FiCalendar,
//   FiClock,
//   FiHeart,
//   FiLayers,
//   FiRefreshCw,
//   FiShield,
//   FiTarget,
//   FiTrendingUp,
//   FiZap,
// } from "react-icons/fi";

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import WorkoutMeta from "../../components/Workout/WorkoutMeta";

// import {
//   getActiveWorkoutSession,
//   getMyWorkoutAssignments,
// } from "../../services/userWorkout.service";

// import type { ClientWorkoutAssignment } from "../../types/workoutExecution.types";

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const DAY_KEYS = [
//   "SUN",
//   "MON",
//   "TUE",
//   "WED",
//   "THU",
//   "FRI",
//   "SAT",
// ];

// const EXERCISE_CATEGORIES = [
//   {
//     name: "Chest",
//     icon: FiHeart,
//     description: "Push, press and build chest strength.",
//   },
//   {
//     name: "Shoulders",
//     icon: FiTarget,
//     description: "Build stronger and broader shoulders.",
//   },
//   {
//     name: "Back",
//     icon: FiLayers,
//     description: "Pull, row and strengthen your back.",
//   },
//   {
//     name: "Biceps",
//     icon: FiTrendingUp,
//     description: "Focused arm strength and control.",
//   },
//   {
//     name: "Triceps",
//     icon: FiZap,
//     description: "Build pressing power and arm strength.",
//   },
//   {
//     name: "Legs",
//     icon: FiActivity,
//     description: "Train your quads, hamstrings and glutes.",
//   },
//   {
//     name: "Core",
//     icon: FiShield,
//     description: "Build stability, control and balance.",
//   },
//   {
//     name: "Cardio",
//     icon: FiActivity,
//     description: "Improve endurance and cardiovascular fitness.",
//   },
// ];

// /* =========================================================
//    DATE HELPERS
// ========================================================= */

// /**
//  * Backend returns values such as:
//  * 2026-09-28T00:00:00.000Z
//  *
//  * The old implementation appended T00:00:00 again,
//  * which created an invalid date.
//  */
// const toDateOnly = (value?: string | null) => {
//   if (!value) return null;

//   const datePart = String(value).slice(0, 10);

//   const [year, month, day] = datePart
//     .split("-")
//     .map(Number);

//   if (
//     !Number.isFinite(year) ||
//     !Number.isFinite(month) ||
//     !Number.isFinite(day)
//   ) {
//     return null;
//   }

//   return new Date(year, month - 1, day);
// };

// const formatDate = (value?: string | null) => {
//   const date = toDateOnly(value);

//   if (!date) return "";

//   return date.toLocaleDateString(undefined, {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// const isInDateRange = (
//   assignment: ClientWorkoutAssignment
// ) => {
//   const today = new Date();

//   today.setHours(0, 0, 0, 0);

//   const start = toDateOnly(
//     assignment.start_date
//   );

//   const end = toDateOnly(
//     assignment.end_date
//   );

//   if (!start) {
//     return false;
//   }

//   if (end) {
//     end.setHours(
//       23,
//       59,
//       59,
//       999
//     );
//   }

//   return (
//     today >= start &&
//     (!end || today <= end)
//   );
// };

// const scheduledToday = (
//   assignment: ClientWorkoutAssignment
// ) => {
//   const days = Array.isArray(
//     assignment.scheduled_days
//   )
//     ? assignment.scheduled_days
//     : [];

//   return days.includes(
//     DAY_KEYS[new Date().getDay()]
//   );
// };

// /* =========================================================
//    CATEGORY CARD
// ========================================================= */

// const ExerciseCategoryCard = ({
//   name,
//   description,
//   icon,
//   onClick,
// }: {
//   name: string;
//   description: string;
//   icon: any;
//   onClick: () => void;
// }) => {
//   return (
//     <Box
//       role="button"
//       tabIndex={0}
//       onClick={onClick}
//       onKeyDown={(event) => {
//         if (
//           event.key === "Enter" ||
//           event.key === " "
//         ) {
//           event.preventDefault();
//           onClick();
//         }
//       }}
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={5}
//       cursor="pointer"
//       transition="all 0.2s ease"
//       _hover={{
//         transform: "translateY(-3px)",
//         borderColor: "blue.100",
//         boxShadow:
//           "0 14px 36px rgba(15,23,42,0.07)",
//       }}
//       _focusVisible={{
//         outline: "2px solid",
//         outlineColor: "blue.300",
//         outlineOffset: "2px",
//       }}
//     >
//       <Flex
//         w="46px"
//         h="46px"
//         align="center"
//         justify="center"
//         borderRadius="xl"
//         bg="blue.50"
//         color="blue.500"
//       >
//         <Icon as={icon} boxSize={5} />
//       </Flex>

//       <Flex
//         mt={4}
//         align="center"
//         justify="space-between"
//         gap={3}
//       >
//         <Box>
//           <Text
//             fontWeight="700"
//             fontSize="md"
//             color="gray.800"
//           >
//             {name}
//           </Text>

//           <Text
//             mt={1}
//             fontSize="xs"
//             color="gray.500"
//             lineHeight="1.6"
//           >
//             {description}
//           </Text>
//         </Box>

//         <Icon
//           as={FiArrowRight}
//           color="gray.300"
//           flexShrink={0}
//         />
//       </Flex>
//     </Box>
//   );
// };

// /* =========================================================
//    WORKOUT CARD
// ========================================================= */

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

//   const resume =
//     activeSessionAssignmentId ===
//     Number(assignment.id);

//   return (
//     <Box
//       position="relative"
//       bg="white"
//       border="1px solid"
//       borderColor={
//         today
//           ? "blue.100"
//           : "gray.100"
//       }
//       borderRadius="3xl"
//       p={{ base: 5, md: 6 }}
//       boxShadow="0 12px 38px rgba(15,23,42,0.05)"
//       transition="all 0.2s ease"
//       _hover={{
//         transform: "translateY(-2px)",
//         boxShadow:
//           "0 18px 45px rgba(15,23,42,0.08)",
//       }}
//     >
//       {/* TOP */}

//       <Flex
//         justify="space-between"
//         align="flex-start"
//         gap={4}
//       >
//         <Box minW={0}>
//           <HStack
//             spacing={2}
//             mb={3}
//             flexWrap="wrap"
//           >
//             <Badge
//               colorScheme={
//                 today
//                   ? "blue"
//                   : "gray"
//               }
//               borderRadius="full"
//               px={3}
//               py={1}
//               fontSize="10px"
//               letterSpacing="0.04em"
//             >
//               {today
//                 ? "TODAY"
//                 : "ACTIVE PLAN"}
//             </Badge>

//             {assignment.primary_muscle_group ? (
//               <Badge
//                 colorScheme="purple"
//                 borderRadius="full"
//                 px={3}
//                 py={1}
//                 fontSize="10px"
//               >
//                 {assignment.primary_muscle_group}
//               </Badge>
//             ) : null}
//           </HStack>

//           <Heading
//             size={{ base: "md", md: "lg" }}
//             color="gray.800"
//             lineHeight="1.2"
//           >
//             {assignment.workout_name}
//           </Heading>

//           {assignment.organization_name ? (
//             <Text
//               mt={2}
//               fontSize="sm"
//               color="gray.400"
//             >
//               {assignment.organization_name}

//               {assignment.trainer_name
//                 ? ` • ${assignment.trainer_name}`
//                 : ""}
//             </Text>
//           ) : null}
//         </Box>

//         <Flex
//           w="38px"
//           h="38px"
//           align="center"
//           justify="center"
//           borderRadius="full"
//           bg={
//             today
//               ? "blue.50"
//               : "gray.50"
//           }
//           color={
//             today
//               ? "blue.500"
//               : "gray.400"
//           }
//           flexShrink={0}
//         >
//           <Icon
//             as={
//               resume
//                 ? FiActivity
//                 : FiArrowRight
//             }
//             boxSize={4}
//           />
//         </Flex>
//       </Flex>

//       {/* DESCRIPTION */}

//       {assignment.workout_description ? (
//         <Text
//           color="gray.500"
//           fontSize="sm"
//           lineHeight="1.7"
//           mt={4}
//           noOfLines={2}
//         >
//           {assignment.workout_description}
//         </Text>
//       ) : null}

//       {/* META */}

//       <Box mt={5}>
//         <WorkoutMeta
//           duration={
//             assignment.estimated_duration_minutes
//           }
//           exerciseCount={
//             assignment.exercise_count
//           }
//           goal={
//             assignment.training_goal_name ||
//             assignment.goal_type
//           }
//         />
//       </Box>

//       <Divider my={5} />

//       {/* DATE + DAYS */}

//       <VStack
//         align="stretch"
//         spacing={3}
//       >
//         <HStack
//           color="gray.500"
//           spacing={2}
//           fontSize="xs"
//         >
//           <Icon as={FiCalendar} />

//           <Text>
//             {formatDate(
//               assignment.start_date
//             )}

//             {assignment.end_date
//               ? ` → ${formatDate(
//                   assignment.end_date
//                 )}`
//               : ""}
//           </Text>
//         </HStack>

//         <HStack
//           color="gray.500"
//           spacing={2}
//           fontSize="xs"
//         >
//           <Icon as={FiClock} />

//           <Text>
//             {assignment.scheduled_days?.length
//               ? assignment.scheduled_days.join(
//                   " • "
//                 )
//               : "Flexible schedule"}
//           </Text>
//         </HStack>
//       </VStack>

//       {/* ACTION */}

//       <Button
//         mt={5}
//         w="100%"
//         colorScheme="blue"
//         borderRadius="xl"
//         size="md"
//         onClick={() =>
//           navigate(
//             `/workouts/${assignment.id}`
//           )
//         }
//       >
//         {resume
//           ? "Resume Workout"
//           : today
//             ? "View Today's Workout"
//             : "View Workout"}
//       </Button>
//     </Box>
//   );
// };

// /* =========================================================
//    PAGE
// ========================================================= */

// const MyWorkoutsPage = () => {
//   const toast = useToast();
//   const navigate = useNavigate();

//   const [loading, setLoading] =
//     useState(true);

//   const [
//     assignments,
//     setAssignments,
//   ] = useState<
//     ClientWorkoutAssignment[]
//   >([]);

//   const [
//     activeSessionAssignmentId,
//     setActiveSessionAssignmentId,
//   ] = useState<number | null>(null);

//   /* -------------------------------------------------------
//      LOAD
//   ------------------------------------------------------- */

//   const load = async () => {
//     try {
//       setLoading(true);

//       const [
//         data,
//         activeSession,
//       ] = await Promise.all([
//         getMyWorkoutAssignments(),
//         getActiveWorkoutSession(),
//       ]);

//       setAssignments(
//         Array.isArray(data)
//           ? data
//           : []
//       );

//       setActiveSessionAssignmentId(
//         activeSession
//           ?.workout_assignment_id
//           ? Number(
//               activeSession.workout_assignment_id
//             )
//           : null
//       );
//     } catch (error: any) {
//       console.error(error);

//       toast({
//         title:
//           "Unable to load your workouts",
//         description:
//           error?.response?.data?.error ||
//           error?.message ||
//           "Please try again.",
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

//   /* -------------------------------------------------------
//      ACTIVE ASSIGNMENTS
//   ------------------------------------------------------- */

//   const activeAssignments =
//     useMemo(() => {
//       return assignments.filter(
//         (item) =>
//           String(
//             item.status
//           ).toUpperCase() ===
//             "ACTIVE" &&
//           isInDateRange(item)
//       );
//     }, [assignments]);

//   const todayAssignments =
//     useMemo(() => {
//       return activeAssignments.filter(
//         scheduledToday
//       );
//     }, [activeAssignments]);

//   const upcomingAssignments =
//     useMemo(() => {
//       return activeAssignments.filter(
//         (item) =>
//           !scheduledToday(item)
//       );
//     }, [activeAssignments]);

//   /* -------------------------------------------------------
//      LOADING
//   ------------------------------------------------------- */

//   if (loading) {
//     return (
//       <Center
//         minH="70vh"
//         bg="gray.50"
//       >
//         <VStack spacing={4}>
//           <Spinner
//             size="xl"
//             thickness="3px"
//             color="blue.400"
//           />

//           <Text
//             color="gray.500"
//             fontSize="sm"
//           >
//             Loading your workouts…
//           </Text>
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
//         md: 6,
//         lg: 8,
//       }}
//       py={{
//         base: 5,
//         md: 8,
//       }}
//     >
//       <Box
//         maxW="1180px"
//         mx="auto"
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <Flex
//           justify="space-between"
//           align={{
//             base: "flex-start",
//             md: "center",
//           }}
//           gap={5}
//           mb={8}
//           direction={{
//             base: "column",
//             md: "row",
//           }}
//         >
//           <Box>
//             <Badge
//               colorScheme="blue"
//               borderRadius="full"
//               px={3}
//               py={1}
//               fontSize="10px"
//               letterSpacing="0.05em"
//             >
//               MY WORKOUTS
//             </Badge>

//             <Heading
//               mt={3}
//               size={{
//                 base: "lg",
//                 md: "xl",
//               }}
//               color="gray.800"
//               letterSpacing="-0.025em"
//             >
//               Train with a plan.
//             </Heading>

//             <Text
//               mt={2}
//               color="gray.500"
//               maxW="650px"
//               lineHeight="1.7"
//               fontSize="sm"
//             >
//               Your training, organized
//               around the workouts your
//               coach has prepared for you.
//             </Text>
//           </Box>

//           <HStack>
//             <Button
//               variant="ghost"
//               leftIcon={
//                 <FiRefreshCw />
//               }
//               onClick={load}
//             >
//               Refresh
//             </Button>

//             <Button
//               variant="outline"
//               borderRadius="xl"
//               onClick={() =>
//                 navigate(
//                   "/workouts/library"
//                 )
//               }
//             >
//               Exercise Library
//             </Button>
//           </HStack>
//         </Flex>

//         {/* =================================================
//             ACTIVE SESSION
//         ================================================= */}

//         {activeSessionAssignmentId ? (
//           <Box
//             mb={8}
//             p={5}
//             bg="blue.50"
//             border="1px solid"
//             borderColor="blue.100"
//             borderRadius="2xl"
//           >
//             <Flex
//               align={{
//                 base: "flex-start",
//                 md: "center",
//               }}
//               justify="space-between"
//               gap={4}
//               direction={{
//                 base: "column",
//                 md: "row",
//               }}
//             >
//               <Box>
//                 <Text
//                   fontWeight="700"
//                   color="blue.800"
//                 >
//                   You have a workout
//                   in progress
//                 </Text>

//                 <Text
//                   mt={1}
//                   fontSize="sm"
//                   color="blue.700"
//                 >
//                   Continue exactly where
//                   you left off.
//                 </Text>
//               </Box>

//               <Button
//                 colorScheme="blue"
//                 borderRadius="xl"
//                 onClick={() =>
//                   navigate(
//                     `/workouts/${activeSessionAssignmentId}`
//                   )
//                 }
//               >
//                 Resume Workout
//               </Button>
//             </Flex>
//           </Box>
//         ) : null}

//         {/* =================================================
//             ASSIGNMENTS
//         ================================================= */}

//         {activeAssignments.length > 0 ? (
//           <>
//             {/* TODAY */}

//             {todayAssignments.length > 0 ? (
//               <Box mb={10}>
//                 <Flex
//                   align="center"
//                   justify="space-between"
//                   mb={4}
//                 >
//                   <Box>
//                     <Heading
//                       size="sm"
//                       color="gray.700"
//                     >
//                       Today
//                     </Heading>

//                     <Text
//                       mt={1}
//                       fontSize="xs"
//                       color="gray.400"
//                     >
//                       Your scheduled training
//                     </Text>
//                   </Box>
//                 </Flex>

//                 <SimpleGrid
//                   columns={{
//                     base: 1,
//                     lg: 2,
//                   }}
//                   spacing={5}
//                 >
//                   {todayAssignments.map(
//                     (assignment) => (
//                       <WorkoutCard
//                         key={
//                           assignment.id
//                         }
//                         assignment={
//                           assignment
//                         }
//                         today
//                         activeSessionAssignmentId={
//                           activeSessionAssignmentId
//                         }
//                       />
//                     )
//                   )}
//                 </SimpleGrid>
//               </Box>
//             ) : null}

//             {/* OTHER ACTIVE ASSIGNMENTS */}

//             {upcomingAssignments.length >
//             0 ? (
//               <Box mb={10}>
//                 <Heading
//                   size="sm"
//                   color="gray.700"
//                   mb={4}
//                 >
//                   Your active plan
//                 </Heading>

//                 <SimpleGrid
//                   columns={{
//                     base: 1,
//                     lg: 2,
//                   }}
//                   spacing={5}
//                 >
//                   {upcomingAssignments.map(
//                     (assignment) => (
//                       <WorkoutCard
//                         key={
//                           assignment.id
//                         }
//                         assignment={
//                           assignment
//                         }
//                         today={false}
//                         activeSessionAssignmentId={
//                           activeSessionAssignmentId
//                         }
//                       />
//                     )
//                   )}
//                 </SimpleGrid>
//               </Box>
//             ) : null}

//             {/* LIBRARY */}

//             <Box mt={12}>
//               <Flex
//                 align={{
//                   base: "flex-start",
//                   md: "center",
//                 }}
//                 justify="space-between"
//                 gap={4}
//                 mb={5}
//                 direction={{
//                   base: "column",
//                   md: "row",
//                 }}
//               >
//                 <Box>
//                   <Heading
//                     size="md"
//                     color="gray.800"
//                   >
//                     Explore exercises
//                   </Heading>

//                   <Text
//                     mt={1}
//                     color="gray.500"
//                     fontSize="sm"
//                   >
//                     Learn movements and
//                     discover exercises outside
//                     your assigned plan.
//                   </Text>
//                 </Box>

//                 <Button
//                   variant="ghost"
//                   colorScheme="blue"
//                   rightIcon={
//                     <FiArrowRight />
//                   }
//                   onClick={() =>
//                     navigate(
//                       "/workouts/library"
//                     )
//                   }
//                 >
//                   View all
//                 </Button>
//               </Flex>

//               <SimpleGrid
//                 columns={{
//                   base: 1,
//                   sm: 2,
//                   lg: 4,
//                 }}
//                 spacing={4}
//               >
//                 {EXERCISE_CATEGORIES.slice(
//                   0,
//                   4
//                 ).map((category) => (
//                   <ExerciseCategoryCard
//                     key={category.name}
//                     {...category}
//                     onClick={() =>
//                       navigate(
//                         "/workouts/library"
//                       )
//                     }
//                   />
//                 ))}
//               </SimpleGrid>
//             </Box>
//           </>
//         ) : (
//           /* =================================================
//              NO ASSIGNMENTS
//           ================================================= */

//           <Box>
//             <Box
//               bg="white"
//               borderRadius="3xl"
//               border="1px solid"
//               borderColor="gray.100"
//               px={{
//                 base: 6,
//                 md: 10,
//               }}
//               py={{
//                 base: 10,
//                 md: 14,
//               }}
//               textAlign="center"
//               boxShadow="0 12px 36px rgba(15,23,42,0.04)"
//             >
//               <Flex
//                 mx="auto"
//                 w="64px"
//                 h="64px"
//                 align="center"
//                 justify="center"
//                 borderRadius="2xl"
//                 bg="blue.50"
//                 color="blue.500"
//               >
//                 <Icon
//                   as={FiActivity}
//                   boxSize={7}
//                 />
//               </Flex>

//               <Heading
//                 mt={6}
//                 size={{
//                   base: "md",
//                   md: "lg",
//                 }}
//                 color="gray.800"
//               >
//                 Your training starts here.
//               </Heading>

//               <Text
//                 mt={3}
//                 maxW="580px"
//                 mx="auto"
//                 color="gray.500"
//                 lineHeight="1.8"
//                 fontSize="sm"
//               >
//                 You don't have an active
//                 assigned workout right now.
//                 Explore the NEKA exercise
//                 library and discover movements
//                 you can learn and practice.
//               </Text>

//               <Button
//                 mt={6}
//                 colorScheme="blue"
//                 borderRadius="xl"
//                 size="md"
//                 rightIcon={
//                   <FiArrowRight />
//                 }
//                 onClick={() =>
//                   navigate(
//                     "/workouts/library"
//                   )
//                 }
//               >
//                 Explore Exercise Library
//               </Button>
//             </Box>

//             {/* CATEGORY DISCOVERY */}

//             <Box mt={10}>
//               <Heading
//                 size="md"
//                 color="gray.800"
//                 mb={2}
//               >
//                 Browse by focus
//               </Heading>

//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//                 mb={5}
//               >
//                 Choose a muscle group or
//                 training focus to start
//                 exploring.
//               </Text>

//               <SimpleGrid
//                 columns={{
//                   base: 1,
//                   sm: 2,
//                   md: 3,
//                   lg: 4,
//                 }}
//                 spacing={4}
//               >
//                 {EXERCISE_CATEGORIES.map(
//                   (category) => (
//                     <ExerciseCategoryCard
//                       key={category.name}
//                       {...category}
//                       onClick={() =>
//                         navigate(
//                           "/workouts/library"
//                         )
//                       }
//                     />
//                   )
//                 )}
//               </SimpleGrid>
//             </Box>
//           </Box>
//         )}
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
  FiCheck,
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

const DAY_KEYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CATEGORY_META = [
  { name: "Chest", icon: FiHeart, description: "Press, push and build upper-body strength." },
  { name: "Shoulders", icon: FiTarget, description: "Build control, stability and strength." },
  { name: "Back", icon: FiLayers, description: "Pull, row and strengthen your back." },
  { name: "Biceps", icon: FiTrendingUp, description: "Focused arm strength and controlled reps." },
  { name: "Triceps", icon: FiZap, description: "Build pressing power and arm strength." },
  { name: "Legs", icon: FiActivity, description: "Train quads, hamstrings and glutes." },
  { name: "Core", icon: FiShield, description: "Build stability, control and balance." },
  { name: "Cardio", icon: FiActivity, description: "Improve endurance and cardiovascular fitness." },
];

const toDateOnly = (value?: string | null) => {
  if (!value) return null;
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return null;
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

const isInDateRange = (assignment: ClientWorkoutAssignment) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = toDateOnly(assignment.start_date);
  const end = toDateOnly(assignment.end_date);

  if (!start) return false;
  if (end) end.setHours(23, 59, 59, 999);

  return today >= start && (!end || today <= end);
};

const scheduledToday = (assignment: ClientWorkoutAssignment) => {
  const days = Array.isArray(assignment.scheduled_days)
    ? assignment.scheduled_days
    : [];
  return days.includes(DAY_KEYS[new Date().getDay()]);
};

const CategoryTile = ({
  item,
  onClick,
}: {
  item: (typeof CATEGORY_META)[number];
  onClick: () => void;
}) => (
  <Box
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
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
    transition="all 180ms ease"
    _hover={{
      transform: "translateY(-3px)",
      borderColor: "blue.100",
      boxShadow: "0 18px 42px rgba(15,23,42,0.07)",
    }}
    _focusVisible={{
      outline: "2px solid",
      outlineColor: "blue.300",
      outlineOffset: "2px",
    }}
  >
    <Flex
      w="44px"
      h="44px"
      align="center"
      justify="center"
      borderRadius="14px"
      bg="gray.50"
      color="gray.700"
    >
      <Icon as={item.icon} boxSize={5} />
    </Flex>

    <Flex mt={5} align="flex-start" justify="space-between" gap={4}>
      <Box>
        <Text fontWeight="750" color="gray.900">
          {item.name}
        </Text>
        <Text mt={1} fontSize="xs" lineHeight="1.65" color="gray.500">
          {item.description}
        </Text>
      </Box>
      <Icon as={FiArrowRight} color="gray.300" mt={1} />
    </Flex>
  </Box>
);

const WorkoutCard = ({
  assignment,
  activeSessionAssignmentId,
  featured = false,
}: {
  assignment: ClientWorkoutAssignment;
  activeSessionAssignmentId: number | null;
  featured?: boolean;
}) => {
  const navigate = useNavigate();
  const resume = activeSessionAssignmentId === Number(assignment.id);
  const today = scheduledToday(assignment);

  return (
    <Box
      bg={featured ? "gray.900" : "white"}
      color={featured ? "white" : "gray.800"}
      borderRadius={featured ? "3xl" : "2xl"}
      border="1px solid"
      borderColor={featured ? "whiteAlpha.100" : today ? "blue.100" : "gray.100"}
      overflow="hidden"
      boxShadow={featured ? "0 24px 70px rgba(15,23,42,0.16)" : "0 12px 36px rgba(15,23,42,0.05)"}
      transition="all 180ms ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: featured
          ? "0 28px 80px rgba(15,23,42,0.20)"
          : "0 18px 45px rgba(15,23,42,0.08)",
      }}
    >
      <Box p={{ base: 6, md: featured ? 8 : 6 }}>
        <Flex justify="space-between" gap={5} align="flex-start">
          <Box minW={0}>
            <HStack spacing={2} flexWrap="wrap" mb={3}>
              <Badge
                bg={featured ? "whiteAlpha.100" : today ? "blue.50" : "gray.100"}
                color={featured ? "whiteAlpha.800" : today ? "blue.600" : "gray.600"}
                borderRadius="full"
                px={3}
                py={1.5}
                fontSize="10px"
                letterSpacing="0.06em"
              >
                {today ? "TODAY" : "ACTIVE PLAN"}
              </Badge>
              {assignment.primary_muscle_group ? (
                <Badge
                  bg={featured ? "whiteAlpha.100" : "gray.100"}
                  color={featured ? "whiteAlpha.800" : "gray.600"}
                  borderRadius="full"
                  px={3}
                  py={1.5}
                  fontSize="10px"
                >
                  {assignment.primary_muscle_group}
                </Badge>
              ) : null}
            </HStack>

            <Heading
              size={{ base: featured ? "lg" : "md", md: featured ? "xl" : "lg" }}
              letterSpacing="-0.035em"
              color={featured ? "white" : "gray.900"}
            >
              {assignment.workout_name}
            </Heading>

            <Text
              mt={2}
              color={featured ? "whiteAlpha.650" : "gray.400"}
              fontSize="sm"
            >
              {assignment.organization_name || "NEKA Training"}
              {assignment.trainer_name ? ` · ${assignment.trainer_name}` : ""}
            </Text>
          </Box>

          <Flex
            w="42px"
            h="42px"
            align="center"
            justify="center"
            borderRadius="full"
            bg={featured ? "whiteAlpha.100" : "gray.50"}
            color={featured ? "white" : "gray.500"}
            flexShrink={0}
          >
            <Icon as={resume ? FiActivity : FiArrowRight} boxSize={5} />
          </Flex>
        </Flex>

        {assignment.workout_description ? (
          <Text
            mt={5}
            color={featured ? "whiteAlpha.700" : "gray.500"}
            fontSize="sm"
            lineHeight="1.8"
            maxW="720px"
            noOfLines={2}
          >
            {assignment.workout_description}
          </Text>
        ) : null}

        <Box mt={6}>
          <WorkoutMeta
            duration={assignment.estimated_duration_minutes}
            exerciseCount={assignment.exercise_count}
            goal={assignment.training_goal_name || assignment.goal_type}
          />
        </Box>

        <Divider my={6} borderColor={featured ? "whiteAlpha.100" : "gray.100"} />

        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <VStack align="flex-start" spacing={1.5}>
            <HStack
              fontSize="xs"
              color={featured ? "whiteAlpha.650" : "gray.500"}
            >
              <Icon as={FiCalendar} />
              <Text>
                {formatDate(assignment.start_date)}
                {assignment.end_date ? ` → ${formatDate(assignment.end_date)}` : ""}
              </Text>
            </HStack>

            <HStack
              fontSize="xs"
              color={featured ? "whiteAlpha.650" : "gray.500"}
            >
              <Icon as={FiClock} />
              <Text>
                {assignment.scheduled_days?.length
                  ? assignment.scheduled_days.join(" · ")
                  : "Flexible schedule"}
              </Text>
            </HStack>
          </VStack>

          <Button
            onClick={() => navigate(`/workouts/${assignment.id}`)}
            colorScheme={featured ? "blue" : "blue"}
            borderRadius="xl"
            w={{ base: "100%", md: "auto" }}
            size={featured ? "lg" : "md"}
          >
            {resume ? "Resume Workout" : today ? "View Today's Workout" : "View Workout"}
          </Button>
        </Flex>
      </Box>
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

      setAssignments(Array.isArray(data) ? data : []);
      setActiveSessionAssignmentId(
        activeSession?.workout_assignment_id
          ? Number(activeSession.workout_assignment_id)
          : null
      );
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Unable to load your workouts",
        description:
          error?.response?.data?.error ??
          error?.message ??
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
    void load();
    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeAssignments = useMemo(
    () =>
      assignments.filter(
        (item) =>
          String(item.status).toUpperCase() === "ACTIVE" &&
          isInDateRange(item)
      ),
    [assignments]
  );

  const todayAssignments = useMemo(
    () => activeAssignments.filter(scheduledToday),
    [activeAssignments]
  );

  const planAssignments = useMemo(
    () => activeAssignments.filter((item) => !scheduledToday(item)),
    [activeAssignments]
  );

  const remainingTodayAssignments = useMemo(
    () => todayAssignments.filter((item) => Number(item.id) !== Number(todayAssignments[0]?.id)),
    [todayAssignments]
  );

  const featured = todayAssignments[0] ?? activeAssignments[0] ?? null;

  if (loading) {
    return (
      <Center minH="70vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="3px" color="blue.400" />
          <Text fontSize="sm" color="gray.500">Loading your training space…</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="#f7f8fa" px={{ base: 4, md: 7, lg: 9 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1180px" mx="auto">
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={5}
          mb={9}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Text
              fontSize="10px"
              fontWeight="800"
              letterSpacing="0.13em"
              color="blue.500"
            >
              MY WORKOUTS
            </Text>
            <Heading
              mt={3}
              size={{ base: "xl", md: "2xl" }}
              letterSpacing="-0.045em"
              color="gray.900"
            >
              Your training, ready when you are.
            </Heading>
            <Text mt={3} color="gray.500" maxW="680px" lineHeight="1.8" fontSize="sm">
              Your assigned training lives here. Explore the movement library anytime between sessions.
            </Text>
          </Box>

          <HStack spacing={2}>
            <Button
              variant="ghost"
              leftIcon={<FiRefreshCw />}
              borderRadius="xl"
              onClick={load}
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              borderRadius="xl"
              onClick={() => navigate("/workouts/library")}
            >
              Exercise Library
            </Button>
          </HStack>
        </Flex>

        {activeSessionAssignmentId ? (
          <Box
            mb={8}
            px={{ base: 5, md: 6 }}
            py={4}
            bg="white"
            border="1px solid"
            borderColor="blue.100"
            borderRadius="2xl"
            boxShadow="0 10px 30px rgba(37,99,235,0.05)"
          >
            <Flex
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={4}
              direction={{ base: "column", md: "row" }}
            >
              <HStack spacing={3}>
                <Flex
                  w="38px"
                  h="38px"
                  align="center"
                  justify="center"
                  borderRadius="full"
                  bg="blue.50"
                  color="blue.500"
                >
                  <Icon as={FiActivity} />
                </Flex>
                <Box>
                  <Text fontWeight="750" color="gray.900" fontSize="sm">
                    Workout in progress
                  </Text>
                  <Text mt={0.5} fontSize="xs" color="gray.500">
                    Continue where you left off.
                  </Text>
                </Box>
              </HStack>
              <Button
                size="sm"
                colorScheme="blue"
                borderRadius="xl"
                onClick={() => navigate(`/workouts/${activeSessionAssignmentId}/session`)}
              >
                Resume
              </Button>
            </Flex>
          </Box>
        ) : null}

        {featured ? (
          <Box mb={10}>
            <Flex align="center" justify="space-between" mb={4}>
              <Box>
                <Text fontSize="10px" fontWeight="800" letterSpacing="0.12em" color="gray.400">
                  {todayAssignments.length ? "TODAY" : "YOUR PLAN"}
                </Text>
                <Heading mt={1.5} size="md" color="gray.900">
                  {todayAssignments.length ? "Today's training" : "Your active plan"}
                </Heading>
              </Box>
              <Text fontSize="xs" color="gray.400">
                {activeAssignments.length} active {activeAssignments.length === 1 ? "workout" : "workouts"}
              </Text>
            </Flex>

            <WorkoutCard
              assignment={featured}
              activeSessionAssignmentId={activeSessionAssignmentId}
              featured
            />
          </Box>
        ) : (
          <Box
            bg="gray.900"
            color="white"
            borderRadius="3xl"
            px={{ base: 6, md: 10 }}
            py={{ base: 9, md: 12 }}
            mb={10}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              w="260px"
              h="260px"
              borderRadius="full"
              bg="blue.500"
              filter="blur(90px)"
              opacity={0.22}
              right="-80px"
              top="-90px"
            />
            <Box position="relative" zIndex={1} maxW="700px">
              <Text fontSize="10px" fontWeight="800" letterSpacing="0.13em" color="whiteAlpha.600">
                BEGIN ANYWHERE
              </Text>
              <Heading mt={3} size={{ base: "lg", md: "2xl" }} letterSpacing="-0.04em">
                Build your movement library.
              </Heading>
              <Text mt={3} color="whiteAlpha.700" fontSize="sm" lineHeight="1.8" maxW="620px">
                No assigned workout today. Browse NEKA's exercise library, learn the movement, and get familiar with your training options.
              </Text>
              <Button
                mt={7}
                colorScheme="blue"
                borderRadius="xl"
                rightIcon={<FiArrowRight />}
                onClick={() => navigate("/workouts/library")}
              >
                Explore Exercise Library
              </Button>
            </Box>
          </Box>
        )}

        {remainingTodayAssignments.length > 0 ? (
          <Box mb={12}>
            <Flex align="center" justify="space-between" mb={5}>
              <Box>
                <Text fontSize="10px" fontWeight="800" letterSpacing="0.12em" color="gray.400">
                  TODAY
                </Text>
                <Heading mt={1.5} size="md" color="gray.900">
                  More scheduled today
                </Heading>
              </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
              {remainingTodayAssignments.map((assignment) => (
                <WorkoutCard
                  key={assignment.id}
                  assignment={assignment}
                  activeSessionAssignmentId={activeSessionAssignmentId}
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}

        {planAssignments.length > 0 ? (
          <Box mb={12}>
            <Flex align="center" justify="space-between" mb={5}>
              <Box>
                <Text fontSize="10px" fontWeight="800" letterSpacing="0.12em" color="gray.400">
                  UPCOMING
                </Text>
                <Heading mt={1.5} size="md" color="gray.900">
                  Your active plan
                </Heading>
              </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
              {planAssignments
                .filter((item) => Number(item.id) !== Number(featured?.id))
                .map((assignment) => (
                  <WorkoutCard
                    key={assignment.id}
                    assignment={assignment}
                    activeSessionAssignmentId={activeSessionAssignmentId}
                  />
                ))}
            </SimpleGrid>
          </Box>
        ) : null}

        <Box>
          <Flex align={{ base: "flex-start", md: "center" }} justify="space-between" gap={4} mb={5}>
            <Box>
              <Text fontSize="10px" fontWeight="800" letterSpacing="0.12em" color="gray.400">
                DISCOVER
              </Text>
              <Heading mt={1.5} size="md" color="gray.900">
                Explore by training focus
              </Heading>
              <Text mt={1.5} color="gray.500" fontSize="sm">
                Learn movements outside your assigned plan.
              </Text>
            </Box>
            <Button
              variant="ghost"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={() => navigate("/workouts/library")}
            >
              View library
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {CATEGORY_META.map((item) => (
              <CategoryTile
                key={item.name}
                item={item}
                onClick={() => navigate(`/workouts/library?muscle=${encodeURIComponent(item.name)}`)}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default MyWorkoutsPage;

