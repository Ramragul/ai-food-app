import api from "../../utils/api";
import type { CoachUpdate } from "../../types/client.types";

interface CoachUpdatesResponse {
    success: boolean;
    data: CoachUpdate[];
}

export const getCoachUpdates = async (): Promise<CoachUpdate[]> => {

    const response = await api.get<CoachUpdatesResponse>(
        "/client/coach-notes"
    );

    return response.data.data;

};