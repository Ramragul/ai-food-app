//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Divider,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   FormControl,
//   FormLabel,
//   HStack,
//   Icon,
//   Input,
//   Select,
//   Spinner,
//   Text,
//   useToast,
//   VStack,
// } from "@chakra-ui/react";

// import {
//   FiCalendar,
//   FiCheck,
//   FiClock,
//   FiUsers,
//   FiX,
// } from "react-icons/fi";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import api from "../../../utils/api";

// import {
//   createWorkoutAssignment,
//   getMyWorkoutAssignments,
//   getWorkoutTemplates,
// } from "../../../services/workout.service";

// import type {
//   CreateWorkoutAssignmentPayload,
//   WorkoutAssignment,
//   WorkoutTemplateListItem,
// } from "../../../types/workout.types";


// interface WorkoutAssignmentDrawerProps {
//   isOpen: boolean;

//   onClose: () => void;

//   organizationId: number;

//   templateId: number;

//   preselectedClientMemberId?: number | null;

//   onSuccess?: () => void;
// }


// interface ClientOption {
//   id: number;

//   userId?: number;

//   name: string;

//   nickname?: string | null;

//   email?: string | null;

//   goalLabel?: string | null;

//   goalCode?: string | null;

//   weightKg?: number | null;

//   consentGranted?: boolean;
// }


// const DAYS = [
//   {
//     key: "MON",
//     label: "M",
//     name: "Monday",
//   },
//   {
//     key: "TUE",
//     label: "T",
//     name: "Tuesday",
//   },
//   {
//     key: "WED",
//     label: "W",
//     name: "Wednesday",
//   },
//   {
//     key: "THU",
//     label: "T",
//     name: "Thursday",
//   },
//   {
//     key: "FRI",
//     label: "F",
//     name: "Friday",
//   },
//   {
//     key: "SAT",
//     label: "S",
//     name: "Saturday",
//   },
//   {
//     key: "SUN",
//     label: "S",
//     name: "Sunday",
//   },
// ];


// const getDateString = (
//   date: Date
// ) => {
//   const year =
//     date.getFullYear();

//   const month =
//     String(
//       date.getMonth() + 1
//     ).padStart(2, "0");

//   const day =
//     String(
//       date.getDate()
//     ).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };


// const getDefaultEndDate = (
//   startDate: string
// ) => {
//   if (!startDate) {
//     return "";
//   }

//   const date =
//     new Date(
//       `${startDate}T00:00:00`
//     );

//   date.setDate(
//     date.getDate() + 30
//   );

//   return getDateString(date);
// };


// const getGoalLabel = (
//   client: any
// ) => {
//   if (
//     client?.goal?.label
//   ) {
//     return client.goal.label;
//   }

//   if (
//     client?.goal_label
//   ) {
//     return client.goal_label;
//   }

//   return null;
// };


// const getGoalCode = (
//   client: any
// ) => {
//   if (
//     client?.goal?.code
//   ) {
//     return client.goal.code;
//   }

//   if (
//     client?.goal_code
//   ) {
//     return client.goal_code;
//   }

//   return null;
// };


// const getTemplateMuscleLabel = (
//   template: WorkoutTemplateListItem
// ) => {
//   return (
//     template.primary_muscle_group ||
//     "Full body"
//   );
// };


// const getTemplateGoalLabel = (
//   template: WorkoutTemplateListItem
// ) => {
//   return (
//     template.training_goal_name ||
//     template.goal_type ||
//     "General fitness"
//   );
// };


// const WorkoutAssignmentDrawer = ({
//   isOpen,
//   onClose,
//   organizationId,
//   templateId,
//   preselectedClientMemberId = null,
//   onSuccess,
// }: WorkoutAssignmentDrawerProps) => {

//   const toast =
//     useToast();


//   const today =
//     useMemo(
//       () =>
//         getDateString(
//           new Date()
//         ),
//       []
//     );


//   /*
//   --------------------------------------------------
//   DATA
//   --------------------------------------------------
//   */

//   const [
//     clients,
//     setClients
//   ] =
//     useState<ClientOption[]>(
//       []
//     );


//   const [
//     templates,
//     setTemplates
//   ] =
//     useState<
//       WorkoutTemplateListItem[]
//     >(
//       []
//     );


//   const [
//     assignments,
//     setAssignments
//   ] =
//     useState<
//       WorkoutAssignment[]
//     >(
//       []
//     );


//   const [
//     loadingData,
//     setLoadingData
//   ] =
//     useState(false);


//   /*
//   --------------------------------------------------
//   FORM
//   --------------------------------------------------
//   */

//   const [
//     selectedClientId,
//     setSelectedClientId
//   ] =
//     useState("");


//   const [
//     selectedTemplateIds,
//     setSelectedTemplateIds
//   ] =
//     useState<number[]>(
//       []
//     );


//   const [
//     scheduleByTemplate,
//     setScheduleByTemplate
//   ] =
//     useState<
//       Record<
//         number,
//         string[]
//       >
//     >(
//       {}
//     );


//   const [
//     startDate,
//     setStartDate
//   ] =
//     useState(
//       today
//     );


//   const [
//     endDate,
//     setEndDate
//   ] =
//     useState(
//       getDefaultEndDate(
//         today
//       )
//     );


//   const [
//     saving,
//     setSaving
//   ] =
//     useState(false);


//     /*
//   --------------------------------------------------
//   EXISTING ASSIGNMENTS FOR SELECTED CLIENT
//   --------------------------------------------------
//   */

//   const assignedTemplateIds =
//     useMemo(() => {

//       if (
//         !selectedClientId
//       ) {
//         return new Set<number>();
//       }


//       return new Set(
//         assignments
//           .filter(
//             (
//               assignment
//             ) =>
//               Number(
//                 assignment.client_member_id
//               ) ===
//               Number(
//                 selectedClientId
//               ) &&
//               String(
//                 assignment.status
//               ).toUpperCase() ===
//               "ACTIVE"
//           )
//           .map(
//             (
//               assignment
//             ) =>
//               Number(
//                 assignment.workout_template_id
//               )
//           )
//       );

//     }, [
//       assignments,
//       selectedClientId,
//     ]);


//   /*
//   --------------------------------------------------
//   LOAD CLIENTS + TEMPLATES + EXISTING ASSIGNMENTS
//   --------------------------------------------------
//   */

//   useEffect(() => {

//     if (!isOpen) {
//       return;
//     }

//     loadAssignmentData();

//   }, [
//     isOpen,
//     organizationId,
//   ]);


//   const loadAssignmentData =
//     async () => {

//       try {

//         setLoadingData(true);


//         /*
//         --------------------------------------------
//         CLIENTS ASSIGNED TO CURRENT STAFF
//         --------------------------------------------
//         */

//         const clientResponse =
//           await api.get(
//             "/coach/my-clients"
//           );


//         const rawClients =
//           Array.isArray(
//             clientResponse?.data?.data
//           )
//             ? clientResponse.data.data
//             : Array.isArray(
//                 clientResponse?.data
//               )
//               ? clientResponse.data
//               : Array.isArray(
//                   clientResponse?.data?.data?.clients
//                 )
//                 ? clientResponse.data.data.clients
//                 : [];


//         const clientMap =
//           new Map<
//             number,
//             ClientOption
//           >();


//         rawClients.forEach(
//           (
//             client: any
//           ) => {

//             const memberId =
//               Number(
//                 client.member_id ??
//                 client.client_member_id ??
//                 client.id
//               );


//             if (
//               !Number.isInteger(
//                 memberId
//               ) ||
//               memberId <= 0
//             ) {
//               return;
//             }


//             if (
//               clientMap.has(
//                 memberId
//               )
//             ) {
//               return;
//             }


//             clientMap.set(
//               memberId,
//               {
//                 id:
//                   memberId,

//                 userId:
//                   client.user_id ??
//                   client.client_user_id,

//                 name:
//                   client.name ||
//                   "Unnamed client",

//                 nickname:
//                   client.nickname ||
//                   null,

//                 email:
//                   client.email ||
//                   null,

//                 goalLabel:
//                   getGoalLabel(
//                     client
//                   ),

//                 goalCode:
//                   getGoalCode(
//                     client
//                   ),

//                 weightKg:
//                   client.weight_kg !==
//                     undefined &&
//                   client.weight_kg !==
//                     null
//                     ? Number(
//                         client.weight_kg
//                       )
//                     : null,

//                 consentGranted:
//                   client.consent_granted ??
//                   true,
//               }
//             );

//           }
//         );


//         setClients(
//           Array.from(
//             clientMap.values()
//           )
//         );


//         /*
//         --------------------------------------------
//         WORKOUT TEMPLATES
//         --------------------------------------------
//         */

//         const workoutTemplates =
//           await getWorkoutTemplates(
//             organizationId
//           );


//         setTemplates(
//           Array.isArray(
//             workoutTemplates
//           )
//             ? workoutTemplates
//             : []
//         );


//         /*
//         --------------------------------------------
//         EXISTING WORKOUT ASSIGNMENTS
//         --------------------------------------------
//         */

//         const existingAssignments =
//           await getMyWorkoutAssignments(
//             organizationId
//           );


//         setAssignments(
//           Array.isArray(
//             existingAssignments
//           )
//             ? existingAssignments
//             : []
//         );


//       } catch (error: any) {

//         console.error(
//           "Failed to load workout assignment data:",
//           error
//         );


//         toast({
//           title:
//             "Unable to load assignment data",

//           description:
//             error?.response?.data?.error ||
//             error?.message ||
//             "Please try again.",

//           status:
//             "error",

//           duration:
//             3500,

//           isClosable:
//             true,
//         });


//       } finally {

//         setLoadingData(
//           false
//         );

//       }

//     };


//   /*
//   --------------------------------------------------
//   INITIAL / RESET FORM
//   --------------------------------------------------
//   */

