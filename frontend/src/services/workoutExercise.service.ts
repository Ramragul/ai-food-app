// Version 1

// import api from "../utils/api";

// export interface WorkoutMuscleGroup {
//   id: number;
//   name: string;
//   description?: string | null;
//   display_order?: number | null;
// }

// export interface WorkoutEquipment {
//   id: number;
//   name: string;
//   description?: string | null;
// }

// export interface WorkoutExerciseListItem {
//   id: number;
//   name: string;
//   description?: string | null;
//   primary_muscle_group_id?: number | null;
//   primary_muscle_group?: string | null;
//   movement_pattern?: string | null;
//   tracking_type?: string | null;
//   difficulty?: string | null;
//   instructions?: string | null;
//   image_url?: string | null;
//   video_url?: string | null;
//   environment?: string | null;
//   is_active?: boolean;
//   created_at?: string | null;
//   updated_at?: string | null;
// }

// export interface WorkoutExerciseDetail extends WorkoutExerciseListItem {
//   muscles?: Array<{
//     muscle_group_id: number;
//     name: string;
//     role: "PRIMARY" | "SECONDARY" | string;
//   }>;
//   equipment?: Array<{
//     equipment_id: number;
//     name: string;
//     is_required?: boolean;
//   }>;
//   media?: Array<{
//     id: number;
//     media_type: string;
//     media_url: string;
//     title?: string | null;
//     display_order?: number;
//   }>;
// }

// export interface WorkoutExerciseFilters {
//   muscleGroupId?: number | "";
//   equipmentId?: number | "";
//   environment?: string | "";
//   trackingType?: string | "";
//   difficulty?: string | "";
//   search?: string;
// }

// export interface CreateWorkoutExercisePayload {
//   name: string;
//   description?: string;
//   primaryMuscleGroupId?: number | null;
//   secondaryMuscleGroupIds: number[];
//   equipmentIds: number[];
//   movementPattern?: string;
//   trackingType: string;
//   difficulty?: string;
//   instructions?: string;
//   imageUrl?: string;
//   videoUrl?: string;
//   environment: "HOME" | "GYM" | "BOTH";
// }

// export type UpdateWorkoutExercisePayload = Partial<CreateWorkoutExercisePayload>;

// const unwrap = <T,>(response: any): T =>
//   response?.data?.data as T;

// export const getWorkoutMuscleGroups = async () => {
//   const response = await api.get("/workout/muscle-groups");
//   return unwrap<WorkoutMuscleGroup[]>(response) ?? [];
// };

// export const getWorkoutEquipment = async () => {
//   const response = await api.get("/workout/equipment");
//   return unwrap<WorkoutEquipment[]>(response) ?? [];
// };

// export const getWorkoutExercises = async (
//   filters: WorkoutExerciseFilters = {}
// ) => {
//   const params: Record<string, string | number> = {};

//   if (filters.muscleGroupId) params.muscleGroupId = filters.muscleGroupId;
//   if (filters.equipmentId) params.equipmentId = filters.equipmentId;
//   if (filters.environment) params.environment = filters.environment;
//   if (filters.trackingType) params.trackingType = filters.trackingType;
//   if (filters.difficulty) params.difficulty = filters.difficulty;
//   if (filters.search?.trim()) params.search = filters.search.trim();

//   const response = await api.get("/workout/exercises", { params });
//   return unwrap<WorkoutExerciseListItem[]>(response) ?? [];
// };

// export const getWorkoutExerciseById = async (id: number) => {
//   const response = await api.get(`/workout/exercises/${id}`);
//   return unwrap<WorkoutExerciseDetail>(response);
// };

// export const createWorkoutExercise = async (
//   payload: CreateWorkoutExercisePayload
// ) => {
//   const response = await api.post("/workout/exercises", payload);
//   return unwrap<WorkoutExerciseDetail>(response);
// };

// export const updateWorkoutExercise = async (
//   id: number,
//   payload: UpdateWorkoutExercisePayload
// ) => {
//   const response = await api.put(`/workout/exercises/${id}`, payload);
//   return unwrap<WorkoutExerciseDetail>(response);
// };




