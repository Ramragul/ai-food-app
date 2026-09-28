export type WorkoutSessionStatus = "RUNNING" | "PAUSED" | "FINISHED";

export type WorkoutSetStatus = "PENDING" | "COMPLETE" | "SKIPPED";

export interface ClientWorkoutAssignment {
  id: number;
  organization_id: number;
  workout_template_id: number;
  trainer_member_id: number;
  client_member_id: number;
  start_date: string;
  end_date?: string | null;
  scheduled_days: string[];
  status: string;
  created_at: string;
  workout_name: string;
  workout_description?: string | null;
  goal_type?: string | null;
  training_goal_name?: string | null;
  primary_muscle_group?: string | null;
  environment?: string | null;
  estimated_duration_minutes?: number | null;
  organization_name?: string | null;
  organization_logo_url?: string | null;
  trainer_user_id?: number | null;
  trainer_name?: string | null;
  trainer_nickname?: string | null;
  exercise_count?: number;
}

export interface ClientWorkoutExercise {
  id: number;
  workout_assignment_id: number;
  template_exercise_id?: number | null;
  exercise_id: number;
  display_order: number;
  target_sets?: number | null;
  target_reps?: number | null;
  target_weight?: number | null;
  target_duration_seconds?: number | null;
  target_distance?: number | null;
  rest_seconds?: number | null;
  notes?: string | null;
  exercise_name: string;
  exercise_description?: string | null;
  tracking_type: string;
  exercise_environment?: string | null;
  difficulty?: string | null;
  instructions?: string | null;
  image_url?: string | null;
  video_url?: string | null;
  primary_muscle_group?: string | null;
  met_value?: number | null;
  sets?: WorkoutSessionSet[];
}

export interface ClientWorkoutAssignmentDetail extends ClientWorkoutAssignment {
  exercises: ClientWorkoutExercise[];
}

export interface WorkoutSessionSet {
  id: number;
  session_id: number;
  assignment_exercise_id: number;
  set_index: number;
  status: WorkoutSetStatus;
  reps_completed?: number | null;
  weight_kg?: number | null;
  duration_seconds?: number | null;
  distance?: number | null;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface WorkoutSession extends Record<string, any> {
  id: number;
  user_id: number;
  organization_id: number;
  workout_assignment_id: number;
  status: WorkoutSessionStatus;
  started_at: string;
  last_resumed_at?: string | null;
  paused_at?: string | null;
  finished_at?: string | null;
  active_seconds: number;
  manual_pause_seconds: number;
  rest_seconds: number;
  current_exercise_index: number;
  current_set_index: number;
  total_sets: number;
  completed_sets: number;
  skipped_sets: number;
  completed_exercises: number;
  completion_percent: number;
  rest_active: boolean;
  rest_started_at?: string | null;
  rest_target_seconds?: number;
  rest_for_assignment_exercise_id?: number | null;
  current_elapsed_seconds: number;
  total_elapsed_seconds: number;
  rest_remaining_seconds: number;
  calories_burned_active?: number | null;
  burn_confidence?: string | null;
  assignment: ClientWorkoutAssignment & {
    exercises: ClientWorkoutExercise[];
  };
}

export interface WorkoutSessionHistoryItem {
  id: number;
  workout_assignment_id?: number | null;
  status: WorkoutSessionStatus;
  started_at: string;
  finished_at?: string | null;
  active_seconds: number;
  manual_pause_seconds: number;
  rest_seconds: number;
  completed_sets: number;
  skipped_sets: number;
  completed_exercises: number;
  completion_percent: number;
  calories_burned_active?: number | null;
  burn_confidence?: string | null;
  workout_name?: string | null;
  organization_name?: string | null;
}
