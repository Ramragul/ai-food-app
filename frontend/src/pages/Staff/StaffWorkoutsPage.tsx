//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   Grid,
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
//   FiBarChart2,
//   FiClipboard,
//   FiClock,
//   FiLayers,
//   FiPlus,
//   FiUsers,
// } from "react-icons/fi";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   getWorkoutTemplates,
//   getWorkoutWorkspace,
// } from "../../services/workout.service";

// import type {
//   WorkoutTemplateListItem,
//   WorkoutWorkspace,
// } from "../../types/workout.types";

// import WorkoutTemplateCard from "../../components/StaffUI/Workouts/WorkoutTemplateCard";


// /* =========================================================
//    SMALL UI CARD
// ========================================================= */

// interface QuickActionCardProps {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   buttonLabel: string;
//   onClick: () => void;
//   disabled?: boolean;
// }

// const QuickActionCard = ({
//   icon,
//   title,
//   description,
//   buttonLabel,
//   onClick,
//   disabled,
// }: QuickActionCardProps) => {
//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={6}
//       boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
//       transition="all 0.2s ease"
//       _hover={{
//         transform: disabled ? undefined : "translateY(-2px)",
//         boxShadow: disabled
//           ? "0 8px 30px rgba(15, 23, 42, 0.04)"
//           : "0 14px 36px rgba(15, 23, 42, 0.08)",
//       }}
//     >
//       <VStack
//         align="stretch"
//         spacing={5}
//       >
//         <Flex
//           w="46px"
//           h="46px"
//           align="center"
//           justify="center"
//           borderRadius="xl"
//           bg="blue.50"
//           color="blue.500"
//         >
//           <Icon
//             as={icon}
//             boxSize={5}
//           />
//         </Flex>

//         <Box>
//           <Heading
//             size="sm"
//             color="gray.800"
//             mb={2}
//           >
//             {title}
//           </Heading>

//           <Text
//             fontSize="sm"
//             lineHeight="1.7"
//             color="gray.500"
//           >
//             {description}
//           </Text>
//         </Box>

//         <Button
//           alignSelf="flex-start"
//           size="sm"
//           variant="ghost"
//           colorScheme="blue"
//           rightIcon={
//             <FiArrowRight />
//           }
//           onClick={onClick}
//           isDisabled={disabled}
//         >
//           {buttonLabel}
//         </Button>
//       </VStack>
//     </Box>
//   );
// };


// /* =========================================================
//    STAT CARD
// ========================================================= */

// interface WorkoutStatCardProps {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   helper?: string;
// }

// const WorkoutStatCard = ({
//   icon,
//   label,
//   value,
//   helper,
// }: WorkoutStatCardProps) => {
//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={5}
//       boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//     >
//       <Flex
//         align="center"
//         justify="space-between"
//         mb={4}
//       >
//         <Box>
//           <Text
//             fontSize="xs"
//             fontWeight="600"
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="0.07em"
//           >
//             {label}
//           </Text>

//           <Heading
//             size="lg"
//             mt={1}
//             color="gray.800"
//           >
//             {value}
//           </Heading>
//         </Box>

//         <Flex
//           w="42px"
//           h="42px"
//           align="center"
//           justify="center"
//           borderRadius="xl"
//           bg="blue.50"
//           color="blue.500"
//         >
//           <Icon
//             as={icon}
//             boxSize={5}
//           />
//         </Flex>
//       </Flex>

//       {helper && (
//         <Text
//           fontSize="xs"
//           color="gray.400"
//         >
//           {helper}
//         </Text>
//       )}
//     </Box>
//   );
// };


// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// const StaffWorkoutsPage = () => {

//   const navigate = useNavigate();

//   const toast = useToast();


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     workspace,
//     setWorkspace,
//   ] = useState<WorkoutWorkspace | null>(
//     null
//   );


//   const [
//     templates,
//     setTemplates,
//   ] = useState<WorkoutTemplateListItem[]>(
//     []
//   );


//   /* -------------------------------------------------------
//      LOAD WORKOUT WORKSPACE
//   ------------------------------------------------------- */

//   const loadWorkoutWorkspace =
//     useCallback(async () => {

//       try {

//         setLoading(true);

//         const activeWorkspace =
//           await getWorkoutWorkspace();

//         setWorkspace(
//           activeWorkspace
//         );


//         const organizationId =
//           Number(
//             activeWorkspace?.organization?.id
//           );


//         if (
//           !organizationId ||
//           organizationId <= 0
//         ) {
//           throw new Error(
//             "Active organization could not be resolved."
//           );
//         }


//         const workoutTemplates =
//           await getWorkoutTemplates(
//             organizationId
//           );


//         setTemplates(
//           Array.isArray(workoutTemplates)
//             ? workoutTemplates
//             : []
//         );

//       } catch (error: any) {

//         console.error(
//           "Failed to load workout workspace:",
//           error
//         );

//         toast({
//           title:
//             "Unable to load workouts",
//           description:
//             error?.response?.data?.error ??
//             error?.response?.data?.message ??
//             error?.message ??
//             "Please try again.",
//           status: "error",
//           duration: 3500,
//           isClosable: true,
//         });

//       } finally {

//         setLoading(false);

//       }

//     }, [toast]);


//   /* -------------------------------------------------------
//      INITIAL LOAD
//   ------------------------------------------------------- */

//   useEffect(() => {

//     loadWorkoutWorkspace();

//   }, [loadWorkoutWorkspace]);


//   /* -------------------------------------------------------
//      DERIVED DATA
//   ------------------------------------------------------- */

//   const activeTemplateCount =
//     useMemo(() => {

//       return templates.filter(
//         (template) =>
//           template.is_active !== false
//       ).length;

//     }, [templates]);


//   const totalExercises =
//     useMemo(() => {

//       return templates.reduce(
//         (
//           total,
//           template
//         ) =>
//           total +
//           Number(
//             template.exercise_count ?? 0
//           ),
//         0
//       );

//     }, [templates]);


//   const averageDuration =
//     useMemo(() => {

//       if (!templates.length) {
//         return 0;
//       }

//       const totalDuration =
//         templates.reduce(
//           (
//             total,
//             template
//           ) =>
//             total +
//             Number(
//               template.estimated_duration_minutes ??
//               0
//             ),
//           0
//         );

