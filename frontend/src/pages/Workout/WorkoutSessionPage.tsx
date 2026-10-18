//  Version 1

// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   Badge,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   HStack,
//   Image,
//   Input,
//   Progress,
//   SimpleGrid,
//   Spinner,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { FiArrowLeft, FiCheck, FiPause, FiPlay, FiPlus, FiSkipForward, FiX } from "react-icons/fi";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   completeWorkoutSet,
//   extendWorkoutRest,
//   finishWorkoutSession,
//   getActiveWorkoutSession,
//   getWorkoutSession,
//   pauseWorkoutSession,
//   skipWorkoutRest,
//   skipWorkoutSet,
//   startWorkoutSession,
//   resumeWorkoutSession,
// } from "../../services/userWorkout.service";
// import type {
//   ClientWorkoutExercise,
//   WorkoutSession,
// } from "../../types/workoutExecution.types";

// const formatClock = (seconds: number) => {
//   const safe = Math.max(0, Math.floor(seconds));
//   const minutes = Math.floor(safe / 60);
//   const secs = safe % 60;
//   return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
// };

// const targetForExercise = (exercise: ClientWorkoutExercise) => {
//   const tracking = String(exercise.tracking_type || "").toUpperCase();
//   const sets = exercise.target_sets || 1;
//   if (tracking === "DURATION") return `${sets} × ${exercise.target_duration_seconds || 0}s`;
//   if (tracking === "DISTANCE") return `${sets} × ${exercise.target_distance || 0}`;
//   if (tracking === "REPS_ONLY") return `${sets} × ${exercise.target_reps || 0} reps`;
//   if (tracking === "REPS_DURATION") return `${sets} × ${exercise.target_reps || 0} reps • ${exercise.target_duration_seconds || 0}s`;
//   return `${sets} × ${exercise.target_reps || 0} reps${exercise.target_weight ? ` • ${exercise.target_weight} kg` : ""}`;
// };

// const getCurrentExercise = (session: WorkoutSession | null) => {
//   if (!session) return null;
//   return session.assignment.exercises[session.current_exercise_index] || null;
// };

// const WorkoutSessionPage = () => {
//   const { assignmentId } = useParams<{ assignmentId: string }>();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const cancelRef = useRef<HTMLButtonElement | null>(null);

//   const [session, setSession] = useState<WorkoutSession | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [finishOpen, setFinishOpen] = useState(false);
//   const [localSeconds, setLocalSeconds] = useState(0);
//   const [restLocalRemaining, setRestLocalRemaining] = useState(0);
//   const [actuals, setActuals] = useState<Record<string, string>>({});

//   const load = useCallback(async () => {
//     try {
//       setLoading(true);
//       const id = Number(assignmentId);
//       const active = await getActiveWorkoutSession();

//       if (active && Number(active.workout_assignment_id) === id) {
//         setSession(active);
//         return;
//       }

//       const created = await startWorkoutSession(id);
//       setSession(created);
//     } catch (error: any) {
//       console.error(error);

//       if (error?.response?.data?.code === "ACTIVE_WORKOUT_EXISTS") {
//         try {
//           const active = await getActiveWorkoutSession();
//           if (active?.workout_assignment_id) {
//             navigate(`/workouts/${active.workout_assignment_id}/session`, { replace: true });
//             return;
//           }
//         } catch {
//           // Fall through to the normal error toast below.
//         }

//         toast({
//           title: "Another workout is already in progress",
//           description: "Resume the active workout before starting another one.",
//           status: "info",
//           duration: 3500,
//           isClosable: true,
//         });
//       } else {
//         toast({
//           title: "Unable to start workout",
//           description: error?.response?.data?.error || error?.message || "Please try again.",
//           status: "error",
//           duration: 3500,
//           isClosable: true,
//         });
//         navigate(`/workouts/${assignmentId}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [assignmentId, navigate, toast]);

//   useEffect(() => {
//     load();
//   }, [load]);

//   useEffect(() => {
//     if (!session) return;

//     setLocalSeconds(Number(session.current_elapsed_seconds || 0));

//     if (session.status !== "RUNNING") return;

//     const timer = window.setInterval(() => {
//       setLocalSeconds((value) => value + 1);
//     }, 1000);

//     return () => window.clearInterval(timer);
//   }, [session?.id, session?.status]);

//   useEffect(() => {
//     if (!session?.rest_active) {
//       setRestLocalRemaining(0);
//       return;
//     }

//     setRestLocalRemaining(Number(session.rest_remaining_seconds || 0));

//     const timer = window.setInterval(() => {
//       setRestLocalRemaining((value) => Math.max(0, value - 1));
//     }, 1000);

//     return () => window.clearInterval(timer);
//   }, [session?.id, session?.rest_active, session?.rest_started_at, session?.rest_target_seconds, session?.rest_remaining_seconds]);

//   useEffect(() => {
//     if (!session?.rest_active || restLocalRemaining > 0) return;

//     let cancelled = false;
//     getWorkoutSession(session.id)
//       .then((fresh) => {
//         if (!cancelled) setSession(fresh);
//       })
//       .catch(() => {});

//     return () => {
//       cancelled = true;
//     };
//   }, [session?.id, session?.rest_active, restLocalRemaining]);

//   /* Do not pause on visibility change or phone calls. Rehydrate on return only. */
//   useEffect(() => {
//     const handleVisible = async () => {
//       if (document.visibilityState !== "visible" || !session) return;
//       try {
//         const fresh = await getWorkoutSession(session.id);
//         setSession(fresh);
//         setLocalSeconds(Number(fresh.current_elapsed_seconds || 0));
//       } catch {
//         // Keep the current local state if the refresh fails.
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisible);
//     return () => document.removeEventListener("visibilitychange", handleVisible);
//   }, [session?.id]);

//   const currentExercise = useMemo(() => getCurrentExercise(session), [session]);
//   const currentSetKey = `${currentExercise?.id ?? ""}-${session?.current_set_index ?? ""}`;

//   useEffect(() => {
//     if (!currentExercise || !session) return;
//     const tracking = String(currentExercise.tracking_type || "").toUpperCase();
//     const current = currentExercise.sets?.find((item) => item.set_index === session.current_set_index);

