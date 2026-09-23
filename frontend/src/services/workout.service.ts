// src/services/workout.service.ts

import api from "../utils/api";

import type {
  AddWorkoutTemplateExercisePayload,
  ApiResponse,
  CreateWorkoutTemplatePayload,
  ExerciseFilters,
  ReorderWorkoutTemplatePayload,
  UpdateWorkoutTemplateExercisePayload,
  UpdateWorkoutTemplatePayload,
  WorkoutEnvironment,
  WorkoutEquipment,
  WorkoutExercise,
  WorkoutMuscleGroup,
  WorkoutTemplate,
  WorkoutTemplateListItem,
  WorkoutTrainingGoal,
  WorkoutWorkspace,
  WorkoutAssignment,
  CreateWorkoutAssignmentPayload
} from "../types/workout.types";

/* =========================================================
   HELPERS
========================================================= */

/**
 * Backend workout APIs return:
 *
 * {
 *   success: true,
 *   data: ...
 * }
 *
 * This helper keeps the UI/service layer independent
 * of that wrapper.
 */
const unwrap = <T>(response: {
  data?: ApiResponse<T> | T;
}): T => {
  const body = response?.data;

  if (
    body &&
    typeof body === "object" &&
    "data" in body
  ) {
    return (body as ApiResponse<T>).data as T;
  }

  return body as T;
};


/**
 * Removes undefined/null query values.
 *
 * Keeps URLs clean and prevents sending things like:
 * ?search=&muscleGroupId=undefined
 */
const cleanParams = (
  params: Record<string, unknown>
) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );
};


/* =========================================================
   ORGANIZATION / WORKSPACE
========================================================= */

/**
 * Resolves the currently active workspace.
 *
 * Important:
 * Do NOT use /organizations/my-access for organizationId.
 * That endpoint only gives access/role information.
 *
 * /organizations/workspace/members returns:
 * {
 *   organization: {
 *     id,
 *     name,
 *     organization_type,
 *     workspace_code
 *   },
 *   viewer_role,
 *   members
 * }
 */
export const getWorkoutWorkspace =
  async (): Promise<WorkoutWorkspace> => {
    const response = await api.get(
      "/organizations/workspace/members"
    );

    return unwrap<WorkoutWorkspace>(response);
  };


/* =========================================================
   MASTER DATA
========================================================= */

/**
 * Muscle groups
 */
export const getWorkoutMuscleGroups =
  async (): Promise<WorkoutMuscleGroup[]> => {
    const response = await api.get(
      "/workout/muscle-groups"
    );

    return unwrap<WorkoutMuscleGroup[]>(response);
  };


/**
 * Equipment
 */
export const getWorkoutEquipment =
  async (): Promise<WorkoutEquipment[]> => {
    const response = await api.get(
      "/workout/equipment"
    );

    return unwrap<WorkoutEquipment[]>(response);
  };


/**
 * Training goals
 */
export const getWorkoutTrainingGoals =
  async (): Promise<WorkoutTrainingGoal[]> => {
    const response = await api.get(
      "/workout/training-goals"
    );

    return unwrap<WorkoutTrainingGoal[]>(response);
  };


/* =========================================================
   EXERCISE MASTER
========================================================= */

/**
 * Get exercises with optional filters.
 *
 * Supported backend filters:
 * - muscleGroupId
 * - equipmentId
 * - environment
 * - trackingType
 * - difficulty
 * - search
 */
export const getWorkoutExercises =
  async (
    filters: ExerciseFilters = {}
  ): Promise<WorkoutExercise[]> => {
    const response = await api.get(
      "/workout/exercises",
      {
        params: cleanParams({
          search: filters.search,
          muscleGroupId:
            filters.muscleGroupId,
          equipmentId:
            filters.equipmentId,
          environment:
            filters.environment,
          trackingType:
            filters.trackingType,
          difficulty: filters.difficulty,
        }),
      }
    );

    return unwrap<WorkoutExercise[]>(
      response
    );
  };


/**
 * Get one exercise.
 */
export const getWorkoutExercise =
  async (
    exerciseId: number
  ): Promise<WorkoutExercise> => {
    const response = await api.get(
      `/workout/exercises/${exerciseId}`
    );

    return unwrap<WorkoutExercise>(
      response
    );
  };


/* =========================================================
   WORKOUT TEMPLATES
========================================================= */

/**
 * Get all workout templates for the active organization.
 */
