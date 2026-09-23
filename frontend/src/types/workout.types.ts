export type WorkoutTrackingType =
  | "REPS_WEIGHT"
  | "REPS_ONLY"
  | "DURATION"
  | "DISTANCE"
  | "REPS_DURATION";

export type WorkoutEnvironment = "HOME" | "GYM" | "BOTH";

export type WorkoutTemplateStatus = "ACTIVE" | "INACTIVE";

export type WorkoutGoalType =
  | "MUSCLE_GAIN"
  | "LEAN_BULK"
  | "BULK"
  | "HYPERTROPHY"
  | "FAT_LOSS"
  | "CUTTING"
  | "STRENGTH"
  | "RECOMPOSITION"
  | "GENERAL_FITNESS"
  | "ENDURANCE"
  | "MOBILITY"
  | "ATHLETIC_PERFORMANCE";

export interface WorkoutTrainingGoal {
  id: number;
  code?: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export interface WorkoutMuscleGroup {
  id: number;
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export interface WorkoutEquipment {
  id: number;
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export interface ExerciseMuscle {
  id?: number;
  muscle_group_id: number;
  muscle_group_name?: string;
  role?: "PRIMARY" | "SECONDARY";
}

export interface ExerciseEquipment {
  id?: number;
  equipment_id: number;
  equipment_name?: string;
  is_required?: boolean;
}

export interface ExerciseMedia {
  id?: number;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  thumbnail_url?: string | null;
  display_order?: number;
}

export interface WorkoutExercise {
  id: number;
  name: string;
  description?: string | null;

  primary_muscle_group_id?: number | null;
  primary_muscle_group?: string | null;

  movement_pattern?: string | null;

  tracking_type: WorkoutTrackingType;

  difficulty?: string | null;
  instructions?: string | null;

  image_url?: string | null;
  video_url?: string | null;

  environment?: WorkoutEnvironment | null;

  active?: boolean;
  is_active?: boolean;

  created_at?: string;
  updated_at?: string;

  muscles?: ExerciseMuscle[];
  equipment?: ExerciseEquipment[];
  media?: ExerciseMedia[];
}

export interface WorkoutTemplateExercise {
  id: number;

  workout_template_id: number;
  exercise_id: number;

  display_order: number;

  target_sets?: number | null;
  target_reps?: number | null;
  target_weight?: number | string | null;

  target_duration_seconds?: number | null;
  target_distance?: number | null;

  rest_seconds?: number | null;

  notes?: string | null;

  exercise_name: string;
  tracking_type: WorkoutTrackingType;

  environment?: WorkoutEnvironment | null;

  primary_muscle_group_id?: number | null;
  primary_muscle_group?: string | null;

  image_url?: string | null;
  video_url?: string | null;

  // Used only on frontend before the row is persisted.
  client_key?: string;
}

export interface WorkoutTemplate {
  id: number;

  organization_id: number;

  created_by_member_id: number;

  name: string;

  description?: string | null;

  goal_type?: WorkoutGoalType | string | null;

  training_goal_id?: number | null;
  training_goal_name?: string | null;

  primary_muscle_group_id?: number | null;
  primary_muscle_group?: string | null;

  environment?: WorkoutEnvironment | null;

  estimated_duration_minutes?: number | null;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;

  exercises: WorkoutTemplateExercise[];
}

export interface WorkoutTemplateListItem
  extends Omit<WorkoutTemplate, "exercises"> {
  exercise_count?: number;
}

export interface CreateWorkoutTemplatePayload {
  organizationId: number;
  name: string;
  description?: string | null;
  goalType?: WorkoutGoalType | string | null;
  trainingGoalId?: number | null;
  primaryMuscleGroupId?: number | null;
  environment?: WorkoutEnvironment | null;
  estimatedDurationMinutes?: number | null;
}

export interface UpdateWorkoutTemplatePayload {
  organizationId: number;
  name?: string;
  description?: string | null;
  goalType?: WorkoutGoalType | string | null;
  trainingGoalId?: number | null;
  primaryMuscleGroupId?: number | null;
  environment?: WorkoutEnvironment | null;
  estimatedDurationMinutes?: number | null;
  isActive?: boolean;
}

export interface AddWorkoutTemplateExercisePayload {
  organizationId: number;
  exerciseId: number;

  displayOrder?: number;

  targetSets?: number | null;
  targetReps?: number | null;
  targetWeight?: number | null;

  targetDurationSeconds?: number | null;
  targetDistance?: number | null;

  restSeconds?: number | null;

  notes?: string | null;
}

export interface UpdateWorkoutTemplateExercisePayload {
  organizationId: number;

  exerciseId?: number;

  displayOrder?: number;

  targetSets?: number | null;
  targetReps?: number | null;
  targetWeight?: number | null;

  targetDurationSeconds?: number | null;
  targetDistance?: number | null;

  restSeconds?: number | null;

  notes?: string | null;
}

export interface ReorderWorkoutTemplatePayload {
  organizationId: number;

  exercises: Array<{
    id: number;
    displayOrder: number;
  }>;
}

export interface WorkoutTemplateFilters {
  search?: string;
  trainingGoalId?: number;
  muscleGroupId?: number;
  environment?: WorkoutEnvironment;
  isActive?: boolean;
}

export interface ExerciseFilters {
  search?: string;
  muscleGroupId?: number;
  equipmentId?: number;
  environment?: WorkoutEnvironment;
  trackingType?: WorkoutTrackingType;
  active?: boolean;
}

export interface WorkoutWorkspace {
  organization: {
    id: number;
    name: string;
    organization_type?: string;
    workspace_code?: string;
  };

  viewer_role: string;

  members?: Array<{
    id: number;
    user_id: number;
    role_name?: string;
    status?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  }>;
}

/**
 * Frontend-only draft object used by the Workout Template Builder.
 *
 * Important:
 * - id exists only for already-saved DB rows.
 * - clientKey always exists so React can safely track rows.
 * - new rows must NOT be sent to reorder API until they are persisted.
 */
export interface WorkoutTemplateExerciseDraft {
  clientKey: string;

  id?: number;

  exerciseId: number;

  exerciseName: string;

  trackingType: WorkoutTrackingType;

  primaryMuscleGroup?: string | null;

  primaryMuscleGroupId?: number | null;

  environment?: WorkoutEnvironment | null;

  imageUrl?: string | null;

  displayOrder: number;

  targetSets?: number | null;
  targetReps?: number | null;
  targetWeight?: number | null;

  targetDurationSeconds?: number | null;
  targetDistance?: number | null;

  restSeconds?: number | null;

  notes?: string | null;
}

/**
 * Generic API response helpers.
 *
 * The backend endpoints may return either:
 *   { data: ... }
 * or the payload directly depending on the controller.
 *
 * Keeping these types here avoids repeating loose `any` types
 * throughout the workout UI.
 */
export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}