//     setActuals((previous) => ({
//       reps:
//         previous.reps !== undefined && previous.__key === currentSetKey
//           ? previous.reps
//           : current?.reps_completed != null
//             ? String(current.reps_completed)
//             : currentExercise.target_reps != null
//               ? String(currentExercise.target_reps)
//               : "",
//       weight:
//         tracking === "REPS_WEIGHT"
//           ? previous.weight !== undefined && previous.__key === currentSetKey
//             ? previous.weight
//             : current?.weight_kg != null
//               ? String(current.weight_kg)
//               : currentExercise.target_weight != null
//                 ? String(currentExercise.target_weight)
//                 : ""
//           : "",
//       duration:
//         tracking === "DURATION" || tracking === "REPS_DURATION"
//           ? previous.duration !== undefined && previous.__key === currentSetKey
//             ? previous.duration
//             : current?.duration_seconds != null
//               ? String(current.duration_seconds)
//               : currentExercise.target_duration_seconds != null
//                 ? String(currentExercise.target_duration_seconds)
//                 : ""
//           : "",
//       distance:
//         tracking === "DISTANCE"
//           ? previous.distance !== undefined && previous.__key === currentSetKey
//             ? previous.distance
//             : current?.distance != null
//               ? String(current.distance)
//               : currentExercise.target_distance != null
//                 ? String(currentExercise.target_distance)
//                 : ""
//           : "",
//       __key: currentSetKey,
//     }));
//     // Only seed when the current set changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentSetKey]);

//   const perform = async (action: () => Promise<WorkoutSession>) => {
//     if (!session) return;
//     try {
//       setSaving(true);
//       const updated = await action();
//       setSession(updated);
//       setLocalSeconds(Number(updated.current_elapsed_seconds || 0));
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         title: "Could not update workout",
//         description: error?.response?.data?.error || error?.message || "Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCompleteSet = async () => {
//     if (!session || !currentExercise) return;
//     const tracking = String(currentExercise.tracking_type || "").toUpperCase();

//     await perform(() =>
//       completeWorkoutSet(session.id, {
//         repsCompleted:
//           actuals.reps !== "" ? Number(actuals.reps) : undefined,
//         weightKg:
//           tracking === "REPS_WEIGHT" && actuals.weight !== "" ? Number(actuals.weight) : undefined,
//         durationSeconds:
//           (tracking === "DURATION" || tracking === "REPS_DURATION") && actuals.duration !== ""
//             ? Number(actuals.duration)
//             : undefined,
//         distance:
//           tracking === "DISTANCE" && actuals.distance !== "" ? Number(actuals.distance) : undefined,
//       })
//     );
//   };

//   if (loading || !session) {
//     return (
//       <Flex minH="70vh" align="center" justify="center" bg="gray.50">
//         <VStack spacing={4}>
//           <Spinner size="xl" thickness="3px" color="blue.400" />
//           <Text color="gray.500">Opening your workout…</Text>
//         </VStack>
//       </Flex>
//     );
//   }

//   const totalExercises = session.assignment.exercises.length;
//   const exerciseNumber = Math.min(totalExercises, session.current_exercise_index + 1);
//   const workoutProgress = session.total_sets
//     ? ((session.completed_sets + session.skipped_sets) / session.total_sets) * 100
//     : 0;
//   const finishedAllSets = session.current_exercise_index >= totalExercises;
//   const restRemaining = restLocalRemaining;

//   return (
//     <Box minH="100vh" bg="gray.900" color="white" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
//       <Box maxW="900px" mx="auto">
//         <Flex justify="space-between" align="center" mb={5}>
//           <Button color="white" variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate(`/workouts/${assignmentId}`)}>
//             Workout
//           </Button>
//           <HStack spacing={2}>
//             <Badge bg="whiteAlpha.150" color="white" borderRadius="full" px={3} py={1}>
//               {session.status === "PAUSED" ? "PAUSED" : "LIVE"}
//             </Badge>
//             <Button
//               size="sm"
//               variant="outline"
//               borderColor="whiteAlpha.300"
//               color="white"
//               borderRadius="full"
//               leftIcon={session.status === "RUNNING" ? <FiPause /> : <FiPlay />}
//               onClick={() => perform(() => session.status === "RUNNING" ? pauseWorkoutSession(session.id) : resumeWorkoutSession(session.id))}
//               isLoading={saving}
//             >
//               {session.status === "RUNNING" ? "Pause" : "Resume"}
//             </Button>
//             <Button size="sm" colorScheme="red" borderRadius="full" onClick={() => setFinishOpen(true)}>
//               Finish
//             </Button>
//           </HStack>
//         </Flex>

//         <Box textAlign="center" mb={7}>
//           <Text color="whiteAlpha.600" fontSize="sm">{session.assignment.workout_name}</Text>
//           <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.04em" mt={1}>
//             {formatClock(localSeconds)}
//           </Heading>
//           <Text mt={2} color="whiteAlpha.600" fontSize="sm">
//             {exerciseNumber > totalExercises ? "All exercises recorded" : `Exercise ${exerciseNumber} of ${totalExercises}`}
//           </Text>
//         </Box>

//         <Progress value={workoutProgress} size="xs" borderRadius="full" bg="whiteAlpha.150" mb={7} />

//         {session.rest_active && !finishedAllSets ? (
//           <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" borderRadius="3xl" p={{ base: 7, md: 9 }} textAlign="center" mb={6}>
//             <Badge bg="blue.500" color="white" borderRadius="full" px={3} py={1}>REST</Badge>
//             <Heading fontSize={{ base: "5xl", md: "7xl" }} mt={3} letterSpacing="-0.05em">
//               {formatClock(restRemaining)}
//             </Heading>
//             <Text color="whiteAlpha.600" mt={1}>Breathe. Recover. Then go again.</Text>
//             <HStack justify="center" mt={6} spacing={3}>
//               <Button variant="outline" borderColor="whiteAlpha.300" color="white" leftIcon={<FiPlus />} onClick={() => perform(() => extendWorkoutRest(session.id, 30))}>
//                 30 sec
//               </Button>
//               <Button variant="solid" colorScheme="blue" leftIcon={<FiSkipForward />} onClick={() => perform(() => skipWorkoutRest(session.id))}>
//                 Skip Rest
//               </Button>
//             </HStack>
//           </Box>
//         ) : finishedAllSets ? (
//           <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" borderRadius="3xl" p={{ base: 7, md: 9 }} textAlign="center">
//             <Text fontSize="4xl">✓</Text>
//             <Heading mt={3}>Workout work complete</Heading>
//             <Text color="whiteAlpha.600" mt={2}>Review your session and finish when you are ready.</Text>
//             <Button mt={6} size="lg" colorScheme="blue" borderRadius="xl" onClick={() => setFinishOpen(true)}>
//               Finish Workout
//             </Button>
//           </Box>
//         ) : currentExercise ? (
//           <VStack align="stretch" spacing={5}>
//             <Box bg="white" color="gray.800" borderRadius="3xl" overflow="hidden">
//               {currentExercise.image_url ? (
//                 <Image src={currentExercise.image_url} alt={currentExercise.exercise_name} w="100%" maxH="320px" objectFit="cover" />
//               ) : null}
//               <Box p={{ base: 6, md: 8 }}>
//                 <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
//                   {currentExercise.primary_muscle_group || "EXERCISE"}
//                 </Badge>
//                 <Heading size={{ base: "lg", md: "xl" }} mt={3}>{currentExercise.exercise_name}</Heading>
//                 <Text color="gray.500" mt={2}>{targetForExercise(currentExercise)}</Text>