export const getWorkoutTemplates =
  async (
    organizationId: number
  ): Promise<WorkoutTemplateListItem[]> => {
    const response = await api.get(
      "/workout/templates",
      {
        params: {
          organizationId,
        },
      }
    );

    return unwrap<WorkoutTemplateListItem[]>(
      response
    );
  };


/**
 * Get one workout template including
 * its exercises.
 */
export const getWorkoutTemplate =
  async (
    organizationId: number,
    templateId: number
  ): Promise<WorkoutTemplate> => {
    const response = await api.get(
      `/workout/templates/${templateId}`,
      {
        params: {
          organizationId,
        },
      }
    );

    return unwrap<WorkoutTemplate>(
      response
    );
  };


/**
 * Create workout template.
 *
 * The backend accepts organizationId
 * directly inside the POST body.
 */
export const createWorkoutTemplate =
  async (
    payload: CreateWorkoutTemplatePayload
  ): Promise<WorkoutTemplate> => {
    const response = await api.post(
      "/workout/templates",
      {
        organizationId:
          payload.organizationId,

        name:
          payload.name,

        description:
          payload.description ?? null,

        goalType:
          payload.goalType ?? null,

        trainingGoalId:
          payload.trainingGoalId ?? null,

        primaryMuscleGroupId:
          payload.primaryMuscleGroupId ?? null,

        environment:
          payload.environment ?? null,

        estimatedDurationMinutes:
          payload.estimatedDurationMinutes ??
          null,
      }
    );

    return unwrap<WorkoutTemplate>(
      response
    );
  };


/**
 * Update workout template.
 */
export const updateWorkoutTemplate =
  async (
    templateId: number,
    payload: UpdateWorkoutTemplatePayload
  ): Promise<WorkoutTemplate> => {
    const response = await api.put(
      `/workout/templates/${templateId}`,
      {
        organizationId:
          payload.organizationId,

        name:
          payload.name,

        description:
          payload.description ?? null,

        goalType:
          payload.goalType ?? null,

        trainingGoalId:
          payload.trainingGoalId ?? null,

        primaryMuscleGroupId:
          payload.primaryMuscleGroupId ?? null,

        environment:
          payload.environment ?? null,

        estimatedDurationMinutes:
          payload.estimatedDurationMinutes ??
          null,

        isActive:
          payload.isActive,
      }
    );

    return unwrap<WorkoutTemplate>(
      response
    );
  };


/**
 * Archive / deactivate workout template.
 *
 * Backend performs a soft delete by setting
 * is_active = false.
 */
export const deleteWorkoutTemplate =
  async (
    organizationId: number,
    templateId: number
  ) => {
    const response = await api.delete(
      `/workout/templates/${templateId}`,
      {
        params: {
          organizationId,
        },
      }
    );

    return unwrap(response);
  };


/* =========================================================
   TEMPLATE EXERCISES
========================================================= */

/**
 * Add an exercise to a workout template.
 *
 * This is intentionally separate from template creation.
 *
 * That allows our builder to:
 * 1. Create the template
 * 2. Add exercises
 * 3. Refetch real DB IDs
 * 4. Reorder safely
 */
export const addWorkoutTemplateExercise =
  async (
    templateId: number,
    payload: AddWorkoutTemplateExercisePayload
  ): Promise<WorkoutTemplate> => {
    const response = await api.post(
      `/workout/templates/${templateId}/exercises`,
      {
        organizationId:
          payload.organizationId,

        exerciseId:
          payload.exerciseId,

        displayOrder:
          payload.displayOrder ?? null,

        targetSets:
          payload.targetSets ?? null,

        targetReps:
          payload.targetReps ?? null,

        targetWeight:
          payload.targetWeight ?? null,

        targetDurationSeconds:
          payload.targetDurationSeconds ??
          null,

        targetDistance:
          payload.targetDistance ?? null,

        restSeconds:
          payload.restSeconds ?? null,

        notes:
          payload.notes ?? null,
      }
    );

    return unwrap<WorkoutTemplate>(
      response
    );
  };


/**
 * Update one template exercise.
 *
 * exerciseId is optional because the backend now supports
 * keeping the existing exercise when only target values
 * are changed.
 */