//       return Math.round(
//         totalDuration /
//         templates.length
//       );

//     }, [templates]);


//   /* -------------------------------------------------------
//      LOADING
//   ------------------------------------------------------- */

//   if (loading) {

//     return (
//       <Flex
//         minH="60vh"
//         align="center"
//         justify="center"
//       >
//         <VStack spacing={4}>
//           <Spinner
//             size="xl"
//             thickness="3px"
//             color="blue.400"
//           />

//           <Text
//             fontSize="sm"
//             color="gray.500"
//           >
//             Loading workout workspace...
//           </Text>
//         </VStack>
//       </Flex>
//     );

//   }


//   /* -------------------------------------------------------
//      PAGE
//   ------------------------------------------------------- */

//   return (
//     <Box
//       maxW="1600px"
//       mx="auto"
//       px={{
//         base: 4,
//         md: 6,
//         xl: 8,
//       }}
//       py={{
//         base: 5,
//         md: 8,
//       }}
//     >

//       {/* ===================================================
//           PAGE HEADER
//       =================================================== */}

//       <Flex
//         direction={{
//           base: "column",
//           lg: "row",
//         }}
//         align={{
//           base: "stretch",
//           lg: "center",
//         }}
//         justify="space-between"
//         gap={5}
//         mb={8}
//       >

//         <Box>

//           <HStack
//             spacing={2}
//             mb={2}
//           >
//             <Badge
//               colorScheme="blue"
//               borderRadius="full"
//               px={3}
//               py={1}
//               fontSize="10px"
//               letterSpacing="0.05em"
//             >
//               WORKOUTS
//             </Badge>

//             {workspace?.viewer_role && (
//               <Text
//                 fontSize="xs"
//                 color="gray.400"
//                 fontWeight="500"
//               >
//                 {workspace.viewer_role}
//               </Text>
//             )}
//           </HStack>


//           <Heading
//             size={{
//               base: "lg",
//               md: "xl",
//             }}
//             color="gray.800"
//             letterSpacing="-0.02em"
//           >
//             Training Workspace
//           </Heading>


//           <Text
//             mt={2}
//             maxW="680px"
//             color="gray.500"
//             fontSize={{
//               base: "sm",
//               md: "md",
//             }}
//             lineHeight="1.7"
//           >
//             Build structured workouts, organize exercises,
//             and prepare training plans for your clients.
//           </Text>

//         </Box>


//         <Button
//           colorScheme="blue"
//           size="md"
//           borderRadius="xl"
//           px={6}
//           leftIcon={
//             <FiPlus />
//           }
//           boxShadow="0 8px 20px rgba(66, 153, 225, 0.20)"
//           onClick={() =>
//             navigate(
//               "/staff/workouts/templates/new"
//             )
//           }
//         >
//           Create Workout
//         </Button>

//       </Flex>


//       {/* ===================================================
//           ORGANIZATION CONTEXT
//       =================================================== */}

//       {workspace?.organization && (
//         <Box
//           mb={7}
//           px={5}
//           py={4}
//           bg="blue.50"
//           border="1px solid"
//           borderColor="blue.100"
//           borderRadius="2xl"
//         >
//           <Flex
//             align={{
//               base: "flex-start",
//               md: "center",
//             }}
//             justify="space-between"
//             direction={{
//               base: "column",
//               md: "row",
//             }}
//             gap={2}
//           >

//             <Box>

//               <Text
//                 fontSize="xs"
//                 fontWeight="600"
//                 textTransform="uppercase"
//                 letterSpacing="0.06em"
//                 color="blue.500"
//               >
//                 Active Workspace
//               </Text>

//               <Text
//                 mt={1}
//                 fontWeight="600"
//                 color="gray.800"
//               >
//                 {workspace.organization.name}
//               </Text>

//             </Box>


//             {workspace.organization.workspace_code && (
//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >
//                 Workspace:{" "}
//                 <Text
//                   as="span"
//                   fontWeight="600"
//                   color="gray.700"
//                 >
//                   {
//                     workspace.organization
//                       .workspace_code
//                   }
//                 </Text>
//               </Text>
//             )}

//           </Flex>
//         </Box>
//       )}


//       {/* ===================================================
//           WORKOUT STATS
//       =================================================== */}

//       <SimpleGrid
//         columns={{
//           base: 1,
//           sm: 2,
//           xl: 4,
//         }}
//         spacing={5}
//         mb={10}
//       >

//         <WorkoutStatCard
//           icon={FiLayers}
//           label="Templates"
//           value={activeTemplateCount}
//           helper="Active workout templates"
//         />

//         <WorkoutStatCard
//           icon={FiActivity}
//           label="Exercises"
//           value={totalExercises}
//           helper="Exercises across templates"
//         />

//         <WorkoutStatCard
//           icon={FiClock}
//           label="Avg Duration"
//           value={
//             averageDuration
//               ? `${averageDuration} min`
//               : "—"
//           }
//           helper="Estimated session duration"
//         />

//         <WorkoutStatCard
//           icon={FiUsers}
//           label="Assignments"
//           value="Coming next"
//           helper="Trainer → client scheduling"
//         />

//       </SimpleGrid>


//       {/* ===================================================
//           PRIMARY WORKFLOW
//       =================================================== */}

//       <Box mb={10}>

//         <Box mb={5}>

//           <Heading
//             size="md"
//             color="gray.800"
//           >
//             Training workflow
//           </Heading>

//           <Text
//             mt={1}
//             fontSize="sm"
//             color="gray.500"
//           >
//             Everything a trainer needs to prepare and
//             manage structured training.
//           </Text>

//         </Box>


//         <Grid
//           templateColumns={{
//             base: "1fr",
//             lg: "repeat(3, 1fr)",
//           }}
//           gap={5}
//         >

//           <QuickActionCard
//             icon={FiClipboard}
//             title="Workout Templates"
//             description="Create reusable training programs with exercise order, targets, rest periods and training goals."
//             buttonLabel="Manage Templates"
//             onClick={() =>
//               document
//                 .getElementById(
//                   "workout-templates"
//                 )
//                 ?.scrollIntoView({
//                   behavior: "smooth",
//                 })
//             }
//           />