//   useEffect(() => {

//     if (!isOpen) {
//       return;
//     }


//     setStartDate(
//       today
//     );


//     setEndDate(
//       getDefaultEndDate(
//         today
//       )
//     );


//     setSelectedClientId(
//       preselectedClientMemberId
//         ? String(
//             preselectedClientMemberId
//           )
//         : ""
//     );


//   }, [
//     isOpen,
//     preselectedClientMemberId,
//     today,
//   ]);


//   /*
//   --------------------------------------------------
//   PRESELECT TEMPLATE
//   --------------------------------------------------
//   */

//   useEffect(() => {

//     if (!isOpen) {
//       return;
//     }


//     if (!templateId) {
//       return;
//     }


//     const templateExists =
//       templates.some(
//         (
//           template
//         ) =>
//           Number(
//             template.id
//           ) ===
//           Number(
//             templateId
//           )
//       );


//     if (
//       templateExists &&
//       !assignedTemplateIds.has(
//         Number(templateId)
//       )
//     ) {

//       setSelectedTemplateIds(
//         (
//           current
//         ) => {

//           if (
//             current.includes(
//               templateId
//             )
//           ) {
//             return current;
//           }

//           return [
//             templateId,
//             ...current,
//           ];

//         }
//       );


//       setScheduleByTemplate(
//         (
//           current
//         ) => ({
//           ...current,

//           [templateId]:
//             current[
//               templateId
//             ] ||
//             [],
//         })
//       );

//     }

//   }, [
//     isOpen,
//     templateId,
//     templates,
//     assignments,
//     selectedClientId,
//     assignedTemplateIds,
//   ]);


  


//   /*
//   --------------------------------------------------
//   REMOVE ALREADY ASSIGNED TEMPLATES
//   --------------------------------------------------
//   */

//   useEffect(() => {

//     if (
//       !selectedClientId
//     ) {
//       return;
//     }


//     if (
//       assignedTemplateIds.size ===
//       0
//     ) {
//       return;
//     }


//     setSelectedTemplateIds(
//       (
//         current
//       ) =>
//         current.filter(
//           (
//             id
//           ) =>
//             !assignedTemplateIds.has(
//               id
//             )
//         )
//     );


//     setScheduleByTemplate(
//       (
//         current
//       ) => {

//         const next = {
//           ...current,
//         };


//         assignedTemplateIds.forEach(
//           (
//             id
//           ) => {
//             delete next[id];
//           }
//         );


//         return next;
//       }
//     );

//   }, [
//     selectedClientId,
//     assignedTemplateIds,
//   ]);


//   /*
//   --------------------------------------------------
//   SELECTED CLIENT
//   --------------------------------------------------
//   */

//   const selectedClient =
//     useMemo(() => {

//       return clients.find(
//         (
//           client
//         ) =>
//           String(
//             client.id
//           ) ===
//           selectedClientId
//       );

//     }, [
//       clients,
//       selectedClientId,
//     ]);


//   /*
//   --------------------------------------------------
//   SELECTED TEMPLATES
//   --------------------------------------------------
//   */

//   const selectedTemplates =
//     useMemo(() => {

//       return selectedTemplateIds
//         .map(
//           (
//             id
//           ) =>
//             templates.find(
//               (
//                 template
//               ) =>
//                 Number(
//                   template.id
//                 ) ===
//                 Number(
//                   id
//                 )
//             )
//         )
//         .filter(
//           (
//             template
//           ): template is
//             WorkoutTemplateListItem =>
//             Boolean(
//               template
//             )
//         );

//     }, [
//       selectedTemplateIds,
//       templates,
//     ]);


//   /*
//   --------------------------------------------------
//   TEMPLATE TOGGLE
//   --------------------------------------------------
//   */

//   const toggleTemplate =
//     (
//       id: number
//     ) => {

//       if (
//         assignedTemplateIds.has(
//           id
//         )
//       ) {
//         return;
//       }


//       setSelectedTemplateIds(
//         (
//           current
//         ) => {

//           if (
//             current.includes(
//               id
//             )
//           ) {

//             return current.filter(
//               (
//                 templateId
//               ) =>
//                 templateId !==
//                 id
//             );

//           }


//           return [
//             ...current,
//             id,
//           ];

//         }
//       );


//       setScheduleByTemplate(
//         (
//           current
//         ) => {

//           if (
//             current[id]
//           ) {
//             return current;
//           }


//           return {
//             ...current,

//             [id]: [],
//           };

//         }
//       );

//     };


//   /*
//   --------------------------------------------------
//   DAY TOGGLE
//   --------------------------------------------------
//   */

//   const toggleTemplateDay =
//     (
//       templateIdValue: number,
//       day: string
//     ) => {

//       setScheduleByTemplate(
//         (
//           current
//         ) => {

//           const currentDays =
//             current[
//               templateIdValue
//             ] || [];


//           const nextDays =
//             currentDays.includes(
//               day
//             )
//               ? currentDays.filter(
//                   (
//                     item
//                   ) =>
//                     item !==
//                     day
//                 )
//               : [
//                   ...currentDays,
//                   day,
//                 ];


//           return {
//             ...current,

//             [templateIdValue]:
//               nextDays,
//           };

//         }
//       );

//     };


//   /*
//   --------------------------------------------------
//   REMOVE SELECTED TEMPLATE
//   --------------------------------------------------
//   */

//   const removeTemplate =
//     (
//       templateIdValue: number
//     ) => {

//       setSelectedTemplateIds(
//         (
//           current
//         ) =>
//           current.filter(
//             (
//               id
//             ) =>
//               id !==
//               templateIdValue
//           )
//       );


//       setScheduleByTemplate(
//         (
//           current
//         ) => {

//           const next = {
//             ...current,
//           };


//           delete next[
//             templateIdValue
//           ];


//           return next;

//         }
//       );

//     };


//   /*
//   --------------------------------------------------
//   VALIDATION
//   --------------------------------------------------
//   */

//   const validate =
//     () => {

//       if (
//         !selectedClientId
//       ) {

//         toast({
//           title:
//             "Select a client",

//           description:
//             "Choose one of your assigned clients.",

//           status:
//             "warning",

//           duration:
//             2500,

//           isClosable:
//             true,
//         });

//         return false;

//       }


//       if (
//         selectedTemplateIds.length ===
//         0
//       ) {

//         toast({
//           title:
//             "Select a workout",

//           description:
//             "Choose at least one workout template.",

//           status:
//             "warning",

//           duration:
//             2500,

//           isClosable:
//             true,
//         });

//         return false;

//       }


//       if (!startDate) {

//         toast({
//           title:
//             "Start date is required",

//           status:
//             "warning",

//           duration:
//             2500,

//           isClosable:
//             true,
//         });

//         return false;

//       }


//       if (
//         endDate &&
//         endDate < startDate
//       ) {

//         toast({
//           title:
//             "Invalid end date",

//           description:
//             "End date must be on or after the start date.",

//           status:
//             "warning",

//           duration:
//             3000,

//           isClosable:
//             true,
//         });

//         return false;

//       }


//       const missingDays =
//         selectedTemplateIds.filter(
//           (
//             id
//           ) =>
//             !(
//               scheduleByTemplate[
//                 id
//               ]?.length
//             )
//         );


//       if (
//         missingDays.length >
//         0
//       ) {

//         toast({
//           title:
//             "Select training days",

//           description:
//             "Each selected workout needs at least one training day.",

//           status:
//             "warning",

//           duration:
//             3000,

//           isClosable:
//             true,
//         });

//         return false;

//       }


//       return true;

//     };


//   /*
//   --------------------------------------------------
//   ASSIGN
//   --------------------------------------------------
//   */

//   const handleAssign =
//     async () => {

//       if (
//         !validate()
//       ) {
//         return;
//       }


//       try {

//         setSaving(
//           true
//         );


//         const plans =
//           selectedTemplateIds.map(
//             (
//               id
//             ) => ({
//               templateId:
//                 id,

//               scheduledDays:
//                 scheduleByTemplate[
//                   id
//                 ] || [],
//             })
//           );


//         const results =
//           await Promise.allSettled(
//             plans.map(
//               (
//                 plan
//               ) => {

//                 const payload:
//                   CreateWorkoutAssignmentPayload =
//                 {
//                   organizationId,

//                   templateId:
//                     plan.templateId,

//                   clientMemberId:
//                     Number(
//                       selectedClientId
//                     ),

//                   startDate,

//                   endDate:
//                     endDate ||
//                     null,

//                   scheduledDays:
//                     plan.scheduledDays,
//                 };


//                 return createWorkoutAssignment(
//                   payload
//                 );

//               }
//             )
//           );


//         const successful =
//           results.filter(
//             (
//               result
//             ) =>
//               result.status ===
//               "fulfilled"
//           );


//         const failed =
//           results.filter(
//             (
//               result
//             ) =>
//               result.status ===
//               "rejected"
//           );


//         if (
//           successful.length ===
//           plans.length
//         ) {

//           toast({
//             title:
//               `${successful.length} workout${
//                 successful.length > 1
//                   ? "s"
//                   : ""
//               } assigned`,

//             description:
//               `Training plan created for ${
//                 selectedClient?.name ||
//                 "the selected client"
//               }.`,

//             status:
//               "success",

//             duration:
//               3500,

//             isClosable:
//               true,
//           });


//           onSuccess?.();

//           onClose();

//           return;
//         }


//         if (
//           successful.length >
//           0
//         ) {

//           toast({
//             title:
//               "Workout plan partially assigned",

//             description:
//               `${successful.length} assigned successfully, ${failed.length} failed.`,

//             status:
//               "warning",

//             duration:
//               4500,

//             isClosable:
//               true,
//           });


//           onSuccess?.();

//           onClose();

//           return;
//         }


