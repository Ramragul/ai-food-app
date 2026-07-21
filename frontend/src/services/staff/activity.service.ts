import api from "../../utils/api";

export interface ClientActivity {

    type: "COACH_NOTE" | "GOAL" | "WEIGHT";

    title: string;

    description: string;

    created_at: string;

}

export const getClientActivity = async (

    memberId: number

): Promise<ClientActivity[]> => {

    const response =
        await api.get(
            `/coach/client/${memberId}/activity`
        );

    return response.data.data;

};