//           <QuickActionCard
//             icon={FiActivity}
//             title="Exercise Library"
//             description="Browse the NEKA exercise catalogue by muscle group, environment and tracking type."
//             buttonLabel="Open Exercise Library"
//             onClick={() =>
//               toast({
//                 title:
//                   "Exercise Library",
//                 description:
//                   "The exercise library UI is the next module we will connect here.",
//                 status: "info",
//                 duration: 2500,
//                 isClosable: true,
//               })
//             }
//           />


//           <QuickActionCard
//             icon={FiBarChart2}
//             title="Assignments & Progress"
//             description="Assign workouts to clients and later review completed sessions, volume, consistency and progress."
//             buttonLabel="Coming next"
//             disabled
//             onClick={() => {}}
//           />

//         </Grid>

//       </Box>


//       {/* ===================================================
//           TEMPLATES
//       =================================================== */}

//       <Box
//         id="workout-templates"
//       >

//         <Flex
//           align={{
//             base: "flex-start",
//             md: "center",
//           }}
//           justify="space-between"
//           direction={{
//             base: "column",
//             md: "row",
//           }}
//           gap={3}
//           mb={5}
//         >

//           <Box>

//             <Heading
//               size="md"
//               color="gray.800"
//             >
//               Your workout templates
//             </Heading>

//             <Text
//               mt={1}
//               fontSize="sm"
//               color="gray.500"
//             >
//               Reusable programs created for your workspace.
//             </Text>

//           </Box>


//           <Button
//             variant="ghost"
//             size="sm"
//             colorScheme="blue"
//             rightIcon={
//               <FiArrowRight />
//             }
//             onClick={() =>
//               navigate(
//                 "/staff/workouts/templates"
//               )
//             }
//           >
//             View all
//           </Button>

//         </Flex>


//         {templates.length === 0 ? (

//           /* -------------------------------------------------
//              EMPTY STATE
//           ------------------------------------------------- */

//           <Box
//             bg="white"
//             border="1px dashed"
//             borderColor="blue.200"
//             borderRadius="2xl"
//             px={6}
//             py={{
//               base: 10,
//               md: 14,
//             }}
//             textAlign="center"
//           >

//             <Flex
//               mx="auto"
//               mb={5}
//               w="58px"
//               h="58px"
//               align="center"
//               justify="center"
//               borderRadius="2xl"
//               bg="blue.50"
//               color="blue.500"
//             >
//               <Icon
//                 as={FiClipboard}
//                 boxSize={6}
//               />
//             </Flex>


//             <Heading
//               size="sm"
//               color="gray.800"
//             >
//               No workout templates yet
//             </Heading>


//             <Text
//               mt={2}
//               maxW="500px"
//               mx="auto"
//               fontSize="sm"
//               color="gray.500"
//               lineHeight="1.7"
//             >
//               Start by creating your first structured
//               workout. You can then add exercises,
//               targets and rest periods.
//             </Text>


//             <Button
//               mt={6}
//               colorScheme="blue"
//               borderRadius="xl"
//               leftIcon={
//                 <FiPlus />
//               }
//               onClick={() =>
//                 navigate(
//                   "/staff/workouts/templates/new"
//                 )
//               }
//             >
//               Create First Workout
//             </Button>

//           </Box>

//         ) : (

//           /* -------------------------------------------------
//              TEMPLATE PREVIEW GRID
//           ------------------------------------------------- */

//           <SimpleGrid
//             columns={{
//               base: 1,
//               md: 2,
//               xl: 3,
//             }}
//             spacing={5}
//           >

        


//             {templates.map((template) => (
//   <WorkoutTemplateCard
//     key={template.id}
//     template={template}
//     onOpen={() =>
//       navigate(`/staff/workouts/templates/${template.id}`)
//     }
//     onEdit={() =>
//       navigate(`/staff/workouts/templates/${template.id}`)
//     }
//   />
// ))}
            

//           </SimpleGrid>

//         )}

//       </Box>

//     </Box>
//   );
// };


// export default StaffWorkoutsPage;


// Version 2

// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   Grid,
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
//   FiBarChart2,
//   FiClipboard,
//   FiClock,
//   FiLayers,
//   FiPlus,
//   FiUsers,
// } from "react-icons/fi";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   getWorkoutTemplates,
//   getWorkoutWorkspace,
// } from "../../services/workout.service";

// import type {
//   WorkoutTemplateListItem,
//   WorkoutWorkspace,
// } from "../../types/workout.types";

// import WorkoutTemplateCard from "../../components/StaffUI/Workouts/WorkoutTemplateCard";

// import WorkoutAssignmentDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentDrawer";


// /* =========================================================
//    SMALL UI CARD
// ========================================================= */

// interface QuickActionCardProps {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   buttonLabel: string;
//   onClick: () => void;
//   disabled?: boolean;
// }

// const QuickActionCard = ({
//   icon,
//   title,
//   description,
//   buttonLabel,
//   onClick,
//   disabled,
// }: QuickActionCardProps) => {
//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={6}
//       boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
//       transition="all 0.2s ease"
//       _hover={{
//         transform: disabled
//           ? undefined
//           : "translateY(-2px)",
//         boxShadow: disabled
//           ? "0 8px 30px rgba(15, 23, 42, 0.04)"
//           : "0 14px 36px rgba(15, 23, 42, 0.08)",
//       }}
//     >
//       <VStack
//         align="stretch"
//         spacing={5}
//       >
//         <Flex
//           w="46px"
//           h="46px"
//           align="center"
//           justify="center"
//           borderRadius="xl"
//           bg="blue.50"
//           color="blue.500"
//         >
//           <Icon
//             as={icon}
//             boxSize={5}
//           />
//         </Flex>

//         <Box>
//           <Heading
//             size="sm"
//             color="gray.800"
//             mb={2}
//           >
//             {title}
//           </Heading>

//           <Text
//             fontSize="sm"
//             lineHeight="1.7"
//             color="gray.500"
//           >
//             {description}
//           </Text>
//         </Box>

