// import api from "../../utils/api";

// export const getCoachNotes = async (
//   memberId: number
// ) => {

//   const response = await api.get(
//     `/coach/client/${memberId}/notes`
//   );

//   return response.data.data;

// };

// export const createCoachNote = async (
//   memberId: number,
//   payload: any
// ) => {

//   const response = await api.post(
//     `/coach/client/${memberId}/notes`,
//     payload
//   );

//   return response.data.data;

// };

// export const updateCoachNote = async (
//   noteId: number,
//   payload: any
// ) => {

//   const response = await api.put(
//     `/coach/notes/${noteId}`,
//     payload
//   );

//   return response.data.data;

// };

// export const deleteCoachNote = async (
//   noteId: number
// ) => {

//   await api.delete(
//     `/coach/notes/${noteId}`
//   );

// };


// Version 2 

import api from "../../utils/api";

import type { CoachNote } from "./client.types";

export interface CoachNotePayload {

    category: string;

    title: string;

    note: string;

}

export const getCoachNotes = async (
    memberId: number
): Promise<CoachNote[]> => {

    const response = await api.get(
        `/coach/client/${memberId}/notes`
    );

    return response.data.data;

};

export const createCoachNote = async (
    memberId: number,
    payload: CoachNotePayload
): Promise<CoachNote> => {

    const response = await api.post(
        `/coach/client/${memberId}/notes`,
        payload
    );

    return response.data.data;

};

export const updateCoachNote = async (
    noteId: number,
    payload: CoachNotePayload
): Promise<CoachNote> => {

    const response = await api.put(
        `/coach/notes/${noteId}`,
        payload
    );

    return response.data.data;

};

export const deleteCoachNote = async (
    noteId: number
): Promise<void> => {

    await api.delete(
        `/coach/notes/${noteId}`
    );

};