//         const firstFailure =
//           results.find(
//             (
//               result
//             ) =>
//               result.status ===
//               "rejected"
//           );


//         let failureMessage =
//           "Unable to assign workouts.";


//         if (
//           firstFailure &&
//           firstFailure.status ===
//             "rejected"
//         ) {

//           const reason =
//             firstFailure.reason;


//           failureMessage =
//             reason?.response?.data?.error ||
//             reason?.message ||
//             failureMessage;

//         }


//         toast({
//           title:
//             "Unable to assign workouts",

//           description:
//             failureMessage,

//           status:
//             "error",

//           duration:
//             4000,

//           isClosable:
//             true,
//         });


//       } catch (error: any) {

//         console.error(
//           "Workout assignment failed:",
//           error
//         );


//         toast({
//           title:
//             "Unable to assign workouts",

//           description:
//             error?.response?.data?.error ||
//             error?.message ||
//             "Something went wrong.",

//           status:
//             "error",

//           duration:
//             4000,

//           isClosable:
//             true,
//         });


//       } finally {

//         setSaving(
//           false
//         );

//       }

//     };


//   /*
//   --------------------------------------------------
//   TEMPLATE DISPLAY
//   --------------------------------------------------
//   */

//   const getTemplateStatusText =
//     (
//       template: WorkoutTemplateListItem
//     ) => {

//       const id =
//         Number(
//           template.id
//         );


//       if (
//         assignedTemplateIds.has(
//           id
//         )
//       ) {
//         return "Already assigned";
//       }


//       if (
//         selectedTemplateIds.includes(
//           id
//         )
//       ) {
//         return "Selected";
//       }


//       return "Available";

//     };


//   /*
//   --------------------------------------------------
//   RENDER
//   --------------------------------------------------
//   */

//   return (
//     <Drawer
//       isOpen={isOpen}
//       placement="right"
//       onClose={onClose}
//       size="lg"
//     >

//       <DrawerOverlay />


//       <DrawerContent
//         borderLeftRadius={{
//           base: "0",
//           md: "28px",
//         }}
//         overflow="hidden"
//       >

//         {/* -----------------------------------------
//             HEADER
//         ------------------------------------------ */}

//         <DrawerHeader
//           px={6}
//           pt={6}
//           pb={5}
//           borderBottom="1px solid"
//           borderColor="gray.100"
//         >

//           <HStack
//             justify="space-between"
//             align="start"
//           >

//             <HStack
//               align="start"
//               spacing={3}
//             >

//               <Box
//                 w="44px"
//                 h="44px"
//                 borderRadius="xl"
//                 bg="brand.50"
//                 color="brand.600"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 flexShrink={0}
//               >

//                 <Icon
//                   as={FiUsers}
//                   boxSize={21}
//                 />

//               </Box>


//               <Box>

//                 <Text
//                   fontSize="xs"
//                   fontWeight="800"
//                   color="gray.500"
//                   textTransform="uppercase"
//                   letterSpacing="1px"
//                 >
//                   Assign workouts
//                 </Text>


//                 <Text
//                   mt={1}
//                   fontSize="xl"
//                   fontWeight="900"
//                   color="gray.900"
//                 >
//                   Build client training plan
//                 </Text>


//                 <Text
//                   mt={1}
//                   fontSize="sm"
//                   color="gray.500"
//                   lineHeight="1.6"
//                 >
//                   Choose multiple workouts and set
//                   the training days for each one.
//                 </Text>

//               </Box>

//             </HStack>


//             <Button
//               variant="ghost"
//               borderRadius="full"
//               onClick={onClose}
//               aria-label="Close"
//               px={3}
//             >

//               <Icon
//                 as={FiX}
//                 boxSize={20}
//               />

//             </Button>

//           </HStack>

//         </DrawerHeader>


//         {/* -----------------------------------------
//             BODY
//         ------------------------------------------ */}

//         <DrawerBody
//           px={6}
//           py={6}
//         >

//           {loadingData ? (

//             <VStack
//               minH="420px"
//               justify="center"
//               spacing={4}
//             >

//               <Spinner
//                 size="lg"
//                 color="brand.500"
//               />

//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//               >
//                 Loading clients and workouts...
//               </Text>

//             </VStack>

//           ) : (

//             <VStack
//               align="stretch"
//               spacing={7}
//             >

//               {/* CLIENT */}

//               <Box>

//                 <FormControl>

//                   <FormLabel
//                     fontSize="sm"
//                     fontWeight="800"
//                     mb={2}
//                   >
//                     Client
//                   </FormLabel>


//                   <Select
//                     value={
//                       selectedClientId
//                     }
//                     onChange={(
//                       event
//                     ) =>
//                       setSelectedClientId(
//                         event.target.value
//                       )
//                     }
//                     placeholder="Choose one of your assigned clients"
//                     size="lg"
//                     borderRadius="xl"
//                     bg="gray.50"
//                     borderColor="gray.200"
//                     isDisabled={
//                       Boolean(
//                         preselectedClientMemberId
//                       )
//                     }
//                   >

//                     {clients.map(
//                       (
//                         client
//                       ) => (

//                         <option
//                           key={
//                             client.id
//                           }
//                           value={
//                             client.id
//                           }
//                         >

//                           {client.name}

//                           {client.nickname
//                             ? ` • ${client.nickname}`
//                             : ""}

//                         </option>

//                       )
//                     )}

//                   </Select>

//                 </FormControl>


//                 {selectedClient && (

//                   <Box
//                     mt={3}
//                     bg="gray.50"
//                     border="1px solid"
//                     borderColor="gray.200"
//                     borderRadius="2xl"
//                     p={4}
//                   >

//                     <HStack
//                       justify="space-between"
//                       align="start"
//                     >

//                       <Box>

//                         <Text
//                           fontWeight="800"
//                           color="gray.800"
//                         >
//                           {selectedClient.name}
//                         </Text>

//                         {selectedClient.nickname && (

//                           <Text
//                             mt={0.5}
//                             fontSize="sm"
//                             color="gray.500"
//                           >
//                             {selectedClient.nickname}
//                           </Text>

//                         )}

//                       </Box>


//                       <Badge
//                         colorScheme="blue"
//                         borderRadius="full"
//                         px={3}
//                         py={1}
//                       >
//                         Assigned client
//                       </Badge>

//                     </HStack>


//                     <HStack
//                       spacing={2}
//                       mt={3}
//                       flexWrap="wrap"
//                     >

//                       {selectedClient.goalLabel && (

//                         <Badge
//                           variant="subtle"
//                           colorScheme="purple"
//                           borderRadius="full"
//                         >
//                           {selectedClient.goalLabel}
//                         </Badge>

//                       )}


//                       {selectedClient.weightKg !==
//                         null &&
//                         selectedClient.weightKg !==
//                           undefined && (

//                           <Badge
//                             variant="subtle"
//                             colorScheme="gray"
//                             borderRadius="full"
//                           >
//                             {selectedClient.weightKg} kg
//                           </Badge>

//                         )}

//                     </HStack>

//                   </Box>

//                 )}

//               </Box>


//               <Divider />


//               {/* TEMPLATE LIBRARY */}

//               <Box>

//                 <HStack
//                   justify="space-between"
//                   align="center"
//                   mb={3}
//                 >

//                   <Box>

//                     <Text
//                       fontWeight="800"
//                       fontSize="sm"
//                       color="gray.800"
//                     >
//                       Choose workouts
//                     </Text>

//                     <Text
//                       mt={1}
//                       fontSize="xs"
//                       color="gray.500"
//                     >
//                       You can assign multiple workouts
//                       to the same client.
//                     </Text>

//                   </Box>


//                   <Badge
//                     colorScheme={
//                       selectedTemplateIds.length
//                         ? "blue"
//                         : "gray"
//                     }
//                     borderRadius="full"
//                     px={3}
//                     py={1}
//                   >
//                     {selectedTemplateIds.length} selected
//                   </Badge>

//                 </HStack>


//                 <VStack
//                   align="stretch"
//                   spacing={3}
//                   maxH="320px"
//                   overflowY="auto"
//                   pr={1}
//                 >

//                   {templates.length ===
//                   0 ? (

//                     <Box
//                       border="1px dashed"
//                       borderColor="gray.300"
//                       borderRadius="2xl"
//                       p={6}
//                       textAlign="center"
//                     >

//                       <Text
//                         fontWeight="700"
//                         color="gray.700"
//                       >
//                         No workout templates found
//                       </Text>

//                       <Text
//                         mt={1}
//                         fontSize="sm"
//                         color="gray.500"
//                       >
//                         Create a workout template first.
//                       </Text>

//                     </Box>

//                   ) : (

//                     templates.map(
//                       (
//                         template
//                       ) => {

//                         const id =
//                           Number(
//                             template.id
//                           );

//                         const selected =
//                           selectedTemplateIds.includes(
//                             id
//                           );

//                         const assigned =
//                           assignedTemplateIds.has(
//                             id
//                           );

//                         const statusText =
//                           getTemplateStatusText(
//                             template
//                           );


//                         return (

//                           <Button
//                             key={id}
//                             variant="ghost"
//                             h="auto"
//                             p={0}
//                             textAlign="left"
//                             justifyContent="flex-start"
//                             whiteSpace="normal"
//                             _hover={{
//                               bg: "transparent",
//                             }}
//                             _active={{
//                               bg: "transparent",
//                             }}
//                             onClick={() =>
//                               toggleTemplate(
//                                 id
//                               )
//                             }
//                             isDisabled={
//                               assigned
//                             }
//                             cursor={
//                               assigned
//                                 ? "not-allowed"
//                                 : "pointer"
//                             }
//                           >