//                 {currentExercise.instructions ? (
//                   <Box mt={5} bg="gray.50" borderRadius="2xl" p={4}>
//                     <Text fontSize="sm" fontWeight="600" color="gray.700">How to perform</Text>
//                     <Text fontSize="sm" color="gray.500" mt={1} lineHeight="1.7">{currentExercise.instructions}</Text>
//                   </Box>
//                 ) : null}

//                 <Box mt={6}>
//                   <Text fontSize="xs" color="gray.400" mb={3} textTransform="uppercase" letterSpacing="0.08em">
//                     Set {session.current_set_index + 1} of {currentExercise.target_sets || 1}
//                   </Text>

//                   <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
//                     {(String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" || String(currentExercise.tracking_type).toUpperCase() === "REPS_ONLY" || String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
//                       <FormControl>
//                         <FormLabel fontSize="xs" color="gray.500">Reps</FormLabel>
//                         <Input value={actuals.reps || ""} onChange={(e) => setActuals((p) => ({ ...p, reps: e.target.value }))} inputMode="decimal" borderRadius="xl" />
//                       </FormControl>
//                     ) : null}

//                     {String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" ? (
//                       <FormControl>
//                         <FormLabel fontSize="xs" color="gray.500">Weight (kg)</FormLabel>
//                         <Input value={actuals.weight || ""} onChange={(e) => setActuals((p) => ({ ...p, weight: e.target.value }))} inputMode="decimal" borderRadius="xl" />
//                       </FormControl>
//                     ) : null}

//                     {(String(currentExercise.tracking_type).toUpperCase() === "DURATION" || String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
//                       <FormControl>
//                         <FormLabel fontSize="xs" color="gray.500">Duration (sec)</FormLabel>
//                         <Input value={actuals.duration || ""} onChange={(e) => setActuals((p) => ({ ...p, duration: e.target.value }))} inputMode="decimal" borderRadius="xl" />
//                       </FormControl>
//                     ) : null}

//                     {String(currentExercise.tracking_type).toUpperCase() === "DISTANCE" ? (
//                       <FormControl>
//                         <FormLabel fontSize="xs" color="gray.500">Distance</FormLabel>
//                         <Input value={actuals.distance || ""} onChange={(e) => setActuals((p) => ({ ...p, distance: e.target.value }))} inputMode="decimal" borderRadius="xl" />
//                       </FormControl>
//                     ) : null}
//                   </SimpleGrid>
//                 </Box>

//                 <Flex mt={7} gap={3} direction={{ base: "column", sm: "row" }}>
//                   <Button flex="1" size="lg" colorScheme="blue" borderRadius="xl" leftIcon={<FiCheck />} onClick={handleCompleteSet} isLoading={saving}>
//                     Complete Set
//                   </Button>
//                   <Button size="lg" variant="ghost" color="gray.500" leftIcon={<FiX />} onClick={() => perform(() => skipWorkoutSet(session.id))} isLoading={saving}>
//                     Skip Set
//                   </Button>
//                 </Flex>
//               </Box>
//             </Box>
//           </VStack>
//         ) : null}
//       </Box>

//       <AlertDialog isOpen={finishOpen} leastDestructiveRef={cancelRef} onClose={() => setFinishOpen(false)} isCentered>
//         <AlertDialogOverlay />
//         <AlertDialogContent borderRadius="2xl">
//           <AlertDialogHeader>Finish this workout?</AlertDialogHeader>
//           <AlertDialogBody color="gray.500">
//             You have completed {session.completed_sets} of {session.total_sets} sets ({Math.round(session.completion_percent)}%). You can finish now and review the session summary.
//           </AlertDialogBody>
//           <AlertDialogFooter>
//             <Button ref={cancelRef} variant="ghost" onClick={() => setFinishOpen(false)}>
//               Keep Going
//             </Button>
//             <Button colorScheme="red" ml={3} isLoading={saving} onClick={async () => {
//               try {
//                 setSaving(true);
//                 const finished = await finishWorkoutSession(session.id);
//                 setFinishOpen(false);
//                 navigate(`/workouts/complete/${finished.id}`, { replace: true });
//               } catch (error: any) {
//                 toast({
//                   title: "Unable to finish workout",
//                   description: error?.response?.data?.error || error?.message || "Please try again.",
//                   status: "error",
//                   duration: 3500,
//                   isClosable: true,
//                 });
//               } finally {
//                 setSaving(false);
//               }
//             }}>
//               Finish Workout
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </Box>
//   );
// };

// export default WorkoutSessionPage;


// Version 2

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronRight,
  FiInfo,
  FiPause,
  FiPlay,
  FiPlus,
  FiSkipForward,
  FiX,
} from "react-icons/fi";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExerciseDetailSheet from "../../components/Workout/ExerciseDetailSheet";
import {
  completeWorkoutSet,
  extendWorkoutRest,
  finishWorkoutSession,
  getActiveWorkoutSession,
  getWorkoutSession,
  pauseWorkoutSession,
  skipWorkoutRest,
  skipWorkoutSet,
  startWorkoutSession,
  resumeWorkoutSession,
} from "../../services/userWorkout.service";
import type {
  ClientWorkoutExercise,
  WorkoutSession,
} from "../../types/workoutExecution.types";