//         <Button
//           alignSelf="flex-start"
//           size="sm"
//           variant="ghost"
//           colorScheme="blue"
//           rightIcon={
//             <FiArrowRight />
//           }
//           onClick={onClick}
//           isDisabled={disabled}
//         >
//           {buttonLabel}
//         </Button>
//       </VStack>
//     </Box>
//   );
// };


// /* =========================================================
//    STAT CARD
// ========================================================= */

// interface WorkoutStatCardProps {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   helper?: string;
// }

// const WorkoutStatCard = ({
//   icon,
//   label,
//   value,
//   helper,
// }: WorkoutStatCardProps) => {
//   return (
//     <Box
//       bg="white"
//       border="1px solid"
//       borderColor="gray.100"
//       borderRadius="2xl"
//       p={5}
//       boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//     >
//       <Flex
//         align="center"
//         justify="space-between"
//         mb={4}
//       >
//         <Box>
//           <Text
//             fontSize="xs"
//             fontWeight="600"
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="0.07em"
//           >
//             {label}
//           </Text>

//           <Heading
//             size="lg"
//             mt={1}
//             color="gray.800"
//           >
//             {value}
//           </Heading>
//         </Box>

//         <Flex
//           w="42px"
//           h="42px"
//           align="center"
//           justify="center"
//           borderRadius="xl"
//           bg="blue.50"
//           color="blue.500"
//         >
//           <Icon
//             as={icon}
//             boxSize={5}
//           />
//         </Flex>
//       </Flex>

//       {helper && (
//         <Text
//           fontSize="xs"
//           color="gray.400"
//         >
//           {helper}
//         </Text>
//       )}
//     </Box>
//   );
// };


// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// const StaffWorkoutsPage = () => {
//   const navigate = useNavigate();

//   const toast = useToast();


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     workspace,
//     setWorkspace,
//   ] = useState<WorkoutWorkspace | null>(
//     null
//   );


//   const [
//     templates,
//     setTemplates,
//   ] = useState<WorkoutTemplateListItem[]>(
//     []
//   );


//   /* -------------------------------------------------------
//      ASSIGNMENT DRAWER STATE
//   ------------------------------------------------------- */

//   const [
//     assignmentTemplate,
//     setAssignmentTemplate,
//   ] = useState<WorkoutTemplateListItem | null>(
//     null
//   );


//   /* -------------------------------------------------------
//      LOAD WORKOUT WORKSPACE
//   ------------------------------------------------------- */

//   const loadWorkoutWorkspace =
//     useCallback(async () => {
//       try {
//         setLoading(true);

//         const activeWorkspace =
//           await getWorkoutWorkspace();

//         setWorkspace(
//           activeWorkspace
//         );


//         const organizationId =
//           Number(
//             activeWorkspace?.organization?.id
//           );


//         if (
//           !organizationId ||
//           organizationId <= 0
//         ) {
//           throw new Error(
//             "Active organization could not be resolved."
//           );
//         }


//         const workoutTemplates =
//           await getWorkoutTemplates(
//             organizationId
//           );


//         setTemplates(
//           Array.isArray(workoutTemplates)
//             ? workoutTemplates
//             : []
//         );

//       } catch (error: any) {
//         console.error(
//           "Failed to load workout workspace:",
//           error
//         );

//         toast({
//           title:
//             "Unable to load workouts",
//           description:
//             error?.response?.data?.error ??
//             error?.response?.data?.message ??
//             error?.message ??
//             "Please try again.",
//           status: "error",
//           duration: 3500,
//           isClosable: true,
//         });

//       } finally {
//         setLoading(false);
//       }
//     }, [toast]);


//   /* -------------------------------------------------------
//      INITIAL LOAD
//   ------------------------------------------------------- */

//   useEffect(() => {
//     loadWorkoutWorkspace();
//   }, [loadWorkoutWorkspace]);


//   /* -------------------------------------------------------
//      DERIVED DATA
//   ------------------------------------------------------- */

//   const activeTemplateCount =
//     useMemo(() => {
//       return templates.filter(
//         (template) =>
//           template.is_active !== false
//       ).length;
//     }, [templates]);


//   const totalExercises =
//     useMemo(() => {
//       return templates.reduce(
//         (
//           total,
//           template
//         ) =>
//           total +
//           Number(
//             template.exercise_count ?? 0
//           ),
//         0
//       );
//     }, [templates]);


//   const averageDuration =
//     useMemo(() => {
//       if (!templates.length) {
//         return 0;
//       }

//       const totalDuration =
//         templates.reduce(
//           (
//             total,
//             template
//           ) =>
//             total +
//             Number(
//               template.estimated_duration_minutes ??
//                 0
//             ),
//           0
//         );

//       return Math.round(
//         totalDuration /
//         templates.length
//       );
//     }, [templates]);


//   /* -------------------------------------------------------
//      ASSIGNMENT HANDLERS
//   ------------------------------------------------------- */

//   const openAssignmentDrawer =
//     useCallback(
//       (
//         template: WorkoutTemplateListItem
//       ) => {
//         setAssignmentTemplate(
//           template
//         );
//       },
//       []
//     );


//   const closeAssignmentDrawer =
//     useCallback(() => {
//       setAssignmentTemplate(null);
//     }, []);


//   /* -------------------------------------------------------
//      LOADING
//   ------------------------------------------------------- */

//   if (loading) {
//     return (
//       <Flex
//         minH="60vh"
//         align="center"
//         justify="center"
//       >
//         <VStack spacing={4}>
//           <Spinner
//             size="xl"
//             thickness="3px"
//             color="blue.400"
//           />

//           <Text
//             fontSize="sm"
//             color="gray.500"
//           >
//             Loading workout workspace...
//           </Text>
//         </VStack>
//       </Flex>
//     );
//   }


//   /* -------------------------------------------------------
//      ORGANIZATION ID
//   ------------------------------------------------------- */

//   const organizationId =
//     Number(
//       workspace?.organization?.id
//     );


//   /* -------------------------------------------------------
//      PAGE
//   ------------------------------------------------------- */

//   return (
//     <>
//       <Box
//         maxW="1600px"
//         mx="auto"
//         px={{
//           base: 4,
//           md: 6,
//           xl: 8,
//         }}
//         py={{
//           base: 5,
//           md: 8,
//         }}
//       >

//         {/* ===================================================
//             PAGE HEADER
//         =================================================== */}

