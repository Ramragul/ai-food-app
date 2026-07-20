// import api from "../../utils/api";
// import { DashboardClient } from "./dashboard.service";

// export const getClients = async (): Promise<DashboardClient[]> => {
//   const response = await api.get("/coach/clients");
//   return response.data.data;
// };



import api from "../../utils/api";

import type {
    ClientDetails
} from "./client.types";

import type {
    DashboardClient
} from "./dashboard.service";

/**
 * Get all clients assigned to the logged-in coach
 */
export const getClients = async (): Promise<DashboardClient[]> => {

    const response = await api.get(
        "/coach/my-clients"
    );

    return response.data.data;

};

/**
 * Get a single client's complete profile
 */
export const getClientDetails = async (
    memberId: number
): Promise<ClientDetails> => {

    const response = await api.get(
        `/coach/client/${memberId}`
    );

    return response.data.data;

};

/**
 * Add a coach note
 * (Implement when backend API is ready)
 */
export const addCoachNote = async (
    memberId: number,
    note: string
) => {

    const response = await api.post(
        `/coach/client/${memberId}/notes`,
        {
            note
        }
    );

    return response.data;

};

/**
 * Update coach note
 */
export const updateCoachNote = async (
    noteId: number,
    note: string
) => {

    const response = await api.put(
        `/coach/notes/${noteId}`,
        {
            note
        }
    );

    return response.data;

};

/**
 * Delete coach note
 */
export const deleteCoachNote = async (
    noteId: number
) => {

    const response = await api.delete(
        `/coach/notes/${noteId}`
    );

    return response.data;

};