const formatClock = (seconds: number) => {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const targetForExercise = (exercise: ClientWorkoutExercise) => {
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

const getCurrentExercise = (session: WorkoutSession | null) => {
  if (!session) return null;
  return session.assignment.exercises[session.current_exercise_index] || null;
};

const WorkoutSessionPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const exerciseSheet = useDisclosure();

  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [localSeconds, setLocalSeconds] = useState(0);
  const [restLocalRemaining, setRestLocalRemaining] = useState(0);
  const [actuals, setActuals] = useState<Record<string, string>>({});
  const [selectedExercise, setSelectedExercise] = useState<ClientWorkoutExercise | null>(null);

  const sessionRef = useRef<WorkoutSession | null>(null);
  const initializedRef = useRef(false);
  const initializationPromiseRef = useRef<Promise<void> | null>(null);

  const applySession = useCallback((next: WorkoutSession) => {
    sessionRef.current = next;
    initializedRef.current = true;
    setSession(next);
    setLocalSeconds(Number(next.current_elapsed_seconds || 0));
    setRestLocalRemaining(Number(next.rest_remaining_seconds || 0));
  }, []);

  /* -------------------------------------------------------
     OPEN / RESUME
  ------------------------------------------------------- */

  const withTimeout = useCallback(
    async <T,>(promise: Promise<T>, label: string, timeoutMs = 20000): Promise<T> => {
      let timer: number | undefined;

      try {
        return await Promise.race([
          promise,
          new Promise<T>((_, reject) => {
            timer = window.setTimeout(() => {
              reject(
                new Error(
                  `${label} timed out after ${Math.round(timeoutMs / 1000)} seconds.`
                )
              );
            }, timeoutMs);
          }),
        ]);
      } finally {
        if (timer !== undefined) {
          window.clearTimeout(timer);
        }
      }
    },
    []
  );

  /*
     The active-session endpoint used by the existing working flow exposes
     workout_assignment_id at the top level. Keep this lookup deliberately
     conservative. A truthy response without this field must NOT block the
     start request for the route assignment.
  */
  const getActiveAssignmentId = (value: any): number | null => {
    const numeric = Number(value?.workout_assignment_id);
    return Number.isInteger(numeric) && numeric > 0 ? numeric : null;
  };

  const isUsableSession = (value: any): value is WorkoutSession => {
    return Boolean(
      value &&
        Number.isInteger(Number(value.id)) &&
        Number(value.id) > 0 &&
        value.assignment &&
        Array.isArray(value.assignment.exercises)
    );
  };

  const load = useCallback(async () => {
    if (initializedRef.current) return;

    if (initializationPromiseRef.current) {
      return initializationPromiseRef.current;
    }

    const promise = (async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const id = Number(assignmentId);

        console.log("[WorkoutSessionPage] initialize", {
          pathname: window.location.pathname,
          routeAssignmentId: assignmentId,
          numericAssignmentId: id,
        });

        if (!Number.isInteger(id) || id <= 0) {
          throw new Error(`Invalid workout assignment: ${String(assignmentId)}`);
        }

        /* =====================================================
           STEP 1 — CHECK ACTIVE SESSION
           This intentionally matches the previously working flow.
           A malformed truthy response without workout_assignment_id
           does NOT stop the requested workout from being started.
        ===================================================== */
        console.log("[WorkoutSessionPage] getActiveWorkoutSession: start");

        const active = await withTimeout(
          getActiveWorkoutSession(),
          "Checking active workout"
        );

        const activeAssignmentId = getActiveAssignmentId(active);

        console.log("[WorkoutSessionPage] getActiveWorkoutSession: done", {
          sessionId: active?.id ?? null,
          activeAssignmentId,
          rawActive: active,
        });

        /*
          IMPORTANT: only a valid top-level workout_assignment_id means
          "there is an active workout that we can resolve here".

          This is the key difference from the broken version. It must NOT do:

            if (active) { throw ... }

          because the API can return a truthy object without that property.
        */
        if (activeAssignmentId !== null) {
          if (activeAssignmentId === id) {
            /*
              Same workout is already active — resume it.
              Use the active response directly, just like the old page.
            */
            applySession(active);

            console.log(
              "[WorkoutSessionPage] existing active session applied",
              active?.id ?? null
            );

            return;
          }

          /*
            A different workout is already active. This is the only case
            where we navigate to another session route. Because the id was
            validated above, /undefined can never be produced here.
          */
          console.log(
            "[WorkoutSessionPage] different active workout found; redirecting",
            activeAssignmentId
          );

          navigate(`/workouts/${activeAssignmentId}/session`, {
            replace: true,
          });

          return;
        }

        /* =====================================================
           STEP 2 — START REQUESTED ASSIGNMENT
           This is the request you saw in the previously working code:
           POST /workout/my/assignments/14/sessions
        ===================================================== */
        console.log(
          "[WorkoutSessionPage] no resolvable active session; starting assignment",
          id
        );

        try {
          console.log("[WorkoutSessionPage] startWorkoutSession: start", id);

          const created = await withTimeout(
            startWorkoutSession(id),
            `Starting workout ${id}`
          );

          console.log(
            "[WorkoutSessionPage] startWorkoutSession: done",
            created
          );

          if (!created || !created.id) {
            throw new Error(
              "Workout start returned an invalid session response."
            );
          }

          applySession(created);

          console.log(
            "[WorkoutSessionPage] new session applied",
            created.id
          );
        } catch (startError: any) {
          console.error(
            "[WorkoutSessionPage] startWorkoutSession failed",
            startError
          );

          /*
            The backend is the source of truth for the active-session
            singleton. If it rejects our start because another session exists,
            fetch it and redirect/resume using only a verified id.
          */
          if (startError?.response?.data?.code === "ACTIVE_WORKOUT_EXISTS") {
            console.log(
              "[WorkoutSessionPage] ACTIVE_WORKOUT_EXISTS; rechecking active session"
            );

            try {
              const activeAfterStartFailure = await withTimeout(
                getActiveWorkoutSession(),
                "Rechecking active workout"
              );

              const activeAfterStartAssignmentId =
                getActiveAssignmentId(activeAfterStartFailure);

              console.log(
                "[WorkoutSessionPage] active after start failure",
                {
                  sessionId: activeAfterStartFailure?.id ?? null,
                  activeAssignmentId: activeAfterStartAssignmentId,
                  rawActive: activeAfterStartFailure,
                }
              );

              if (activeAfterStartAssignmentId === id) {
                applySession(activeAfterStartFailure);
                return;
              }

              if (activeAfterStartAssignmentId !== null) {
                navigate(
                  `/workouts/${activeAfterStartAssignmentId}/session`,
                  { replace: true }
                );
                return;
              }
            } catch (recheckError) {
              console.error(
                "[WorkoutSessionPage] active-session recheck failed",
                recheckError
              );
            }

            throw new Error(
              "Another workout is already in progress, but the active session could not be resolved."
            );
          }

          throw startError;
        }
      } catch (error: any) {
        console.error(
          "[WorkoutSessionPage] initialize failed",
          error
        );

        const message =
          error?.response?.data?.error ??
          error?.response?.data?.message ??
          error?.message ??
          "Please try again.";

        setLoadError(message);

        toast({
          title: "Unable to open workout",
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    })();

    initializationPromiseRef.current = promise;

    try {
      await promise;
    } finally {
      if (initializationPromiseRef.current === promise) {
        initializationPromiseRef.current = null;
      }
    }
  }, [
    applySession,
    assignmentId,
    navigate,
    toast,
    withTimeout,
  ]);

  useEffect(() => {
    initializedRef.current = false;
    sessionRef.current = null;
    setSession(null);
    setLoadError(null);
    setLoading(true);

    void load();
  }, [assignmentId, load]);

  /* -------------------------------------------------------
     CLOCKS
  ------------------------------------------------------- */

  useEffect(() => {
    if (!session) return;

    setLocalSeconds(Number(session.current_elapsed_seconds || 0));

    if (session.status !== "RUNNING") return;

    const timer = window.setInterval(() => {
      setLocalSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [session?.id, session?.status]);

  useEffect(() => {
    if (!session?.rest_active) {
      setRestLocalRemaining(0);
      return;
    }

    setRestLocalRemaining(Number(session.rest_remaining_seconds || 0));

    const timer = window.setInterval(() => {
      setRestLocalRemaining((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    session?.id,
    session?.rest_active,
    session?.rest_started_at,
    session?.rest_target_seconds,
    session?.rest_remaining_seconds,
  ]);

  useEffect(() => {
    if (!session?.rest_active || restLocalRemaining > 0) return;

    let cancelled = false;

    getWorkoutSession(session.id)
      .then((fresh) => {
        if (!cancelled) applySession(fresh);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [applySession, restLocalRemaining, session?.id, session?.rest_active]);

  useEffect(() => {
    const handleVisible = async () => {
      if (document.visibilityState !== "visible" || !sessionRef.current) return;

      try {
        const fresh = await getWorkoutSession(sessionRef.current.id);
        applySession(fresh);
      } catch {
        // Keep current state when refresh fails.
      }
    };

    document.addEventListener("visibilitychange", handleVisible);
    return () => document.removeEventListener("visibilitychange", handleVisible);
  }, [applySession]);

  /* -------------------------------------------------------
     CURRENT EXERCISE / SET
  ------------------------------------------------------- */

  const currentExercise = useMemo(
    () => getCurrentExercise(session),
    [session]
  );

  const currentSetKey = `${currentExercise?.id ?? ""}-${session?.current_set_index ?? ""}`;

  useEffect(() => {
    if (!currentExercise || !session) return;

    const tracking = String(currentExercise.tracking_type || "").toUpperCase();
    const current = currentExercise.sets?.find(
      (item) => item.set_index === session.current_set_index
    );

    setActuals((previous) => ({
      reps:
        previous.__key === currentSetKey && previous.reps !== undefined
          ? previous.reps
          : current?.reps_completed != null
            ? String(current.reps_completed)
            : currentExercise.target_reps != null
              ? String(currentExercise.target_reps)
              : "",
      weight:
        tracking === "REPS_WEIGHT"
          ? previous.__key === currentSetKey && previous.weight !== undefined
            ? previous.weight
            : current?.weight_kg != null
              ? String(current.weight_kg)
              : currentExercise.target_weight != null
                ? String(currentExercise.target_weight)
                : ""
          : "",
      duration:
        tracking === "DURATION" || tracking === "REPS_DURATION"
          ? previous.__key === currentSetKey && previous.duration !== undefined
            ? previous.duration
            : current?.duration_seconds != null
              ? String(current.duration_seconds)
              : currentExercise.target_duration_seconds != null
                ? String(currentExercise.target_duration_seconds)
                : ""
          : "",
      distance:
        tracking === "DISTANCE"
          ? previous.__key === currentSetKey && previous.distance !== undefined
            ? previous.distance
            : current?.distance != null
              ? String(current.distance)
              : currentExercise.target_distance != null
                ? String(currentExercise.target_distance)
                : ""
          : "",
      __key: currentSetKey,
    }));
    // Only reset inputs when the active set changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSetKey]);

  const perform = async (action: () => Promise<WorkoutSession>) => {
    if (!session || saving) return;

    try {
      setSaving(true);
      const updated = await action();
      applySession(updated);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Could not update workout",
        description:
          error?.response?.data?.error ??
          error?.message ??
          "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCompleteSet = async () => {
    if (!session || !currentExercise || saving) return;

    const tracking = String(currentExercise.tracking_type || "").toUpperCase();

    await perform(() =>
      completeWorkoutSet(session.id, {
        repsCompleted:
          actuals.reps !== "" ? Number(actuals.reps) : undefined,
        weightKg:
          tracking === "REPS_WEIGHT" && actuals.weight !== ""
            ? Number(actuals.weight)
            : undefined,
        durationSeconds:
          (tracking === "DURATION" || tracking === "REPS_DURATION") &&
          actuals.duration !== ""
            ? Number(actuals.duration)
            : undefined,
        distance:
          tracking === "DISTANCE" && actuals.distance !== ""
            ? Number(actuals.distance)
            : undefined,
      })
    );
  };

  /*
     Always start the session screen at the top when entering from the
     workout detail page. This prevents the browser/SPA from restoring the
     previous page's scroll position and landing the user in the middle.
  */
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [assignmentId]);

  if (loading) {
    return (
      <Box minH="100vh" bg="#F6F8FB" px={{ base: 4, md: 6 }} py={{ base: 6, md: 10 }}>
        <Box maxW="980px" mx="auto">
          <Flex justify="space-between" align="center" mb={8}>
            <Box h="36px" w="110px" borderRadius="full" bg="white" boxShadow="0 6px 24px rgba(15, 23, 42, 0.05)" />
            <HStack spacing={2}>
              <Box h="32px" w="76px" borderRadius="full" bg="white" />
              <Box h="32px" w="72px" borderRadius="full" bg="white" />
            </HStack>
          </Flex>
          <Box bg="white" borderRadius="32px" p={{ base: 6, md: 10 }} boxShadow="0 20px 60px rgba(15, 23, 42, 0.06)">
            <VStack spacing={5} py={10}>
              <Spinner size="lg" thickness="3px" color="blue.400" />
              <Text fontWeight="600" color="gray.700">Opening your workout</Text>
              <Text fontSize="sm" color="gray.400">Connecting to your saved session…</Text>
            </VStack>
          </Box>
        </Box>
      </Box>
    );
  }

  if (!session) {
    return (
      <Box minH="100vh" bg="#F6F8FB" px={6} py={10}>
        <Flex minH="70vh" align="center" justify="center">
          <VStack spacing={5} textAlign="center" maxW="520px">
            <Flex
              w="64px"
              h="64px"
              align="center"
              justify="center"
              borderRadius="2xl"
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="0 14px 40px rgba(15, 23, 42, 0.07)"
            >
              <Icon as={FiX} boxSize={6} color="gray.500" />
            </Flex>
            <Heading size="md" color="gray.900">Unable to open workout</Heading>
            <Text color="gray.500" fontSize="sm" lineHeight="1.7">
              {loadError || "The workout session could not be loaded."}
            </Text>
            <HStack spacing={3} flexWrap="wrap" justify="center">
              <Button
                variant="outline"
                borderRadius="xl"
                borderColor="gray.200"
                onClick={() => {
                  initializedRef.current = false;
                  initializationPromiseRef.current = null;
                  setLoadError(null);
                  setSession(null);
                  setLoading(true);
                  void load();
                }}
              >
                Try Again
              </Button>
              <Button
                bg="#111827"
                color="white"
                borderRadius="xl"
                _hover={{ bg: "#1f2937" }}
                onClick={() => navigate(`/workouts/${assignmentId}`)}
              >
                Back to Workout
              </Button>
            </HStack>
          </VStack>
        </Flex>
      </Box>
    );
  }

  const totalExercises = session.assignment.exercises.length;
  const exerciseNumber = Math.min(
    totalExercises,
    session.current_exercise_index + 1
  );
  const workoutProgress = session.total_sets
    ? ((session.completed_sets + session.skipped_sets) / session.total_sets) * 100
    : 0;
  const finishedAllSets = session.current_exercise_index >= totalExercises;
  const restRemaining = restLocalRemaining;
  const completedWork = session.completed_sets + session.skipped_sets;
  const remainingSets = Math.max(0, Number(session.total_sets || 0) - completedWork);
  const sessionLabel = session.status === "PAUSED" ? "Paused" : "In progress";

  return (
    <Box minH="100vh" bg="#F6F8FB" color="#101828" px={{ base: 4, md: 6 }} py={{ base: 4, md: 7 }}>
      <Box maxW="980px" mx="auto">
        {/* =====================================================
            TOP BAR
        ===================================================== */}
        <Flex
          justify="space-between"
          align="center"
          gap={3}
          mb={{ base: 5, md: 7 }}
          position="relative"
          zIndex={2}
        >
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            color="gray.600"
            borderRadius="xl"
            px={2}
            _hover={{ bg: "white" }}
            onClick={() => {
              const id = Number(assignmentId);
              if (Number.isInteger(id) && id > 0) {
                navigate(`/workouts/${id}`);
              } else {
                navigate("/workouts");
              }
            }}
          >
            Workout
          </Button>

          <HStack spacing={2}>
            <Badge
              bg={session.status === "PAUSED" ? "orange.50" : "green.50"}
              color={session.status === "PAUSED" ? "orange.700" : "green.700"}
              border="1px solid"
              borderColor={session.status === "PAUSED" ? "orange.100" : "green.100"}
              borderRadius="full"
              px={3}
              py={1.5}
              fontSize="10px"
              letterSpacing="0.08em"
            >
              {sessionLabel.toUpperCase()}
            </Badge>

            <Button
              size="sm"
              variant="outline"
              bg="white"
              borderColor="gray.200"
              color="gray.700"
              borderRadius="full"
              leftIcon={session.status === "RUNNING" ? <FiPause /> : <FiPlay />}
              boxShadow="0 5px 18px rgba(15, 23, 42, 0.04)"
              onClick={() =>
                perform(() =>
                  session.status === "RUNNING"
                    ? pauseWorkoutSession(session.id)
                    : resumeWorkoutSession(session.id)
                )
              }
              isLoading={saving}
            >
              {session.status === "RUNNING" ? "Pause" : "Resume"}
            </Button>

            <Button
              size="sm"
              bg="#111827"
              color="white"
              _hover={{ bg: "#1f2937" }}
              borderRadius="full"
              onClick={() => setFinishOpen(true)}
              isDisabled={saving}
            >
              Finish
            </Button>
          </HStack>
        </Flex>

        {/* =====================================================
            HERO
        ===================================================== */}
        <Box
          position="relative"
          overflow="hidden"
          borderRadius={{ base: "28px", md: "36px" }}
          bg="white"
          border="1px solid"
          borderColor="rgba(148, 163, 184, 0.20)"
          boxShadow="0 24px 80px rgba(15, 23, 42, 0.08)"
          mb={6}
        >
          <Box
            position="absolute"
            top="-110px"
            right="-90px"
            w="280px"
            h="280px"
            borderRadius="full"
            bg="blue.50"
            filter="blur(6px)"
          />
          <Box
            position="absolute"
            bottom="-120px"
            left="-80px"
            w="240px"
            h="240px"
            borderRadius="full"
            bg="cyan.50"
            filter="blur(6px)"
          />

          <Box position="relative" px={{ base: 5, md: 9 }} py={{ base: 6, md: 8 }}>
            <Flex justify="space-between" align="flex-start" gap={4}>
              <Box>
                <HStack spacing={2} mb={2}>
                  <Badge
                    bg="blue.50"
                    color="blue.600"
                    borderRadius="full"
                    px={2.5}
                    py={1}
                    fontSize="9px"
                    letterSpacing="0.10em"
                  >
                    WORKOUT SESSION
                  </Badge>
                </HStack>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  letterSpacing="-0.035em"
                  color="gray.900"
                >
                  {session.assignment.workout_name}
                </Heading>
                <Text mt={1.5} color="gray.500" fontSize="sm">
                  Stay focused on the movement in front of you.
                </Text>
              </Box>

              <Box display={{ base: "none", sm: "block" }}>
                <Text textAlign="right" fontSize="10px" fontWeight="700" color="gray.400" letterSpacing="0.08em">
                  CURRENT PROGRESS
                </Text>
                <Text mt={1} textAlign="right" fontSize="sm" fontWeight="700" color="gray.700">
                  {Math.round(workoutProgress)}%
                </Text>
              </Box>
            </Flex>

            <Box textAlign="center" pt={{ base: 5, md: 7 }}>
              <Text color="gray.400" fontSize="10px" fontWeight="700" letterSpacing="0.12em">
                ELAPSED
              </Text>
              <Heading
                mt={2}
                fontSize={{ base: "5xl", md: "7xl" }}
                lineHeight="0.95"
                letterSpacing="-0.075em"
                fontWeight="700"
                color="#0F172A"
              >
                {formatClock(localSeconds)}
              </Heading>
              <Text mt={3} color="gray.500" fontSize="sm">
                {exerciseNumber > totalExercises
                  ? "All exercises recorded"
                  : `Exercise ${exerciseNumber} of ${totalExercises}`}
              </Text>
            </Box>

            <Box mt={{ base: 6, md: 7 }}>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="xs" color="gray.400">Workout progress</Text>
                <Text fontSize="xs" color="gray.500" fontWeight="600">
                  {completedWork} / {session.total_sets} sets
                </Text>
              </Flex>
              <Progress
                value={Math.min(100, workoutProgress)}
                size="sm"
                borderRadius="full"
                bg="gray.100"
                sx={{
                  "& > div": {
                    background: "linear-gradient(90deg, #60A5FA 0%, #38BDF8 100%)",
                    borderRadius: "999px",
                  },
                }}
              />
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} mt={6}>
              <Box bg="gray.50" borderRadius="2xl" px={4} py={3.5}>
                <Text fontSize="10px" fontWeight="700" color="gray.400" letterSpacing="0.08em">EXERCISE</Text>
                <Text mt={1} fontSize="sm" fontWeight="700" color="gray.800">
                  {exerciseNumber > totalExercises ? totalExercises : exerciseNumber} / {totalExercises}
                </Text>
              </Box>
              <Box bg="gray.50" borderRadius="2xl" px={4} py={3.5}>
                <Text fontSize="10px" fontWeight="700" color="gray.400" letterSpacing="0.08em">SETS DONE</Text>
                <Text mt={1} fontSize="sm" fontWeight="700" color="gray.800">
                  {session.completed_sets}
                </Text>
              </Box>
              <Box bg="gray.50" borderRadius="2xl" px={4} py={3.5}>
                <Text fontSize="10px" fontWeight="700" color="gray.400" letterSpacing="0.08em">SETS LEFT</Text>
                <Text mt={1} fontSize="sm" fontWeight="700" color="gray.800">
                  {remainingSets}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>

        {/* =====================================================
            REST / COMPLETE STATE
        ===================================================== */}
        {session.rest_active && !finishedAllSets ? (
          <Box
            bg="linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)"
            border="1px solid"
            borderColor="blue.100"
            borderRadius={{ base: "28px", md: "32px" }}
            px={{ base: 5, md: 8 }}
            py={{ base: 7, md: 9 }}
            mb={6}
            boxShadow="0 18px 50px rgba(59, 130, 246, 0.08)"
          >
            <Flex direction={{ base: "column", md: "row" }} align="center" gap={{ base: 6, md: 8 }}>
              <CircularProgress
                value={restRemaining > 0 ? 100 : 0}
                size="150px"
                thickness="8px"
                color="blue.400"
                trackColor="blue.50"
              >
                <CircularProgressLabel>
                  <Box textAlign="center">
                    <Text fontSize="9px" fontWeight="800" color="blue.500" letterSpacing="0.10em">REST</Text>
                    <Text mt={1} fontSize="3xl" fontWeight="700" color="gray.900" letterSpacing="-0.05em">
                      {formatClock(restRemaining)}
                    </Text>
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>

              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <Text fontSize="10px" fontWeight="800" color="blue.500" letterSpacing="0.12em">RECOVER</Text>
                <Heading mt={1.5} fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-0.035em">
                  Your next set is coming up.
                </Heading>
                <Text mt={2} color="gray.500" fontSize="sm" lineHeight="1.7">
                  Breathe, reset your form, and take the next set when you are ready.
                </Text>
                <HStack justify={{ base: "center", md: "flex-start" }} mt={5} spacing={3}>
                  <Button
                    variant="outline"
                    bg="white"
                    borderColor="blue.100"
                    color="gray.700"
                    borderRadius="xl"
                    leftIcon={<FiPlus />}
                    onClick={() => perform(() => extendWorkoutRest(session.id, 30))}
                    isLoading={saving}
                  >
                    30 sec
                  </Button>
                  <Button
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: "#1D4ED8" }}
                    borderRadius="xl"
                    leftIcon={<FiSkipForward />}
                    onClick={() => perform(() => skipWorkoutRest(session.id))}
                    isLoading={saving}
                  >
                    Skip Rest
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </Box>
        ) : finishedAllSets ? (
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius={{ base: "28px", md: "32px" }}
            p={{ base: 7, md: 10 }}
            textAlign="center"
            boxShadow="0 18px 55px rgba(15, 23, 42, 0.07)"
          >
            <Flex
              mx="auto"
              w="64px"
              h="64px"
              align="center"
              justify="center"
              borderRadius="2xl"
              bg="blue.50"
              color="blue.600"
            >
              <Icon as={FiCheck} boxSize={7} />
            </Flex>
            <Heading mt={5} fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-0.035em">
              All sets are logged
            </Heading>
            <Text mt={2} color="gray.500" fontSize="sm">
              Your workout work is complete. Review once, then finish the session.
            </Text>
            <Button
              mt={6}
              size="lg"
              bg="#111827"
              color="white"
              _hover={{ bg: "#1f2937" }}
              borderRadius="xl"
              px={8}
              onClick={() => setFinishOpen(true)}
            >
              Finish Workout
            </Button>
          </Box>
        ) : currentExercise ? (
          <VStack align="stretch" spacing={5}>
            {/* =================================================
                CURRENT EXERCISE
            ================================================= */}
            <Box
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              borderRadius={{ base: "28px", md: "32px" }}
              overflow="hidden"
              boxShadow="0 18px 60px rgba(15, 23, 42, 0.07)"
            >
              {currentExercise.image_url ? (
                <Box position="relative">
                  <Image
                    src={currentExercise.image_url}
                    alt={currentExercise.exercise_name}
                    w="100%"
                    h={{ base: "220px", md: "360px" }}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(180deg, rgba(15,23,42,0.00) 48%, rgba(15,23,42,0.58) 100%)"
                  />
                  <Badge
                    position="absolute"
                    left={{ base: 5, md: 7 }}
                    bottom={{ base: 5, md: 7 }}
                    bg="white"
                    color="gray.800"
                    borderRadius="full"
                    px={3}
                    py={1.5}
                    fontSize="10px"
                    boxShadow="0 8px 24px rgba(0,0,0,0.12)"
                  >
                    {currentExercise.primary_muscle_group || "EXERCISE"}
                  </Badge>
                </Box>
              ) : null}

              <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }}>
                <Flex justify="space-between" gap={5} align="flex-start">
                  <Box flex="1">
                    <Text fontSize="10px" fontWeight="800" color="gray.400" letterSpacing="0.12em">
                      CURRENT MOVEMENT
                    </Text>
                    <Heading
                      mt={2}
                      fontSize={{ base: "2xl", md: "3xl" }}
                      letterSpacing="-0.045em"
                      color="gray.900"
                    >
                      {currentExercise.exercise_name}
                    </Heading>
                    <Text color="blue.600" mt={2} fontSize="sm" fontWeight="600">
                      {targetForExercise(currentExercise)}
                    </Text>
                  </Box>

                  <Button
                    variant="outline"
                    bg="white"
                    borderColor="gray.200"
                    borderRadius="full"
                    aria-label="View exercise details"
                    w="42px"
                    h="42px"
                    p={0}
                    onClick={() => {
                      setSelectedExercise(currentExercise);
                      exerciseSheet.onOpen();
                    }}
                  >
                    <Icon as={FiInfo} boxSize={5} color="gray.600" />
                  </Button>
                </Flex>

                <Box mt={6} p={4} bg="#F8FAFC" border="1px solid" borderColor="gray.100" borderRadius="2xl">
                  <Flex justify="space-between" align="center" gap={4}>
                    <Box>
                      <Text fontSize="10px" fontWeight="800" color="gray.400" letterSpacing="0.10em">
                        SET {session.current_set_index + 1} OF {currentExercise.target_sets || 1}
                      </Text>
                      <Text mt={1} color="gray.500" fontSize="sm">
                        Record what you actually completed.
                      </Text>
                    </Box>
                    <Badge bg="white" color="gray.700" border="1px solid" borderColor="gray.200" borderRadius="full" px={3} py={1.5}>
                      Active set
                    </Badge>
                  </Flex>
                </Box>

                {currentExercise.instructions ? (
                  <Box mt={6}>
                    <Text fontSize="10px" fontWeight="800" color="gray.400" letterSpacing="0.10em">
                      FORM CUE
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt={2} lineHeight="1.8">
                      {currentExercise.instructions}
                    </Text>
                  </Box>
                ) : null}

                <Divider my={7} borderColor="gray.100" />

                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {(String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" ||
                    String(currentExercise.tracking_type).toUpperCase() === "REPS_ONLY" ||
                    String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight="700" color="gray.500">Reps</FormLabel>
                      <Input
                        value={actuals.reps || ""}
                        onChange={(event) => setActuals((previous) => ({ ...previous, reps: event.target.value }))}
                        inputMode="decimal"
                        size="lg"
                        borderRadius="xl"
                        bg="#F8FAFC"
                        borderColor="gray.200"
                        fontSize="lg"
                        fontWeight="600"
                        _focus={{ bg: "white", borderColor: "blue.300", boxShadow: "0 0 0 1px #90CDF4" }}
                      />
                    </FormControl>
                  ) : null}

                  {String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" ? (
                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight="700" color="gray.500">Weight (kg)</FormLabel>
                      <Input
                        value={actuals.weight || ""}
                        onChange={(event) => setActuals((previous) => ({ ...previous, weight: event.target.value }))}
                        inputMode="decimal"
                        size="lg"
                        borderRadius="xl"
                        bg="#F8FAFC"
                        borderColor="gray.200"
                        fontSize="lg"
                        fontWeight="600"
                        _focus={{ bg: "white", borderColor: "blue.300", boxShadow: "0 0 0 1px #90CDF4" }}
                      />
                    </FormControl>
                  ) : null}

                  {(String(currentExercise.tracking_type).toUpperCase() === "DURATION" ||
                    String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight="700" color="gray.500">Duration (sec)</FormLabel>
                      <Input
                        value={actuals.duration || ""}
                        onChange={(event) => setActuals((previous) => ({ ...previous, duration: event.target.value }))}
                        inputMode="decimal"
                        size="lg"
                        borderRadius="xl"
                        bg="#F8FAFC"
                        borderColor="gray.200"
                        fontSize="lg"
                        fontWeight="600"
                        _focus={{ bg: "white", borderColor: "blue.300", boxShadow: "0 0 0 1px #90CDF4" }}
                      />
                    </FormControl>
                  ) : null}

                  {String(currentExercise.tracking_type).toUpperCase() === "DISTANCE" ? (
                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight="700" color="gray.500">Distance</FormLabel>
                      <Input
                        value={actuals.distance || ""}
                        onChange={(event) => setActuals((previous) => ({ ...previous, distance: event.target.value }))}
                        inputMode="decimal"
                        size="lg"
                        borderRadius="xl"
                        bg="#F8FAFC"
                        borderColor="gray.200"
                        fontSize="lg"
                        fontWeight="600"
                        _focus={{ bg: "white", borderColor: "blue.300", boxShadow: "0 0 0 1px #90CDF4" }}
                      />
                    </FormControl>
                  ) : null}
                </SimpleGrid>

                <Flex mt={7} gap={3} direction={{ base: "column", sm: "row" }}>
                  <Button
                    flex="1"
                    size="lg"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: "#1D4ED8" }}
                    borderRadius="xl"
                    leftIcon={<FiCheck />}
                    onClick={handleCompleteSet}
                    isLoading={saving}
                  >
                    Complete Set
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    color="gray.500"
                    borderRadius="xl"
                    leftIcon={<FiX />}
                    onClick={() => perform(() => skipWorkoutSet(session.id))}
                    isLoading={saving}
                  >
                    Skip Set
                  </Button>
                </Flex>

                <Button
                  mt={3}
                  w="100%"
                  variant="ghost"
                  color="gray.500"
                  rightIcon={<FiChevronRight />}
                  onClick={() => {
                    setSelectedExercise(currentExercise);
                    exerciseSheet.onOpen();
                  }}
                >
                  View exercise details
                </Button>
              </Box>
            </Box>
          </VStack>
        ) : null}
      </Box>

      <ExerciseDetailSheet
        exercise={selectedExercise}
        isOpen={exerciseSheet.isOpen}
        onClose={exerciseSheet.onClose}
        targetText={selectedExercise ? targetForExercise(selectedExercise) : undefined}
      />

      <AlertDialog
        isOpen={finishOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setFinishOpen(false)}
        isCentered
      >
        <AlertDialogOverlay bg="blackAlpha.400" backdropFilter="blur(6px)" />
        <AlertDialogContent borderRadius="2xl" mx={4}>
          <AlertDialogHeader color="gray.900">Finish this workout?</AlertDialogHeader>
          <AlertDialogBody color="gray.500" lineHeight="1.7">
            You have completed {session.completed_sets} of {session.total_sets} sets ({Math.round(session.completion_percent)}%). Your progress is saved as you go.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              variant="ghost"
              borderRadius="xl"
              onClick={() => setFinishOpen(false)}
            >
              Keep Going
            </Button>
            <Button
              bg="#111827"
              color="white"
              _hover={{ bg: "#1f2937" }}
              ml={3}
              borderRadius="xl"
              isLoading={saving}
              onClick={async () => {
                if (saving) return;
                try {
                  setSaving(true);
                  const finished = await finishWorkoutSession(session.id);
                  setFinishOpen(false);
                  navigate(`/workouts/complete/${finished.id}`, { replace: true });
                } catch (error: any) {
                  toast({
                    title: "Unable to finish workout",
                    description:
                      error?.response?.data?.error ??
                      error?.message ??
                      "Please try again.",
                    status: "error",
                    duration: 3500,
                    isClosable: true,
                  });
                } finally {
                  setSaving(false);
                }
              }}
            >
              Finish Workout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default WorkoutSessionPage;
