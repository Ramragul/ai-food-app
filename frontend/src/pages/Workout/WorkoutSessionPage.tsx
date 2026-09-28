import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiArrowLeft, FiCheck, FiPause, FiPlay, FiPlus, FiSkipForward, FiX } from "react-icons/fi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  if (tracking === "DURATION") return `${sets} × ${exercise.target_duration_seconds || 0}s`;
  if (tracking === "DISTANCE") return `${sets} × ${exercise.target_distance || 0}`;
  if (tracking === "REPS_ONLY") return `${sets} × ${exercise.target_reps || 0} reps`;
  if (tracking === "REPS_DURATION") return `${sets} × ${exercise.target_reps || 0} reps • ${exercise.target_duration_seconds || 0}s`;
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

  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [localSeconds, setLocalSeconds] = useState(0);
  const [restLocalRemaining, setRestLocalRemaining] = useState(0);
  const [actuals, setActuals] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const id = Number(assignmentId);
      const active = await getActiveWorkoutSession();

      if (active && Number(active.workout_assignment_id) === id) {
        setSession(active);
        return;
      }

      const created = await startWorkoutSession(id);
      setSession(created);
    } catch (error: any) {
      console.error(error);

      if (error?.response?.data?.code === "ACTIVE_WORKOUT_EXISTS") {
        try {
          const active = await getActiveWorkoutSession();
          if (active?.workout_assignment_id) {
            navigate(`/workouts/${active.workout_assignment_id}/session`, { replace: true });
            return;
          }
        } catch {
          // Fall through to the normal error toast below.
        }

        toast({
          title: "Another workout is already in progress",
          description: "Resume the active workout before starting another one.",
          status: "info",
          duration: 3500,
          isClosable: true,
        });
      } else {
        toast({
          title: "Unable to start workout",
          description: error?.response?.data?.error || error?.message || "Please try again.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
        navigate(`/workouts/${assignmentId}`);
      }
    } finally {
      setLoading(false);
    }
  }, [assignmentId, navigate, toast]);

  useEffect(() => {
    load();
  }, [load]);

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
  }, [session?.id, session?.rest_active, session?.rest_started_at, session?.rest_target_seconds, session?.rest_remaining_seconds]);

  useEffect(() => {
    if (!session?.rest_active || restLocalRemaining > 0) return;

    let cancelled = false;
    getWorkoutSession(session.id)
      .then((fresh) => {
        if (!cancelled) setSession(fresh);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [session?.id, session?.rest_active, restLocalRemaining]);

  /* Do not pause on visibility change or phone calls. Rehydrate on return only. */
  useEffect(() => {
    const handleVisible = async () => {
      if (document.visibilityState !== "visible" || !session) return;
      try {
        const fresh = await getWorkoutSession(session.id);
        setSession(fresh);
        setLocalSeconds(Number(fresh.current_elapsed_seconds || 0));
      } catch {
        // Keep the current local state if the refresh fails.
      }
    };

    document.addEventListener("visibilitychange", handleVisible);
    return () => document.removeEventListener("visibilitychange", handleVisible);
  }, [session?.id]);

  const currentExercise = useMemo(() => getCurrentExercise(session), [session]);
  const currentSetKey = `${currentExercise?.id ?? ""}-${session?.current_set_index ?? ""}`;

  useEffect(() => {
    if (!currentExercise || !session) return;
    const tracking = String(currentExercise.tracking_type || "").toUpperCase();
    const current = currentExercise.sets?.find((item) => item.set_index === session.current_set_index);

    setActuals((previous) => ({
      reps:
        previous.reps !== undefined && previous.__key === currentSetKey
          ? previous.reps
          : current?.reps_completed != null
            ? String(current.reps_completed)
            : currentExercise.target_reps != null
              ? String(currentExercise.target_reps)
              : "",
      weight:
        tracking === "REPS_WEIGHT"
          ? previous.weight !== undefined && previous.__key === currentSetKey
            ? previous.weight
            : current?.weight_kg != null
              ? String(current.weight_kg)
              : currentExercise.target_weight != null
                ? String(currentExercise.target_weight)
                : ""
          : "",
      duration:
        tracking === "DURATION" || tracking === "REPS_DURATION"
          ? previous.duration !== undefined && previous.__key === currentSetKey
            ? previous.duration
            : current?.duration_seconds != null
              ? String(current.duration_seconds)
              : currentExercise.target_duration_seconds != null
                ? String(currentExercise.target_duration_seconds)
                : ""
          : "",
      distance:
        tracking === "DISTANCE"
          ? previous.distance !== undefined && previous.__key === currentSetKey
            ? previous.distance
            : current?.distance != null
              ? String(current.distance)
              : currentExercise.target_distance != null
                ? String(currentExercise.target_distance)
                : ""
          : "",
      __key: currentSetKey,
    }));
    // Only seed when the current set changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSetKey]);

  const perform = async (action: () => Promise<WorkoutSession>) => {
    if (!session) return;
    try {
      setSaving(true);
      const updated = await action();
      setSession(updated);
      setLocalSeconds(Number(updated.current_elapsed_seconds || 0));
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Could not update workout",
        description: error?.response?.data?.error || error?.message || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCompleteSet = async () => {
    if (!session || !currentExercise) return;
    const tracking = String(currentExercise.tracking_type || "").toUpperCase();

    await perform(() =>
      completeWorkoutSet(session.id, {
        repsCompleted:
          actuals.reps !== "" ? Number(actuals.reps) : undefined,
        weightKg:
          tracking === "REPS_WEIGHT" && actuals.weight !== "" ? Number(actuals.weight) : undefined,
        durationSeconds:
          (tracking === "DURATION" || tracking === "REPS_DURATION") && actuals.duration !== ""
            ? Number(actuals.duration)
            : undefined,
        distance:
          tracking === "DISTANCE" && actuals.distance !== "" ? Number(actuals.distance) : undefined,
      })
    );
  };

  if (loading || !session) {
    return (
      <Flex minH="70vh" align="center" justify="center" bg="gray.50">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="3px" color="blue.400" />
          <Text color="gray.500">Opening your workout…</Text>
        </VStack>
      </Flex>
    );
  }

  const totalExercises = session.assignment.exercises.length;
  const exerciseNumber = Math.min(totalExercises, session.current_exercise_index + 1);
  const workoutProgress = session.total_sets
    ? ((session.completed_sets + session.skipped_sets) / session.total_sets) * 100
    : 0;
  const finishedAllSets = session.current_exercise_index >= totalExercises;
  const restRemaining = restLocalRemaining;

  return (
    <Box minH="100vh" bg="gray.900" color="white" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
      <Box maxW="900px" mx="auto">
        <Flex justify="space-between" align="center" mb={5}>
          <Button color="white" variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate(`/workouts/${assignmentId}`)}>
            Workout
          </Button>
          <HStack spacing={2}>
            <Badge bg="whiteAlpha.150" color="white" borderRadius="full" px={3} py={1}>
              {session.status === "PAUSED" ? "PAUSED" : "LIVE"}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              borderRadius="full"
              leftIcon={session.status === "RUNNING" ? <FiPause /> : <FiPlay />}
              onClick={() => perform(() => session.status === "RUNNING" ? pauseWorkoutSession(session.id) : resumeWorkoutSession(session.id))}
              isLoading={saving}
            >
              {session.status === "RUNNING" ? "Pause" : "Resume"}
            </Button>
            <Button size="sm" colorScheme="red" borderRadius="full" onClick={() => setFinishOpen(true)}>
              Finish
            </Button>
          </HStack>
        </Flex>

        <Box textAlign="center" mb={7}>
          <Text color="whiteAlpha.600" fontSize="sm">{session.assignment.workout_name}</Text>
          <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.04em" mt={1}>
            {formatClock(localSeconds)}
          </Heading>
          <Text mt={2} color="whiteAlpha.600" fontSize="sm">
            {exerciseNumber > totalExercises ? "All exercises recorded" : `Exercise ${exerciseNumber} of ${totalExercises}`}
          </Text>
        </Box>

        <Progress value={workoutProgress} size="xs" borderRadius="full" bg="whiteAlpha.150" mb={7} />

        {session.rest_active && !finishedAllSets ? (
          <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" borderRadius="3xl" p={{ base: 7, md: 9 }} textAlign="center" mb={6}>
            <Badge bg="blue.500" color="white" borderRadius="full" px={3} py={1}>REST</Badge>
            <Heading fontSize={{ base: "5xl", md: "7xl" }} mt={3} letterSpacing="-0.05em">
              {formatClock(restRemaining)}
            </Heading>
            <Text color="whiteAlpha.600" mt={1}>Breathe. Recover. Then go again.</Text>
            <HStack justify="center" mt={6} spacing={3}>
              <Button variant="outline" borderColor="whiteAlpha.300" color="white" leftIcon={<FiPlus />} onClick={() => perform(() => extendWorkoutRest(session.id, 30))}>
                30 sec
              </Button>
              <Button variant="solid" colorScheme="blue" leftIcon={<FiSkipForward />} onClick={() => perform(() => skipWorkoutRest(session.id))}>
                Skip Rest
              </Button>
            </HStack>
          </Box>
        ) : finishedAllSets ? (
          <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" borderRadius="3xl" p={{ base: 7, md: 9 }} textAlign="center">
            <Text fontSize="4xl">✓</Text>
            <Heading mt={3}>Workout work complete</Heading>
            <Text color="whiteAlpha.600" mt={2}>Review your session and finish when you are ready.</Text>
            <Button mt={6} size="lg" colorScheme="blue" borderRadius="xl" onClick={() => setFinishOpen(true)}>
              Finish Workout
            </Button>
          </Box>
        ) : currentExercise ? (
          <VStack align="stretch" spacing={5}>
            <Box bg="white" color="gray.800" borderRadius="3xl" overflow="hidden">
              {currentExercise.image_url ? (
                <Image src={currentExercise.image_url} alt={currentExercise.exercise_name} w="100%" maxH="320px" objectFit="cover" />
              ) : null}
              <Box p={{ base: 6, md: 8 }}>
                <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
                  {currentExercise.primary_muscle_group || "EXERCISE"}
                </Badge>
                <Heading size={{ base: "lg", md: "xl" }} mt={3}>{currentExercise.exercise_name}</Heading>
                <Text color="gray.500" mt={2}>{targetForExercise(currentExercise)}</Text>

                {currentExercise.instructions ? (
                  <Box mt={5} bg="gray.50" borderRadius="2xl" p={4}>
                    <Text fontSize="sm" fontWeight="600" color="gray.700">How to perform</Text>
                    <Text fontSize="sm" color="gray.500" mt={1} lineHeight="1.7">{currentExercise.instructions}</Text>
                  </Box>
                ) : null}

                <Box mt={6}>
                  <Text fontSize="xs" color="gray.400" mb={3} textTransform="uppercase" letterSpacing="0.08em">
                    Set {session.current_set_index + 1} of {currentExercise.target_sets || 1}
                  </Text>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                    {(String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" || String(currentExercise.tracking_type).toUpperCase() === "REPS_ONLY" || String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
                      <FormControl>
                        <FormLabel fontSize="xs" color="gray.500">Reps</FormLabel>
                        <Input value={actuals.reps || ""} onChange={(e) => setActuals((p) => ({ ...p, reps: e.target.value }))} inputMode="decimal" borderRadius="xl" />
                      </FormControl>
                    ) : null}

                    {String(currentExercise.tracking_type).toUpperCase() === "REPS_WEIGHT" ? (
                      <FormControl>
                        <FormLabel fontSize="xs" color="gray.500">Weight (kg)</FormLabel>
                        <Input value={actuals.weight || ""} onChange={(e) => setActuals((p) => ({ ...p, weight: e.target.value }))} inputMode="decimal" borderRadius="xl" />
                      </FormControl>
                    ) : null}

                    {(String(currentExercise.tracking_type).toUpperCase() === "DURATION" || String(currentExercise.tracking_type).toUpperCase() === "REPS_DURATION") ? (
                      <FormControl>
                        <FormLabel fontSize="xs" color="gray.500">Duration (sec)</FormLabel>
                        <Input value={actuals.duration || ""} onChange={(e) => setActuals((p) => ({ ...p, duration: e.target.value }))} inputMode="decimal" borderRadius="xl" />
                      </FormControl>
                    ) : null}

                    {String(currentExercise.tracking_type).toUpperCase() === "DISTANCE" ? (
                      <FormControl>
                        <FormLabel fontSize="xs" color="gray.500">Distance</FormLabel>
                        <Input value={actuals.distance || ""} onChange={(e) => setActuals((p) => ({ ...p, distance: e.target.value }))} inputMode="decimal" borderRadius="xl" />
                      </FormControl>
                    ) : null}
                  </SimpleGrid>
                </Box>

                <Flex mt={7} gap={3} direction={{ base: "column", sm: "row" }}>
                  <Button flex="1" size="lg" colorScheme="blue" borderRadius="xl" leftIcon={<FiCheck />} onClick={handleCompleteSet} isLoading={saving}>
                    Complete Set
                  </Button>
                  <Button size="lg" variant="ghost" color="gray.500" leftIcon={<FiX />} onClick={() => perform(() => skipWorkoutSet(session.id))} isLoading={saving}>
                    Skip Set
                  </Button>
                </Flex>
              </Box>
            </Box>
          </VStack>
        ) : null}
      </Box>

      <AlertDialog isOpen={finishOpen} leastDestructiveRef={cancelRef} onClose={() => setFinishOpen(false)} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius="2xl">
          <AlertDialogHeader>Finish this workout?</AlertDialogHeader>
          <AlertDialogBody color="gray.500">
            You have completed {session.completed_sets} of {session.total_sets} sets ({Math.round(session.completion_percent)}%). You can finish now and review the session summary.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} variant="ghost" onClick={() => setFinishOpen(false)}>
              Keep Going
            </Button>
            <Button colorScheme="red" ml={3} isLoading={saving} onClick={async () => {
              try {
                setSaving(true);
                const finished = await finishWorkoutSession(session.id);
                setFinishOpen(false);
                navigate(`/workouts/complete/${finished.id}`, { replace: true });
              } catch (error: any) {
                toast({
                  title: "Unable to finish workout",
                  description: error?.response?.data?.error || error?.message || "Please try again.",
                  status: "error",
                  duration: 3500,
                  isClosable: true,
                });
              } finally {
                setSaving(false);
              }
            }}>
              Finish Workout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default WorkoutSessionPage;
