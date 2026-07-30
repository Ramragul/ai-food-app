import api from "../../utils/api";
import type { CoachUpdate } from "../../types/client.types";

interface CoachUpdatesResponse {
    success: boolean;
    data: CoachUpdate[];
}

export const getCoachUpdates = async (): Promise<CoachUpdate[]> => {

    const response = await api.get<CoachUpdatesResponse>(
        "/client/coach-updates"
    );

    return response.data.data;

};

export const markAsRead = async (
    updateId: number
): Promise<void> => {

    await api.patch(
        `/client/coach-updates/${updateId}/read`
    );

};