//                             <Box
//                               w="100%"
//                               border="1px solid"
//                               borderColor={
//                                 selected
//                                   ? "blue.300"
//                                   : assigned
//                                     ? "gray.200"
//                                     : "gray.200"
//                               }
//                               bg={
//                                 selected
//                                   ? "blue.50"
//                                   : assigned
//                                     ? "gray.50"
//                                     : "white"
//                               }
//                               borderRadius="2xl"
//                               p={4}
//                               transition="all 0.15s"
//                             >

//                               <HStack
//                                 align="start"
//                                 spacing={3}
//                               >

//                                 <Box
//                                   w="22px"
//                                   h="22px"
//                                   borderRadius="full"
//                                   border="2px solid"
//                                   borderColor={
//                                     selected
//                                       ? "blue.500"
//                                       : assigned
//                                         ? "gray.300"
//                                         : "gray.300"
//                                   }
//                                   bg={
//                                     selected
//                                       ? "blue.500"
//                                       : "white"
//                                   }
//                                   display="flex"
//                                   alignItems="center"
//                                   justifyContent="center"
//                                   flexShrink={0}
//                                   mt={0.5}
//                                 >

//                                   {selected && (

//                                     <Icon
//                                       as={
//                                         FiCheck
//                                       }
//                                       color="white"
//                                       boxSize={14}
//                                     />

//                                   )}

//                                 </Box>


//                                 <Box
//                                   flex={1}
//                                   minW={0}
//                                 >

//                                   <HStack
//                                     justify="space-between"
//                                     align="start"
//                                     spacing={3}
//                                   >

//                                     <Box
//                                       minW={0}
//                                     >

//                                       <Text
//                                         fontWeight="800"
//                                         color={
//                                           assigned
//                                             ? "gray.500"
//                                             : "gray.800"
//                                         }
//                                         noOfLines={1}
//                                       >
//                                         {
//                                           template.name
//                                         }
//                                       </Text>

//                                       <Text
//                                         mt={1}
//                                         fontSize="xs"
//                                         color="gray.500"
//                                       >
//                                         {
//                                           getTemplateMuscleLabel(
//                                             template
//                                           )
//                                         }

//                                         {" • "}

//                                         {
//                                           getTemplateGoalLabel(
//                                             template
//                                           )
//                                         }
//                                       </Text>

//                                     </Box>


//                                     <Badge
//                                       flexShrink={0}
//                                       borderRadius="full"
//                                       colorScheme={
//                                         assigned
//                                           ? "gray"
//                                           : selected
//                                             ? "blue"
//                                             : "green"
//                                       }
//                                     >
//                                       {
//                                         statusText
//                                       }
//                                     </Badge>

//                                   </HStack>


//                                   <HStack
//                                     mt={3}
//                                     spacing={4}
//                                     color="gray.500"
//                                   >

//                                     <HStack
//                                       spacing={1}
//                                     >

//                                       <Icon
//                                         as={
//                                           FiClock
//                                         }
//                                         boxSize={13}
//                                       />

//                                       <Text
//                                         fontSize="xs"
//                                       >
//                                         {
//                                           Number(
//                                             template.estimated_duration_minutes ||
//                                             0
//                                           )
//                                         }{" "}
//                                         min
//                                       </Text>

//                                     </HStack>


//                                     <Text
//                                       fontSize="xs"
//                                     >
//                                       {
//                                         Number(
//                                           template.exercise_count ||
//                                           0
//                                         )
//                                       }{" "}
//                                       exercises
//                                     </Text>

//                                   </HStack>

//                                 </Box>

//                               </HStack>

//                             </Box>

//                           </Button>

//                         );

//                       }
//                     )

//                   )}

//                 </VStack>

//               </Box>


//               <Divider />


//               {/* DATE RANGE */}

//               <Box>

//                 <HStack
//                   mb={4}
//                   spacing={2}
//                 >

//                   <Icon
//                     as={
//                       FiCalendar
//                     }
//                     color="brand.500"
//                   />

//                   <Box>

//                     <Text
//                       fontWeight="800"
//                       fontSize="sm"
//                     >
//                       Assignment period
//                     </Text>

//                     <Text
//                       mt={0.5}
//                       fontSize="xs"
//                       color="gray.500"
//                     >
//                       The same date range applies to all
//                       selected workouts.
//                     </Text>

//                   </Box>

//                 </HStack>


//                 <HStack
//                   align="start"
//                   spacing={4}
//                 >

//                   <FormControl>

//                     <FormLabel
//                       fontSize="xs"
//                       fontWeight="700"
//                       color="gray.500"
//                     >
//                       Start date
//                     </FormLabel>

//                     <Input
//                       type="date"
//                       value={
//                         startDate
//                       }
//                       onChange={(
//                         event
//                       ) => {

//                         const value =
//                           event.target.value;


//                         setStartDate(
//                           value
//                         );


//                         if (
//                           !endDate ||
//                           endDate <
//                             value
//                         ) {

//                           setEndDate(
//                             getDefaultEndDate(
//                               value
//                             )
//                           );

//                         }

//                       }}
//                       size="lg"
//                       borderRadius="xl"
//                       bg="gray.50"
//                     />

//                   </FormControl>


//                   <FormControl>

//                     <FormLabel
//                       fontSize="xs"
//                       fontWeight="700"
//                       color="gray.500"
//                     >
//                       End date
//                     </FormLabel>

//                     <Input
//                       type="date"
//                       min={
//                         startDate
//                       }
//                       value={
//                         endDate
//                       }
//                       onChange={(
//                         event
//                       ) =>
//                         setEndDate(
//                           event.target.value
//                         )
//                       }
//                       size="lg"
//                       borderRadius="xl"
//                       bg="gray.50"
//                     />

//                   </FormControl>

//                 </HStack>

//               </Box>


//               {/* SELECTED PLAN */}

//               {selectedTemplates.length >
//                 0 && (

//                 <>

//                   <Divider />


//                   <Box>

//                     <HStack
//                       justify="space-between"
//                       mb={4}
//                     >

//                       <Box>

//                         <Text
//                           fontWeight="800"
//                           fontSize="sm"
//                         >
//                           Weekly training plan
//                         </Text>

//                         <Text
//                           mt={1}
//                           fontSize="xs"
//                           color="gray.500"
//                         >
//                           Give each workout its own training
//                           days.
//                         </Text>

//                       </Box>


//                       <Badge
//                         colorScheme="blue"
//                         borderRadius="full"
//                       >
//                         {
//                           selectedTemplates.length
//                         }{" "}
//                         workout
//                         {
//                           selectedTemplates.length >
//                           1
//                             ? "s"
//                             : ""
//                         }
//                       </Badge>

//                     </HStack>


//                     <VStack
//                       align="stretch"
//                       spacing={4}
//                     >

//                       {selectedTemplates.map(
//                         (
//                           template
//                         ) => {

//                           const id =
//                             Number(
//                               template.id
//                             );


//                           const selectedDays =
//                             scheduleByTemplate[
//                               id
//                             ] || [];


//                           return (

//                             <Box
//                               key={id}
//                               border="1px solid"
//                               borderColor="gray.200"
//                               borderRadius="2xl"
//                               p={4}
//                               bg="white"
//                             >

//                               <HStack
//                                 justify="space-between"
//                                 align="start"
//                               >

//                                 <Box>

//                                   <Text
//                                     fontWeight="800"
//                                     color="gray.800"
//                                   >
//                                     {
//                                       template.name
//                                     }
//                                   </Text>

//                                   <Text
//                                     mt={1}
//                                     fontSize="xs"
//                                     color="gray.500"
//                                   >
//                                     {
//                                       getTemplateMuscleLabel(
//                                         template
//                                       )
//                                     }

//                                     {" • "}

//                                     {
//                                       getTemplateGoalLabel(
//                                         template
//                                       )
//                                     }
//                                   </Text>

//                                 </Box>


//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   borderRadius="full"
//                                   colorScheme="gray"
//                                   onClick={() =>
//                                     removeTemplate(
//                                       id
//                                     )
//                                   }
//                                   aria-label={
//                                     `Remove ${template.name}`
//                                   }
//                                 >

//                                   <Icon
//                                     as={
//                                       FiX
//                                     }
//                                   />

//                                 </Button>

//                               </HStack>


//                               <Text
//                                 mt={4}
//                                 fontSize="xs"
//                                 fontWeight="700"
//                                 color="gray.500"
//                               >
//                                 Training days
//                               </Text>


//                               <HStack
//                                 mt={2}
//                                 spacing={2}
//                                 flexWrap="wrap"
//                               >

//                                 {DAYS.map(
//                                   (
//                                     day
//                                   ) => {

//                                     const selected =
//                                       selectedDays.includes(
//                                         day.key
//                                       );


//                                     return (

//                                       <Button
//                                         key={
//                                           day.key
//                                         }
//                                         w="42px"
//                                         h="42px"
//                                         minW="42px"
//                                         p={0}
//                                         borderRadius="full"
//                                         size="sm"
//                                         variant={
//                                           selected
//                                             ? "solid"
//                                             : "outline"
//                                         }
//                                         colorScheme="blue"
//                                         bg={
//                                           selected
//                                             ? "brand.500"
//                                             : "white"
//                                         }
//                                         borderColor={
//                                           selected
//                                             ? "brand.500"
//                                             : "gray.200"
//                                         }
//                                         color={
//                                           selected
//                                             ? "white"
//                                             : "gray.600"
//                                         }
//                                         onClick={() =>
//                                           toggleTemplateDay(
//                                             id,
//                                             day.key
//                                           )
//                                         }
//                                       >
//                                         {
//                                           day.label
//                                         }
//                                       </Button>

//                                     );

//                                   }
//                                 )}

//                               </HStack>


//                               <Text
//                                 mt={3}
//                                 fontSize="xs"
//                                 color={
//                                   selectedDays.length
//                                     ? "gray.500"
//                                     : "orange.500"
//                                 }
//                               >