export const updateWorkoutTemplateExercise =
  async (
    templateId: number,
    templateExerciseId: number,
    payload: UpdateWorkoutTemplateExercisePayload
  ) => {
    const response = await api.put(
      `/workout/templates/${templateId}/exercises/${templateExerciseId}`,
      {
        organizationId:
          payload.organizationId,

        ...(payload.exerciseId !== undefined && {
          exerciseId:
            payload.exerciseId,
        }),

        ...(payload.displayOrder !== undefined && {
          displayOrder:
            payload.displayOrder,
        }),

        targetSets:
          payload.targetSets ?? null,

        targetReps:
          payload.targetReps ?? null,

        targetWeight:
          payload.targetWeight ?? null,

        targetDurationSeconds:
          payload.targetDurationSeconds ??
          null,

        targetDistance:
          payload.targetDistance ?? null,

        restSeconds:
          payload.restSeconds ?? null,

        notes:
          payload.notes ?? null,
      }
    );

    return unwrap(response);
  };


/**
 * Remove one exercise from a template.
 */
export const deleteWorkoutTemplateExercise =
  async (
    organizationId: number,
    templateId: number,
    templateExerciseId: number
  ) => {
    const response = await api.delete(
      `/workout/templates/${templateId}/exercises/${templateExerciseId}`,
      {
        params: {
          organizationId,
        },
      }
    );

    return unwrap(response);
  };


/* =========================================================
   TEMPLATE REORDER
========================================================= */

/**
 * Reorder template exercises.
 *
 * IMPORTANT:
 * Backend expects:
 *
 * {
 *   organizationId: 1,
 *   exerciseIds: [12, 15, 10]
 * }
 *
 * These IDs are workout_template_exercises.id values,
 * NOT exercises.id values.
 *
 * This distinction is very important.
 */
export const reorderWorkoutTemplateExercises =
  async (
    templateId: number,
    payload: ReorderWorkoutTemplatePayload
  ): Promise<WorkoutTemplate> => {
    const response = await api.put(
      `/workout/templates/${templateId}/reorder`,
      {
        organizationId:
          payload.organizationId,

        exerciseIds:
          payload.exercises.map(
            (exercise) => exercise.id
          ),
      }
    );

    return unwrap<WorkoutTemplate>(
      response
    );
  };


/* =========================================================
   CONVENIENCE HELPERS
========================================================= */

/**
 * Returns the appropriate default tracking values
 * when an exercise is newly added to a template.
 */
export const getDefaultWorkoutTargets = (
  trackingType: WorkoutExercise["tracking_type"]
) => {
  switch (trackingType) {

    case "REPS_WEIGHT":
      return {
        targetSets: 3,
        targetReps: 10,
        targetWeight: null,
        targetDurationSeconds: null,
        targetDistance: null,
        restSeconds: 90,
      };

    case "REPS_ONLY":
      return {
        targetSets: 3,
        targetReps: 10,
        targetWeight: null,
        targetDurationSeconds: null,
        targetDistance: null,
        restSeconds: 60,
      };

    case "DURATION":
      return {
        targetSets: null,
        targetReps: null,
        targetWeight: null,
        targetDurationSeconds: 60,
        targetDistance: null,
        restSeconds: 60,
      };

    case "DISTANCE":
      return {
        targetSets: null,
        targetReps: null,
        targetWeight: null,
        targetDurationSeconds: null,
        targetDistance: 1000,
        restSeconds: 60,
      };

    case "REPS_DURATION":
      return {
        targetSets: 3,
        targetReps: 10,
        targetWeight: null,
        targetDurationSeconds: 30,
        targetDistance: null,
        restSeconds: 60,
      };

    default:
      return {
        targetSets: 3,
        targetReps: 10,
        targetWeight: null,
        targetDurationSeconds: null,
        targetDistance: null,
        restSeconds: 60,
      };
  }
};


/**
 * Used by the UI when selecting HOME / GYM / BOTH.
 */
export const normalizeWorkoutEnvironment = (
  value?: string | null
): WorkoutEnvironment | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized =
    value.toUpperCase();

  if (
    normalized === "HOME" ||
    normalized === "GYM" ||
    normalized === "BOTH"
  ) {
    return normalized;
  }

  return undefined;
};


/* ======================================================
   WORKOUT ASSIGNMENTS
====================================================== */

export const getMyWorkoutAssignments = async (
  organizationId: number
): Promise<WorkoutAssignment[]> => {

  const response = await api.get(
    `/workout/assignments?organizationId=${organizationId}`
  );

  return unwrap<WorkoutAssignment[]>(response);
};


export const createWorkoutAssignment = async (
  payload: CreateWorkoutAssignmentPayload
): Promise<WorkoutAssignment> => {

  const response = await api.post(
    "/workout/assignments",
    payload
  );

  return unwrap<WorkoutAssignment>(response);
};


