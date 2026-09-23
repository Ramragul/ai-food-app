// src/pages/Staff/WorkoutTemplateBuilderPage.tsx

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";

import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiList,
  FiMapPin,
  FiPlus,
  FiSave,
  FiTarget,
  FiTrash2,
} from "react-icons/fi";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ExercisePickerDrawer from "../../components/StaffUI/Workouts/ExercisePickerDrawer";

import {
  addWorkoutTemplateExercise,
  createWorkoutTemplate,
  getDefaultWorkoutTargets,
  getWorkoutMuscleGroups,
  getWorkoutTemplate,
  getWorkoutTrainingGoals,
  getWorkoutWorkspace,
  normalizeWorkoutEnvironment,
  reorderWorkoutTemplateExercises,
  updateWorkoutTemplate,
  updateWorkoutTemplateExercise,
} from "../../services/workout.service";

import type {
  WorkoutEnvironment,
  WorkoutMuscleGroup,
  WorkoutTemplate,
  WorkoutTemplateExerciseDraft,
  WorkoutTrainingGoal,
} from "../../types/workout.types";


/* =========================================================
   HELPERS
========================================================= */

const createClientKey = () => {
  return `draft-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
};


const toNullableNumber = (
  value: string
): number | null => {
  if (value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : null;
};


const buildDraftExercise = (
  exercise: {
    id: number;
    name: string;
    tracking_type: WorkoutTemplateExerciseDraft["trackingType"];
    primary_muscle_group?: string | null;
    primary_muscle_group_id?: number | null;
    environment?: WorkoutEnvironment | null;
    image_url?: string | null;
    video_url?: string | null;
  },
  displayOrder: number
): WorkoutTemplateExerciseDraft => {

  const defaults =
    getDefaultWorkoutTargets(
      exercise.tracking_type
    );

  return {
    clientKey: createClientKey(),

    exerciseId: exercise.id,

    exerciseName: exercise.name,

    trackingType:
      exercise.tracking_type,

    primaryMuscleGroup:
      exercise.primary_muscle_group ?? null,

    primaryMuscleGroupId:
      exercise.primary_muscle_group_id ??
      null,

    environment:
      exercise.environment ?? null,

    imageUrl:
      exercise.image_url ?? null,

    displayOrder,

    ...defaults,

    notes: null,
  };
};


const mapExistingExerciseToDraft = (
  exercise: WorkoutTemplate["exercises"][number]
): WorkoutTemplateExerciseDraft => {

  return {
    clientKey: `existing-${exercise.id}`,

    id: exercise.id,

    exerciseId:
      exercise.exercise_id,

    exerciseName:
      exercise.exercise_name,

    trackingType:
      exercise.tracking_type,

    primaryMuscleGroup:
      exercise.primary_muscle_group ?? null,

    primaryMuscleGroupId:
      exercise.primary_muscle_group_id ??
      null,

    environment:
      exercise.environment ?? null,

    imageUrl:
      exercise.image_url ?? null,

    displayOrder:
      exercise.display_order,

    targetSets:
      exercise.target_sets ?? null,

    targetReps:
      exercise.target_reps ?? null,

    targetWeight:
      exercise.target_weight === null ||
      exercise.target_weight === undefined
        ? null
        : Number(exercise.target_weight),

    targetDurationSeconds:
      exercise.target_duration_seconds ??
      null,

    targetDistance:
      exercise.target_distance ??
      null,

    restSeconds:
      exercise.rest_seconds ??
      90,

    notes:
      exercise.notes ??
      null,
  };
};


/* =========================================================
   COMPONENT
========================================================= */

const WorkoutTemplateBuilderPage = () => {

  const navigate = useNavigate();

  const toast = useToast();

  const { id } =
    useParams<{
      id?: string;
    }>();


  const templateId = id
    ? Number(id)
    : null;

  const isEditMode =
    Number.isInteger(templateId) &&
    Number(templateId) > 0;


  /* -------------------------------------------------------
     WORKSPACE / MASTER DATA
  ------------------------------------------------------- */

  const [
    organizationId,
    setOrganizationId,
  ] = useState<number | null>(null);

  const [
    trainingGoals,
    setTrainingGoals,
  ] = useState<WorkoutTrainingGoal[]>(
    []
  );

  const [
    muscleGroups,
    setMuscleGroups,
  ] = useState<WorkoutMuscleGroup[]>(
    []
  );


  /* -------------------------------------------------------
     TEMPLATE
  ------------------------------------------------------- */

  const [
    template,
    setTemplate,
  ] = useState<WorkoutTemplate | null>(
    null
  );


  /* -------------------------------------------------------
     TEMPLATE FIELDS
  ------------------------------------------------------- */

  const [
    name,
    setName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    trainingGoalId,
    setTrainingGoalId,
  ] = useState("");

  const [
    primaryMuscleGroupId,
    setPrimaryMuscleGroupId,
  ] = useState("");

  const [
    environment,
    setEnvironment,
  ] = useState<WorkoutEnvironment>(
    "GYM"
  );

  const [
    estimatedDuration,
    setEstimatedDuration,
  ] = useState("");


  /* -------------------------------------------------------
     EXERCISES
  ------------------------------------------------------- */

  const [
    exercises,
    setExercises,
  ] = useState<
    WorkoutTemplateExerciseDraft[]
  >([]);


  /**
   * Keeps the original persisted exercise IDs.
   *
   * This lets us safely detect rows removed by
   * the trainer before save.
   */
  const originalExerciseIdsRef =
    useRef<number[]>([]);


  /* -------------------------------------------------------
     UI STATE
  ------------------------------------------------------- */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    pickerOpen,
    setPickerOpen,
  ] = useState(false);


  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadBuilder = useCallback(
    async () => {

      try {

        setLoading(true);


        const [
          workspace,
          goals,
          groups,
        ] = await Promise.all([
          getWorkoutWorkspace(),
          getWorkoutTrainingGoals(),
          getWorkoutMuscleGroups(),
        ]);


        const activeOrganizationId =
          Number(
            workspace?.organization?.id
          );


        if (
          !activeOrganizationId ||
          activeOrganizationId <= 0
        ) {
          throw new Error(
            "Active organization could not be resolved."
          );
        }


        setOrganizationId(
          activeOrganizationId
        );

        setTrainingGoals(
          Array.isArray(goals)
            ? goals
            : []
        );

        setMuscleGroups(
          Array.isArray(groups)
            ? groups
            : []
        );


        /* -------------------------------------------------
           EDIT MODE
        ------------------------------------------------- */

        if (isEditMode && templateId) {

          const existingTemplate =
            await getWorkoutTemplate(
              activeOrganizationId,
              templateId
            );


          setTemplate(
            existingTemplate
          );


          setName(
            existingTemplate.name ?? ""
          );


          setDescription(
            existingTemplate.description ??
              ""
          );


          setTrainingGoalId(
            existingTemplate.training_goal_id
              ? String(
                  existingTemplate.training_goal_id
                )
              : ""
          );


          setPrimaryMuscleGroupId(
            existingTemplate.primary_muscle_group_id
              ? String(
                  existingTemplate.primary_muscle_group_id
                )
              : ""
          );


          setEnvironment(
            normalizeWorkoutEnvironment(
              existingTemplate.environment
            ) ?? "GYM"
          );


          setEstimatedDuration(
            existingTemplate
              .estimated_duration_minutes
              ? String(
                  existingTemplate
                    .estimated_duration_minutes
                )
              : ""
          );


          const mappedExercises =
            (
              existingTemplate.exercises ?? []
            )
              .sort(
                (
                  a,
                  b
                ) =>
                  a.display_order -
                  b.display_order
              )
              .map(
                mapExistingExerciseToDraft
              );


          setExercises(
            mappedExercises
          );


          originalExerciseIdsRef.current =
            mappedExercises
              .filter(
                (exercise) =>
                  Boolean(exercise.id)
              )
              .map(
                (exercise) =>
                  Number(exercise.id)
              );

        }

        /* -------------------------------------------------
           CREATE MODE
        ------------------------------------------------- */

        else {

          setTemplate(null);

          setName("");

          setDescription("");

          setTrainingGoalId("");

          setPrimaryMuscleGroupId("");

          setEnvironment("GYM");

          setEstimatedDuration("");

          setExercises([]);

          originalExerciseIdsRef.current =
            [];

        }

      } catch (error: any) {

        console.error(
          "Failed to load workout builder:",
          error
        );

        toast({
          title:
            "Unable to load workout builder",
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

    },
    [
      isEditMode,
      templateId,
      toast,
    ]
  );


  useEffect(() => {

    loadBuilder();

  }, [loadBuilder]);


  /* =======================================================
     SELECTED EXERCISE IDS
  ======================================================= */

  const selectedExerciseIds =
    useMemo(
      () =>
        exercises.map(
          (exercise) =>
            exercise.exerciseId
        ),
      [exercises]
    );


  /* =======================================================
     ADD EXERCISE
  ======================================================= */

  const handleAddExercise = (
    selectedExercise: {
      id: number;
      name: string;
      tracking_type: WorkoutTemplateExerciseDraft["trackingType"];
      primary_muscle_group?: string | null;
      primary_muscle_group_id?: number | null;
      environment?: WorkoutEnvironment | null;
      image_url?: string | null;
      video_url?: string | null;
    }
  ) => {

    if (
      selectedExerciseIds.includes(
        selectedExercise.id
      )
    ) {
      toast({
        title:
          "Exercise already added",
        description:
          `${selectedExercise.name} is already part of this workout.`,
        status: "info",
        duration: 2200,
        isClosable: true,
      });

      return;
    }


    const nextOrder =
      exercises.length + 1;


    const draft =
      buildDraftExercise(
        selectedExercise,
        nextOrder
      );


    setExercises(
      (current) => [
        ...current,
        draft,
      ]
    );


    setPickerOpen(false);

  };


  /* =======================================================
     UPDATE EXERCISE VALUE
  ======================================================= */

  const updateExercise = <
    K extends keyof WorkoutTemplateExerciseDraft
  >(
    clientKey: string,
    field: K,
    value: WorkoutTemplateExerciseDraft[K]
  ) => {

    setExercises(
      (current) =>
        current.map(
          (exercise) =>
            exercise.clientKey ===
            clientKey
              ? {
                  ...exercise,
                  [field]: value,
                }
              : exercise
        )
    );

  };


  /* =======================================================
     REMOVE EXERCISE
  ======================================================= */

  const removeExercise = (
    clientKey: string
  ) => {

    setExercises(
      (current) => {

        const remaining =
          current.filter(
            (exercise) =>
              exercise.clientKey !==
              clientKey
          );

        return remaining.map(
          (
            exercise,
            index
          ) => ({
            ...exercise,
            displayOrder:
              index + 1,
          })
        );

      }
    );

  };


  /* =======================================================
     MOVE EXERCISE
  ======================================================= */

  const moveExercise = (
    index: number,
    direction:
      | "up"
      | "down"
  ) => {

    setExercises(
      (current) => {

        const targetIndex =
          direction === "up"
            ? index - 1
            : index + 1;


        if (
          targetIndex < 0 ||
          targetIndex >= current.length
        ) {
          return current;
        }


        const next = [
          ...current,
        ];


        const [
          movedItem,
        ] = next.splice(
          index,
          1
        );


        next.splice(
          targetIndex,
          0,
          movedItem
        );


        return next.map(
          (
            exercise,
            position
          ) => ({
            ...exercise,
            displayOrder:
              position + 1,
          })
        );

      }
    );

  };


  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {

    if (!organizationId) {

      toast({
        title:
          "Workspace unavailable",
        description:
          "The active organization could not be resolved.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }


    if (!name.trim()) {

      toast({
        title:
          "Workout name required",
        description:
          "Give this workout a name before saving.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });

      return;
    }


    try {

      setSaving(true);


      /* ---------------------------------------------------
         TRAINING GOAL
      --------------------------------------------------- */

      const selectedGoal =
        trainingGoals.find(
          (goal) =>
            Number(goal.id) ===
            Number(trainingGoalId)
        );


      /*
       * Backend stores both:
       * - goal_type
       * - training_goal_id
       *
       * The training-goal master uses goal_key in
       * the current backend response.
       */
      const selectedGoalKey =
        selectedGoal
          ? (
              (selectedGoal as any)
                .goal_key ??
              selectedGoal.code ??
              null
            )
          : null;


      /* ---------------------------------------------------
         TEMPLATE PAYLOAD
      --------------------------------------------------- */

      const basePayload = {
        organizationId,

        name:
          name.trim(),

        description:
          description.trim() || null,

        goalType:
          selectedGoalKey ??
          template?.goal_type ??
          null,

        trainingGoalId:
          trainingGoalId
            ? Number(trainingGoalId)
            : null,

        primaryMuscleGroupId:
          primaryMuscleGroupId
            ? Number(primaryMuscleGroupId)
            : null,

        environment,

        estimatedDurationMinutes:
          estimatedDuration
            ? Number(
                estimatedDuration
              )
            : null,
      };


      /* =================================================
         CREATE TEMPLATE
      ================================================== */

      let savedTemplateId: number;


      if (!isEditMode) {

        const created =
          await createWorkoutTemplate(
            basePayload
          );


        savedTemplateId =
          Number(created.id);


        if (
          !savedTemplateId ||
          savedTemplateId <= 0
        ) {
          throw new Error(
            "Created workout template ID was not returned."
          );
        }

      }


      /* =================================================
         UPDATE TEMPLATE
      ================================================== */

      else {

        if (!templateId) {
          throw new Error(
            "Workout template ID is missing."
          );
        }


        await updateWorkoutTemplate(
          templateId,
          basePayload
        );


        savedTemplateId =
          templateId;

      }


      /* =================================================
         REMOVED EXERCISES
      ================================================== */

      const currentPersistedIds =
        exercises
          .filter(
            (exercise) =>
              Boolean(exercise.id)
          )
          .map(
            (exercise) =>
              Number(exercise.id)
          );


      const removedExerciseIds =
        originalExerciseIdsRef.current.filter(
          (originalId) =>
            !currentPersistedIds.includes(
              originalId
            )
        );


      /*
       * We intentionally do not delete here directly.
       *
       * The page's service layer currently exposes the delete
       * operation separately, but this builder's save flow is
       * kept sequential and deterministic.
       *
       * We handle deletion via raw API import below only when
       * editing an existing template.
       */


      if (
        isEditMode &&
        savedTemplateId &&
        removedExerciseIds.length
      ) {

        /*
         * Dynamic import avoids pulling an unused delete API
         * into create-only builds.
         */
        const {
          deleteWorkoutTemplateExercise,
        } = await import(
          "../../services/workout.service"
        );


        for (
          const removedId
          of removedExerciseIds
        ) {

          await deleteWorkoutTemplateExercise(
            organizationId,
            savedTemplateId,
            removedId
          );

        }

      }


      /* =================================================
         UPDATE / ADD EXERCISES
      ================================================== */

      for (
        let index = 0;
        index < exercises.length;
        index += 1
      ) {

        const exercise =
          exercises[index];


        const exercisePayload = {
          organizationId,

          exerciseId:
            exercise.exerciseId,

          displayOrder:
            index + 1,

          targetSets:
            exercise.targetSets,

          targetReps:
            exercise.targetReps,

          targetWeight:
            exercise.targetWeight,

          targetDurationSeconds:
            exercise.targetDurationSeconds,

          targetDistance:
            exercise.targetDistance,

          restSeconds:
            exercise.restSeconds,

          notes:
            exercise.notes,
        };


        if (exercise.id) {

          await updateWorkoutTemplateExercise(
            savedTemplateId,
            Number(exercise.id),
            {
              ...exercisePayload,
              exerciseId:
                exercise.exerciseId,
            }
          );

        }

        else {

          await addWorkoutTemplateExercise(
            savedTemplateId,
            exercisePayload
          );

        }

      }


      /* =================================================
         REFRESH TEMPLATE
      ================================================== */

      let refreshedTemplate =
        await getWorkoutTemplate(
          organizationId,
          savedTemplateId
        );


      /* =================================================
         SAFE REORDER
      ================================================== */

      /*
       * Important:
       *
       * The reorder API expects:
       *
       * workout_template_exercises.id
       *
       * not:
       *
       * exercises.id
       *
       * So we rebuild the order using exercise_id →
       * actual template-exercise DB id.
       */

      const reorderedIds =
        exercises
          .map(
            (draft) =>
              refreshedTemplate.exercises.find(
                (savedExercise) =>
                  Number(
                    savedExercise.exercise_id
                  ) ===
                  Number(
                    draft.exerciseId
                  )
              )?.id
          )
          .filter(
            (
              value
            ): value is number =>
              Boolean(value)
          );


      if (
        refreshedTemplate.exercises.length > 0 &&
        reorderedIds.length ===
          refreshedTemplate.exercises.length
      ) {

        refreshedTemplate =
          await reorderWorkoutTemplateExercises(
            savedTemplateId,
            {
              organizationId,

              exercises:
                reorderedIds.map(
                  (
                    exerciseId,
                    index
                  ) => ({
                    id: exerciseId,
                    displayOrder:
                      index + 1,
                  })
                ),
            }
          );

      }


      /* =================================================
         UPDATE LOCAL STATE
      ================================================== */

      setTemplate(
        refreshedTemplate
      );


      const refreshedDrafts =
        (
          refreshedTemplate.exercises ?? []
        )
          .sort(
            (
              a,
              b
            ) =>
              a.display_order -
              b.display_order
          )
          .map(
            mapExistingExerciseToDraft
          );


      setExercises(
        refreshedDrafts
      );


      originalExerciseIdsRef.current =
        refreshedDrafts
          .filter(
            (exercise) =>
              Boolean(exercise.id)
          )
          .map(
            (exercise) =>
              Number(exercise.id)
          );


      toast({
        title:
          isEditMode
            ? "Workout updated"
            : "Workout created",
        description:
          "Your workout structure has been saved successfully.",
        status: "success",
        duration: 2800,
        isClosable: true,
      });


      /* -------------------------------------------------
         CREATE → EDIT URL
      ------------------------------------------------- */

      if (!isEditMode) {

        navigate(
          `/staff/workouts/templates/${savedTemplateId}`,
          {
            replace: true,
          }
        );

      }

    } catch (error: any) {

      console.error(
        "Failed to save workout template:",
        error
      );

      toast({
        title:
          "Unable to save workout",
        description:
          error?.response?.data?.error ??
          error?.response?.data?.message ??
          error?.message ??
          "Please review the workout and try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     DERIVED DISPLAY
  ======================================================= */

  const totalExercises =
    exercises.length;


  const selectedPrimaryMuscleGroup =
    muscleGroups.find(
      (group) =>
        Number(group.id) ===
        Number(primaryMuscleGroupId)
    );


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <Box
        maxW="1500px"
        mx="auto"
        px={{
          base: 4,
          md: 6,
          xl: 8,
        }}
        py={8}
      >

        <Skeleton
          height="42px"
          borderRadius="xl"
          mb={4}
        />

        <Skeleton
          height="20px"
          width="50%"
          borderRadius="md"
          mb={8}
        />

        <Grid
          templateColumns={{
            base: "1fr",
            xl: "360px 1fr",
          }}
          gap={6}
        >

          <VStack
            align="stretch"
            spacing={4}
          >

            <Skeleton
              height="260px"
              borderRadius="2xl"
            />

            <Skeleton
              height="180px"
              borderRadius="2xl"
            />

          </VStack>

          <Skeleton
            height="560px"
            borderRadius="2xl"
          />

        </Grid>

      </Box>
    );

  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <Box
      maxW="1500px"
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
          HEADER
      =================================================== */}

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
        gap={5}
        mb={8}
      >

        <HStack
          align="flex-start"
          spacing={4}
        >

          <IconButton
            aria-label="Back to workouts"
            icon={<FiArrowLeft />}
            variant="ghost"
            borderRadius="xl"
            onClick={() =>
              navigate(
                "/staff/workouts"
              )
            }
          />

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
              >
                {isEditMode
                  ? "EDIT WORKOUT"
                  : "NEW WORKOUT"}
              </Badge>


              {totalExercises > 0 && (
                <Text
                  fontSize="xs"
                  color="gray.400"
                >
                  {totalExercises}{" "}
                  {totalExercises === 1
                    ? "exercise"
                    : "exercises"}
                </Text>
              )}

            </HStack>


            <Heading
              size={{
                base: "lg",
                md: "xl",
              }}
              color="gray.800"
              letterSpacing="-0.025em"
            >
              {isEditMode
                ? "Edit workout"
                : "Create workout"}
            </Heading>


            <Text
              mt={2}
              color="gray.500"
              fontSize="sm"
            >
              Build the training plan your client
              will follow.
            </Text>

          </Box>

        </HStack>


        <HStack
          spacing={3}
          w={{
            base: "100%",
            md: "auto",
          }}
        >

          <Button
            variant="ghost"
            borderRadius="xl"
            onClick={() =>
              navigate(
                "/staff/workouts"
              )
            }
            flex={{
              base: 1,
              md: undefined,
            }}
          >
            Cancel
          </Button>


          <Button
            colorScheme="blue"
            borderRadius="xl"
            leftIcon={<FiSave />}
            isLoading={saving}
            loadingText="Saving"
            onClick={
              handleSave
            }
            flex={{
              base: 1,
              md: undefined,
            }}
            px={6}
          >
            Save Workout
          </Button>

        </HStack>

      </Flex>


      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <Grid
        templateColumns={{
          base: "1fr",
          xl: "360px minmax(0, 1fr)",
        }}
        gap={6}
        alignItems="start"
      >

        {/* =================================================
            LEFT — WORKOUT DETAILS
        ================================================== */}

        <VStack
          align="stretch"
          spacing={5}
          position={{
            xl: "sticky",
          }}
          top={{
            xl: "20px",
          }}
        >

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={6}
            boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
          >

            <HStack
              mb={5}
              spacing={3}
            >

              <Flex
                w="40px"
                h="40px"
                align="center"
                justify="center"
                borderRadius="xl"
                bg="blue.50"
                color="blue.500"
              >
                <Icon
                  as={FiList}
                  boxSize={5}
                />
              </Flex>

              <Box>

                <Heading
                  size="sm"
                  color="gray.800"
                >
                  Workout details
                </Heading>

                <Text
                  mt={1}
                  fontSize="xs"
                  color="gray.400"
                >
                  Define the training context.
                </Text>

              </Box>

            </HStack>


            <Stack spacing={5}>

              <FormControl
                isRequired
              >

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Workout name
                </FormLabel>

                <Input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Upper Body Strength"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                  _focus={{
                    bg: "white",
                    borderColor:
                      "blue.300",
                    boxShadow:
                      "0 0 0 1px var(--chakra-colors-blue-300)",
                  }}
                />

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Description
                </FormLabel>

                <Textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="What is this session designed to achieve?"
                  rows={4}
                  resize="vertical"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                  _focus={{
                    bg: "white",
                    borderColor:
                      "blue.300",
                    boxShadow:
                      "0 0 0 1px var(--chakra-colors-blue-300)",
                  }}
                />

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Training goal
                </FormLabel>

                <Select
                  value={trainingGoalId}
                  onChange={(event) =>
                    setTrainingGoalId(
                      event.target.value
                    )
                  }
                  placeholder="Select training goal"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                >

                  {trainingGoals.map(
                    (goal) => (

                      <option
                        key={goal.id}
                        value={goal.id}
                      >
                        {goal.name}
                      </option>

                    )
                  )}

                </Select>

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Primary focus
                </FormLabel>

                <Select
                  value={
                    primaryMuscleGroupId
                  }
                  onChange={(event) =>
                    setPrimaryMuscleGroupId(
                      event.target.value
                    )
                  }
                  placeholder="Select muscle group"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                >

                  {muscleGroups.map(
                    (group) => (

                      <option
                        key={group.id}
                        value={group.id}
                      >
                        {group.name}
                      </option>

                    )
                  )}

                </Select>

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Environment
                </FormLabel>

                <Select
                  value={environment}
                  onChange={(event) =>
                    setEnvironment(
                      normalizeWorkoutEnvironment(
                        event.target.value
                      ) ?? "GYM"
                    )
                  }
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                >

                  <option value="GYM">
                    Gym
                  </option>

                  <option value="HOME">
                    Home
                  </option>

                  <option value="BOTH">
                    Home + Gym
                  </option>

                </Select>

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="sm"
                  fontWeight="600"
                >
                  Estimated duration
                </FormLabel>

                <Input
                  type="number"
                  min={0}
                  value={
                    estimatedDuration
                  }
                  onChange={(event) =>
                    setEstimatedDuration(
                      event.target.value
                    )
                  }
                  placeholder="e.g. 55"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                />

                <Text
                  mt={1.5}
                  fontSize="xs"
                  color="gray.400"
                >
                  Minutes
                </Text>

              </FormControl>

            </Stack>

          </Box>


          {/* ==============================================
              SUMMARY
          =============================================== */}

          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.100"
            borderRadius="2xl"
            p={6}
          >

            <HStack
              mb={4}
              spacing={3}
            >

              <Icon
                as={FiTarget}
                color="blue.500"
              />

              <Text
                fontWeight="700"
                color="gray.800"
              >
                Workout snapshot
              </Text>

            </HStack>


            <Stack spacing={4}>

              <Flex
                align="center"
                justify="space-between"
              >

                <HStack
                  spacing={2}
                  color="gray.500"
                >
                  <Icon
                    as={FiList}
                  />
                  <Text fontSize="sm">
                    Exercises
                  </Text>
                </HStack>

                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.800"
                >
                  {totalExercises}
                </Text>

              </Flex>


              <Flex
                align="center"
                justify="space-between"
              >

                <HStack
                  spacing={2}
                  color="gray.500"
                >
                  <Icon
                    as={FiClock}
                  />
                  <Text fontSize="sm">
                    Duration
                  </Text>
                </HStack>

                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.800"
                >
                  {estimatedDuration
                    ? `${estimatedDuration} min`
                    : "Not set"}
                </Text>

              </Flex>


              <Flex
                align="center"
                justify="space-between"
              >

                <HStack
                  spacing={2}
                  color="gray.500"
                >
                  <Icon
                    as={FiMapPin}
                  />
                  <Text fontSize="sm">
                    Environment
                  </Text>
                </HStack>

                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.800"
                >
                  {environment ===
                  "BOTH"
                    ? "Home + Gym"
                    : environment ===
                      "HOME"
                    ? "Home"
                    : "Gym"}
                </Text>

              </Flex>


              {selectedPrimaryMuscleGroup && (
                <>

                  <Divider
                    borderColor="blue.100"
                  />

                  <HStack
                    justify="space-between"
                  >

                    <Text
                      fontSize="xs"
                      color="gray.500"
                    >
                      Primary focus
                    </Text>

                    <Tag
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      {
                        selectedPrimaryMuscleGroup.name
                      }
                    </Tag>

                  </HStack>

                </>
              )}

            </Stack>

          </Box>

        </VStack>


        {/* =================================================
            RIGHT — EXERCISES
        ================================================== */}

        <Box
          minW={0}
        >

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={{
              base: 5,
              md: 6,
            }}
            boxShadow="0 8px 30px rgba(15, 23, 42, 0.04)"
          >

            {/* ============================================
                EXERCISE HEADER
            ============================================= */}

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
              gap={4}
              mb={6}
            >

              <Box>

                <HStack
                  spacing={3}
                  mb={2}
                >

                  <Heading
                    size="md"
                    color="gray.800"
                  >
                    Exercises
                  </Heading>

                  <Badge
                    colorScheme="blue"
                    borderRadius="full"
                    px={2.5}
                  >
                    {totalExercises}
                  </Badge>

                </HStack>


                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  Add exercises and define what the client
                  should perform.
                </Text>

              </Box>


              <Button
                colorScheme="blue"
                borderRadius="xl"
                leftIcon={
                  <FiPlus />
                }
                onClick={() =>
                  setPickerOpen(true)
                }
              >
                Add Exercise
              </Button>

            </Flex>


            <Divider
              mb={6}
            />


            {/* ============================================
                EMPTY STATE
            ============================================= */}

            {exercises.length === 0 ? (

              <Box
                border="1px dashed"
                borderColor="blue.200"
                borderRadius="2xl"
                py={{
                  base: 12,
                  md: 16,
                }}
                px={6}
                textAlign="center"
              >

                <Flex
                  mx="auto"
                  mb={5}
                  w="62px"
                  h="62px"
                  align="center"
                  justify="center"
                  borderRadius="2xl"
                  bg="blue.50"
                  color="blue.500"
                >
                  <Icon
                    as={FiPlus}
                    boxSize={7}
                  />
                </Flex>


                <Heading
                  size="sm"
                  color="gray.800"
                >
                  Start building the workout
                </Heading>


                <Text
                  mt={2}
                  maxW="520px"
                  mx="auto"
                  color="gray.500"
                  fontSize="sm"
                  lineHeight="1.7"
                >
                  Add exercises from the NEKA exercise
                  library, then configure sets, reps,
                  weight, duration and rest.
                </Text>


                <Button
                  mt={6}
                  colorScheme="blue"
                  borderRadius="xl"
                  leftIcon={
                    <FiPlus />
                  }
                  onClick={() =>
                    setPickerOpen(true)
                  }
                >
                  Add First Exercise
                </Button>

              </Box>

            ) : (

              /* ==========================================
                 EXERCISE LIST
              =========================================== */

              <Stack
                spacing={4}
              >

                {exercises.map(
                  (
                    exercise,
                    index
                  ) => (

                    <Box
                      key={
                        exercise.clientKey
                      }
                      border="1px solid"
                      borderColor="gray.100"
                      borderRadius="2xl"
                      p={{
                        base: 4,
                        md: 5,
                      }}
                      bg="white"
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor:
                          "blue.100",
                        boxShadow:
                          "0 8px 26px rgba(15, 23, 42, 0.045)",
                      }}
                    >

                      {/* --------------------------------
                          EXERCISE TOP
                      --------------------------------- */}

                      <Flex
                        align="flex-start"
                        justify="space-between"
                        gap={4}
                      >

                        <HStack
                          align="flex-start"
                          spacing={4}
                          minW={0}
                        >

                          <Flex
                            flexShrink={0}
                            w="40px"
                            h="40px"
                            align="center"
                            justify="center"
                            borderRadius="xl"
                            bg="gray.50"
                            color="gray.600"
                            fontWeight="700"
                            fontSize="sm"
                          >
                            {index + 1}
                          </Flex>


                          <Box
                            minW={0}
                          >

                            <HStack
                              spacing={2}
                              flexWrap="wrap"
                            >

                              <Heading
                                size="sm"
                                color="gray.800"
                                noOfLines={2}
                              >
                                {
                                  exercise.exerciseName
                                }
                              </Heading>


                              <Badge
                                colorScheme="blue"
                                variant="subtle"
                                borderRadius="full"
                                fontSize="10px"
                              >
                                {exercise.trackingType
                                  .replace(
                                    "_",
                                    " "
                                  )}
                              </Badge>

                            </HStack>


                            <HStack
                              mt={2}
                              spacing={3}
                              flexWrap="wrap"
                              fontSize="xs"
                              color="gray.400"
                            >

                              {exercise.primaryMuscleGroup && (
                                <Text>
                                  {
                                    exercise.primaryMuscleGroup
                                  }
                                </Text>
                              )}


                              {exercise.environment && (
                                <Text>
                                  {
                                    exercise.environment ===
                                    "BOTH"
                                      ? "Home + Gym"
                                      : exercise.environment
                                  }
                                </Text>
                              )}

                            </HStack>

                          </Box>

                        </HStack>


                        <HStack
                          spacing={1}
                          flexShrink={0}
                        >

                          <Tooltip
                            label="Move up"
                          >
                            <IconButton
                              aria-label="Move exercise up"
                              icon={
                                <FiChevronUp />
                              }
                              size="sm"
                              variant="ghost"
                              borderRadius="lg"
                              isDisabled={
                                index === 0
                              }
                              onClick={() =>
                                moveExercise(
                                  index,
                                  "up"
                                )
                              }
                            />
                          </Tooltip>


                          <Tooltip
                            label="Move down"
                          >
                            <IconButton
                              aria-label="Move exercise down"
                              icon={
                                <FiChevronDown />
                              }
                              size="sm"
                              variant="ghost"
                              borderRadius="lg"
                              isDisabled={
                                index ===
                                exercises.length -
                                  1
                              }
                              onClick={() =>
                                moveExercise(
                                  index,
                                  "down"
                                )
                              }
                            />
                          </Tooltip>


                          <Tooltip
                            label="Remove exercise"
                          >
                            <IconButton
                              aria-label="Remove exercise"
                              icon={
                                <FiTrash2 />
                              }
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              borderRadius="lg"
                              onClick={() =>
                                removeExercise(
                                  exercise.clientKey
                                )
                              }
                            />
                          </Tooltip>

                        </HStack>

                      </Flex>


                      <Divider
                        my={5}
                      />


                      {/* --------------------------------
                          TARGETS
                      --------------------------------- */}

                      <SimpleGrid
                        columns={{
                          base: 1,
                          sm: 2,
                          xl:
                            exercise.trackingType ===
                              "REPS_WEIGHT"
                              ? 4
                              : 3,
                        }}
                        spacing={4}
                      >

                        {(exercise.trackingType ===
                          "REPS_WEIGHT" ||
                          exercise.trackingType ===
                            "REPS_ONLY" ||
                          exercise.trackingType ===
                            "REPS_DURATION") && (

                          <FormControl>

                            <FormLabel
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="600"
                            >
                              Sets
                            </FormLabel>

                            <Input
                              type="number"
                              min={0}
                              value={
                                exercise.targetSets ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateExercise(
                                  exercise.clientKey,
                                  "targetSets",
                                  toNullableNumber(
                                    event.target
                                      .value
                                  )
                                )
                              }
                              borderRadius="lg"
                              size="sm"
                            />

                          </FormControl>

                        )}


                        {(exercise.trackingType ===
                          "REPS_WEIGHT" ||
                          exercise.trackingType ===
                            "REPS_ONLY" ||
                          exercise.trackingType ===
                            "REPS_DURATION") && (

                          <FormControl>

                            <FormLabel
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="600"
                            >
                              Reps
                            </FormLabel>

                            <Input
                              type="number"
                              min={0}
                              value={
                                exercise.targetReps ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateExercise(
                                  exercise.clientKey,
                                  "targetReps",
                                  toNullableNumber(
                                    event.target
                                      .value
                                  )
                                )
                              }
                              borderRadius="lg"
                              size="sm"
                            />

                          </FormControl>

                        )}


                        {exercise.trackingType ===
                          "REPS_WEIGHT" && (

                          <FormControl>

                            <FormLabel
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="600"
                            >
                              Weight
                            </FormLabel>

                            <Input
                              type="number"
                              min={0}
                              step="0.5"
                              value={
                                exercise.targetWeight ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateExercise(
                                  exercise.clientKey,
                                  "targetWeight",
                                  toNullableNumber(
                                    event.target
                                      .value
                                  )
                                )
                              }
                              borderRadius="lg"
                              size="sm"
                            />

                            <Text
                              mt={1}
                              fontSize="10px"
                              color="gray.400"
                            >
                              kg
                            </Text>

                          </FormControl>

                        )}


                        {(exercise.trackingType ===
                          "DURATION" ||
                          exercise.trackingType ===
                            "REPS_DURATION") && (

                          <FormControl>

                            <FormLabel
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="600"
                            >
                              Duration
                            </FormLabel>

                            <Input
                              type="number"
                              min={0}
                              value={
                                exercise.targetDurationSeconds ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateExercise(
                                  exercise.clientKey,
                                  "targetDurationSeconds",
                                  toNullableNumber(
                                    event.target
                                      .value
                                  )
                                )
                              }
                              borderRadius="lg"
                              size="sm"
                            />

                            <Text
                              mt={1}
                              fontSize="10px"
                              color="gray.400"
                            >
                              seconds
                            </Text>

                          </FormControl>

                        )}


                        {exercise.trackingType ===
                          "DISTANCE" && (

                          <FormControl>

                            <FormLabel
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="600"
                            >
                              Distance
                            </FormLabel>

                            <Input
                              type="number"
                              min={0}
                              value={
                                exercise.targetDistance ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateExercise(
                                  exercise.clientKey,
                                  "targetDistance",
                                  toNullableNumber(
                                    event.target
                                      .value
                                  )
                                )
                              }
                              borderRadius="lg"
                              size="sm"
                            />

                            <Text
                              mt={1}
                              fontSize="10px"
                              color="gray.400"
                            >
                              metres
                            </Text>

                          </FormControl>

                        )}


                        <FormControl>

                          <FormLabel
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="600"
                          >
                            Rest
                          </FormLabel>

                          <Input
                            type="number"
                            min={0}
                            value={
                              exercise.restSeconds ??
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateExercise(
                                exercise.clientKey,
                                "restSeconds",
                                toNullableNumber(
                                  event.target
                                    .value
                                )
                              )
                            }
                            borderRadius="lg"
                            size="sm"
                          />

                          <Text
                            mt={1}
                            fontSize="10px"
                            color="gray.400"
                          >
                            seconds
                          </Text>

                        </FormControl>

                      </SimpleGrid>


                      {/* --------------------------------
                          NOTES
                      --------------------------------- */}

                      <FormControl
                        mt={5}
                      >

                        <FormLabel
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="600"
                        >
                          Trainer note
                        </FormLabel>

                        <Input
                          value={
                            exercise.notes ??
                            ""
                          }
                          onChange={(event) =>
                            updateExercise(
                              exercise.clientKey,
                              "notes",
                              event.target
                                .value
                            )
                          }
                          placeholder="Optional cue, form instruction or progression note"
                          borderRadius="lg"
                          size="sm"
                        />

                      </FormControl>

                    </Box>

                  )
                )}

              </Stack>

            )}


            {/* ==========================================
                ADD ANOTHER
            =========================================== */}

            {exercises.length > 0 && (
              <Button
                mt={5}
                w="100%"
                variant="outline"
                borderStyle="dashed"
                borderRadius="xl"
                leftIcon={
                  <FiPlus />
                }
                onClick={() =>
                  setPickerOpen(true)
                }
              >
                Add another exercise
              </Button>
            )}

          </Box>

        </Box>

      </Grid>


      {/* =================================================
          EXERCISE PICKER
      ================================================== */}

      <ExercisePickerDrawer
        isOpen={
          pickerOpen
        }
        onClose={() =>
          setPickerOpen(false)
        }
        selectedExerciseIds={
          selectedExerciseIds
        }
        preferredEnvironment={
          environment
        }
        onSelectExercise={
          handleAddExercise
        }
      />

    </Box>
  );
};


export default WorkoutTemplateBuilderPage;