//                                 {selectedDays.length
//                                   ? selectedDays
//                                       .map(
//                                         (
//                                           dayKey
//                                         ) =>
//                                           DAYS.find(
//                                             (
//                                               day
//                                             ) =>
//                                               day.key ===
//                                               dayKey
//                                           )?.name ||
//                                           dayKey
//                                       )
//                                       .join(
//                                         " • "
//                                       )
//                                   : "Select at least one training day"}

//                               </Text>

//                             </Box>

//                           );

//                         }
//                       )}

//                     </VStack>

//                   </Box>

//                 </>

//               )}


//               {/* SUMMARY */}

//               <Box
//                 bg="brand.50"
//                 borderRadius="2xl"
//                 p={5}
//                 border="1px solid"
//                 borderColor="brand.100"
//               >

//                 <Text
//                   fontSize="xs"
//                   fontWeight="800"
//                   textTransform="uppercase"
//                   letterSpacing="1px"
//                   color="brand.700"
//                 >
//                   Assignment summary
//                 </Text>


//                 <VStack
//                   align="stretch"
//                   spacing={2}
//                   mt={3}
//                 >

//                   <HStack
//                     justify="space-between"
//                   >

//                     <Text
//                       fontSize="sm"
//                       color="gray.600"
//                     >
//                       Client
//                     </Text>

//                     <Text
//                       fontSize="sm"
//                       fontWeight="800"
//                     >
//                       {
//                         selectedClient?.name ||
//                         "Not selected"
//                       }
//                     </Text>

//                   </HStack>


//                   <HStack
//                     justify="space-between"
//                   >

//                     <Text
//                       fontSize="sm"
//                       color="gray.600"
//                     >
//                       Workouts
//                     </Text>

//                     <Text
//                       fontSize="sm"
//                       fontWeight="800"
//                     >
//                       {
//                         selectedTemplates.length
//                       }
//                     </Text>

//                   </HStack>


//                   <HStack
//                     justify="space-between"
//                   >

//                     <Text
//                       fontSize="sm"
//                       color="gray.600"
//                     >
//                       Period
//                     </Text>

//                     <Text
//                       fontSize="sm"
//                       fontWeight="800"
//                     >
//                       {startDate
//                         ? `${startDate} → ${
//                             endDate ||
//                             "Open"
//                           }`
//                         : "Not selected"}
//                     </Text>

//                   </HStack>

//                 </VStack>

//               </Box>

//             </VStack>

//           )}

//         </DrawerBody>


//         {/* -----------------------------------------
//             FOOTER
//         ------------------------------------------ */}

//         <DrawerFooter
//           px={6}
//           py={5}
//           borderTop="1px solid"
//           borderColor="gray.100"
//           gap={3}
//         >

//           <Button
//             variant="ghost"
//             borderRadius="xl"
//             onClick={onClose}
//             isDisabled={
//               saving
//             }
//           >
//             Cancel
//           </Button>


//           <Button
//             flex={1}
//             colorScheme="blue"
//             borderRadius="xl"
//             h="48px"
//             leftIcon={
//               saving
//                 ? undefined
//                 : <FiCheck />
//             }
//             onClick={
//               handleAssign
//             }
//             isLoading={
//               saving
//             }
//             loadingText="Assigning..."
//             isDisabled={
//               loadingData
//             }
//           >
//             Assign{" "}
//             {
//               selectedTemplates.length
//             }{" "}
//             Workout
//             {
//               selectedTemplates.length ===
//               1
//                 ? ""
//                 : "s"
//             }
//           </Button>

//         </DrawerFooter>

//       </DrawerContent>

//     </Drawer>
//   );
// };


// export default WorkoutAssignmentDrawer;


// Version 2

import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiUsers,
  FiX,
} from "react-icons/fi";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../../../utils/api";

import {
  createWorkoutAssignment,
  getMyWorkoutAssignments,
  getWorkoutTemplates,
} from "../../../services/workout.service";

import type {
  CreateWorkoutAssignmentPayload,
  WorkoutAssignment,
  WorkoutTemplateListItem,
} from "../../../types/workout.types";


interface WorkoutAssignmentDrawerProps {
  isOpen: boolean;

  onClose: () => void;

  organizationId: number;

  templateId?: number | null;

  preselectedClientMemberId?: number | null;

  onSuccess?: () => void;
}


interface ClientOption {
  id: number;

  userId?: number;

  name: string;

  nickname?: string | null;

  email?: string | null;

  goalLabel?: string | null;

  goalCode?: string | null;

  weightKg?: number | null;

  consentGranted?: boolean;
}


const DAYS = [
  {
    key: "MON",
    label: "M",
    name: "Monday",
  },
  {
    key: "TUE",
    label: "T",
    name: "Tuesday",
  },
  {
    key: "WED",
    label: "W",
    name: "Wednesday",
  },
  {
    key: "THU",
    label: "T",
    name: "Thursday",
  },
  {
    key: "FRI",
    label: "F",
    name: "Friday",
  },
  {
    key: "SAT",
    label: "S",
    name: "Saturday",
  },
  {
    key: "SUN",
    label: "S",
    name: "Sunday",
  },
];