// Version 2

import api from "../utils/api";

export interface WorkoutMuscleGroup {
  id: number;
  name: string;
  description?: string | null;
  display_order?: number | null;
}

export interface WorkoutEquipment {
  id: number;
  name: string;
  description?: string | null;
}

export interface WorkoutExerciseListItem {
  id: number;
  name: string;
  description?: string | null;
  primary_muscle_group_id?: number | null;
  primary_muscle_group?: string | null;
  movement_pattern?: string | null;
  tracking_type?: string | null;
  difficulty?: string | null;
  instructions?: string | null;
  image_url?: string | null;
  video_url?: string | null;
  environment?: string | null;
  is_active?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WorkoutExerciseDetail extends WorkoutExerciseListItem {
  muscles?: Array<{
    muscle_group_id: number;
    name: string;
    role: "PRIMARY" | "SECONDARY" | string;
  }>;
  equipment?: Array<{
    equipment_id: number;
    name: string;
    is_required?: boolean;
  }>;
  media?: Array<{
    id: number;
    media_type: string;
    media_url: string;
    title?: string | null;
    display_order?: number;
  }>;
}

export interface WorkoutExerciseFilters {
  muscleGroupId?: number | "";
  equipmentId?: number | "";
  environment?: string | "";
  trackingType?: string | "";
  difficulty?: string | "";
  search?: string;
}

export interface CreateWorkoutExercisePayload {
  name: string;
  description?: string;
  primaryMuscleGroupId?: number | null;
  secondaryMuscleGroupIds: number[];
  equipmentIds: number[];
  movementPattern?: string;
  trackingType: string;
  difficulty?: string;
  instructions?: string;
  imageUrl?: string;
  videoUrl?: string;
  environment: "HOME" | "GYM" | "BOTH";
}

export type UpdateWorkoutExercisePayload = Partial<CreateWorkoutExercisePayload>;

const unwrap = <T,>(response: any): T =>
  response?.data?.data as T;

export const getWorkoutMuscleGroups = async () => {
  const response = await api.get("/workout/muscle-groups");
  return unwrap<WorkoutMuscleGroup[]>(response) ?? [];
};

export const getWorkoutEquipment = async () => {
  const response = await api.get("/workout/equipment");
  return unwrap<WorkoutEquipment[]>(response) ?? [];
};

export const getWorkoutExercises = async (
  filters: WorkoutExerciseFilters = {}
) => {
  const params: Record<string, string | number> = {};

  if (filters.muscleGroupId) params.muscleGroupId = filters.muscleGroupId;
  if (filters.equipmentId) params.equipmentId = filters.equipmentId;
  if (filters.environment) params.environment = filters.environment;
  if (filters.trackingType) params.trackingType = filters.trackingType;
  if (filters.difficulty) params.difficulty = filters.difficulty;
  if (filters.search?.trim()) params.search = filters.search.trim();

  const response = await api.get("/workout/exercises", { params });
  return unwrap<WorkoutExerciseListItem[]>(response) ?? [];
};

export const getWorkoutExerciseById = async (id: number) => {
  const response = await api.get(`/workout/exercises/${id}`);
  return unwrap<WorkoutExerciseDetail>(response);
};

export const createWorkoutExercise = async (
  payload: CreateWorkoutExercisePayload
) => {
  const response = await api.post("/workout/exercises", payload);
  return unwrap<WorkoutExerciseDetail>(response);
};

export const updateWorkoutExercise = async (
  id: number,
  payload: UpdateWorkoutExercisePayload
) => {
  const response = await api.put(`/workout/exercises/${id}`, payload);
  return unwrap<WorkoutExerciseDetail>(response);
};


export const deleteWorkoutExercise = async (id: number) => {
  const response = await api.delete(`/workout/exercises/${id}`);
  return unwrap<{
    exercise_id: number;
    name: string;
  }>(response);
};

