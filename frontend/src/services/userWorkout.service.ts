import api from "../utils/api";

import type {
  ClientWorkoutAssignment,
  ClientWorkoutAssignmentDetail,
  WorkoutSession,
  WorkoutSessionHistoryItem,
} from "../types/workoutExecution.types";

const unwrap = <T>(response: any): T => {
  return response?.data?.data ?? response?.data ?? response;
};

export const getMyWorkoutAssignments = async (): Promise<ClientWorkoutAssignment[]> => {
  const response = await api.get("/workout/my/assignments");
  return unwrap<ClientWorkoutAssignment[]>(response) || [];
};

export const getMyWorkoutAssignment = async (
  assignmentId: number
): Promise<ClientWorkoutAssignmentDetail> => {
  const response = await api.get(`/workout/my/assignments/${assignmentId}`);
  return unwrap<ClientWorkoutAssignmentDetail>(response);
};

export const startWorkoutSession = async (
  assignmentId: number
): Promise<WorkoutSession> => {
  const response = await api.post(
    `/workout/my/assignments/${assignmentId}/sessions`
  );
  return unwrap<WorkoutSession>(response);
};

export const getActiveWorkoutSession = async (): Promise<WorkoutSession | null> => {
  const response = await api.get("/workout/my/sessions/active");
  return unwrap<WorkoutSession | null>(response);
};

export const getWorkoutSession = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.get(`/workout/my/sessions/${sessionId}`);
  return unwrap<WorkoutSession>(response);
};

export const pauseWorkoutSession = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.post(`/workout/my/sessions/${sessionId}/pause`);
  return unwrap<WorkoutSession>(response);
};

export const resumeWorkoutSession = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.post(`/workout/my/sessions/${sessionId}/resume`);
  return unwrap<WorkoutSession>(response);
};

export interface WorkoutSetInput {
  repsCompleted?: number | null;
  weightKg?: number | null;
  durationSeconds?: number | null;
  distance?: number | null;
}

export const completeWorkoutSet = async (
  sessionId: number,
  input: WorkoutSetInput = {}
): Promise<WorkoutSession> => {
  const response = await api.post(
    `/workout/my/sessions/${sessionId}/sets/complete`,
    input
  );
  return unwrap<WorkoutSession>(response);
};

export const skipWorkoutSet = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.post(
    `/workout/my/sessions/${sessionId}/sets/skip`
  );
  return unwrap<WorkoutSession>(response);
};

export const skipWorkoutRest = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.post(`/workout/my/sessions/${sessionId}/rest/skip`);
  return unwrap<WorkoutSession>(response);
};

export const extendWorkoutRest = async (
  sessionId: number,
  seconds = 30
): Promise<WorkoutSession> => {
  const response = await api.post(
    `/workout/my/sessions/${sessionId}/rest/extend`,
    { seconds }
  );
  return unwrap<WorkoutSession>(response);
};

export const finishWorkoutSession = async (
  sessionId: number
): Promise<WorkoutSession> => {
  const response = await api.post(`/workout/my/sessions/${sessionId}/finish`);
  return unwrap<WorkoutSession>(response);
};

export const getWorkoutSessionHistory = async (
  limit = 30
): Promise<WorkoutSessionHistoryItem[]> => {
  const response = await api.get("/workout/my/sessions/history", {
    params: { limit },
  });
  return unwrap<WorkoutSessionHistoryItem[]>(response) || [];
};

export const getExerciseLibrary = async (params: Record<string, any> = {}) => {
  const response = await api.get("/workout/exercises", { params });
  return unwrap<any[]>(response) || [];
};

export const getWorkoutMuscleGroups = async () => {
  const response = await api.get("/workout/muscle-groups");
  return unwrap<any[]>(response) || [];
};