const getDateString = (
  date: Date
) => {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


const getDefaultEndDate = (
  startDate: string
) => {
  if (!startDate) {
    return "";
  }

  const date =
    new Date(
      `${startDate}T00:00:00`
    );

  date.setDate(
    date.getDate() + 30
  );

  return getDateString(date);
};


const getGoalLabel = (
  client: any
) => {
  if (
    client?.goal?.label
  ) {
    return client.goal.label;
  }

  if (
    client?.goal_label
  ) {
    return client.goal_label;
  }

  return null;
};


const getGoalCode = (
  client: any
) => {
  if (
    client?.goal?.code
  ) {
    return client.goal.code;
  }

  if (
    client?.goal_code
  ) {
    return client.goal_code;
  }

  return null;
};


const getTemplateMuscleLabel = (
  template: WorkoutTemplateListItem
) => {
  return (
    template.primary_muscle_group ||
    "Full body"
  );
};


const getTemplateGoalLabel = (
  template: WorkoutTemplateListItem
) => {
  return (
    template.training_goal_name ||
    template.goal_type ||
    "General fitness"
  );
};


const WorkoutAssignmentDrawer = ({
  isOpen,
  onClose,
  organizationId,
  templateId,
  preselectedClientMemberId = null,
  onSuccess,
}: WorkoutAssignmentDrawerProps) => {

  const toast =
    useToast();


  const today =
    useMemo(
      () =>
        getDateString(
          new Date()
        ),
      []
    );


  /*
  --------------------------------------------------
  DATA
  --------------------------------------------------
  */

  const [
    clients,
    setClients
  ] =
    useState<ClientOption[]>(
      []
    );


  const [
    templates,
    setTemplates
  ] =
    useState<
      WorkoutTemplateListItem[]
    >(
      []
    );


  const [
    assignments,
    setAssignments
  ] =
    useState<
      WorkoutAssignment[]
    >(
      []
    );


  const [
    loadingData,
    setLoadingData
  ] =
    useState(false);


  /*
  --------------------------------------------------
  FORM
  --------------------------------------------------
  */

  const [
    selectedClientId,
    setSelectedClientId
  ] =
    useState("");


  const [
    selectedTemplateIds,
    setSelectedTemplateIds
  ] =
    useState<number[]>(
      []
    );


  const [
    scheduleByTemplate,
    setScheduleByTemplate
  ] =
    useState<
      Record<
        number,
        string[]
      >
    >(
      {}
    );


  const [
    startDate,
    setStartDate
  ] =
    useState(
      today
    );


  const [
    endDate,
    setEndDate
  ] =
    useState(
      getDefaultEndDate(
        today
      )
    );


  const [
    saving,
    setSaving
  ] =
    useState(false);


    /*
  --------------------------------------------------
  EXISTING ASSIGNMENTS FOR SELECTED CLIENT
  --------------------------------------------------
  */

  const assignedTemplateIds =
    useMemo(() => {

      if (
        !selectedClientId
      ) {
        return new Set<number>();
      }


      return new Set(
        assignments
          .filter(
            (
              assignment
            ) =>
              Number(
                assignment.client_member_id
              ) ===
              Number(
                selectedClientId
              ) &&
              String(
                assignment.status
              ).toUpperCase() ===
              "ACTIVE"
          )
          .map(
            (
              assignment
            ) =>
              Number(
                assignment.workout_template_id
              )
          )
      );

    }, [
      assignments,
      selectedClientId,
    ]);


  /*
  --------------------------------------------------
  LOAD CLIENTS + TEMPLATES + EXISTING ASSIGNMENTS
  --------------------------------------------------
  */

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    loadAssignmentData();

  }, [
    isOpen,
    organizationId,
  ]);


  const loadAssignmentData =
    async () => {

      try {

        setLoadingData(true);


        /*
        --------------------------------------------
        CLIENTS ASSIGNED TO CURRENT STAFF
        --------------------------------------------
        */

        const clientResponse =
          await api.get(
            "/coach/my-clients"
          );


        const rawClients =
          Array.isArray(
            clientResponse?.data?.data
          )
            ? clientResponse.data.data
            : Array.isArray(
                clientResponse?.data
              )
              ? clientResponse.data
              : Array.isArray(
                  clientResponse?.data?.data?.clients
                )
                ? clientResponse.data.data.clients
                : [];


        const clientMap =
          new Map<
            number,
            ClientOption
          >();


        rawClients.forEach(
          (
            client: any
          ) => {

            const memberId =
              Number(
                client.member_id ??
                client.client_member_id ??
                client.id
              );


            if (
              !Number.isInteger(
                memberId
              ) ||
              memberId <= 0
            ) {
              return;
            }


            if (
              clientMap.has(
                memberId
              )
            ) {
              return;
            }


            clientMap.set(
              memberId,
              {
                id:
                  memberId,

                userId:
                  client.user_id ??
                  client.client_user_id,

                name:
                  client.name ||
                  "Unnamed client",

                nickname:
                  client.nickname ||
                  null,

                email:
                  client.email ||
                  null,

                goalLabel:
                  getGoalLabel(
                    client
                  ),

                goalCode:
                  getGoalCode(
                    client
                  ),

                weightKg:
                  client.weight_kg !==
                    undefined &&
                  client.weight_kg !==
                    null
                    ? Number(
                        client.weight_kg
                      )
                    : null,

                consentGranted:
                  client.consent_granted ??
                  true,
              }
            );

          }
        );


        setClients(
          Array.from(
            clientMap.values()
          )
        );


        /*
        --------------------------------------------
        WORKOUT TEMPLATES
        --------------------------------------------
        */

        const workoutTemplates =
          await getWorkoutTemplates(
            organizationId
          );


        setTemplates(
          Array.isArray(
            workoutTemplates
          )
            ? workoutTemplates
            : []
        );


        /*
        --------------------------------------------
        EXISTING WORKOUT ASSIGNMENTS
        --------------------------------------------
        */

        const existingAssignments =
          await getMyWorkoutAssignments(
            organizationId
          );


        setAssignments(
          Array.isArray(
            existingAssignments
          )
            ? existingAssignments
            : []
        );


      } catch (error: any) {

        console.error(
          "Failed to load workout assignment data:",
          error
        );


        toast({
          title:
            "Unable to load assignment data",

          description:
            error?.response?.data?.error ||
            error?.message ||
            "Please try again.",

          status:
            "error",

          duration:
            3500,

          isClosable:
            true,
        });


      } finally {

        setLoadingData(
          false
        );

      }

    };


  /*
  --------------------------------------------------
  INITIAL / RESET FORM
  --------------------------------------------------
  */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    setStartDate(
      today
    );


    setEndDate(
      getDefaultEndDate(
        today
      )
    );


    setSelectedClientId(
      preselectedClientMemberId
        ? String(
            preselectedClientMemberId
          )
        : ""
    );


  }, [
    isOpen,
    preselectedClientMemberId,
    today,
  ]);


  /*
  --------------------------------------------------
  PRESELECT TEMPLATE
  --------------------------------------------------
  */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    if (!templateId) {
      return;
    }


    const templateExists =
      templates.some(
        (
          template
        ) =>
          Number(
            template.id
          ) ===
          Number(
            templateId
          )
      );


    if (
      templateExists &&
      !assignedTemplateIds.has(
        Number(templateId)
      )
    ) {

      setSelectedTemplateIds(
        (
          current
        ) => {

          if (
            current.includes(
              templateId
            )
          ) {
            return current;
          }

          return [
            templateId,
            ...current,
          ];

        }
      );


      setScheduleByTemplate(
        (
          current
        ) => ({
          ...current,

          [templateId]:
            current[
              templateId
            ] ||
            [],
        })
      );

    }

  }, [
    isOpen,
    templateId,
    templates,
    assignments,
    selectedClientId,
    assignedTemplateIds,
  ]);


  


  /*
  --------------------------------------------------
  REMOVE ALREADY ASSIGNED TEMPLATES
  --------------------------------------------------
  */

  useEffect(() => {

    if (
      !selectedClientId
    ) {
      return;
    }


    if (
      assignedTemplateIds.size ===
      0
    ) {
      return;
    }


    setSelectedTemplateIds(
      (
        current
      ) =>
        current.filter(
          (
            id
          ) =>
            !assignedTemplateIds.has(
              id
            )
        )
    );


    setScheduleByTemplate(
      (
        current
      ) => {

        const next = {
          ...current,
        };


        assignedTemplateIds.forEach(
          (
            id
          ) => {
            delete next[id];
          }
        );


        return next;
      }
    );

  }, [
    selectedClientId,
    assignedTemplateIds,
  ]);


  /*
  --------------------------------------------------
  SELECTED CLIENT
  --------------------------------------------------
  */

  const selectedClient =
    useMemo(() => {

      return clients.find(
        (
          client
        ) =>
          String(
            client.id
          ) ===
          selectedClientId
      );

    }, [
      clients,
      selectedClientId,
    ]);


  /*
  --------------------------------------------------
  SELECTED TEMPLATES
  --------------------------------------------------
  */

  const selectedTemplates =
    useMemo(() => {

      return selectedTemplateIds
        .map(
          (
            id
          ) =>
            templates.find(
              (
                template
              ) =>
                Number(
                  template.id
                ) ===
                Number(
                  id
                )
            )
        )
        .filter(
          (
            template
          ): template is
            WorkoutTemplateListItem =>
            Boolean(
              template
            )
        );

    }, [
      selectedTemplateIds,
      templates,
    ]);


  /*
  --------------------------------------------------
  TEMPLATE TOGGLE
  --------------------------------------------------
  */

  const toggleTemplate =
    (
      id: number
    ) => {

      if (
        assignedTemplateIds.has(
          id
        )
      ) {
        return;
      }


      setSelectedTemplateIds(
        (
          current
        ) => {

          if (
            current.includes(
              id
            )
          ) {

            return current.filter(
              (
                templateId
              ) =>
                templateId !==
                id
            );

          }


          return [
            ...current,
            id,
          ];

        }
      );


      setScheduleByTemplate(
        (
          current
        ) => {

          if (
            current[id]
          ) {
            return current;
          }


          return {
            ...current,

            [id]: [],
          };

        }
      );

    };


  /*
  --------------------------------------------------
  DAY TOGGLE
  --------------------------------------------------
  */

  const toggleTemplateDay =
    (
      templateIdValue: number,
      day: string
    ) => {

      setScheduleByTemplate(
        (
          current
        ) => {

          const currentDays =
            current[
              templateIdValue
            ] || [];


          const nextDays =
            currentDays.includes(
              day
            )
              ? currentDays.filter(
                  (
                    item
                  ) =>
                    item !==
                    day
                )
              : [
                  ...currentDays,
                  day,
                ];


          return {
            ...current,

            [templateIdValue]:
              nextDays,
          };

        }
      );

    };


  /*
  --------------------------------------------------
  REMOVE SELECTED TEMPLATE
  --------------------------------------------------
  */

  const removeTemplate =
    (
      templateIdValue: number
    ) => {

      setSelectedTemplateIds(
        (
          current
        ) =>
          current.filter(
            (
              id
            ) =>
              id !==
              templateIdValue
          )
      );


      setScheduleByTemplate(
        (
          current
        ) => {

          const next = {
            ...current,
          };


          delete next[
            templateIdValue
          ];


          return next;

        }
      );

    };


  /*
  --------------------------------------------------
  VALIDATION
  --------------------------------------------------
  */

  const validate =
    () => {

      if (
        !selectedClientId
      ) {

        toast({
          title:
            "Select a client",

          description:
            "Choose one of your assigned clients.",

          status:
            "warning",

          duration:
            2500,

          isClosable:
            true,
        });

        return false;

      }


      if (
        selectedTemplateIds.length ===
        0
      ) {

        toast({
          title:
            "Select a workout",

          description:
            "Choose at least one workout template.",

          status:
            "warning",

          duration:
            2500,

          isClosable:
            true,
        });

        return false;

      }


      if (!startDate) {

        toast({
          title:
            "Start date is required",

          status:
            "warning",

          duration:
            2500,

          isClosable:
            true,
        });

        return false;

      }


      if (
        endDate &&
        endDate < startDate
      ) {

        toast({
          title:
            "Invalid end date",

          description:
            "End date must be on or after the start date.",

          status:
            "warning",

          duration:
            3000,

          isClosable:
            true,
        });

        return false;

      }


      const missingDays =
        selectedTemplateIds.filter(
          (
            id
          ) =>
            !(
              scheduleByTemplate[
                id
              ]?.length
            )
        );


      if (
        missingDays.length >
        0
      ) {

        toast({
          title:
            "Select training days",

          description:
            "Each selected workout needs at least one training day.",

          status:
            "warning",

          duration:
            3000,

          isClosable:
            true,
        });

        return false;

      }


      return true;

    };


  /*
  --------------------------------------------------
  ASSIGN
  --------------------------------------------------
  */

  const handleAssign =
    async () => {

      if (
        !validate()
      ) {
        return;
      }


      try {

        setSaving(
          true
        );


        const plans =
          selectedTemplateIds.map(
            (
              id
            ) => ({
              templateId:
                id,

              scheduledDays:
                scheduleByTemplate[
                  id
                ] || [],
            })
          );


        const results =
          await Promise.allSettled(
            plans.map(
              (
                plan
              ) => {

                const payload:
                  CreateWorkoutAssignmentPayload =
                {
                  organizationId,

                  templateId:
                    plan.templateId,

                  clientMemberId:
                    Number(
                      selectedClientId
                    ),

                  startDate,

                  endDate:
                    endDate ||
                    null,

                  scheduledDays:
                    plan.scheduledDays,
                };


                return createWorkoutAssignment(
                  payload
                );

              }
            )
          );


        const successful =
          results.filter(
            (
              result
            ) =>
              result.status ===
              "fulfilled"
          );


        const failed =
          results.filter(
            (
              result
            ) =>
              result.status ===
              "rejected"
          );


        if (
          successful.length ===
          plans.length
        ) {

          toast({
            title:
              `${successful.length} workout${
                successful.length > 1
                  ? "s"
                  : ""
              } assigned`,

            description:
              `Training plan created for ${
                selectedClient?.name ||
                "the selected client"
              }.`,

            status:
              "success",

            duration:
              3500,

            isClosable:
              true,
          });


          onSuccess?.();

          onClose();

          return;
        }


        if (
          successful.length >
          0
        ) {

          toast({
            title:
              "Workout plan partially assigned",

            description:
              `${successful.length} assigned successfully, ${failed.length} failed.`,

            status:
              "warning",

            duration:
              4500,

            isClosable:
              true,
          });


          onSuccess?.();

          onClose();

          return;
        }


        const firstFailure =
          results.find(
            (
              result
            ) =>
              result.status ===
              "rejected"
          );


        let failureMessage =
          "Unable to assign workouts.";


        if (
          firstFailure &&
          firstFailure.status ===
            "rejected"
        ) {

          const reason =
            firstFailure.reason;


          failureMessage =
            reason?.response?.data?.error ||
            reason?.message ||
            failureMessage;

        }


        toast({
          title:
            "Unable to assign workouts",

          description:
            failureMessage,

          status:
            "error",

          duration:
            4000,

          isClosable:
            true,
        });


      } catch (error: any) {

        console.error(
          "Workout assignment failed:",
          error
        );


        toast({
          title:
            "Unable to assign workouts",

          description:
            error?.response?.data?.error ||
            error?.message ||
            "Something went wrong.",

          status:
            "error",

          duration:
            4000,

          isClosable:
            true,
        });


      } finally {

        setSaving(
          false
        );

      }

    };


  /*
  --------------------------------------------------
  TEMPLATE DISPLAY
  --------------------------------------------------
  */

  const getTemplateStatusText =
    (
      template: WorkoutTemplateListItem
    ) => {

      const id =
        Number(
          template.id
        );


      if (
        assignedTemplateIds.has(
          id
        )
      ) {
        return "Already assigned";
      }


      if (
        selectedTemplateIds.includes(
          id
        )
      ) {
        return "Selected";
      }


      return "Available";

    };


  /*
  --------------------------------------------------
  RENDER
  --------------------------------------------------
  */

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
    >

      <DrawerOverlay />


      <DrawerContent
        borderLeftRadius={{
          base: "0",
          md: "28px",
        }}
        overflow="hidden"
      >

        {/* -----------------------------------------
            HEADER
        ------------------------------------------ */}

        <DrawerHeader
          px={6}
          pt={6}
          pb={5}
          borderBottom="1px solid"
          borderColor="gray.100"
        >

          <HStack
            justify="space-between"
            align="start"
          >

            <HStack
              align="start"
              spacing={3}
            >

              <Box
                w="44px"
                h="44px"
                borderRadius="xl"
                bg="brand.50"
                color="brand.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >

                <Icon
                  as={FiUsers}
                  boxSize={21}
                />

              </Box>


              <Box>

                <Text
                  fontSize="xs"
                  fontWeight="800"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Assign workouts
                </Text>


                <Text
                  mt={1}
                  fontSize="xl"
                  fontWeight="900"
                  color="gray.900"
                >
                  Build client training plan
                </Text>


                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.500"
                  lineHeight="1.6"
                >
                  Choose multiple workouts and set
                  the training days for each one.
                </Text>

              </Box>

            </HStack>


            <Button
              variant="ghost"
              borderRadius="full"
              onClick={onClose}
              aria-label="Close"
              px={3}
            >

              <Icon
                as={FiX}
                boxSize={20}
              />

            </Button>

          </HStack>

        </DrawerHeader>


        {/* -----------------------------------------
            BODY
        ------------------------------------------ */}

        <DrawerBody
          px={6}
          py={6}
        >

          {loadingData ? (

            <VStack
              minH="420px"
              justify="center"
              spacing={4}
            >

              <Spinner
                size="lg"
                color="brand.500"
              />

              <Text
                color="gray.500"
                fontSize="sm"
              >
                Loading clients and workouts...
              </Text>

            </VStack>

          ) : (

            <VStack
              align="stretch"
              spacing={7}
            >

              {/* CLIENT */}

              <Box>

                <FormControl>

                  <FormLabel
                    fontSize="sm"
                    fontWeight="800"
                    mb={2}
                  >
                    Client
                  </FormLabel>


                  <Select
                    value={
                      selectedClientId
                    }
                    onChange={(
                      event
                    ) =>
                      setSelectedClientId(
                        event.target.value
                      )
                    }
                    placeholder="Choose one of your assigned clients"
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                    borderColor="gray.200"
                    isDisabled={
                      Boolean(
                        preselectedClientMemberId
                      )
                    }
                  >

                    {clients.map(
                      (
                        client
                      ) => (

                        <option
                          key={
                            client.id
                          }
                          value={
                            client.id
                          }
                        >

                          {client.name}

                          {client.nickname
                            ? ` • ${client.nickname}`
                            : ""}

                        </option>

                      )
                    )}

                  </Select>

                </FormControl>


                {selectedClient && (

                  <Box
                    mt={3}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="2xl"
                    p={4}
                  >

                    <HStack
                      justify="space-between"
                      align="start"
                    >

                      <Box>

                        <Text
                          fontWeight="800"
                          color="gray.800"
                        >
                          {selectedClient.name}
                        </Text>

                        {selectedClient.nickname && (

                          <Text
                            mt={0.5}
                            fontSize="sm"
                            color="gray.500"
                          >
                            {selectedClient.nickname}
                          </Text>

                        )}

                      </Box>


                      <Badge
                        colorScheme="blue"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        Assigned client
                      </Badge>

                    </HStack>


                    <HStack
                      spacing={2}
                      mt={3}
                      flexWrap="wrap"
                    >

                      {selectedClient.goalLabel && (

                        <Badge
                          variant="subtle"
                          colorScheme="purple"
                          borderRadius="full"
                        >
                          {selectedClient.goalLabel}
                        </Badge>

                      )}


                      {selectedClient.weightKg !==
                        null &&
                        selectedClient.weightKg !==
                          undefined && (

                          <Badge
                            variant="subtle"
                            colorScheme="gray"
                            borderRadius="full"
                          >
                            {selectedClient.weightKg} kg
                          </Badge>

                        )}

                    </HStack>

                  </Box>

                )}

              </Box>


              <Divider />


              {/* TEMPLATE LIBRARY */}

              <Box>

                <HStack
                  justify="space-between"
                  align="center"
                  mb={3}
                >

                  <Box>

                    <Text
                      fontWeight="800"
                      fontSize="sm"
                      color="gray.800"
                    >
                      Choose workouts
                    </Text>

                    <Text
                      mt={1}
                      fontSize="xs"
                      color="gray.500"
                    >
                      You can assign multiple workouts
                      to the same client.
                    </Text>

                  </Box>


                  <Badge
                    colorScheme={
                      selectedTemplateIds.length
                        ? "blue"
                        : "gray"
                    }
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {selectedTemplateIds.length} selected
                  </Badge>

                </HStack>


                <VStack
                  align="stretch"
                  spacing={3}
                  maxH="320px"
                  overflowY="auto"
                  pr={1}
                >

                  {templates.length ===
                  0 ? (

                    <Box
                      border="1px dashed"
                      borderColor="gray.300"
                      borderRadius="2xl"
                      p={6}
                      textAlign="center"
                    >

                      <Text
                        fontWeight="700"
                        color="gray.700"
                      >
                        No workout templates found
                      </Text>

                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.500"
                      >
                        Create a workout template first.
                      </Text>

                    </Box>

                  ) : (

                    templates.map(
                      (
                        template
                      ) => {

                        const id =
                          Number(
                            template.id
                          );

                        const selected =
                          selectedTemplateIds.includes(
                            id
                          );

                        const assigned =
                          assignedTemplateIds.has(
                            id
                          );

                        const statusText =
                          getTemplateStatusText(
                            template
                          );


                        return (

                          <Button
                            key={id}
                            variant="ghost"
                            h="auto"
                            p={0}
                            textAlign="left"
                            justifyContent="flex-start"
                            whiteSpace="normal"
                            _hover={{
                              bg: "transparent",
                            }}
                            _active={{
                              bg: "transparent",
                            }}
                            onClick={() =>
                              toggleTemplate(
                                id
                              )
                            }
                            isDisabled={
                              assigned
                            }
                            cursor={
                              assigned
                                ? "not-allowed"
                                : "pointer"
                            }
                          >

                            <Box
                              w="100%"
                              border="1px solid"
                              borderColor={
                                selected
                                  ? "blue.300"
                                  : assigned
                                    ? "gray.200"
                                    : "gray.200"
                              }
                              bg={
                                selected
                                  ? "blue.50"
                                  : assigned
                                    ? "gray.50"
                                    : "white"
                              }
                              borderRadius="2xl"
                              p={4}
                              transition="all 0.15s"
                            >

                              <HStack
                                align="start"
                                spacing={3}
                              >

                                <Box
                                  w="22px"
                                  h="22px"
                                  borderRadius="full"
                                  border="2px solid"
                                  borderColor={
                                    selected
                                      ? "blue.500"
                                      : assigned
                                        ? "gray.300"
                                        : "gray.300"
                                  }
                                  bg={
                                    selected
                                      ? "blue.500"
                                      : "white"
                                  }
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  flexShrink={0}
                                  mt={0.5}
                                >

                                  {selected && (

                                    <Icon
                                      as={
                                        FiCheck
                                      }
                                      color="white"
                                      boxSize={14}
                                    />

                                  )}

                                </Box>


                                <Box
                                  flex={1}
                                  minW={0}
                                >

                                  <HStack
                                    justify="space-between"
                                    align="start"
                                    spacing={3}
                                  >

                                    <Box
                                      minW={0}
                                    >

                                      <Text
                                        fontWeight="800"
                                        color={
                                          assigned
                                            ? "gray.500"
                                            : "gray.800"
                                        }
                                        noOfLines={1}
                                      >
                                        {
                                          template.name
                                        }
                                      </Text>

                                      <Text
                                        mt={1}
                                        fontSize="xs"
                                        color="gray.500"
                                      >
                                        {
                                          getTemplateMuscleLabel(
                                            template
                                          )
                                        }

                                        {" • "}

                                        {
                                          getTemplateGoalLabel(
                                            template
                                          )
                                        }
                                      </Text>

                                    </Box>


                                    <Badge
                                      flexShrink={0}
                                      borderRadius="full"
                                      colorScheme={
                                        assigned
                                          ? "gray"
                                          : selected
                                            ? "blue"
                                            : "green"
                                      }
                                    >
                                      {
                                        statusText
                                      }
                                    </Badge>

                                  </HStack>


                                  <HStack
                                    mt={3}
                                    spacing={4}
                                    color="gray.500"
                                  >

                                    <HStack
                                      spacing={1}
                                    >

                                      <Icon
                                        as={
                                          FiClock
                                        }
                                        boxSize={13}
                                      />

                                      <Text
                                        fontSize="xs"
                                      >
                                        {
                                          Number(
                                            template.estimated_duration_minutes ||
                                            0
                                          )
                                        }{" "}
                                        min
                                      </Text>

                                    </HStack>


                                    <Text
                                      fontSize="xs"
                                    >
                                      {
                                        Number(
                                          template.exercise_count ||
                                          0
                                        )
                                      }{" "}
                                      exercises
                                    </Text>

                                  </HStack>

                                </Box>

                              </HStack>

                            </Box>

                          </Button>

                        );

                      }
                    )

                  )}

                </VStack>

              </Box>


              <Divider />


              {/* DATE RANGE */}

              <Box>

                <HStack
                  mb={4}
                  spacing={2}
                >

                  <Icon
                    as={
                      FiCalendar
                    }
                    color="brand.500"
                  />

                  <Box>

                    <Text
                      fontWeight="800"
                      fontSize="sm"
                    >
                      Assignment period
                    </Text>

                    <Text
                      mt={0.5}
                      fontSize="xs"
                      color="gray.500"
                    >
                      The same date range applies to all
                      selected workouts.
                    </Text>

                  </Box>

                </HStack>


                <HStack
                  align="start"
                  spacing={4}
                >

                  <FormControl>

                    <FormLabel
                      fontSize="xs"
                      fontWeight="700"
                      color="gray.500"
                    >
                      Start date
                    </FormLabel>

                    <Input
                      type="date"
                      value={
                        startDate
                      }
                      onChange={(
                        event
                      ) => {

                        const value =
                          event.target.value;


                        setStartDate(
                          value
                        );


                        if (
                          !endDate ||
                          endDate <
                            value
                        ) {

                          setEndDate(
                            getDefaultEndDate(
                              value
                            )
                          );

                        }

                      }}
                      size="lg"
                      borderRadius="xl"
                      bg="gray.50"
                    />

                  </FormControl>


                  <FormControl>

                    <FormLabel
                      fontSize="xs"
                      fontWeight="700"
                      color="gray.500"
                    >
                      End date
                    </FormLabel>

                    <Input
                      type="date"
                      min={
                        startDate
                      }
                      value={
                        endDate
                      }
                      onChange={(
                        event
                      ) =>
                        setEndDate(
                          event.target.value
                        )
                      }
                      size="lg"
                      borderRadius="xl"
                      bg="gray.50"
                    />

                  </FormControl>

                </HStack>

              </Box>


              {/* SELECTED PLAN */}

              {selectedTemplates.length >
                0 && (

                <>

                  <Divider />


                  <Box>

                    <HStack
                      justify="space-between"
                      mb={4}
                    >

                      <Box>

                        <Text
                          fontWeight="800"
                          fontSize="sm"
                        >
                          Weekly training plan
                        </Text>

                        <Text
                          mt={1}
                          fontSize="xs"
                          color="gray.500"
                        >
                          Give each workout its own training
                          days.
                        </Text>

                      </Box>


                      <Badge
                        colorScheme="blue"
                        borderRadius="full"
                      >
                        {
                          selectedTemplates.length
                        }{" "}
                        workout
                        {
                          selectedTemplates.length >
                          1
                            ? "s"
                            : ""
                        }
                      </Badge>

                    </HStack>


                    <VStack
                      align="stretch"
                      spacing={4}
                    >

                      {selectedTemplates.map(
                        (
                          template
                        ) => {

                          const id =
                            Number(
                              template.id
                            );


                          const selectedDays =
                            scheduleByTemplate[
                              id
                            ] || [];


                          return (

                            <Box
                              key={id}
                              border="1px solid"
                              borderColor="gray.200"
                              borderRadius="2xl"
                              p={4}
                              bg="white"
                            >

                              <HStack
                                justify="space-between"
                                align="start"
                              >

                                <Box>

                                  <Text
                                    fontWeight="800"
                                    color="gray.800"
                                  >
                                    {
                                      template.name
                                    }
                                  </Text>

                                  <Text
                                    mt={1}
                                    fontSize="xs"
                                    color="gray.500"
                                  >
                                    {
                                      getTemplateMuscleLabel(
                                        template
                                      )
                                    }

                                    {" • "}

                                    {
                                      getTemplateGoalLabel(
                                        template
                                      )
                                    }
                                  </Text>

                                </Box>


                                <Button
                                  variant="ghost"
                                  size="sm"
                                  borderRadius="full"
                                  colorScheme="gray"
                                  onClick={() =>
                                    removeTemplate(
                                      id
                                    )
                                  }
                                  aria-label={
                                    `Remove ${template.name}`
                                  }
                                >

                                  <Icon
                                    as={
                                      FiX
                                    }
                                  />

                                </Button>

                              </HStack>


                              <Text
                                mt={4}
                                fontSize="xs"
                                fontWeight="700"
                                color="gray.500"
                              >
                                Training days
                              </Text>


                              <HStack
                                mt={2}
                                spacing={2}
                                flexWrap="wrap"
                              >

                                {DAYS.map(
                                  (
                                    day
                                  ) => {

                                    const selected =
                                      selectedDays.includes(
                                        day.key
                                      );


                                    return (

                                      <Button
                                        key={
                                          day.key
                                        }
                                        w="42px"
                                        h="42px"
                                        minW="42px"
                                        p={0}
                                        borderRadius="full"
                                        size="sm"
                                        variant={
                                          selected
                                            ? "solid"
                                            : "outline"
                                        }
                                        colorScheme="blue"
                                        bg={
                                          selected
                                            ? "brand.500"
                                            : "white"
                                        }
                                        borderColor={
                                          selected
                                            ? "brand.500"
                                            : "gray.200"
                                        }
                                        color={
                                          selected
                                            ? "white"
                                            : "gray.600"
                                        }
                                        onClick={() =>
                                          toggleTemplateDay(
                                            id,
                                            day.key
                                          )
                                        }
                                      >
                                        {
                                          day.label
                                        }
                                      </Button>

                                    );

                                  }
                                )}

                              </HStack>


                              <Text
                                mt={3}
                                fontSize="xs"
                                color={
                                  selectedDays.length
                                    ? "gray.500"
                                    : "orange.500"
                                }
                              >

                                {selectedDays.length
                                  ? selectedDays
                                      .map(
                                        (
                                          dayKey
                                        ) =>
                                          DAYS.find(
                                            (
                                              day
                                            ) =>
                                              day.key ===
                                              dayKey
                                          )?.name ||
                                          dayKey
                                      )
                                      .join(
                                        " • "
                                      )
                                  : "Select at least one training day"}

                              </Text>

                            </Box>

                          );

                        }
                      )}

                    </VStack>

                  </Box>

                </>

              )}


              {/* SUMMARY */}

              <Box
                bg="brand.50"
                borderRadius="2xl"
                p={5}
                border="1px solid"
                borderColor="brand.100"
              >

                <Text
                  fontSize="xs"
                  fontWeight="800"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  color="brand.700"
                >
                  Assignment summary
                </Text>


                <VStack
                  align="stretch"
                  spacing={2}
                  mt={3}
                >

                  <HStack
                    justify="space-between"
                  >

                    <Text
                      fontSize="sm"
                      color="gray.600"
                    >
                      Client
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="800"
                    >
                      {
                        selectedClient?.name ||
                        "Not selected"
                      }
                    </Text>

                  </HStack>


                  <HStack
                    justify="space-between"
                  >

                    <Text
                      fontSize="sm"
                      color="gray.600"
                    >
                      Workouts
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="800"
                    >
                      {
                        selectedTemplates.length
                      }
                    </Text>

                  </HStack>


                  <HStack
                    justify="space-between"
                  >

                    <Text
                      fontSize="sm"
                      color="gray.600"
                    >
                      Period
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="800"
                    >
                      {startDate
                        ? `${startDate} → ${
                            endDate ||
                            "Open"
                          }`
                        : "Not selected"}
                    </Text>

                  </HStack>

                </VStack>

              </Box>

            </VStack>

          )}

        </DrawerBody>


        {/* -----------------------------------------
            FOOTER
        ------------------------------------------ */}

        <DrawerFooter
          px={6}
          py={5}
          borderTop="1px solid"
          borderColor="gray.100"
          gap={3}
        >

          <Button
            variant="ghost"
            borderRadius="xl"
            onClick={onClose}
            isDisabled={
              saving
            }
          >
            Cancel
          </Button>


          <Button
            flex={1}
            colorScheme="blue"
            borderRadius="xl"
            h="48px"
            leftIcon={
              saving
                ? undefined
                : <FiCheck />
            }
            onClick={
              handleAssign
            }
            isLoading={
              saving
            }
            loadingText="Assigning..."
            isDisabled={
              loadingData
            }
          >
            Assign{" "}
            {
              selectedTemplates.length
            }{" "}
            Workout
            {
              selectedTemplates.length ===
              1
                ? ""
                : "s"
            }
          </Button>

        </DrawerFooter>

      </DrawerContent>

    </Drawer>
  );
};


export default WorkoutAssignmentDrawer;