//         <Flex
//           direction={{
//             base: "column",
//             lg: "row",
//           }}
//           align={{
//             base: "stretch",
//             lg: "center",
//           }}
//           justify="space-between"
//           gap={5}
//           mb={8}
//         >
//           <Box>
//             <HStack
//               spacing={2}
//               mb={2}
//             >
//               <Badge
//                 colorScheme="blue"
//                 borderRadius="full"
//                 px={3}
//                 py={1}
//                 fontSize="10px"
//                 letterSpacing="0.05em"
//               >
//                 WORKOUTS
//               </Badge>

//               {workspace?.viewer_role && (
//                 <Text
//                   fontSize="xs"
//                   color="gray.400"
//                   fontWeight="500"
//                 >
//                   {workspace.viewer_role}
//                 </Text>
//               )}
//             </HStack>


//             <Heading
//               size={{
//                 base: "lg",
//                 md: "xl",
//               }}
//               color="gray.800"
//               letterSpacing="-0.02em"
//             >
//               Training Workspace
//             </Heading>


//             <Text
//               mt={2}
//               maxW="680px"
//               color="gray.500"
//               fontSize={{
//                 base: "sm",
//                 md: "md",
//               }}
//               lineHeight="1.7"
//             >
//               Build structured workouts, organize exercises,
//               and prepare training plans for your clients.
//             </Text>

//           </Box>


//           <Button
//             colorScheme="blue"
//             size="md"
//             borderRadius="xl"
//             px={6}
//             leftIcon={
//               <FiPlus />
//             }
//             boxShadow="0 8px 20px rgba(66, 153, 225, 0.20)"
//             onClick={() =>
//               navigate(
//                 "/staff/workouts/templates/new"
//               )
//             }
//           >
//             Create Workout
//           </Button>

//         </Flex>


//         {/* ===================================================
//             ORGANIZATION CONTEXT
//         =================================================== */}

//         {workspace?.organization && (
//           <Box
//             mb={7}
//             px={5}
//             py={4}
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
//               direction={{
//                 base: "column",
//                 md: "row",
//               }}
//               gap={2}
//             >
//               <Box>
//                 <Text
//                   fontSize="xs"
//                   fontWeight="600"
//                   textTransform="uppercase"
//                   letterSpacing="0.06em"
//                   color="blue.500"
//                 >
//                   Active Workspace
//                 </Text>

//                 <Text
//                   mt={1}
//                   fontWeight="600"
//                   color="gray.800"
//                 >
//                   {workspace.organization.name}
//                 </Text>

//               </Box>


//               {workspace.organization.workspace_code && (
//                 <Text
//                   fontSize="xs"
//                   color="gray.500"
//                 >
//                   Workspace:{" "}
//                   <Text
//                     as="span"
//                     fontWeight="600"
//                     color="gray.700"
//                   >
//                     {
//                       workspace.organization
//                         .workspace_code
//                     }
//                   </Text>
//                 </Text>
//               )}

//             </Flex>
//           </Box>
//         )}


//         {/* ===================================================
//             WORKOUT STATS
//         =================================================== */}

//         <SimpleGrid
//           columns={{
//             base: 1,
//             sm: 2,
//             xl: 4,
//           }}
//           spacing={5}
//           mb={10}
//         >
//           <WorkoutStatCard
//             icon={FiLayers}
//             label="Templates"
//             value={activeTemplateCount}
//             helper="Active workout templates"
//           />

//           <WorkoutStatCard
//             icon={FiActivity}
//             label="Exercises"
//             value={totalExercises}
//             helper="Exercises across templates"
//           />

//           <WorkoutStatCard
//             icon={FiClock}
//             label="Avg Duration"
//             value={
//               averageDuration
//                 ? `${averageDuration} min`
//                 : "—"
//             }
//             helper="Estimated session duration"
//           />

//           <WorkoutStatCard
//             icon={FiUsers}
//             label="Assignments"
//             value="Available"
//             helper="Trainer → client scheduling"
//           />
//         </SimpleGrid>


//         {/* ===================================================
//             PRIMARY WORKFLOW
//         =================================================== */}

//         <Box mb={10}>

//           <Box mb={5}>

//             <Heading
//               size="md"
//               color="gray.800"
//             >
//               Training workflow
//             </Heading>

//             <Text
//               mt={1}
//               fontSize="sm"
//               color="gray.500"
//             >
//               Everything a trainer needs to prepare and
//               manage structured training.
//             </Text>

//           </Box>


//           <Grid
//             templateColumns={{
//               base: "1fr",
//               lg: "repeat(3, 1fr)",
//             }}
//             gap={5}
//           >

//             <QuickActionCard
//               icon={FiClipboard}
//               title="Workout Templates"
//               description="Create reusable training programs with exercise order, targets, rest periods and training goals."
//               buttonLabel="Manage Templates"
//               onClick={() =>
//                 document
//                   .getElementById(
//                     "workout-templates"
//                   )
//                   ?.scrollIntoView({
//                     behavior: "smooth",
//                   })
//               }
//             />


//             <QuickActionCard
//               icon={FiActivity}
//               title="Exercise Library"
//               description="Browse the NEKA exercise catalogue by muscle group, environment and tracking type."
//               buttonLabel="Open Exercise Library"
//               onClick={() =>
//                 toast({
//                   title:
//                     "Exercise Library",
//                   description:
//                     "The exercise library UI is the next module we will connect here.",
//                   status: "info",
//                   duration: 2500,
//                   isClosable: true,
//                 })
//               }
//             />


//             <QuickActionCard
//               icon={FiBarChart2}
//               title="Assignments & Progress"
//               description="Assign workouts to clients and later review completed sessions, volume, consistency and progress."
//               buttonLabel="Assign a Workout"
//               onClick={() =>
//                 document
//                   .getElementById(
//                     "workout-templates"
//                   )
//                   ?.scrollIntoView({
//                     behavior: "smooth",
//                   })
//               }
//             />

//           </Grid>

//         </Box>


//         {/* ===================================================
//             TEMPLATES
//         =================================================== */}

//         <Box
//           id="workout-templates"
//         >