// /* ======================================================
//    WORKOUT ASSIGNMENT DETAIL
// ====================================================== */

// export const getWorkoutAssignmentByIdService = async (
//   userId,
//   organizationId,
//   assignmentId
// ) => {

//   const membership = await getWorkoutMembership(
//     userId,
//     Number(organizationId),
//     "VIEW_WORKOUT"
//   );

//   const normalizedAssignmentId = Number(assignmentId);

//   if (
//     !Number.isInteger(normalizedAssignmentId) ||
//     normalizedAssignmentId <= 0
//   ) {
//     throw new Error("Invalid workout assignment id.");
//   }

//   const client = await pool.connect();

//   try {

//     /*
//       --------------------------------------------------
//       ASSIGNMENT + CLIENT + TRAINER + TEMPLATE
//       --------------------------------------------------
//     */

//     const assignmentResult = await client.query(
//       `
//       SELECT
//         wa.id,
//         wa.organization_id,
//         wa.workout_template_id,
//         wa.trainer_member_id,
//         wa.client_member_id,
//         wa.start_date,
//         wa.end_date,
//         wa.scheduled_days,
//         wa.status,
//         wa.created_at,

//         /* TEMPLATE */
//         wt.name AS template_name,
//         wt.description AS template_description,
//         wt.goal_type,
//         wt.training_goal_id,
//         tg.name AS training_goal_name,
//         wt.primary_muscle_group_id,
//         pmg.name AS primary_muscle_group,
//         wt.environment,
//         wt.estimated_duration_minutes,

//         /* CLIENT */
//         client_user.id AS client_user_id,
//         client_user.name AS client_name,
//         client_user.nickname AS client_nickname,

//         /* TRAINER */
//         trainer_user.id AS trainer_user_id,
//         trainer_user.name AS trainer_name,
//         trainer_user.nickname AS trainer_nickname

//       FROM workout_assignments wa

//       INNER JOIN workout_templates wt
//         ON wt.id = wa.workout_template_id

//       LEFT JOIN workout_training_goals tg
//         ON tg.id = wt.training_goal_id

//       LEFT JOIN workout_muscle_groups pmg
//         ON pmg.id = wt.primary_muscle_group_id

//       INNER JOIN organization_members client_member
//         ON client_member.id = wa.client_member_id

//       INNER JOIN users client_user
//         ON client_user.id = client_member.user_id

//       INNER JOIN organization_members trainer_member
//         ON trainer_member.id = wa.trainer_member_id

//       INNER JOIN users trainer_user
//         ON trainer_user.id = trainer_member.user_id

//       WHERE
//         wa.id = $1
//         AND wa.organization_id = $2
//         AND wa.trainer_member_id = $3

//       LIMIT 1
//       `,
//       [
//         normalizedAssignmentId,
//         organizationId,
//         membership.member_id
//       ]
//     );

//     if (!assignmentResult.rows.length) {
//       throw new Error("Workout assignment not found.");
//     }

//     const assignment = assignmentResult.rows[0];

//     /*
//       --------------------------------------------------
//       ASSIGNMENT EXERCISES
//       --------------------------------------------------
//     */

//     const exerciseResult = await client.query(
//       `
//       SELECT
//         wae.id,
//         wae.workout_assignment_id,
//         wae.template_exercise_id,
//         wae.exercise_id,
//         wae.display_order,

//         wae.target_sets,
//         wae.target_reps,
//         wae.target_weight,
//         wae.target_duration_seconds,
//         wae.target_distance,
//         wae.rest_seconds,
//         wae.notes,

//         /* EXERCISE */
//         e.name AS exercise_name,
//         e.description AS exercise_description,
//         e.tracking_type,
//         e.environment AS exercise_environment,
//         e.difficulty,
//         e.instructions,
//         e.image_url,
//         e.video_url,
//         e.primary_muscle_group_id,

//         mg.name AS primary_muscle_group

//       FROM workout_assignment_exercises wae

//       INNER JOIN exercises e
//         ON e.id = wae.exercise_id

//       LEFT JOIN workout_muscle_groups mg
//         ON mg.id = e.primary_muscle_group_id

//       WHERE
//         wae.workout_assignment_id = $1

//       ORDER BY
//         wae.display_order ASC,
//         wae.id ASC
//       `,
//       [normalizedAssignmentId]
//     );

//     return {
//       ...assignment,
//       exercises: exerciseResult.rows
//     };

//   } finally {

//     client.release();

//   }

// };