//           <Flex
//             align={{
//               base: "flex-start",
//               md: "center",
//             }}
//             justify="space-between"
//             direction={{
//               base: "column",
//               md: "row",
//             }}
//             gap={3}
//             mb={5}
//           >

//             <Box>

//               <Heading
//                 size="md"
//                 color="gray.800"
//               >
//                 Your workout templates
//               </Heading>

//               <Text
//                 mt={1}
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 Reusable programs created for your workspace.
//               </Text>

//             </Box>


//             <Button
//               variant="ghost"
//               size="sm"
//               colorScheme="blue"
//               rightIcon={
//                 <FiArrowRight />
//               }
//               onClick={() =>
//                 navigate(
//                   "/staff/workouts/templates"
//                 )
//               }
//             >
//               View all
//             </Button>

//           </Flex>


//           {templates.length === 0 ? (

//             /* -------------------------------------------------
//                EMPTY STATE
//             ------------------------------------------------- */

//             <Box
//               bg="white"
//               border="1px dashed"
//               borderColor="blue.200"
//               borderRadius="2xl"
//               px={6}
//               py={{
//                 base: 10,
//                 md: 14,
//               }}
//               textAlign="center"
//             >

//               <Flex
//                 mx="auto"
//                 mb={5}
//                 w="58px"
//                 h="58px"
//                 align="center"
//                 justify="center"
//                 borderRadius="2xl"
//                 bg="blue.50"
//                 color="blue.500"
//               >
//                 <Icon
//                   as={FiClipboard}
//                   boxSize={6}
//                 />
//               </Flex>


//               <Heading
//                 size="sm"
//                 color="gray.800"
//               >
//                 No workout templates yet
//               </Heading>


//               <Text
//                 mt={2}
//                 maxW="500px"
//                 mx="auto"
//                 fontSize="sm"
//                 color="gray.500"
//                 lineHeight="1.7"
//               >
//                 Start by creating your first structured
//                 workout. You can then add exercises,
//                 targets and rest periods.
//               </Text>


//               <Button
//                 mt={6}
//                 colorScheme="blue"
//                 borderRadius="xl"
//                 leftIcon={
//                   <FiPlus />
//                 }
//                 onClick={() =>
//                   navigate(
//                     "/staff/workouts/templates/new"
//                   )
//                 }
//               >
//                 Create First Workout
//               </Button>

//             </Box>

//           ) : (

//             /* -------------------------------------------------
//                TEMPLATE PREVIEW GRID
//             ------------------------------------------------- */

//             <SimpleGrid
//               columns={{
//                 base: 1,
//                 md: 2,
//                 xl: 3,
//               }}
//               spacing={5}
//             >

//               {templates.map(
//                 (template) => (
//                   <WorkoutTemplateCard
//                     key={template.id}
//                     template={template}

//                     onOpen={() =>
//                       navigate(
//                         `/staff/workouts/templates/${template.id}`
//                       )
//                     }

//                     onEdit={() =>
//                       navigate(
//                         `/staff/workouts/templates/${template.id}`
//                       )
//                     }

//                     onAssign={() =>
//                       openAssignmentDrawer(
//                         template
//                       )
//                     }
//                   />
//                 )
//               )}

//             </SimpleGrid>

//           )}

//         </Box>

//       </Box>


//       {/* =====================================================
//           ASSIGN WORKOUT DRAWER
//       ===================================================== */}

//       {assignmentTemplate && (
//         <WorkoutAssignmentDrawer
//           isOpen={
//             Boolean(
//               assignmentTemplate
//             )
//           }
//           onClose={
//             closeAssignmentDrawer
//           }
//           organizationId={
//             organizationId
//           }
//           templateId={
//             assignmentTemplate.id
//           }
//           templateName={
//             assignmentTemplate.name
//           }
//           onSuccess={() => {
//             closeAssignmentDrawer();
//           }}
//         />
//       )}

//     </>
//   );
// };


// export default StaffWorkoutsPage;


// Version 3

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
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
  FiBarChart2,
  FiClipboard,
  FiClock,
  FiLayers,
  FiPlus,
  FiUsers,
} from "react-icons/fi";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getWorkoutTemplates,
  getWorkoutWorkspace,
} from "../../services/workout.service";

import type {
  WorkoutTemplateListItem,
  WorkoutWorkspace,
} from "../../types/workout.types";

import WorkoutTemplateCard from "../../components/StaffUI/Workouts/WorkoutTemplateCard";

import WorkoutAssignmentDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentDrawer";


/* =========================================================
   SMALL UI CARD
========================================================= */

interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  disabled?: boolean;
}

const QuickActionCard = ({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
  disabled,
}: QuickActionCardProps) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={6}
      boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
      transition="all 0.2s ease"
      _hover={{
        transform: disabled
          ? undefined
          : "translateY(-2px)",
        boxShadow: disabled
          ? "0 8px 30px rgba(15, 23, 42, 0.04)"
          : "0 14px 36px rgba(15, 23, 42, 0.08)",
      }}
    >
      <VStack
        align="stretch"
        spacing={5}
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
          <Icon
            as={icon}
            boxSize={5}
          />
        </Flex>

        <Box>
          <Heading
            size="sm"
            color="gray.800"
            mb={2}
          >
            {title}
          </Heading>

          <Text
            fontSize="sm"
            lineHeight="1.7"
            color="gray.500"
          >
            {description}
          </Text>
        </Box>

        <Button
          alignSelf="flex-start"
          size="sm"
          variant="ghost"
          colorScheme="blue"
          rightIcon={
            <FiArrowRight />
          }
          onClick={onClick}
          isDisabled={disabled}
        >
          {buttonLabel}
        </Button>
      </VStack>
    </Box>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

interface WorkoutStatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  helper?: string;
}

const WorkoutStatCard = ({
  icon,
  label,
  value,
  helper,
}: WorkoutStatCardProps) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={5}
      boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
    >
      <Flex
        align="center"
        justify="space-between"
        mb={4}
      >
        <Box>
          <Text
            fontSize="xs"
            fontWeight="600"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="0.07em"
          >
            {label}
          </Text>

          <Heading
            size="lg"
            mt={1}
            color="gray.800"
          >
            {value}
          </Heading>
        </Box>

        <Flex
          w="42px"
          h="42px"
          align="center"
          justify="center"
          borderRadius="xl"
          bg="blue.50"
          color="blue.500"
        >
          <Icon
            as={icon}
            boxSize={5}
          />
        </Flex>
      </Flex>

      {helper && (
        <Text
          fontSize="xs"
          color="gray.400"
        >
          {helper}
        </Text>
      )}
    </Box>
  );
};


/* =========================================================
   MAIN PAGE
========================================================= */

const StaffWorkoutsPage = () => {
  const navigate = useNavigate();

  const toast = useToast();


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    workspace,
    setWorkspace,
  ] = useState<WorkoutWorkspace | null>(
    null
  );


  const [
    templates,
    setTemplates,
  ] = useState<WorkoutTemplateListItem[]>(
    []
  );


  /* -------------------------------------------------------
     ASSIGNMENT DRAWER STATE
  ------------------------------------------------------- */

  const [
    assignmentTemplate,
    setAssignmentTemplate,
  ] = useState<WorkoutTemplateListItem | null>(
    null
  );


  /* -------------------------------------------------------
     LOAD WORKOUT WORKSPACE
  ------------------------------------------------------- */

  const loadWorkoutWorkspace =
    useCallback(async () => {
      try {
        setLoading(true);

        const activeWorkspace =
          await getWorkoutWorkspace();

        setWorkspace(
          activeWorkspace
        );


        const organizationId =
          Number(
            activeWorkspace?.organization?.id
          );


        if (
          !organizationId ||
          organizationId <= 0
        ) {
          throw new Error(
            "Active organization could not be resolved."
          );
        }


        const workoutTemplates =
          await getWorkoutTemplates(
            organizationId
          );


        setTemplates(
          Array.isArray(workoutTemplates)
            ? workoutTemplates
            : []
        );

      } catch (error: any) {
        console.error(
          "Failed to load workout workspace:",
          error
        );

        toast({
          title:
            "Unable to load workouts",
          description:
            error?.response?.data?.error ??
            error?.response?.data?.message ??
            error?.message ??
            "Please try again.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });

      } finally {
        setLoading(false);
      }
    }, [toast]);


  /* -------------------------------------------------------
     INITIAL LOAD
  ------------------------------------------------------- */

  useEffect(() => {
    loadWorkoutWorkspace();
  }, [loadWorkoutWorkspace]);


  /* -------------------------------------------------------
     DERIVED DATA
  ------------------------------------------------------- */

  const activeTemplateCount =
    useMemo(() => {
      return templates.filter(
        (template) =>
          template.is_active !== false
      ).length;
    }, [templates]);


  const totalExercises =
    useMemo(() => {
      return templates.reduce(
        (
          total,
          template
        ) =>
          total +
          Number(
            template.exercise_count ?? 0
          ),
        0
      );
    }, [templates]);


  const averageDuration =
    useMemo(() => {
      if (!templates.length) {
        return 0;
      }

      const totalDuration =
        templates.reduce(
          (
            total,
            template
          ) =>
            total +
            Number(
              template.estimated_duration_minutes ??
                0
            ),
          0
        );

      return Math.round(
        totalDuration /
        templates.length
      );
    }, [templates]);


  /* -------------------------------------------------------
     ASSIGNMENT HANDLERS
  ------------------------------------------------------- */

  const openAssignmentDrawer =
    useCallback(
      (
        template: WorkoutTemplateListItem
      ) => {
        setAssignmentTemplate(
          template
        );
      },
      []
    );


  const closeAssignmentDrawer =
    useCallback(() => {
      setAssignmentTemplate(null);
    }, []);


  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <Flex
        minH="60vh"
        align="center"
        justify="center"
      >
        <VStack spacing={4}>
          <Spinner
            size="xl"
            thickness="3px"
            color="blue.400"
          />

          <Text
            fontSize="sm"
            color="gray.500"
          >
            Loading workout workspace...
          </Text>
        </VStack>
      </Flex>
    );
  }


  /* -------------------------------------------------------
     ORGANIZATION ID
  ------------------------------------------------------- */

  const organizationId =
    Number(
      workspace?.organization?.id
    );


  /* -------------------------------------------------------
     PAGE
  ------------------------------------------------------- */

  return (
    <>
      <Box
        maxW="1600px"
        mx="auto"
        px={{
          base: 4,
          md: 6,
          xl: 8,
        }}
        py={{
          base: 5,
          md: 8,
        }}
      >

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            base: "stretch",
            lg: "center",
          }}
          justify="space-between"
          gap={5}
          mb={8}
        >
          <Box>
            <HStack
              spacing={2}
              mb={2}
            >
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="10px"
                letterSpacing="0.05em"
              >
                WORKOUTS
              </Badge>

              {workspace?.viewer_role && (
                <Text
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="500"
                >
                  {workspace.viewer_role}
                </Text>
              )}
            </HStack>


            <Heading
              size={{
                base: "lg",
                md: "xl",
              }}
              color="gray.800"
              letterSpacing="-0.02em"
            >
              Training Workspace
            </Heading>


            <Text
              mt={2}
              maxW="680px"
              color="gray.500"
              fontSize={{
                base: "sm",
                md: "md",
              }}
              lineHeight="1.7"
            >
              Build structured workouts, organize exercises,
              and prepare training plans for your clients.
            </Text>

          </Box>


          <Button
            colorScheme="blue"
            size="md"
            borderRadius="xl"
            px={6}
            leftIcon={
              <FiPlus />
            }
            boxShadow="0 8px 20px rgba(66, 153, 225, 0.20)"
            onClick={() =>
              navigate(
                "/staff/workouts/templates/new"
              )
            }
          >
            Create Workout
          </Button>

        </Flex>


        {/* ===================================================
            ORGANIZATION CONTEXT
        =================================================== */}

        {workspace?.organization && (
          <Box
            mb={7}
            px={5}
            py={4}
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
              direction={{
                base: "column",
                md: "row",
              }}
              gap={2}
            >
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  color="blue.500"
                >
                  Active Workspace
                </Text>

                <Text
                  mt={1}
                  fontWeight="600"
                  color="gray.800"
                >
                  {workspace.organization.name}
                </Text>

              </Box>


              {workspace.organization.workspace_code && (
                <Text
                  fontSize="xs"
                  color="gray.500"
                >
                  Workspace:{" "}
                  <Text
                    as="span"
                    fontWeight="600"
                    color="gray.700"
                  >
                    {
                      workspace.organization
                        .workspace_code
                    }
                  </Text>
                </Text>
              )}

            </Flex>
          </Box>
        )}


        {/* ===================================================
            WORKOUT STATS
        =================================================== */}

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            xl: 4,
          }}
          spacing={5}
          mb={10}
        >
          <WorkoutStatCard
            icon={FiLayers}
            label="Templates"
            value={activeTemplateCount}
            helper="Active workout templates"
          />

          <WorkoutStatCard
            icon={FiActivity}
            label="Exercises"
            value={totalExercises}
            helper="Exercises across templates"
          />

          <WorkoutStatCard
            icon={FiClock}
            label="Avg Duration"
            value={
              averageDuration
                ? `${averageDuration} min`
                : "—"
            }
            helper="Estimated session duration"
          />

          <WorkoutStatCard
            icon={FiUsers}
            label="Assignments"
            value="Available"
            helper="Trainer → client scheduling"
          />
        </SimpleGrid>


        {/* ===================================================
            PRIMARY WORKFLOW
        =================================================== */}

        <Box mb={10}>

          <Box mb={5}>

            <Heading
              size="md"
              color="gray.800"
            >
              Training workflow
            </Heading>

            <Text
              mt={1}
              fontSize="sm"
              color="gray.500"
            >
              Everything a trainer needs to prepare and
              manage structured training.
            </Text>

          </Box>


          <Grid
            templateColumns={{
              base: "1fr",
              lg: "repeat(3, 1fr)",
            }}
            gap={5}
          >

            <QuickActionCard
              icon={FiClipboard}
              title="Workout Templates"
              description="Create reusable training programs with exercise order, targets, rest periods and training goals."
              buttonLabel="Manage Templates"
              onClick={() =>
                document
                  .getElementById(
                    "workout-templates"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            />


            <QuickActionCard
              icon={FiActivity}
              title="Exercise Library"
              description="Browse the NEKA exercise catalogue by muscle group, environment and tracking type."
              buttonLabel="Open Exercise Library"
              onClick={() =>
                toast({
                  title:
                    "Exercise Library",
                  description:
                    "The exercise library UI is the next module we will connect here.",
                  status: "info",
                  duration: 2500,
                  isClosable: true,
                })
              }
            />


            <QuickActionCard
              icon={FiBarChart2}
              title="Assignments & Progress"
              description="Assign workouts to clients and later review completed sessions, volume, consistency and progress."
              buttonLabel="Assign a Workout"
              onClick={() =>
                document
                  .getElementById(
                    "workout-templates"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            />

          </Grid>

        </Box>


        {/* ===================================================
            TEMPLATES
        =================================================== */}

        <Box
          id="workout-templates"
        >

          <Flex
            align={{
              base: "flex-start",
              md: "center",
            }}
            justify="space-between"
            direction={{
              base: "column",
              md: "row",
            }}
            gap={3}
            mb={5}
          >

            <Box>

              <Heading
                size="md"
                color="gray.800"
              >
                Your workout templates
              </Heading>

              <Text
                mt={1}
                fontSize="sm"
                color="gray.500"
              >
                Reusable programs created for your workspace.
              </Text>

            </Box>


            <Button
              variant="ghost"
              size="sm"
              colorScheme="blue"
              rightIcon={
                <FiArrowRight />
              }
              onClick={() =>
                navigate(
                  "/staff/workouts/templates"
                )
              }
            >
              View all
            </Button>

          </Flex>


          {templates.length === 0 ? (

            /* -------------------------------------------------
               EMPTY STATE
            ------------------------------------------------- */

            <Box
              bg="white"
              border="1px dashed"
              borderColor="blue.200"
              borderRadius="2xl"
              px={6}
              py={{
                base: 10,
                md: 14,
              }}
              textAlign="center"
            >

              <Flex
                mx="auto"
                mb={5}
                w="58px"
                h="58px"
                align="center"
                justify="center"
                borderRadius="2xl"
                bg="blue.50"
                color="blue.500"
              >
                <Icon
                  as={FiClipboard}
                  boxSize={6}
                />
              </Flex>


              <Heading
                size="sm"
                color="gray.800"
              >
                No workout templates yet
              </Heading>


              <Text
                mt={2}
                maxW="500px"
                mx="auto"
                fontSize="sm"
                color="gray.500"
                lineHeight="1.7"
              >
                Start by creating your first structured
                workout. You can then add exercises,
                targets and rest periods.
              </Text>


              <Button
                mt={6}
                colorScheme="blue"
                borderRadius="xl"
                leftIcon={
                  <FiPlus />
                }
                onClick={() =>
                  navigate(
                    "/staff/workouts/templates/new"
                  )
                }
              >
                Create First Workout
              </Button>

            </Box>

          ) : (

            /* -------------------------------------------------
               TEMPLATE PREVIEW GRID
            ------------------------------------------------- */

            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                xl: 3,
              }}
              spacing={5}
            >

              {templates.map(
                (template) => (
                  <WorkoutTemplateCard
                    key={template.id}
                    template={template}

                    onOpen={() =>
                      navigate(
                        `/staff/workouts/templates/${template.id}`
                      )
                    }

                    onEdit={() =>
                      navigate(
                        `/staff/workouts/templates/${template.id}`
                      )
                    }

                    onAssign={() =>
                      openAssignmentDrawer(
                        template
                      )
                    }
                  />
                )
              )}

            </SimpleGrid>

          )}

        </Box>

      </Box>


      {/* =====================================================
          ASSIGN WORKOUT DRAWER
      ===================================================== */}

      {assignmentTemplate && (
        <WorkoutAssignmentDrawer
          isOpen={
            Boolean(
              assignmentTemplate
            )
          }
          onClose={
            closeAssignmentDrawer
          }
          organizationId={
            organizationId
          }
          templateId={
            assignmentTemplate.id
          }
          onSuccess={() => {
            closeAssignmentDrawer();
          }}
        />
      )}

    </>
  );
};


export default StaffWorkoutsPage;